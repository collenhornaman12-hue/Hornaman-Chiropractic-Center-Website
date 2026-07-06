import { Bone, ArrowLeftRight, Truck, Trophy, Car, PersonStanding } from "lucide-react";

const services = [
  {
    icon: Bone,
    title: "Chiropractic Adjustments",
    description:
      "Precise spinal manipulation to restore proper alignment, relieve nerve pressure, and eliminate pain at its source.",
  },
  {
    icon: ArrowLeftRight,
    title: "Spinal Decompression",
    description:
      "Non-surgical traction therapy to gently stretch the spine and relieve pressure on compressed discs and nerves.",
  },
  {
    icon: Truck,
    title: "DOT Physicals",
    description:
      "Certified Department of Transportation (DOT) physical examinations to keep your commercial driver's license compliant and safely on the road.",
  },
  {
    icon: Trophy,
    title: "Sports Injury Treatment",
    description:
      "Specialized rehabilitation for athletes — from weekend warriors to professionals — to recover fast and prevent re-injury.",
  },
  {
    icon: Car,
    title: "Auto Accident Recovery",
    description:
      "Targeted care for whiplash and soft-tissue injuries following motor vehicle accidents, with documentation support.",
  },
  {
    icon: PersonStanding,
    title: "Posture Correction",
    description:
      "Corrective exercises and adjustments to address forward head posture, rounded shoulders, and chronic postural strain.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-yellow-green font-semibold text-sm uppercase tracking-widest mb-2">
            What We Offer
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">
            Our Services
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-navy/5 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-yellow-green" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
