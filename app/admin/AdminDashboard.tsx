"use client";

import { useState } from "react";

type Intake = {
  id: string;
  type: "new" | "existing";
  name: string;
  phone: string;
  email: string;
  dob: string;
  insurance: string;
  chief_complaint: string;
  status: string;
  submitted_at: string;
};

const STATUS_OPTIONS = [
  {
    value: "pending",
    label: "Pending",
    cardBg: "bg-white border-gray-200",
    badge: "bg-yellow-100 text-yellow-800",
    btn: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
  {
    value: "called",
    label: "Called",
    cardBg: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-800",
    btn: "bg-blue-100 text-blue-800 border-blue-300",
  },
  {
    value: "scheduled",
    label: "Scheduled",
    cardBg: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-800",
    btn: "bg-green-100 text-green-800 border-green-300",
  },
  {
    value: "no_answer",
    label: "No Answer",
    cardBg: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-800",
    btn: "bg-red-100 text-red-800 border-red-300",
  },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/New_York",
  });
}

function IntakeCard({ intake }: { intake: Intake }) {
  const [status, setStatus] = useState(intake.status || "pending");
  const [saving, setSaving] = useState(false);

  const current = STATUS_OPTIONS.find((s) => s.value === status) ?? STATUS_OPTIONS[0];

  async function updateStatus(newStatus: string) {
    setSaving(true);
    await fetch("/api/admin/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: intake.id, status: newStatus }),
    });
    setStatus(newStatus);
    setSaving(false);
  }

  return (
    <div
      className={`rounded-xl border-2 p-5 transition-colors ${current.cardBg}`}
      style={{ fontFamily: "'Oswald', sans-serif" }}
    >
      {/* Top row: badges + timestamp */}
      <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
              intake.type === "new"
                ? "bg-[#c8d828]/25 text-[#3a4800]"
                : "bg-[#203078]/10 text-[#203078]"
            }`}
          >
            {intake.type === "new" ? "New Patient" : "Existing Patient"}
          </span>
          <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${current.badge}`}>
            {current.label}
          </span>
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
          {formatDate(intake.submitted_at)}
        </span>
      </div>

      {/* Name */}
      <p className="text-[#203078] text-xl font-bold uppercase tracking-wide leading-tight mb-3">
        {intake.name || "—"}
      </p>

      {/* Details grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-600 mb-4">
        {intake.phone && (
          <a
            href={`tel:${intake.phone}`}
            className="font-semibold text-[#203078] hover:text-[#c8d828] transition-colors"
          >
            📞 {intake.phone}
          </a>
        )}
        {intake.email && <span className="truncate">✉ {intake.email}</span>}
        {intake.dob && <span>DOB: {intake.dob}</span>}
        {intake.insurance && <span>Ins: {intake.insurance}</span>}
        {intake.chief_complaint && (
          <span className="sm:col-span-2 text-gray-500 italic">
            &ldquo;{intake.chief_complaint}&rdquo;
          </span>
        )}
      </div>

      {/* Status buttons */}
      <div className="flex flex-wrap gap-2">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => updateStatus(opt.value)}
            disabled={saving}
            className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border-2 transition-all disabled:opacity-40 ${
              status === opt.value
                ? `${opt.btn} opacity-100`
                : "bg-white text-gray-400 border-gray-200 hover:border-[#203078]/40 hover:text-[#203078]"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const FILTERS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "called", label: "Called" },
  { key: "scheduled", label: "Scheduled" },
  { key: "no_answer", label: "No Answer" },
  { key: "new", label: "New Patients" },
  { key: "existing", label: "Existing" },
];

export default function AdminDashboard({ intakes }: { intakes: Intake[] }) {
  const [filter, setFilter] = useState("all");

  const filtered = intakes.filter((i) => {
    if (filter === "all") return true;
    if (filter === "new" || filter === "existing") return i.type === filter;
    return (i.status || "pending") === filter;
  });

  const pendingCount = intakes.filter(
    (i) => (i.status || "pending") === "pending"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100" style={{ fontFamily: "'Oswald', sans-serif" }}>
      {/* Header */}
      <div className="bg-[#203078] px-4 py-5 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-end justify-between">
          <div>
            <p className="text-[#c8d828] text-xs font-bold uppercase tracking-widest mb-0.5">
              Staff Portal
            </p>
            <h1 className="text-white text-2xl font-bold uppercase tracking-wide">
              Hornaman Chiropractic
            </h1>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-xs">{intakes.length} total</p>
            {pendingCount > 0 && (
              <p className="text-[#c8d828] font-bold text-sm">{pendingCount} pending</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border-2 transition-colors ${
                filter === f.key
                  ? "bg-[#203078] text-white border-[#203078]"
                  : "bg-white text-gray-500 border-gray-200 hover:border-[#203078]/50"
              }`}
            >
              {f.label}
              {f.key === "pending" && pendingCount > 0 && (
                <span className="ml-1.5 bg-[#c8d828] text-[#203078] rounded-full px-1.5 text-xs">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Cards */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-400 py-24 text-sm uppercase tracking-widest">
            No intake submissions yet.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((intake) => (
              <IntakeCard key={intake.id} intake={intake} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
