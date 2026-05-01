import Link from "next/link";

export default function BookingConfirmedPage() {
  return (
    <main className="min-h-screen bg-[#203078] flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">

      {/* Background geometric accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c8d828] opacity-5 rounded-full translate-x-48 -translate-y-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c8d828] opacity-5 rounded-full -translate-x-32 translate-y-32 pointer-events-none" />

      {/* Checkmark Icon */}
      <div className="mb-8 flex items-center justify-center w-24 h-24 rounded-full border-4 border-[#c8d828] bg-[#c8d828]/10">
        <svg
          className="w-12 h-12 text-[#c8d828]"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Heading */}
      <h1
        className="text-white text-center mb-3 uppercase tracking-widest"
        style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        You&apos;re Booked.
      </h1>

      {/* Yellow-green accent bar */}
      <div className="w-16 h-1 bg-[#c8d828] mb-6" />

      {/* Subtext */}
      <p
        className="text-white/80 text-center max-w-md mb-2"
        style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.15rem", fontWeight: 300, letterSpacing: "0.03em" }}
      >
        Your appointment with Dr. Thomas Hornaman has been confirmed.
      </p>
      <p
        className="text-white/60 text-center max-w-sm mb-10"
        style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1rem", fontWeight: 300 }}
      >
        Check your email for a calendar invite and appointment details. We look forward to seeing you.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-[#c8d828] text-[#203078] uppercase tracking-widest text-sm font-bold hover:bg-[#d4e030] transition-colors duration-200"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          Return to Home
        </Link>
        <a
          href="tel:+18144387242"
          className="inline-block px-8 py-4 border-2 border-white/40 text-white uppercase tracking-widest text-sm font-bold hover:border-white hover:bg-white/10 transition-colors duration-200"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          Call Us: (814) 438-7242
        </a>
      </div>

      {/* Office hours reminder */}
      <p
        className="mt-12 text-white/40 text-center text-xs uppercase tracking-widest"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        Mon 8:30–4 &nbsp;·&nbsp; Tue &amp; Thu 9:30–6 &nbsp;·&nbsp; Fri 8:30–4
      </p>
    </main>
  );
}
