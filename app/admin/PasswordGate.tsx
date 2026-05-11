"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PasswordGate() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.refresh();
    } else {
      setError("Incorrect password.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#203078] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <p
            className="text-[#c8d828] text-xs font-bold uppercase tracking-widest mb-1"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Staff Portal
          </p>
          <h1
            className="text-[#203078] text-2xl font-bold uppercase tracking-wide"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Hornaman Chiropractic
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c8d828] focus:border-transparent"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#203078] text-white font-bold py-3 rounded-lg uppercase tracking-wide text-sm hover:bg-[#182560] transition-colors disabled:opacity-60"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {loading ? "Checking…" : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
