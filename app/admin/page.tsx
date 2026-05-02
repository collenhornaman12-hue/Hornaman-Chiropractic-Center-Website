import { headers } from "next/headers";
import AdminDashboard from "./AdminDashboard";
import PasswordGate from "./PasswordGate";

export const dynamic = "force-dynamic";

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

async function getIntakes(): Promise<Intake[]> {
  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/patient_intake?order=submitted_at.desc&limit=200`,
    {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
      },
      cache: "no-store",
    }
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ pw?: string }>;
}) {
  const params = await searchParams;
  const pw = params.pw ?? "";

  if (pw !== process.env.ADMIN_PASSWORD) {
    return <PasswordGate />;
  }

  const intakes = await getIntakes();
  return <AdminDashboard intakes={intakes} pw={pw} />;
}
