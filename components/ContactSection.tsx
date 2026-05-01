import { MapPin, Phone, Calendar } from "lucide-react";
import CalButton from "@/components/CalButton";

const hours = [
  { day: "Monday", time: "8:30 AM – 4:00 PM" },
  { day: "Tuesday", time: "9:30 AM – 6:00 PM" },
  { day: "Wednesday", time: "Closed" },
  { day: "Thursday", time: "9:30 AM – 6:00 PM" },
  { day: "Friday", time: "8:30 AM – 4:00 PM" },
  { day: "Saturday", time: "Closed" },
  { day: "Sunday", time: "Closed" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-yellow-green font-semibold text-sm uppercase tracking-widest mb-2">
            Find Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">
            Contact &amp; Location
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-navy mb-6">Get in Touch</h3>
            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-yellow-green" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                    Address
                  </p>
                  <p className="text-gray-700 font-medium">
                    107 N. Main St.
                    <br />
                    Union City, PA 16438
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-yellow-green" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+18144387242"
                    className="text-gray-700 font-medium hover:text-navy transition-colors"
                  >
                    (814) 438-7242
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Calendar className="w-5 h-5 text-yellow-green" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                    Online Booking
                  </p>
                  <CalButton className="text-navy font-semibold hover:text-yellow-green transition-colors cursor-pointer">
                    Book an Appointment →
                  </CalButton>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-xl overflow-hidden border border-gray-200 h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2980.123!2d-79.838!3d41.898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s107+N+Main+St%2C+Union+City%2C+PA+16438!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl font-bold text-navy mb-6">Office Hours</h3>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full">
                <tbody>
                  {hours.map((row, i) => (
                    <tr
                      key={row.day}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-3 text-sm font-semibold text-navy">
                        {row.day}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-600 text-right">
                        {row.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
