/**
 * Admin Field Workers Management Page
 * 
 * Displays all registered field workers and admin users.
 * Features:
 * - List all field workers with name, email, role, and join date
 * - Delete user accounts (cannot delete own account)
 * - Grid layout for easy browsing
 * 
 * Note: To add new users, navigate to /dashboard/admin/workers/new
 * 
 * Route: /dashboard/admin/workers
 * Access: Admin role required
 */
import { redirect } from "next/navigation";
import { getSession } from "@/app/auth/actions/actions";
import { getAllFieldWorkers } from "@/app/users/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Trash2 } from "lucide-react";
import { deleteUser } from "@/app/users/actions";
import { Button } from "@/components/ui/button";

export default async function AdminWorkersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  if (session.role !== "Admin") {
    redirect("/dashboard/fieldworker");
  }

  const workersResult = await getAllFieldWorkers();
  const workers = workersResult.success ? workersResult.workers : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Field Workers</h1>
        <p className="text-muted-foreground">
          View and manage all registered field worker accounts
        </p>
      </div>

      {/* Field Workers List */}
      <Card>
        <CardHeader>
          <CardTitle>All Field Workers ({workers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {workers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No field workers registered yet.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {workers.map((worker) => (
                <div
                  key={worker.id}
                  className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{worker.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {worker.email}
                        </p>
                        <Badge variant="secondary" className="mt-1">
                          {worker.role}
                        </Badge>
                      </div>
                    </div>
                    <form
                      action={async () => {
                        "use server";
                        if (worker.id !== session.id) {
                          await deleteUser(worker.id);
                        }
                      }}
                    >
                      <Button
                        type="submit"
                        variant="ghost"
                        size="sm"
                        disabled={worker.id === session.id}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Joined:{" "}
                    {worker.createdAt
                      ? worker.createdAt.toLocaleDateString()
                      : "—"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
