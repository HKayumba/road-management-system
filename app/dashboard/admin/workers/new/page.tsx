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

