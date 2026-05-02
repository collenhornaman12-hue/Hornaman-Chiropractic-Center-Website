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
  { value: "pending", label: "Pending", color: "bg-yellow-400 text-yellow-900" },
  { value: "called", label: "Called", color: "bg-blue-400 text-blue-900" },
  { value: "scheduled", label: "Scheduled", color: "bg-green-500 text-white" },
  { value: "no_answer", label: "No Answer", color: "bg-gray-400 text-gray-900" },
];

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function IntakeCard({ intake, pw }: { intake: Intake; pw: string }) {
  const [status, setStatus] = useState(intake.status || "pending");
  const [saving, setSaving] = useState(false);

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

  const current = STATUS_OPTIONS.find((s) => s.value === status) ?? STATUS_OPTIONS[0];

  return (
    <div
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3"
      style={{ fontFamily: "'Oswald', sans-serif" }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[#203078] text-lg font-bold uppercase tracking-wide">
            {intake.name || "—"}
          </span>
          <span
            className={`ml-2 inline-block text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
              intake.type === "new"
                ? "bg-[#c8d828]/20 text-[#4a5c00]"
                : "bg-[#203078]/10 text-[#203078]"
            }`}
          >
            {intake.type}
          </span>
        </div>
        <span className="text-gray-400 text-xs whitespace-nowrap">
          {relativeTime(intake.submitted_at)}
        </span>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-600">
        {intake.phone && (
          <a href={`tel:${intake.phone}`} className="hover:text-[#203078] font-medium">
            📞 {intake.phone}
          </a>
        )}
        {intake.email && (
          <span className="truncate">✉ {intake.email}</span>
        )}
        {intake.dob && <span>DOB: {intake.dob}</span>}
        {intake.insurance && <span>Ins: {intake.insurance}</span>}
        {intake.chief_complaint && (
          <span className="sm:col-span-2 text-gray-500 italic">
            &ldquo;{intake.chief_complaint}&rdquo;
          </span>
        )}
      </div>

      {/* Status buttons */}
      <div className="flex flex-wrap gap-2 pt-1">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => updateStatus(opt.value)}
            disabled={saving}
            className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider transition-opacity border-2 ${
              status === opt.value
                ? `${opt.color} border-transparent opacity-100`
                : "bg-white text-gray-400 border-gray-200 hover:border-gray-400 opacity-70"
            } disabled:opacity-40`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard({
  intakes,
  pw,
}: {
  intakes: Intake[];
  pw: string;
}) {
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all" ? intakes : intakes.filter((i) => i.status === filter || (filter === "new_type" ? i.type === "new" : i.type === "existing"));

  const counts = {
    all: intakes.length,
    pending: intakes.filter((i) => (i.status || "pending") === "pending").length,
    new_type: intakes.filter((i) => i.type === "new").length,
  };

  return (
    <main
      className="min-h-screen bg-gray-50 px-4 py-8"
      style={{ fontFamily: "'Oswald', sans-serif" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-[#c8d828] text-xs font-bold uppercase tracking-widest mb-0.5">
              Staff Portal
            </p>
            <h1 className="text-[#203078] text-2xl font-bold uppercase tracking-wide">
              Patient Intake Queue
            </h1>
          </div>
          <div className="text-right text-sm text-gray-400">
            <div>{counts.all} total</div>
            <div className="text-orange-500 font-bold">{counts.pending} pending</div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { key: "all", label: "All" },
            { key: "pending", label: "Pending" },
            { key: "called", label: "Called" },
            { key: "scheduled", label: "Scheduled" },
            { key: "no_answer", label: "No Answer" },
            { key: "new_type", label: "New Patients" },
            { key: "existing_type", label: "Existing Patients" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border-2 transition-colors ${
                filter === tab.key
                  ? "bg-[#203078] text-white border-[#203078]"
                  : "bg-white text-gray-500 border-gray-200 hover:border-[#203078]/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-400 py-20 text-sm uppercase tracking-widest">
            No submissions yet
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((intake) => (
              <IntakeCard key={intake.id} intake={intake} pw={pw} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
