import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

function formatApptTime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/New_York",
  });
}

async function searchIntake(
  filter: string
): Promise<{ id: string; status: string } | null> {
  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/patient_intake?${filter}&order=submitted_at.desc&limit=1`,
    {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
      },
    }
  );
  if (!res.ok) {
    console.error("Cal webhook: Supabase search failed", filter, await res.text());
    return null;
  }
  const rows: Array<{ id: string; status: string }> = await res.json();
  console.log(`Cal webhook: search [${filter}] → ${rows.length} row(s)`, JSON.stringify(rows));
  return rows[0] ?? null;
}

async function patchIntake(id: string, updates: Record<string, string>) {
  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/patient_intake?id=eq.${id}`,
    {
      method: "PATCH",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(updates),
    }
  );
  if (!res.ok) {
    console.error("Cal webhook: patch failed for row", id, await res.text());
  }
  return res;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const triggerEvent: string = body.triggerEvent ?? "UNKNOWN";
    const payload = body.payload ?? body;

    console.log("Cal webhook triggerEvent:", triggerEvent);

    const email: string | null =
      payload?.attendee?.email ||
      payload?.responses?.email?.value ||
      payload?.bookerEmail ||
      null;

    const attendeeName: string | null =
      payload?.attendee?.name ||
      payload?.responses?.name?.value ||
      null;

    const calBookingUid: string | null =
      payload?.uid ||
      payload?.bookingId ||
      body?.uid ||
      null;

    console.log("Cal webhook extracted — triggerEvent:", triggerEvent, "email:", email, "name:", attendeeName, "uid:", calBookingUid);

    // BOOKING_CONFIRMED: search by cal_booking_uid first (most reliable), then fall back
    if (triggerEvent === "BOOKING_CONFIRMED") {
      const startTime: string | null = payload?.startTime ?? null;

      let confirmedRow: { id: string; status: string } | null = null;
      if (calBookingUid) {
        confirmedRow = await searchIntake(`cal_booking_uid=eq.${encodeURIComponent(calBookingUid)}`);
      }
      if (!confirmedRow && email) {
        confirmedRow = await searchIntake(`email=eq.${encodeURIComponent(email)}`);
      }
      if (!confirmedRow && attendeeName) {
        confirmedRow = await searchIntake(`name=ilike.*${encodeURIComponent(attendeeName)}*`);
      }

      if (!confirmedRow) {
        console.log("Cal webhook BOOKING_CONFIRMED: no matching row — uid:", calBookingUid, "email:", email);
        return NextResponse.json({ received: true });
      }

      if (!startTime) {
        console.log("Cal webhook BOOKING_CONFIRMED: missing startTime, skipping appt_time update");
        await patchIntake(confirmedRow.id, { status: "scheduled" });
        return NextResponse.json({ received: true });
      }

      const apptTime = formatApptTime(startTime);
      const res = await patchIntake(confirmedRow.id, { appt_time: apptTime, status: "scheduled" });
      if (res.ok) {
        console.log("Cal webhook BOOKING_CONFIRMED: updated row", confirmedRow.id, "→ appt_time:", apptTime);
      }
      return NextResponse.json({ received: true });
    }

    // Find matching intake row by email, then full name, then last name only
    let row: { id: string; status: string } | null = null;
    if (email) {
      row = await searchIntake(`email=eq.${encodeURIComponent(email)}`);
    }
    if (!row && attendeeName) {
      console.log("Cal webhook: trying full name match for:", attendeeName);
      row = await searchIntake(`name=ilike.*${encodeURIComponent(attendeeName)}*`);
    }
    if (!row && attendeeName) {
      const lastName = attendeeName.trim().split(" ").pop() ?? "";
      if (lastName) {
        console.log("Cal webhook: trying last name fallback for:", lastName);
        row = await searchIntake(`name=ilike.*${encodeURIComponent(lastName)}*`);
      }
    }

    if (!row) {
      console.log("Cal webhook: no matching intake row found — email:", email, "name:", attendeeName);
      return NextResponse.json({ received: true });
    }

    if (triggerEvent === "BOOKING_REQUESTED") {
      // Save the UID so the receptionist can approve/reject from the dashboard
      if (calBookingUid) {
        const res = await patchIntake(row.id, { cal_booking_uid: calBookingUid });
        if (res.ok) {
          console.log("Cal webhook BOOKING_REQUESTED: saved cal_booking_uid", calBookingUid, "→ row", row.id);
        }
      } else {
        console.log("Cal webhook BOOKING_REQUESTED: no uid found, skipping patch");
      }
      return NextResponse.json({ received: true });
    }

    if (triggerEvent === "BOOKING_CREATED") {
      const startTime: string | null = payload?.startTime ?? null;
      if (!startTime) {
        console.log("Cal webhook BOOKING_CREATED: missing startTime, skipping");
        return NextResponse.json({ received: true });
      }

      const apptTime = formatApptTime(startTime);
      const updates: Record<string, string> = { appt_time: apptTime };
      if (!row.status || row.status === "pending") {
        updates.status = "scheduled";
      }
      if (calBookingUid) {
        updates.cal_booking_uid = calBookingUid;
      }

      const res = await patchIntake(row.id, updates);
      if (res.ok) {
        console.log("Cal webhook BOOKING_CREATED: updated row", row.id, "→ appt_time:", apptTime, "uid:", calBookingUid);
      }
      return NextResponse.json({ received: true });
    }

    console.log("Cal webhook: unhandled triggerEvent", triggerEvent);
  } catch (e) {
    console.error("Cal webhook error:", e);
  }

  return NextResponse.json({ received: true });
}
