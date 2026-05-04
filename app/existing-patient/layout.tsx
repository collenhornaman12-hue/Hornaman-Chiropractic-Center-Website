import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Existing Patient Details | Hornaman Chiropractic Center",
  description: "Update your patient details before your next visit at Hornaman Chiropractic Center in Union City, PA.",
  alternates: { canonical: "https://hornamanchiropracticcenter.com/existing-patient" },
  openGraph: {
    title: "Existing Patient Details | Hornaman Chiropractic Center",
    description: "Submit your updated patient details before your next visit with Dr. Thomas Hornaman in Union City, PA.",
    url: "https://hornamanchiropracticcenter.com/existing-patient",
  },
};

export default function ExistingPatientLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
