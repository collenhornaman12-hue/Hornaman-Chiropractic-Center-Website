"use client";

import { useState } from "react";
import Link from "next/link";
import { submitExistingPatient } from "./actions";

export default function ExistingPatientPage() {
  const [insuranceChanged, setInsuranceChanged] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/book" className="text-sm text-yellow-green font-semibold hover:underline mb-8 inline-block">
          ← Back to Booking
        </Link>

        <div className="mb-8">
          <p className="text-yellow-green font-semibold text-sm uppercase tracking-widest mb-1">Existing Patients</p>
          <h1 className="text-3xl font-bold text-navy mb-2">Patient Details</h1>
          <p className="text-gray-500 text-sm">
            Please complete your details before your visit. All information is kept strictly confidential in accordance with HIPAA.
            If you haven&apos;t been seen in over 3 years, please use the{" "}
            <Link href="/new-patient" className="text-yellow-green hover:underline font-medium">new patient intake</Link> instead.
          </p>
        </div>

        <form action={submitExistingPatient} className="space-y-8">
          {/* Personal Information */}
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
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                <input type="email" name="email" required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent" />
              </div>
            </div>
          </section>

          {/* Home Address */}
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

          {/* Emergency Contact */}
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-navy mb-5 pb-3 border-b border-gray-100">Emergency Contact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                <input type="text" name="emergencyName" required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Relationship <span className="text-red-500">*</span></label>
                <input type="text" name="emergencyRelationship" required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent" placeholder="e.g. Spouse, Parent" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" name="emergencyPhone" required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent" />
              </div>
            </div>
          </section>

          {/* Insurance */}
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-navy mb-5 pb-3 border-b border-gray-100">Insurance</h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Has your insurance changed since your last visit? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="insuranceChanged"
                    value="no"
                    defaultChecked
                    onChange={() => setInsuranceChanged(false)}
                    className="accent-yellow-green"
                  />
                  No — use insurance on file
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="insuranceChanged"
                    value="yes"
                    onChange={() => setInsuranceChanged(true)}
                    className="accent-yellow-green"
                  />
                  Yes — my insurance has changed
                </label>
              </div>
            </div>
            {insuranceChanged && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">New Insurance Provider</label>
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
              </div>
            )}
          </section>

          {/* Reason for Visit (optional) */}
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-navy mb-1 pb-3 border-b border-gray-100">Reason for Visit</h2>
            <p className="text-xs text-gray-400 mt-3 mb-4">All fields in this section are optional.</p>
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
                <label className="block text-sm font-semibold text-gray-700 mb-1">Additional notes or questions for Dr. Hornaman</label>
                <textarea name="notes" rows={4} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-green focus:border-transparent resize-none" placeholder="Tell us anything else we should know before your visit..." />
              </div>
            </div>
          </section>

          {/* HIPAA Consent */}
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
            className="w-full bg-navy text-white font-bold py-4 rounded-xl text-base hover:bg-navy/90 transition-colors"
          >
            Submit Patient Details
          </button>

          <p className="text-center text-xs text-gray-400">
            Questions? Call us at{" "}
            <a href="tel:+18144387242" className="text-yellow-green hover:underline">(814) 438-7242</a>
          </p>
        </form>
      </div>
    </main>
  );
}
