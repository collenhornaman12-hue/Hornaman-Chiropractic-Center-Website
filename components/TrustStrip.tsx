const stats = [
  { value: "30+", label: "Years in Practice" },
  { value: "1,000+", label: "Patients Helped" },
  { value: "5-Star", label: "Google Rated" },
  { value: "Same-Week", label: "Appointments Available" },
];

export default function TrustStrip() {
  return (
    <div className="bg-navy-dark py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-3xl sm:text-4xl font-bold text-yellow-green leading-none">
                {value}
              </span>
              <span className="text-white/80 text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
