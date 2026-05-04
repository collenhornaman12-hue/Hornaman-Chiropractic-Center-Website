import Link from "next/link";
import CalButton from "@/components/CalButton";

export const metadata = {
  title: "Accepted Insurance | Hornaman Chiropractic Center",
  description: "Hornaman Chiropractic Center accepts Blue Cross Blue Shield, Highmark, Medicare, UPMC, Aetna, Cigna, and more in Union City, PA.",
  alternates: { canonical: "https://hornamanchiropracticcenter.com/insurance" },
  openGraph: {
    title: "Accepted Insurance | Hornaman Chiropractic Center",
    description: "We accept most major insurance plans including BCBS, Highmark, Medicare, UPMC, and more. Workers' comp and auto injury cases welcome.",
    url: "https://hornamanchiropracticcenter.com/insurance",
  },
};

const insurers = [
  { name: "Blue Cross Blue Shield", note: "Most BCBS plans accepted" },
  { name: "Highmark", note: "Including Highmark Blue Shield" },
  { name: "Medicare", note: "Medicare Part B accepted" },
  { name: "United Healthcare", note: "Most UHC plans accepted" },
  { name: "Aetna", note: "Most Aetna plans accepted" },
  { name: "Cigna", note: "Most Cigna plans accepted" },
  { name: "Geisinger", note: "Geisinger Health Plan" },
  { name: "UPMC", note: "Most UPMC plans accepted" },
  { name: "Workers' Compensation", note: "All carriers accepted" },
  { name: "Auto / Personal Injury", note: "Auto accident cases accepted" },
  { name: "VA / Veterans Benefits", note: "VA authorized provider" },
  { name: "Self-Pay", note: "Affordable per-visit rates available" },
];

export default function InsurancePage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-yellow-green font-semibold hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>

        <div className="mb-10">
          <p className="text-yellow-green font-semibold text-sm uppercase tracking-widest mb-2">Coverage</p>
          <h1 className="text-3xl font-bold text-navy mb-3">Accepted Insurance</h1>
          <p className="text-gray-600 leading-relaxed">
            Hornaman Chiropractic Center accepts most major insurance plans. We work with your insurance provider
            to maximize your benefits and minimize out-of-pocket costs. Not sure if we accept your plan?
            Call us and we&apos;ll verify your coverage before your visit.
          </p>
        </div>

        {/* Insurance grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {insurers.map((ins) => (
            <div key={ins.name} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="w-8 h-8 bg-yellow-green/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-navy text-sm">{ins.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">{ins.note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Not listed */}
        <div className="bg-navy/5 border border-navy/10 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold text-navy mb-2">Don&apos;t see your insurance?</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            We work with many additional plans not listed here. Call our office and we&apos;ll verify your
            benefits and confirm whether we&apos;re in-network with your specific plan — at no cost to you.
          </p>
          <a
            href="tel:+18144387242"
            className="inline-flex items-center gap-2 bg-navy text-white font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-navy/90 transition-colors"
          >
            Call (814) 438-7242 to Verify Coverage
          </a>
        </div>

        {/* Payment options */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-navy mb-4">Payment Options</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Health Insurance", desc: "We bill your insurance directly. Copays and deductibles apply per your plan." },
              { title: "Medicare", desc: "We accept Medicare Part B for covered chiropractic services." },
              { title: "Self-Pay", desc: "Affordable per-visit rates available for patients without insurance coverage." },
              { title: "HSA / FSA Cards", desc: "Health Savings Account and Flexible Spending Account cards accepted." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <p className="font-bold text-navy text-sm mb-1">{item.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-navy rounded-2xl p-8 text-center">
          <p className="text-yellow-green font-semibold text-sm uppercase tracking-widest mb-2">Ready to get started?</p>
          <h2 className="text-2xl font-bold text-white mb-3">Book Your First Appointment</h2>
          <p className="text-white/60 text-sm mb-6">New patients welcome. Same-week appointments available.</p>
          <Link
            href="/book"
            className="inline-block bg-yellow-green text-navy font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Schedule Now
          </Link>
        </div>
      </div>
    </main>
  );
}
