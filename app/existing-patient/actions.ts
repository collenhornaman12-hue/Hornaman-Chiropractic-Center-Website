"use server";

import { redirect } from "next/navigation";

export async function submitExistingPatient(formData: FormData) {
  const insuranceChanged = formData.get("insuranceChanged") === "yes";

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
    insuranceChanged: formData.get("insuranceChanged") as string,
    insuranceProvider: formData.get("insuranceProvider") as string,
    insurancePolicyId: formData.get("insurancePolicyId") as string,
    insuranceGroupNumber: formData.get("insuranceGroupNumber") as string,
    complaints: formData.getAll("complaint").join(", "),
    conditionDuration: formData.get("conditionDuration") as string,
    painLevel: formData.get("painLevel") as string,
    notes: formData.get("notes") as string,
  };

  const insuranceSection = insuranceChanged
    ? `Insurance Changed: YES
Provider: ${fields.insuranceProvider || "N/A"}
Policy/Member ID: ${fields.insurancePolicyId || "N/A"}
Group Number: ${fields.insuranceGroupNumber || "N/A"}`
    : `Insurance Changed: NO — Use insurance on file`;

  const emailBody = `
EXISTING PATIENT DETAILS — ${fields.firstName} ${fields.lastName}
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
${insuranceSection}

REASON FOR VISIT (Optional)
Complaints: ${fields.complaints || "Not specified"}
Duration: ${fields.conditionDuration || "Not specified"}
Pain Level: ${fields.painLevel ? fields.painLevel + "/10" : "Not specified"}
Notes: ${fields.notes || "None"}
  `.trim();

  await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      personalizations: [{
        to: [{ email: "info@hornamanchiropracticcenter.com" }],
      }],
      from: { email: "forms@hornamanchiropracticcenter.com", name: "Hornaman Chiropractic Website" },
      subject: `Existing Patient: ${fields.firstName} ${fields.lastName}`,
      content: [{ type: "text/plain", value: emailBody }],
    }),
  });

  redirect("https://cal.com/hornamanchiropracticcenter/existing-patient-visit");
}
