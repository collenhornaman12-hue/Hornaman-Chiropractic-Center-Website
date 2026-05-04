import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Patient Intake Form | Hornaman Chiropractic Center",
  description: "Complete your new patient intake form for Hornaman Chiropractic Center in Union City, PA. Dr. Thomas J. Hornaman — accepting new patients.",
  alternates: { canonical: "https://hornamanchiropracticcenter.com/new-patient" },
  openGraph: {
    title: "New Patient Intake Form | Hornaman Chiropractic Center",
    description: "Complete your new patient intake form before your first visit with Dr. Thomas Hornaman in Union City, PA.",
    url: "https://hornamanchiropracticcenter.com/new-patient",
  },
};

export default function NewPatientLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
