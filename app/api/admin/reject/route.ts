import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  if (!process.env.CAL_API_KEY) {
    return NextResponse.json({ error: "CAL_API_KEY not set" }, { status: 500 });
  }
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return NextResponse.json({ error: "Supabase env vars not set" }, { status: 500 });
  }

  try {
    const { id, cal_booking_uid } = await req.json();

    console.log("Admin reject: received id:", id, "cal_booking_uid:", cal_booking_uid, "reason:", reason);

    if (!id || !cal_booking_uid) {
      return NextResponse.json({ error: "Missing id or cal_booking_uid" }, { status: 400 });
    }

    const calUrl = `https://api.cal.com/v1/bookings/${cal_booking_uid}/cancel`;
    console.log("Admin reject: calling Cal.com URL:", calUrl);

    const calRes = await fetch(calUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CAL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reason: reason || "Rejected by receptionist" }),
    });

    const calBody = await calRes.text();
    console.log("Admin reject: Cal.com response status:", calRes.status, "body:", calBody);

    if (!calRes.ok) {
      return NextResponse.json({ error: "Cal.com cancel failed", detail: calBody }, { status: 502 });
    }

    const sbRes = await fetch(
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

    console.log("Admin reject: Supabase patch status:", sbRes.status);

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const e = err as { message?: string; stack?: string };
    console.error("Admin reject: unexpected error:", e);
    return NextResponse.json({ error: e.message || "Unexpected error", stack: e.stack }, { status: 500 });
  }
}
