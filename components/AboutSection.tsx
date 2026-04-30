import CalButton from "@/components/CalButton";

const highlights = [
  "Over 30 years serving Union City and Erie County",
  "Personalized, one-on-one treatment plans",
  "State-of-the-art chiropractic techniques",
  "Safe, effective care for all ages",
  "Accepting new patients",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Photo placeholder */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden bg-navy-dark aspect-[4/5] max-w-sm mx-auto lg:mx-0 flex items-center justify-center">
              <div className="text-center text-white/40 px-8">
                <div className="text-6xl mb-4">👨‍⚕️</div>
                <p className="text-sm font-medium uppercase tracking-widest">
                  Photo coming soon
                </p>
                <p className="text-xs mt-1 opacity-60">
                  Dr. Thomas J. Hornaman, D.C.
                </p>
              </div>
              {/* Decorative accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-green" />
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <p className="text-yellow-green font-semibold text-sm uppercase tracking-widest mb-2">
              About Our Practice
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-6">
              Meet Dr. Thomas J. Hornaman
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Dr. Thomas J. Hornaman has dedicated his career to helping patients
              in Union City and the surrounding Erie County area achieve lasting
              relief through natural, non-invasive chiropractic care.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              With over 30 years of experience, Dr. Hornaman combines thorough
              evaluation with individualized treatment plans — ensuring every
              patient receives the focused attention they deserve. Whether
              you&apos;re managing chronic pain, recovering from an injury, or
              simply investing in your long-term wellness, we&apos;re here to help
              you feel better, move better, and live better.
            </p>

            <ul className="space-y-2 mb-8">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-gray-700 text-sm">
                  <span className="text-yellow-green font-bold mt-0.5">✓</span>
                  {h}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <CalButton className="bg-navy hover:bg-navy-darker text-white font-bold px-6 py-3 rounded text-center transition-colors cursor-pointer">
                Book an Appointment
              </CalButton>
              <a
                href="#contact"
                className="border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold px-6 py-3 rounded text-center transition-colors"
              >
                Our Location
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
