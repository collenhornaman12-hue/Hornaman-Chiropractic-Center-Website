import CalButton from "@/components/CalButton";
import Image from "next/image";

const highlights = [
  "Over 30 years serving Union City and Erie County",
  "Personalized, one-on-one treatment plans",
  "State-of-the-art chiropractic techniques",
  "Safe, effective care for all ages",
  "Accepting new patients",
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#203078] py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Billboard image */}
          <div className="order-2 lg:order-1">
            <Image
              src="/images/about_billboard.jpg"
              alt="Dr. Thomas J. Hornaman — Hornaman Chiropractic Center"
              width={1200}
              height={624}
              className="w-full h-auto rounded-xl shadow-2xl"
              priority
            />
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <p className="text-[#c8d828] font-semibold text-sm uppercase tracking-widest mb-2">
              About Our Practice
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Meet Dr. Thomas J. Hornaman
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Dr. Thomas J. Hornaman has dedicated his career to helping patients
              in Union City and the surrounding Erie County area achieve lasting
              relief through natural, non-invasive chiropractic care.
            </p>
            <p className="text-white/80 leading-relaxed mb-6">
              With over 30 years of experience, Dr. Hornaman combines thorough
              evaluation with individualized treatment plans — ensuring every
              patient receives the focused attention they deserve. Whether
              you&apos;re managing chronic pain, recovering from an injury, or
              simply investing in your long-term wellness, we&apos;re here to help
              you feel better, move better, and live better.
            </p>

            <ul className="space-y-2 mb-8">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-white/90 text-sm">
                  <span className="text-[#c8d828] font-bold mt-0.5">✓</span>
                  {h}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <CalButton className="bg-[#c8d828] text-[#203078] font-bold px-6 py-3 rounded text-center hover:opacity-90 transition-opacity cursor-pointer">
                Book an Appointment
              </CalButton>
              <a
                href="#contact"
                className="border-2 border-white text-white hover:bg-white hover:text-[#203078] font-semibold px-6 py-3 rounded text-center transition-colors"
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
