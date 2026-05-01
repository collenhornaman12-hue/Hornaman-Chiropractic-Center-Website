"use client";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import CalButton from "@/components/CalButton";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Conditions", href: "#conditions" },
  { label: "Insurance", href: "/insurance" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const newPatientLinks = [
  { label: "Book Appointment", href: "/book" },
  { label: "New Patient Intake", href: "/new-patient" },
  { label: "Accepted Insurance", href: "/insurance" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-md">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <a href="/" className="flex flex-col leading-none">
          <span className="text-white font-bold text-base tracking-tight">
            Hornaman Chiropractic Center
          </span>
          <span className="text-yellow-green text-[10px] font-semibold uppercase tracking-widest">
            Union City, Pennsylvania
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* New Patients dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className="flex items-center gap-1 text-white/80 hover:text-white text-sm font-medium transition-colors"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              New Patients
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                {/* Arrow */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
                {newPatientLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2.5 text-sm font-medium text-navy hover:bg-yellow-green/10 hover:text-yellow-green-dark transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="tel:+18144387242"
            className="text-yellow-green text-sm font-semibold hover:text-white transition-colors"
          >
            (814) 438-7242
          </a>
          <CalButton className="bg-yellow-green text-navy font-bold px-4 py-2 rounded text-sm hover:opacity-90 transition-opacity cursor-pointer">
            Book Now
          </CalButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy border-t border-white/10 px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-white/80 hover:text-white text-sm font-medium border-b border-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* New Patients section in mobile */}
          <div className="border-b border-white/5">
            <p className="pt-3 pb-1 text-yellow-green text-xs font-semibold uppercase tracking-widest">
              New Patients
            </p>
            {newPatientLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 pl-3 text-white/70 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="tel:+18144387242"
            className="block py-3 text-yellow-green text-sm font-semibold border-b border-white/5"
          >
            (814) 438-7242
          </a>
          <CalButton className="mt-3 w-full bg-yellow-green text-navy font-bold px-4 py-2.5 rounded text-sm text-center hover:opacity-90 transition-opacity cursor-pointer block">
            Book Now
          </CalButton>
        </div>
      )}
    </header>
  );
}
