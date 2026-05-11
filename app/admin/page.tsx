export const runtime = "edge";
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import AdminDashboard from "./AdminDashboard";
import PasswordGate from "./PasswordGate";

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
  raw_data?: Record<string, unknown>;
};

async function getIntakes(): Promise<Intake[]> {
  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/patient_intake?select=id,type,name,phone,email,dob,insurance,chief_complaint,status,submitted_at,appt_time,raw_data&order=submitted_at.desc&limit=200`,
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

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value ?? "";

  if (session !== "authenticated") {
    return <PasswordGate />;
  }

  const intakes = await getIntakes();
  return <AdminDashboard intakes={intakes} />;
}
