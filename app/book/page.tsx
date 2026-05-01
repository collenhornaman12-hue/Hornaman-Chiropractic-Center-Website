import Link from "next/link";

export const metadata = {
  title: "Book an Appointment | Hornaman Chiropractic Center",
  description: "Book a chiropractic appointment with Dr. Thomas J. Hornaman in Union City, PA.",
};

export default function BookPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-yellow-green font-semibold hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>

        <div className="text-center mb-12">
          <p className="text-yellow-green font-semibold text-sm uppercase tracking-widest mb-2">Schedule a Visit</p>
          <h1 className="text-3xl font-bold text-navy mb-3">Book an Appointment</h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Select the option that applies to you. New patients will need to complete a brief intake form before their visit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {/* New Patient */}
          <Link
            href="/new-patient"
            className="group bg-white rounded-2xl border-2 border-navy/10 hover:border-yellow-green p-8 flex flex-col items-center text-center transition-all hover:shadow-lg"
          >
            <div className="w-16 h-16 bg-navy/5 group-hover:bg-yellow-green/10 rounded-full flex items-center justify-center mb-4 transition-colors">
              <svg className="w-8 h-8 text-navy group-hover:text-yellow-green transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3M13.5 4.5L12 3m0 0L10.5 4.5M12 3v4.5m0 9a9 9 0 110-18 9 9 0 010 18z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-navy mb-2">New Patient</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              First time visiting Dr. Hornaman, or haven&apos;t been seen in over 3 years.
            </p>
            <span className="text-yellow-green font-semibold text-sm group-hover:underline">
              Complete Intake Form →
            </span>
          </Link>

          {/* Existing Patient */}
          <Link
            href="/existing-patient"
            className="group bg-white rounded-2xl border-2 border-navy/10 hover:border-yellow-green p-8 flex flex-col items-center text-center transition-all hover:shadow-lg"
          >
            <div className="w-16 h-16 bg-navy/5 group-hover:bg-yellow-green/10 rounded-full flex items-center justify-center mb-4 transition-colors">
              <svg className="w-8 h-8 text-navy group-hover:text-yellow-green transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-navy mb-2">Existing Patient</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              You&apos;ve been seen by Dr. Hornaman within the last 3 years.
            </p>
            <span className="text-yellow-green font-semibold text-sm group-hover:underline">
              Complete Details Form →
            </span>
          </Link>
        </div>

        {/* Phone option */}
        <div className="bg-navy rounded-2xl p-6 text-center">
          <p className="text-white/70 text-sm mb-1">Prefer to call?</p>
          <a href="tel:+18144387242" className="text-white font-bold text-xl hover:text-yellow-green transition-colors">
            (814) 438-7242
          </a>
          <p className="text-white/50 text-xs mt-1">Mon, Tue, Thu, Fri during office hours</p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Not sure if you&apos;re a new or existing patient?{" "}
          <a href="tel:+18144387242" className="text-yellow-green hover:underline">Give us a call</a> and we&apos;ll help you out.
        </p>
      </div>
    </main>
  );
}
