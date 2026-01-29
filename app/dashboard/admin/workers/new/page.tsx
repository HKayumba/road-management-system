/**
 * Add New User Page
 * 
 * Allows admins to create new user accounts (Admin or Field Worker roles).
 * Features:
 * - Create new admin or field worker accounts
 * - Form validation for email uniqueness and password requirements
 * - Password hashing via bcrypt
 * 
 * Component: AddFieldWorkerForm
 * 
 * Route: /dashboard/admin/workers/new
 * Access: Admin role required
 */
import { redirect } from "next/navigation";
import { getSession } from "@/app/auth/actions/actions";
import { AddFieldWorkerForm } from "@/components/Forms/AddFieldWorkerForm";

export default async function NewWorkerPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  if (session.role !== "Admin") {
    redirect("/dashboard/fieldworker");
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Add New User</h1>
        <p className="text-muted-foreground">
          Create a new admin or field worker account.
        </p>
      </div>

      <AddFieldWorkerForm />
    </div>
  );
}

