export const runtime = "edge";
import { NextRequest, NextResponse } from "next/server";

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

function formatEmailDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  });
}

function formatEmailTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/New_York",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, cal_booking_uid } = body;

    if (!process.env.CAL_API_KEY)
      return NextResponse.json({ error: "CAL_API_KEY not set" }, { status: 500 });
    if (!id || !cal_booking_uid)
      return NextResponse.json({ error: "Missing id or cal_booking_uid" }, { status: 400 });

    // Fetch patient row for email, name, and appt_time fallback
    const patientRes = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/patient_intake?id=eq.${id}&select=email,name,appt_time,phone`,
      {
        headers: {
          apikey: process.env.SUPABASE_SERVICE_KEY!,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
        },
      }
    );
    const patientRows: Array<{ email: string | null; name: string | null; appt_time: string | null; phone: string | null }> =
      patientRes.ok ? await patientRes.json() : [];
    const patientEmail = patientRows[0]?.email ?? null;
    const patientName = patientRows[0]?.name ?? "there";
    const existingApptTime = patientRows[0]?.appt_time ?? null;
    const patientPhone = patientRows[0]?.phone ?? null;

    if (patientEmail) {
      console.log("confirm: patientEmail found:", patientEmail);
    } else {
      console.log("confirm: no patientEmail, skipping email send");
    }

    // Confirm booking with Cal.com
    const calRes = await fetch(
      `https://api.cal.com/v2/bookings/${cal_booking_uid}/confirm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.CAL_API_KEY}`,
          "cal-api-version": "2026-02-25",
        },
      }
    );

    const calBody = await calRes.text();

    if (!calRes.ok) {
      return NextResponse.json(
        { success: false, calStatus: calRes.status, calBody, cal_booking_uid_sent: cal_booking_uid },
        { status: 500 }
      );
    }

    // Parse Cal.com response for appointment start time
    let startIso: string | null = null;
    try {
      const calJson = JSON.parse(calBody);
      startIso = calJson?.data?.start ?? null;
    } catch {
      console.error("confirm: failed to parse Cal.com response JSON");
    }

    // Update Supabase: status + appt_time if returned by Cal.com
    const updates: Record<string, string> = { status: "scheduled" };
    if (startIso) updates.appt_time = formatApptTime(startIso);

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
        body: JSON.stringify(updates),
      }
    );

    if (!sbRes.ok) {
      console.error("confirm: Supabase PATCH failed for row", id, await sbRes.text());
    }

    // Build date/time strings for email
    // Use Cal.com start ISO if available; fall back to pre-formatted Supabase appt_time
    let emailDate: string;
    let emailTime: string;
    if (startIso) {
      emailDate = formatEmailDate(startIso);
      emailTime = formatEmailTime(startIso);
    } else {
      emailDate = existingApptTime ?? "Please contact our office";
      emailTime = "";
    }

    // Send confirmation email to patient
    if (patientEmail) {
      const emailBody = `Hi ${patientName},

Your appointment with Hornaman Chiropractic Center has been confirmed. We look forward to seeing you!

Appointment Details:
Date: ${emailDate}
${emailTime ? `Time: ${emailTime} ET\n` : ""}Location: 107 N. Main St., Union City, PA 16438

Please arrive 10 minutes early to complete any remaining paperwork. If you need to reschedule or cancel, please contact our office at least 24 hours in advance.

Phone: (814) 438-7242

Office Hours:
Monday 8:30 AM – 4:00 PM
Tuesday 9:30 AM – 6:00 PM
Thursday 9:30 AM – 6:00 PM
Friday 8:30 AM – 4:00 PM

We look forward to seeing you.

Dr. Thomas J. Hornaman
Hornaman Chiropractic Center
107 N. Main St., Union City, PA 16438`;

      try {
        console.log("confirm: sending confirmation email to:", patientEmail);
        const mcRes = await fetch("https://api.mailchannels.net/tx/v1/send", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email: patientEmail }],
              dkim_domain: "hornamanchiropracticcenter.com",
              dkim_selector: "mailchannels",
              dkim_private_key: process.env.DKIM_PRIVATE_KEY ?? "",
            }],
            from: {
              email: "forms@hornamanchiropracticcenter.com",
              name: "Hornaman Chiropractic Center",
            },
            subject: "Your appointment is confirmed — Hornaman Chiropractic Center",
            content: [{ type: "text/plain", value: emailBody }],
          }),
        });
        const mcBody = await mcRes.text();
        console.log("confirm: MailChannels status:", mcRes.status, "body:", mcBody);
      } catch (e) {
        console.error("confirm: MailChannels send failed:", e);
      }
    }

    // SMS: patientPhone is available for future Twilio integration
    if (patientPhone) {
      console.log("confirm: patientPhone for SMS:", patientPhone);
    } else {
      console.log("confirm: no patientPhone on record — SMS not sent");
    }

    return NextResponse.json(
      {
        success: true,
        calStatus: calRes.status,
        calBody,
        cal_booking_uid_sent: cal_booking_uid,
        appt_time: updates.appt_time ?? null,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const e = err as { message?: string };
    return NextResponse.json({ error: e.message ?? "unknown" }, { status: 500 });
  }
}
