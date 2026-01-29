export type IssueStatus =
  | "unverified"
  | "reported"
  | "in-progress"
  | "completed";
export type IssueSeverity = "low" | "medium" | "high" | "critical";
export type IssueType = "pothole" | "cracks" | "drainage" | "signage" | "other";
export type IssueSource = "civilian" | "field-officer";
export type UserRole = "admin" | "field-officer" | "civilian";

export interface RoadIssue {
  id: string;
  roadName: string;
  location: string;
  issueType: IssueType;
  severity?: IssueSeverity;
  status: IssueStatus;
  source: IssueSource;
  reportedDate: string;
  assignedOfficer?: string;
  description?: string;
  photoUrl?: string;
  gpsCoordinates?: {
    lat: number;
    lng: number;
  };
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface DashboardStats {
  totalIssues: number;
  reported: number;
  inProgress: number;
  completed: number;
  unverified: number;
}
