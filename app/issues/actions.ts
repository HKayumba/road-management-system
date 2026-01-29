"use server";

import { db } from "@/lib/db";
import { roadIssues } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getSession } from "@/app/auth/actions/actions";

export interface CreateIssueInput {
  roadName: string;
  locationDetails: string;
  issueType: "pothole" | "cracks" | "drainage" | "signage" | "other";
  severity?: "Low" | "Medium" | "High";
  latitude?: number;
  longitude?: number;
  assignedTo?: number;
   photoUrl?: string;
}

export async function createIssue(input: CreateIssueInput) {
  try {
    const [issue] = await db
      .insert(roadIssues)
      .values({
        roadName: input.roadName,
        locationDetails: input.locationDetails,
        issueType: input.issueType,
        severity: input.severity || "Low",
        latitude: input.latitude || null,
        longitude: input.longitude || null,
        assignedTo: input.assignedTo || null,
        photoUrl: input.photoUrl || null,
        status: "Reported",
      })
      .returning();

    revalidatePath("/dashboard");
    return { success: true, issue };
  } catch (error) {
    console.error("Error creating issue:", error);
    return { success: false, error: "Failed to create issue" };
  }
}

export async function getIssues() {
  try {
    const allIssues = await db
      .select()
      .from(roadIssues)
      .orderBy(desc(roadIssues.reportedAt));

    return { success: true, issues: allIssues };
  } catch (error) {
    console.error("Error fetching issues:", error);
    return { success: false, error: "Failed to fetch issues", issues: [] };
  }
}

export async function getIssueById(id: number) {
  try {
    const [issue] = await db
      .select()
      .from(roadIssues)
      .where(eq(roadIssues.id, id))
      .limit(1);

    if (!issue) {
      return { success: false, error: "Issue not found" };
    }

    return { success: true, issue };
  } catch (error) {
    console.error("Error fetching issue:", error);
    return { success: false, error: "Failed to fetch issue" };
  }
}

export async function updateIssueStatus(
  id: number,
  status: "Reported" | "In Progress" | "Completed",
) {
  try {
    const session = await getSession();

    if (!session) {
      return { success: false, error: "Not authenticated" };
    }

    // Load the issue first to check ownership / permissions
    const [existing] = await db
      .select()
      .from(roadIssues)
      .where(eq(roadIssues.id, id))
      .limit(1);

    if (!existing) {
      return { success: false, error: "Issue not found" };
    }

    // Only admins or the assigned field worker can update status
    const isAdmin = session.role === "Admin";
    const isAssignedWorker =
      existing.assignedTo !== null && existing.assignedTo === session.id;

    if (!isAdmin && !isAssignedWorker) {
      return { success: false, error: "Not authorized to update this issue" };
    }

    const [issue] = await db
      .update(roadIssues)
      .set({ status })
      .where(eq(roadIssues.id, id))
      .returning();

    revalidatePath("/dashboard");
    return { success: true, issue };
  } catch (error) {
    console.error("Error updating issue:", error);
    return { success: false, error: "Failed to update issue" };
  }
}

export async function assignIssue(issueId: number, userId: number) {
  try {
    const session = await getSession();

    // Only admins are allowed to assign issues
    if (!session || session.role !== "Admin") {
      return { success: false, error: "Not authorized to assign issues" };
    }

    const [issue] = await db
      .update(roadIssues)
      .set({ assignedTo: userId })
      .where(eq(roadIssues.id, issueId))
      .returning();

    revalidatePath("/dashboard");
    return { success: true, issue };
  } catch (error) {
    console.error("Error assigning issue:", error);
    return { success: false, error: "Failed to assign issue" };
  }
}

export async function getIssuesByAssignee(userId: number) {
  try {
    const userIssues = await db
      .select()
      .from(roadIssues)
      .where(eq(roadIssues.assignedTo, userId))
      .orderBy(desc(roadIssues.reportedAt));

    return { success: true, issues: userIssues };
  } catch (error) {
    console.error("Error fetching user issues:", error);
    return { success: false, error: "Failed to fetch issues", issues: [] };
  }
}

export async function getDashboardStats() {
  try {
    const allIssues = await db.select().from(roadIssues);

    const stats = {
      totalIssues: allIssues.length,
      reported: allIssues.filter((i) => i.status === "Reported").length,
      inProgress: allIssues.filter((i) => i.status === "In Progress").length,
      completed: allIssues.filter((i) => i.status === "Completed").length,
    };

    return { success: true, stats };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {
      success: false,
      error: "Failed to fetch stats",
      stats: {
        totalIssues: 0,
        reported: 0,
        inProgress: 0,
        completed: 0,
      },
    };
  }
}
