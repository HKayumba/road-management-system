import { redirect } from "next/navigation";
import { getSession } from "@/app/auth/actions/actions";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  // Redirect based on role
  if (session.role === "Admin") {
    redirect("/dashboard/admin");
  } else {
    redirect("/dashboard/fieldworker");
  }
}
