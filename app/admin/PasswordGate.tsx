"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PasswordGate() {
  const [pw, setPw] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/admin?pw=${encodeURIComponent(pw)}`);
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-[#203078] px-4"
      style={{ fontFamily: "'Oswald', sans-serif" }}
    >
      <div className="w-full max-w-sm">
        <h1 className="text-white text-2xl font-bold uppercase tracking-widest text-center mb-1">
          Staff Portal
        </h1>
        <div className="w-12 h-0.5 bg-[#c8d828] mx-auto mb-8" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 rounded focus:outline-none focus:border-[#c8d828] text-sm tracking-wide"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-[#c8d828] text-[#203078] font-bold py-3 rounded uppercase tracking-widest text-sm hover:opacity-90 transition-opacity"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  );
}
