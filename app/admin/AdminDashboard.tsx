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
  appt_time?: string;
  cal_booking_uid?: string;
  raw_data?: Record<string, unknown>;
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
  {
    value: "rejected",
    label: "Rejected",
    cardBg: "bg-gray-50 border-gray-300",
    badge: "bg-gray-200 text-gray-600",
    btn: "bg-gray-200 text-gray-600 border-gray-300",
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

function str(raw: Record<string, unknown>, key: string): string {
  const v = raw[key];
  if (!v) return "";
  if (Array.isArray(v)) return v.filter(Boolean).join(", ");
  return String(v).trim();
}

function ModalSection({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  const visible = rows.filter((r) => r.value);
  if (!visible.length) return null;
  return (
    <div className="mb-5">
      <p className="text-[#c8d828] text-xs font-bold uppercase tracking-widest mb-2">
        {title}
      </p>
      <div className="space-y-1.5">
        {visible.map((r) => (
          <div key={r.label} className="flex gap-3 text-sm">
            <span className="text-gray-400 w-36 flex-shrink-0">{r.label}</span>
            <span className="text-gray-800 break-words min-w-0">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PatientFormModal({
  intake,
  onClose,
}: {
  intake: Intake;
  onClose: () => void;
}) {
  const raw = intake.raw_data ?? {};

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <p className="text-[#c8d828] text-xs font-bold uppercase tracking-widest">
              Patient Form
            </p>
            <h2 className="text-[#203078] text-lg font-bold uppercase tracking-wide leading-tight">
              {intake.name || "—"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold text-lg transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          {Object.keys(raw).length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No form data available.</p>
          ) : (
            <>
              <ModalSection
                title="Personal Information"
                rows={[
                  { label: "First Name", value: str(raw, "firstName") },
                  { label: "Last Name", value: str(raw, "lastName") },
                  { label: "Date of Birth", value: str(raw, "dob") || intake.dob },
                  { label: "Sex at Birth", value: str(raw, "sex") },
                  { label: "Phone Number", value: str(raw, "phone") || intake.phone },
                  { label: "Email Address", value: str(raw, "email") || intake.email },
                ]}
              />
              <ModalSection
                title="Home Address"
                rows={[
                  { label: "Street Address", value: str(raw, "address") },
                  { label: "City", value: str(raw, "city") },
                  { label: "State", value: str(raw, "state") },
                  { label: "ZIP Code", value: str(raw, "zip") },
                ]}
              />
              <ModalSection
                title="Emergency Contact"
                rows={[
                  { label: "Full Name", value: str(raw, "emergencyName") },
                  { label: "Relationship", value: str(raw, "emergencyRelationship") },
                  { label: "Phone Number", value: str(raw, "emergencyPhone") },
                ]}
              />
              <ModalSection
                title="Insurance"
                rows={
                  intake.insurance === "On file"
                    ? [{ label: "Status", value: "Insurance on file — no changes submitted" }]
                    : [
                        {
                          label: "Insurance Provider",
                          value:
                            str(raw, "insuranceProvider") ||
                            str(raw, "insurance") ||
                            intake.insurance ||
                            "",
                        },
                        { label: "Member ID", value: str(raw, "memberId") || str(raw, "insurancePolicyId") },
                        { label: "Group Number", value: str(raw, "groupNumber") || str(raw, "insuranceGroupNumber") },
                        { label: "Policy Holder Name", value: str(raw, "policyHolderName") || str(raw, "insuredName") },
                        { label: "Policy Holder DOB", value: str(raw, "policyHolderDob") },
                        { label: "Payment Type", value: str(raw, "paymentType") },
                      ]
                }
              />
              <ModalSection
                title="Medical History"
                rows={[
                  { label: "Conditions", value: str(raw, "medicalCondition") },
                  { label: "Medications", value: str(raw, "medications") },
                  { label: "Recent Scans", value: str(raw, "recentScans") },
                  { label: "Scan Details", value: str(raw, "scanDescription") },
                ]}
              />
              <ModalSection
                title="Reason for Visit"
                rows={[
                  { label: "Primary Complaint", value: str(raw, "complaint") },
                  { label: "Duration", value: str(raw, "conditionDuration") },
                  { label: "Pain Level", value: str(raw, "painLevel") },
                  { label: "Additional Notes", value: str(raw, "notes") },
                ]}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function IntakeCard({ intake }: { intake: Intake }) {
  const [status, setStatus] = useState(intake.status || "pending");
  const [apptTime, setApptTime] = useState<string | null>(intake.appt_time ?? null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState<"approve" | "reject" | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const current = STATUS_OPTIONS.find((s) => s.value === status) ?? STATUS_OPTIONS[0];
  const canApproveReject = status === "pending" && !!intake.cal_booking_uid;

  async function updateStatus(newStatus: string) {
    const prev = status;
    setStatus(newStatus);
    try {
      const res = await fetch("/api/admin/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: intake.id, status: newStatus }),
      });
      if (!res.ok) setStatus(prev);
    } catch {
      setStatus(prev);
    }
  }

  async function handleApprove() {
    setActionLoading("approve");
    setActionError(null);
    try {
      const res = await fetch("/api/admin/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: intake.id, cal_booking_uid: intake.cal_booking_uid }),
      });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus("scheduled");
        if (data.appt_time) setApptTime(data.appt_time);
      } else {
        const data = await res.json().catch(() => ({}));
        setActionError(`Approve failed (${res.status}): ${data.calBody || data.error || JSON.stringify(data)}`);
      }
    } catch (e) {
      setActionError(`Approve failed: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setActionLoading(null);
    }
  }

  async function handleReject() {
    if (!showRejectInput) {
      setShowRejectInput(true);
      return;
    }
    setActionLoading("reject");
    setActionError(null);
    try {
      const res = await fetch("/api/admin/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: intake.id,
          cal_booking_uid: intake.cal_booking_uid,
          reason: rejectReason || "Rejected by receptionist",
        }),
      });
      if (res.ok) {
        setStatus("rejected");
        setShowRejectInput(false);
      } else {
        const data = await res.json().catch(() => ({}));
        setActionError(`Reject failed (${res.status}): ${data.calBody || data.error || JSON.stringify(data)}`);
      }
    } catch (e) {
      setActionError(`Reject failed: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <>
      {showModal && (
        <PatientFormModal intake={intake} onClose={() => setShowModal(false)} />
      )}

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-gray-600 mb-4">
          {intake.phone && (
            <a
              href={`tel:${intake.phone}`}
              className="font-semibold text-[#203078] hover:text-[#c8d828] transition-colors"
            >
              📞 {intake.phone}
            </a>
          )}
          {intake.email && <span className="truncate">✉ {intake.email}</span>}

          <span className="sm:col-span-2">
            {apptTime ? (
              <span className="inline-block bg-[#203078] text-white text-xs font-bold px-3 py-1 rounded-lg tracking-wide">
                Appt: {apptTime}
              </span>
            ) : (
              <span className="text-xs text-gray-400 italic">Appt time pending</span>
            )}
          </span>

          {intake.insurance && <span className="truncate">Ins: {intake.insurance}</span>}
          {intake.chief_complaint && (
            <span className="sm:col-span-2 text-gray-500 italic">
              &ldquo;{intake.chief_complaint}&rdquo;
            </span>
          )}
        </div>

        {/* Approve / Reject — only when pending and cal_booking_uid is set */}
        {canApproveReject && (
          <div className="mb-3">
            {actionError && (
              <p className="text-red-600 text-xs mb-2 break-words">{actionError}</p>
            )}
            <div className="flex gap-2 mb-2">
              <button
                onClick={handleApprove}
                disabled={actionLoading !== null}
                className="px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {actionLoading === "approve" ? "Approving…" : "✓ Approve"}
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading !== null}
                className="px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {actionLoading === "reject" ? "Rejecting…" : "✕ Reject"}
              </button>
            </div>

            {showRejectInput && (
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Reason (optional)"
                  className="flex-1 border border-gray-200 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-red-400"
                  onKeyDown={(e) => e.key === "Enter" && handleReject()}
                  autoFocus
                />
                <button
                  onClick={handleReject}
                  disabled={actionLoading !== null}
                  className="px-3 py-1.5 rounded text-xs font-bold bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  Confirm
                </button>
                <button
                  onClick={() => { setShowRejectInput(false); setRejectReason(""); }}
                  className="px-3 py-1.5 rounded text-xs font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}

        {/* Status buttons + patient form button */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateStatus(opt.value)}
                className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border-2 transition-all ${
                  status === opt.value
                    ? `${opt.btn} opacity-100`
                    : "bg-white text-gray-400 border-gray-200 hover:border-[#203078]/40 hover:text-[#203078]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border-2 border-[#203078]/30 text-[#203078] bg-white hover:bg-[#203078] hover:text-white transition-colors flex-shrink-0"
          >
            Patient Form
          </button>
        </div>
      </div>
    </>
  );
}

const FILTERS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "called", label: "Called" },
  { key: "scheduled", label: "Scheduled" },
  { key: "no_answer", label: "No Answer" },
  { key: "rejected", label: "Rejected" },
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
