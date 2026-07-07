import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { id, cal_booking_uid, reason } = await req.json();

  if (!id || !cal_booking_uid) {
    return NextResponse.json({ error: "Missing id or cal_booking_uid" }, { status: 400 });
  }

  const calRes = await fetch(
    `https://api.cal.com/v2/bookings/${cal_booking_uid}/cancel`,
    {
      method: "POST",
      headers: {
        "x-cal-secret-key": process.env.CAL_API_KEY!,
        "cal-api-version": "2024-08-13",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reason: reason || "Rejected by receptionist" }),
    }
  );

  if (!calRes.ok) {
    const body = await calRes.text();
    console.error("Cal cancel failed:", calRes.status, body);
    return NextResponse.json({ error: "Cal.com cancel failed", detail: body }, { status: 502 });
  }

  await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/patient_intake?id=eq.${id}`,
    {
      method: "PATCH",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ status: "rejected" }),
    }
  );

  return NextResponse.json({ success: true });
}
