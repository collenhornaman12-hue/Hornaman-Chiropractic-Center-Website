"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewPatientPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [hadScans, setHadScans] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    await fetch("/api/new-patient", { method: "POST", body: formData });
    const firstName = (formData.get("firstName") as string) || "";
    const lastName = (formData.get("lastName") as string) || "";
    const email = (formData.get("email") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    const params = new URLSearchParams({
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone,
    });
    router.push(`https://cal.com/hornamanchiropracticcenter/new-patient?${params.toString()}`);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/book" className="text-sm text-yellow-green font-semibold hover:underline mb-8 inline-block">
          ← Back to Booking
        </Link>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-8 bg-[#203078] rounded-xl px-5 py-3">
          <div className="flex items-center gap-2 flex-1">
            <span className="w-6 h-6 rounded-full bg-[#c8d828] text-[#203078] text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ fontFamily: "'Oswald', sans-serif" }}>1</span>
            <span className="text-white text-sm font-semibold" style={{ fontFamily: "'Oswald', sans-serif" }}>Complete intake form</span>
          </div>
          <div className="w-px h-5 bg-white/20" />
          <div className="flex items-center gap-2 flex-1 opacity-50">
            <span className="w-6 h-6 rounded-full border-2 border-white/40 text-white/60 text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ fontFamily: "'Oswald', sans-serif" }}>2</span>
            <span className="text-white/60 text-sm font-semibold" style={{ fontFamily: "'Oswald', sans-serif" }}>Choose appointment time</span>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-yellow-green font-semibold text-sm uppercase tracking-widest mb-1">New Patients</p>
          <h1 className="text-3xl font-bold text-navy mb-2">New Patient Intake Form</h1>
          <p className="text-gray-500 text-sm">
            Please complete this form before your first visit. All information is kept strictly confidential in accordance with HIPAA.
            If you have been seen by Dr. Hornaman within the last 3 years, please use the{" "}
            <Link href="/existing-patient" className="text-yellow-green hover:underline font-medium">existing patient form</Link> instead.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* 1 — Personal Information */}
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-navy mb-5 pb-3 border-b border-gray-100">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
                <input type="text" name="firstName" required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
                <input type="text" name="lastName" required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth <span className="text-red-500">*</span></label>
                <input type="date" name="dob" required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Sex at Birth <span className="text-red-500">*</span></label>
                <select name="sex" required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent">
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" name="phone" required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent" placeholder="(814) 000-0000" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input type="email" name="email" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent" />
              </div>
            </div>
          </section>

          {/* 2 — Home Address */}
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-navy mb-5 pb-3 border-b border-gray-100">Home Address</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Street Address <span className="text-red-500">*</span></label>
                <input type="text" name="address" required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">City <span className="text-red-500">*</span></label>
                  <input type="text" name="city" required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">State <span className="text-red-500">*</span></label>
                  <input type="text" name="state" required defaultValue="PA" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">ZIP Code <span className="text-red-500">*</span></label>
                  <input type="text" name="zip" required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent" />
                </div>
              </div>
            </div>
          </section>

          {/* 3 — Insurance Information */}
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-navy mb-1 pb-3 border-b border-gray-100">Insurance Information</h2>
            <p className="text-xs text-gray-400 mt-3 mb-4">
              Not sure if we accept your insurance?{" "}
              <Link href="/insurance" className="text-yellow-green hover:underline">View accepted insurances →</Link>
            </p>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Type <span className="text-red-500">*</span></label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="radio" name="paymentType" value="insurance" defaultChecked className="accent-yellow-green" />
                  Insurance
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="radio" name="paymentType" value="self-pay" className="accent-yellow-green" />
                  Self-Pay
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="radio" name="paymentType" value="medicare" className="accent-yellow-green" />
                  Medicare
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Insurance Provider</label>
                <input type="text" name="insuranceProvider" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent" placeholder="e.g. Blue Cross Blue Shield" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Policy / Member ID</label>
                <input type="text" name="insurancePolicyId" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Group Number</label>
                <input type="text" name="insuranceGroupNumber" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Insurance Phone Number</label>
                <input type="tel" name="insurancePhone" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name of Insured (if different from patient)</label>
                <input type="text" name="insuredName" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent" />
              </div>
            </div>
          </section>

          {/* 4 — Medical History */}
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-navy mb-5 pb-3 border-b border-gray-100">Medical History</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Do you have any of the following conditions?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "Osteoporosis",
                    "Blood clotting disorder",
                    "Recent surgery (within 6 months)",
                    "Cancer / tumor history",
                    "Spinal cord injury",
                    "Rheumatoid arthritis",
                    "None of the above",
                  ].map((item) => (
                    <label key={item} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input type="checkbox" name="medicalCondition" value={item} className="accent-yellow-green" />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Current medications <span className="text-gray-400 font-normal">(list any that may affect treatment, e.g. blood thinners)</span>
                </label>
                <textarea name="medications" rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent resize-none" placeholder="Optional" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Have you had any recent X-rays, MRI, or CT scans related to your current condition?
                </label>
                <div className="flex gap-4 mb-3">
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="radio" name="recentScans" value="yes" onChange={() => setHadScans(true)} className="accent-yellow-green" /> Yes
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="radio" name="recentScans" value="no" defaultChecked onChange={() => setHadScans(false)} className="accent-yellow-green" /> No
                  </label>
                </div>
                {hadScans && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Please describe:</label>
                    <textarea name="scanDescription" rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent resize-none" placeholder="When, where, and what was found..." />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 5 — Emergency Contact */}
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-navy mb-5 pb-3 border-b border-gray-100">Emergency Contact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input type="text" name="emergencyName" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Relationship</label>
                <input type="text" name="emergencyRelationship" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent" placeholder="e.g. Spouse, Parent" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                <input type="tel" name="emergencyPhone" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent" />
              </div>
            </div>
          </section>

          {/* 6 — Reason for Visit */}
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-navy mb-5 pb-3 border-b border-gray-100">Reason for Visit</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Complaint</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {["Back Pain","Neck Pain","Headaches","Sciatica","Shoulder Pain","Hip Pain","Auto Accident","Sports Injury","Posture Issues","Other"].map((item) => (
                    <label key={item} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input type="checkbox" name="complaint" value={item} className="accent-yellow-green" />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">How long have you had this condition?</label>
                <select name="conditionDuration" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent">
                  <option value="">Select</option>
                  <option>Less than 1 week</option>
                  <option>1–4 weeks</option>
                  <option>1–3 months</option>
                  <option>3–6 months</option>
                  <option>6–12 months</option>
                  <option>Over 1 year</option>
                  <option>Chronic / ongoing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Pain Level (0 = none, 10 = severe)</label>
                <select name="painLevel" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent">
                  <option value="">Select</option>
                  {[0,1,2,3,4,5,6,7,8,9,10].map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Have you had chiropractic care before?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="radio" name="priorChiro" value="yes" className="accent-yellow-green" /> Yes
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="radio" name="priorChiro" value="no" className="accent-yellow-green" /> No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Additional notes or questions for Dr. Hornaman</label>
                <textarea name="notes" rows={4} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent resize-none" placeholder="Tell us anything else we should know before your visit..." />
              </div>
            </div>
          </section>

          {/* How did you hear about us */}
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-navy mb-5 pb-3 border-b border-gray-100">One More Thing</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">How did you hear about us?</label>
              <select name="referralSource" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent">
                <option value="">Select</option>
                <option>Google Search</option>
                <option>Friend or Family Referral</option>
                <option>Doctor Referral</option>
                <option>Facebook</option>
                <option>Instagram</option>
                <option>Drive By / Signage</option>
                <option>Other</option>
              </select>
            </div>
          </section>

          {/* 8 — HIPAA Consent */}
          <section className="bg-navy/5 rounded-xl border border-navy/10 p-6">
            <h2 className="text-base font-bold text-navy mb-3">HIPAA Consent &amp; Authorization</h2>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              By submitting this form, I authorize Hornaman Chiropractic Center to use and disclose my protected health information for treatment, payment, and healthcare operations as described in the{" "}
              <Link href="/hipaa-policy" className="text-yellow-green hover:underline">HIPAA Notice of Privacy Practices</Link>.
              I understand I have the right to revoke this authorization in writing at any time.
            </p>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="hipaaConsent" required className="accent-yellow-green mt-0.5" />
              <span className="text-sm text-gray-700 font-medium">
                I have read and agree to the HIPAA Privacy Practices and authorize Hornaman Chiropractic Center to use my information for treatment purposes. <span className="text-red-500">*</span>
              </span>
            </label>
          </section>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-navy text-white font-bold py-4 rounded-xl text-base hover:bg-navy/90 transition-colors disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit & Choose Appointment Time →"}
          </button>

          <p className="text-center text-xs text-gray-400">
            After submitting, you&apos;ll be taken to our calendar to choose your appointment time.
            Questions? Call us at{" "}
            <a href="tel:+18144387242" className="text-yellow-green hover:underline">(814) 438-7242</a>
          </p>
        </form>
      </div>
    </main>
  );
}