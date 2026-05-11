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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const payload = body.payload ?? body;

    // Cal.com sends attendee email in different fields depending on event type
    const email: string | null =
      payload?.attendee?.email ||
      payload?.responses?.email?.value ||
      payload?.bookerEmail ||
      null;

    const startTime: string | null = payload?.startTime ?? null;

    if (!email || !startTime) {
      return NextResponse.json({ received: true });
    }

    const apptTime = formatApptTime(startTime);

    const searchRes = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/patient_intake?email=eq.${encodeURIComponent(email)}&order=submitted_at.desc&limit=1`,
      {
        headers: {
          apikey: process.env.SUPABASE_SERVICE_KEY!,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
        },
      }
    );

    if (!searchRes.ok) {
      console.error("Cal webhook: Supabase search failed", await searchRes.text());
      return NextResponse.json({ received: true });
    }

    const rows: Array<{ id: string; status: string }> = await searchRes.json();
    if (!rows.length) {
      return NextResponse.json({ received: true });
    }

    const row = rows[0];
    const updates: Record<string, string> = { appt_time: apptTime };
    if (!row.status || row.status === "pending") {
      updates.status = "scheduled";
    }

    await fetch(
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
  } catch (e) {
    console.error("Cal webhook error:", e);
  }

  return NextResponse.json({ received: true });
}
