export const runtime = "edge";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, cal_booking_uid } = body;

    if (!process.env.CAL_API_KEY)
      return NextResponse.json({ error: "CAL_API_KEY not set" }, { status: 500 });
    if (!id || !cal_booking_uid)
      return NextResponse.json({ error: "Missing id or cal_booking_uid" }, { status: 400 });

    const calRes = await fetch(
      `https://api.cal.com/v2/bookings/${cal_booking_uid}/confirm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.CAL_API_KEY}`,
          "cal-api-version": "2024-08-13",
        },
      }
    );

    const calBody = await calRes.text();

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
        body: JSON.stringify({ status: "scheduled" }),
      }
    );

    return NextResponse.json(
      { success: calRes.ok, calStatus: calRes.status, calBody, cal_booking_uid_sent: cal_booking_uid },
      { status: calRes.ok ? 200 : 500 }
    );

  } catch (err: unknown) {
    const e = err as { message?: string };
    return NextResponse.json({ error: e.message ?? "unknown" }, { status: 500 });
  }
}
