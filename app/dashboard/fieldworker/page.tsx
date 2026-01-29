/**
 * Field Worker Dashboard Page
 * 
 * Main dashboard for Field Worker users. Displays:
 * - Personal statistics (My Issues, Reported, In Progress, Completed)
 * - Form to report new issues (automatically assigned to current user)
 * - List of issues assigned to the logged-in field worker
 * - Ability to update status of assigned issues
 * 
 * Features:
 * - Role-based access control (Field Worker only)
 * - Only shows issues assigned to the current user
 * - Can update status of assigned issues (Reported -> In Progress -> Completed)
 * - Can report new issues directly from dashboard
 * 
 * Route: /dashboard/fieldworker
 * Access: Field Worker role required
 */
import { redirect } from "next/navigation";
import { getSession } from "@/app/auth/actions/actions";
import { getIssuesByAssignee, getDashboardStats } from "@/app/issues/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  Plus,
} from "lucide-react";
import FieldWorkerForm from "@/components/Forms/FieldWorkerForm";
import { IssueStatusForm } from "@/components/Issues/IssueStatusForm";

export default async function FieldWorkerDashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  if (session.role === "Admin") {
    redirect("/dashboard/admin");
  }

  const issuesResult = await getIssuesByAssignee(session.id);
  const statsResult = await getDashboardStats();

  const issues = issuesResult.success ? issuesResult.issues : [];
  const stats = statsResult.success ? statsResult.stats : {
    totalIssues: 0,
    reported: 0,
    inProgress: 0,
    completed: 0,
  };

  const myStats = {
    total: issues.length,
    reported: issues.filter((i) => i.status === "Reported").length,
    inProgress: issues.filter((i) => i.status === "In Progress").length,
    completed: issues.filter((i) => i.status === "Completed").length,
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "destructive";
      case "Medium":
        return "default";
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Field Worker Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {session.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Issues</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myStats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reported</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myStats.reported}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myStats.inProgress}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myStats.completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Report New Issue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Report New Issue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FieldWorkerForm />
        </CardContent>
      </Card>

      {/* My Assigned Issues */}
      <Card>
        <CardHeader>
          <CardTitle>My Assigned Issues</CardTitle>
        </CardHeader>
        <CardContent>
          {issues.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No issues assigned to you yet
            </div>
          ) : (
            <div className="space-y-4">
              {issues.map((issue) => (
                <div
                  key={issue.id}
                  className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-lg">{issue.roadName}</h3>
                        <Badge variant={getSeverityColor(issue.severity)}>
                          {issue.severity}
                        </Badge>
                        <span
                          className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(issue.status)}`}
                        >
                          {issue.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{issue.locationDetails}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Type: <span className="capitalize">{issue.issueType}</span> • Reported:{" "}
                        {issue.reportedAt
                          ? issue.reportedAt.toLocaleDateString()
                          : "—"}
                        {issue.latitude && issue.longitude && (
                          <> • GPS: {issue.latitude.toFixed(4)}, {issue.longitude.toFixed(4)}</>
                        )}
                      </div>
                    </div>
                    <div className="min-w-50">
                      <IssueStatusForm issueId={issue.id} currentStatus={issue.status} />
                    </div>
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
