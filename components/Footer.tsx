import CalButton from "@/components/CalButton";

export default function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <span className="text-white font-bold text-lg leading-tight block">
                Hornaman Chiropractic Center
              </span>
              <span className="text-yellow-green text-xs font-semibold uppercase tracking-widest">
                Providing Care Since 1993
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Compassionate chiropractic care for the whole family in Union
              City, Pennsylvania.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Contact
            </h4>
            <address className="not-italic text-white/60 text-sm space-y-1">
              <p>107 N. Main St.</p>
              <p>Union City, PA 16438</p>
              <a
                href="tel:+18144387242"
                className="block hover:text-white transition-colors mt-2"
              >
                (814) 438-7242
              </a>
            </address>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Navigate
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#conditions" className="hover:text-white transition-colors">
                  Conditions Treated
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Dr. Hornaman
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact &amp; Location
                </a>
              </li>
              <li>
                <CalButton className="hover:text-white transition-colors cursor-pointer">
                  Book an Appointment →
                </CalButton>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Hornaman Chiropractic Center — Union City, PA. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-white/30">
            <a href="/privacy-policy" className="hover:text-white/60 transition-colors">
              Privacy Policy
            </a>
            <a href="/hipaa-policy" className="hover:text-white/60 transition-colors">
              HIPAA Policy
            </a>
            <a href="/healthcare-disclaimer" className="hover:text-white/60 transition-colors">
              Healthcare Disclaimer
            </a>
            <a href="/accessibility" className="hover:text-white/60 transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
