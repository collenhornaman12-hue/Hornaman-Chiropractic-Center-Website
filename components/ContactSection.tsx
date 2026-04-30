import CalButton from "@/components/CalButton";

const hours = [
  { day: "Monday", time: "9:00 AM – 6:00 PM" },
  { day: "Tuesday", time: "9:00 AM – 6:00 PM" },
  { day: "Wednesday", time: "9:00 AM – 6:00 PM" },
  { day: "Thursday", time: "9:00 AM – 6:00 PM" },
  { day: "Friday", time: "9:00 AM – 4:00 PM" },
  { day: "Saturday", time: "By Appointment" },
  { day: "Sunday", time: "Closed" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-yellow-green font-semibold text-sm uppercase tracking-widest mb-2">
            Find Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">
            Contact &amp; Location
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Info + hours */}
          <div className="flex flex-col gap-8">
            {/* Contact details */}
            <div className="bg-navy rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-5 border-b border-white/20 pb-3">
                Get in Touch
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-green text-lg mt-0.5">📍</span>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-white/70">107 N. Main St.</p>
                    <p className="text-white/70">Union City, PA 16438</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-yellow-green text-lg">📞</span>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <a
                      href="tel:+18144387242"
                      className="text-yellow-green hover:text-yellow-green-light transition-colors"
                    >
                      (814) 438-7242
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-yellow-green text-lg">📅</span>
                  <div>
                    <p className="font-semibold">Online Booking</p>
                    <CalButton className="text-yellow-green hover:text-yellow-green-light transition-colors text-sm bg-transparent border-0 p-0 cursor-pointer">
                      Book an Appointment →
                    </CalButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="border border-gray-100 rounded-xl p-6">
              <h3 className="text-lg font-bold text-navy mb-4">Office Hours</h3>
              <table className="w-full text-sm">
                <tbody>
                  {hours.map(({ day, time }) => {
                    const isClosed = time === "Closed";
                    return (
                      <tr key={day} className="border-b border-gray-50 last:border-0">
                        <td className="py-2 font-medium text-gray-700">{day}</td>
                        <td className={`py-2 text-right ${isClosed ? "text-red-400" : "text-gray-600"}`}>
                          {time}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Google Maps embed */}
          <div className="rounded-xl overflow-hidden shadow-md border border-gray-100 min-h-[400px] lg:min-h-0">
            <iframe
              title="Hornaman Chiropractic Center location"
              src="https://maps.google.com/maps?q=107+N+Main+St,+Union+City,+PA+16438&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ minHeight: "400px", border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
