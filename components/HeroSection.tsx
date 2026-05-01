import CalButton from "@/components/CalButton";

export default function HeroSection() {
  return (
    <section id="home" className="bg-[#203078]">
      <div className="w-full">
        <img
          src="/images/hero_billboard.jpg"
          alt="Got Pain? Think Chiropractic. — Dr. Thomas J. Hornaman"
          className="w-full h-auto block"
        />
      </div>
      <div className="py-10 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5">
            <CalButton className="bg-[#c8d828] text-[#203078] font-bold px-8 py-4 rounded text-lg hover:opacity-90 transition-opacity cursor-pointer font-heading uppercase tracking-wide">
              Book Your Appointment
            </CalButton>
            <a
              href="tel:+18144387242"
              className="border-2 border-white text-white hover:bg-white hover:text-[#203078] font-bold px-8 py-4 rounded text-lg transition-colors font-heading uppercase tracking-wide"
            >
              Call (814) 438-7242
            </a>
          </div>
          <div className="inline-flex items-center gap-2 border border-[#c8d828]/40 rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-[#c8d828] animate-pulse" />
            <span className="text-white/80 text-sm">
              Same-week appointments available — call or book online before we fill up.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
