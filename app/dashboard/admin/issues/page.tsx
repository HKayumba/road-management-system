/**
 * Admin Issues Management Page
 * 
 * Comprehensive page for managing all road maintenance issues.
 * Features:
 * - View all issues with full details (road name, location, type, severity, status)
 * - Issue images with full-size preview
 * - GPS coordinates display
 * - Update issue status (Reported, In Progress, Completed)
 * - Assign issues to field workers
 * - View assigned worker information
 * 
 * Components:
 * - IssueStatusForm: Update issue status (Admin and assigned worker can update)
 * - IssueAssignForm: Assign issues to field workers (Admin only)
 * 
 * Route: /dashboard/admin/issues
 * Access: Admin role required
 */
import { redirect } from "next/navigation";
import { getSession } from "@/app/auth/actions/actions";
import { getIssues } from "@/app/issues/actions";
import { getAllFieldWorkers } from "@/app/users/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, User, Image as ImageIcon } from "lucide-react";
import { IssueStatusForm } from "@/components/Issues/IssueStatusForm";
import { IssueAssignForm } from "@/components/Issues/IssueAssignForm";
import Image from "next/image";

export default async function AdminIssuesPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  if (session.role !== "Admin") {
    redirect("/dashboard/fieldworker");
  }

  const issuesResult = await getIssues();
  const workersResult = await getAllFieldWorkers();

  const issues = issuesResult.success ? issuesResult.issues : [];
  const workers = workersResult.success ? workersResult.workers : [];
  // Only pass plain serializable data to client components
  const assignWorkers = workers.map((worker) => ({
    id: worker.id,
    name: worker.name,
  }));

  // Create a map for quick worker lookup
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
        <h1 className="text-3xl font-bold">All Issues</h1>
        <p className="text-muted-foreground">Manage and track all road issues</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Issues ({issues.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {issues.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No issues reported yet
            </div>
          ) : (
            <div className="space-y-4">
              {issues.map((issue) => (
                <div
                  key={issue.id}
                  className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
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
                        <span className="font-medium">Issue Type:</span> <span className="capitalize">{issue.issueType}</span>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Reported:</span>{" "}
                        {issue.reportedAt
                          ? new Date(issue.reportedAt).toLocaleString()
                          : "—"}
                      </div>
                      
                      {issue.latitude && issue.longitude && (
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">GPS Coordinates:</span> {issue.latitude.toFixed(4)}, {issue.longitude.toFixed(4)}
                        </div>
                      )}
                      
                      {issue.assignedTo && (
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4" />
                          <span>
                            <span className="font-medium">Assigned to:</span> {workerMap.get(issue.assignedTo) || `Worker ID: ${issue.assignedTo}`}
                          </span>
                        </div>
                      )}

                      {issue.photoUrl && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <ImageIcon className="h-4 w-4" />
                            <span>Issue Photo</span>
                          </div>
                          <div className="relative w-full max-w-md h-64 rounded-lg overflow-hidden border">
                            <Image
                              src={issue.photoUrl}
                              alt={`Issue photo for ${issue.roadName}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                          </div>
                          <a
                            href={issue.photoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline inline-block"
                          >
                            View full size
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 min-w-[200px]">
                      <IssueStatusForm issueId={issue.id} currentStatus={issue.status} />
                      <IssueAssignForm
                        issueId={issue.id}
                        currentAssignee={issue.assignedTo || undefined}
                        workers={assignWorkers}
                      />
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
