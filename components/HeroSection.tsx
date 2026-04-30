import CalButton from "@/components/CalButton";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-navy to-navy-dark py-24 px-4 sm:px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <p className="text-yellow-green font-semibold text-sm sm:text-base uppercase tracking-widest mb-4">
          Union City, Pennsylvania
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
          Expert Chiropractic Care<br className="hidden sm:block" /> in Union City, PA
        </h1>
        <p className="text-white/80 text-lg sm:text-xl mb-10 max-w-xl mx-auto">
          Dr. Thomas J. Hornaman &mdash; Serving the community for over 30 years
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CalButton className="bg-yellow-green hover:bg-yellow-green-dark text-white font-bold text-lg px-8 py-4 rounded transition-colors cursor-pointer">
            Book Your Appointment
          </CalButton>
          <a
            href="tel:+18144387242"
            className="border-2 border-white/40 hover:border-yellow-green text-white font-semibold text-lg px-8 py-4 rounded transition-colors"
          >
            Call (814) 438-7242
          </a>
        </div>
        <p className="mt-8 text-white/50 text-sm">
          Accepting new patients &bull; Same-week appointments available
        </p>
      </div>
    </section>
  );
}
