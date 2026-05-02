import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const fields = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    dob: formData.get("dob") as string,
    sex: formData.get("sex") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    zip: formData.get("zip") as string,
    emergencyName: formData.get("emergencyName") as string,
    emergencyRelationship: formData.get("emergencyRelationship") as string,
    emergencyPhone: formData.get("emergencyPhone") as string,
    paymentType: formData.get("paymentType") as string,
    insuranceProvider: formData.get("insuranceProvider") as string,
    insurancePolicyId: formData.get("insurancePolicyId") as string,
    insuranceGroupNumber: formData.get("insuranceGroupNumber") as string,
    insurancePhone: formData.get("insurancePhone") as string,
    insuredName: formData.get("insuredName") as string,
    complaints: formData.getAll("complaint").join(", "),
    conditionDuration: formData.get("conditionDuration") as string,
    painLevel: formData.get("painLevel") as string,
    priorChiro: formData.get("priorChiro") as string,
    notes: formData.get("notes") as string,
    referralSource: formData.get("referralSource") as string,
  };

  const emailBody = `
NEW PATIENT INTAKE — ${fields.firstName} ${fields.lastName}
Submitted: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}

PERSONAL INFORMATION
Name: ${fields.firstName} ${fields.lastName}
Date of Birth: ${fields.dob}
Sex: ${fields.sex}
Phone: ${fields.phone}
Email: ${fields.email}

HOME ADDRESS
${fields.address}, ${fields.city}, ${fields.state} ${fields.zip}

EMERGENCY CONTACT
Name: ${fields.emergencyName} (${fields.emergencyRelationship})
Phone: ${fields.emergencyPhone}

INSURANCE
Payment Type: ${fields.paymentType}
Provider: ${fields.insuranceProvider || "N/A"}
Policy/Member ID: ${fields.insurancePolicyId || "N/A"}
Group Number: ${fields.insuranceGroupNumber || "N/A"}
Insurance Phone: ${fields.insurancePhone || "N/A"}
Insured Name: ${fields.insuredName || "Same as patient"}

REASON FOR VISIT
Complaints: ${fields.complaints || "Not specified"}
Duration: ${fields.conditionDuration || "N/A"}
Pain Level: ${fields.painLevel || "N/A"}/10
Prior Chiro Care: ${fields.priorChiro || "N/A"}
Notes: ${fields.notes || "None"}

REFERRAL SOURCE: ${fields.referralSource || "Not specified"}
  `.trim();

  try {
    await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: "info@hornamanchiropracticcenter.com" }] }],
        from: { email: "forms@hornamanchiropracticcenter.com", name: "Hornaman Chiropractic Website" },
        subject: `New Patient Intake: ${fields.firstName} ${fields.lastName}`,
        content: [{ type: "text/plain", value: emailBody }],
      }),
    });
  } catch (e) {
    console.error("Email send failed:", e);
  }

  try {
    await fetch(`${process.env.SUPABASE_URL}/rest/v1/patient_intake`, {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        type: "new",
        name: `${fields.firstName} ${fields.lastName}`,
        phone: fields.phone,
        email: fields.email,
        dob: fields.dob,
        insurance: fields.insuranceProvider || fields.paymentType || null,
        chief_complaint: fields.complaints || null,
        raw_data: fields,
      }),
    });
  } catch (e) {
    console.error("Supabase insert failed:", e);
  }

  return NextResponse.json({ success: true });
}
