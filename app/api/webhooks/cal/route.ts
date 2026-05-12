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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Full raw body dump
    console.log("Cal webhook RAW BODY:", JSON.stringify(body));

    const payload = body.payload ?? body;

    // Full payload dump
    console.log("Cal webhook PAYLOAD:", JSON.stringify(payload));

    // Every possible UID field
    console.log("Cal webhook UID FIELDS:", JSON.stringify({
      "body.uid": body?.uid,
      "body.bookingId": body?.bookingId,
      "body.payload?.uid": body?.payload?.uid,
      "body.payload?.id": body?.payload?.id,
      "payload.uid": payload?.uid,
      "payload.bookingId": payload?.bookingId,
      "payload.id": payload?.id,
    }));

    const email: string | null =
      payload?.attendee?.email ||
      payload?.responses?.email?.value ||
      payload?.bookerEmail ||
      null;

    const attendeeName: string | null =
      payload?.attendee?.name ||
      payload?.responses?.name?.value ||
      null;

    const startTime: string | null = payload?.startTime ?? null;

    // Cal.com booking UID — used for confirm/reject via API
    const calBookingUid: string | null =
      payload?.uid ||
      payload?.bookingId ||
      body?.uid ||
      null;

    console.log("Cal webhook extracted — email:", email, "name:", attendeeName, "startTime:", startTime, "uid:", calBookingUid);

    if (!startTime) {
      console.log("Cal webhook: missing startTime, skipping");
      return NextResponse.json({ received: true });
    }

    const apptTime = formatApptTime(startTime);

    // 1. Match by email
    let row: { id: string; status: string } | null = null;
    if (email) {
      row = await searchIntake(`email=eq.${encodeURIComponent(email)}`);
    }

    // 2. Fall back to name match
    if (!row && attendeeName) {
      row = await searchIntake(`name=ilike.*${encodeURIComponent(attendeeName)}*`);
    }

    if (!row) {
      console.log("Cal webhook: no matching intake row found — email:", email, "name:", attendeeName);
      return NextResponse.json({ received: true });
    }

    const updates: Record<string, string> = { appt_time: apptTime };
    if (!row.status || row.status === "pending") {
      updates.status = "scheduled";
    }
    if (calBookingUid) {
      updates.cal_booking_uid = calBookingUid;
    }

    const updateRes = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/patient_intake?id=eq.${row.id}`,
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

    if (updateRes.ok) {
      console.log("Cal webhook: updated row", row.id, "→ appt_time:", apptTime, "uid:", calBookingUid, "updates:", JSON.stringify(updates));
    } else {
      console.error("Cal webhook: update failed for row", row.id, await updateRes.text());
    }
  } catch (e) {
    console.error("Cal webhook error:", e);
  }

  return NextResponse.json({ received: true });
}
