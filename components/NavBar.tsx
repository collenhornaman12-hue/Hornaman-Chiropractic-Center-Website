"use client";

import { useState } from "react";
import CalButton from "@/components/CalButton";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-yellow-green text-2xl select-none">⚕</span>
            <div className="min-w-0">
              <p className="text-white font-bold text-sm sm:text-base leading-tight truncate">
                Hornaman Chiropractic Center
              </p>
              <p className="text-white/60 text-xs leading-tight hidden sm:block">
                Union City, Pennsylvania
              </p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-white/80 hover:text-yellow-green text-sm font-medium transition-colors">
              Services
            </a>
            <a href="#conditions" className="text-white/80 hover:text-yellow-green text-sm font-medium transition-colors">
              Conditions
            </a>
            <a href="#about" className="text-white/80 hover:text-yellow-green text-sm font-medium transition-colors">
              About
            </a>
            <a href="#contact" className="text-white/80 hover:text-yellow-green text-sm font-medium transition-colors">
              Contact
            </a>
            <a
              href="tel:+18144387242"
              className="text-yellow-green font-semibold text-sm hover:text-yellow-green-light transition-colors"
            >
              (814) 438-7242
            </a>
            <CalButton className="bg-yellow-green hover:bg-yellow-green-dark text-white font-bold text-sm px-4 py-2 rounded transition-colors whitespace-nowrap cursor-pointer">
              Book Now
            </CalButton>
          </nav>

          {/* Mobile: phone + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href="tel:+18144387242"
              className="text-yellow-green font-semibold text-sm"
            >
              (814) 438-7242
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-1"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden border-t border-white/20 py-3 flex flex-col gap-1">
            {["#services", "#conditions", "#about", "#contact"].map((href) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-white/80 hover:text-yellow-green text-sm font-medium py-2 px-1 transition-colors capitalize"
              >
                {href.replace("#", "")}
              </a>
            ))}
            <CalButton
              className="mt-2 bg-yellow-green hover:bg-yellow-green-dark text-white font-bold text-sm px-4 py-2 rounded text-center transition-colors cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              Book Now
            </CalButton>
          </nav>
        )}
      </div>
    </header>
  );
}
