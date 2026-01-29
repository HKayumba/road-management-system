/**
 * Admin Dashboard Page
 * 
 * Main dashboard for Admin users. Displays:
 * - Overview statistics (Total Issues, Reported, In Progress, Completed)
 * - Recent issues list with thumbnails, status, severity, and assigned workers
 * - Quick access to full issues management page
 * 
 * Features:
 * - Role-based access control (Admin only)
 * - Real-time statistics from database
 * - Issue images with full-size view links
 * - Worker assignment information
 * 
 * Route: /dashboard/admin
 * Access: Admin role required
 */
import { redirect } from "next/navigation";
import { getSession } from "@/app/auth/actions/actions";
import { getDashboardStats, getIssues } from "@/app/issues/actions";
import { getAllFieldWorkers } from "@/app/users/actions";
import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function AdminDashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  if (session.role !== "Admin") {
    redirect("/dashboard/fieldworker");
  }

  const statsResult = await getDashboardStats();
  const issuesResult = await getIssues();

  const stats = statsResult.success ? statsResult.stats : {
    totalIssues: 0,
    reported: 0,
    inProgress: 0,
    completed: 0,
  };

  const issues = issuesResult.success ? issuesResult.issues : [];
  const workersResult = await getAllFieldWorkers();
  const workers = workersResult.success ? workersResult.workers : [];
  const workerMap = new Map(workers.map((w) => [w.id, w.name]));

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
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session.name}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalIssues}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reported</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reported}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Issues */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Issues</CardTitle>
            <Link href="/dashboard/admin/issues">
              <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                View All
              </Badge>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {issues.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No issues reported yet
            </div>
          ) : (
            <div className="space-y-4">
              {issues.slice(0, 5).map((issue) => (
                <div
                  key={issue.id}
                  className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {issue.photoUrl && (
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border shrink-0">
                        <Image
                          src={issue.photoUrl}
                          alt={`Issue photo for ${issue.roadName}`}
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold">{issue.roadName}</h3>
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
                        <MapPin className="h-3 w-3" />
                        <span>{issue.locationDetails}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Type:</span> <span className="capitalize">{issue.issueType}</span> • <span className="font-medium">Reported:</span>{" "}
                        {issue.reportedAt
                          ? new Date(issue.reportedAt).toLocaleString()
                          : "—"}
                      </div>
                      {issue.assignedTo && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span>
                            <span className="font-medium">Assigned to:</span> {workerMap.get(issue.assignedTo) || `Worker ID: ${issue.assignedTo}`}
                          </span>
                        </div>
                      )}
                      {issue.photoUrl && (
                        <a
                          href={issue.photoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                        >
                          <ImageIcon className="h-3 w-3" />
                          View full image
                        </a>
                      )}
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
