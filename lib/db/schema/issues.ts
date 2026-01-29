import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  doublePrecision,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";
import { users } from "./users"; // Import the users schema

export const issueTypeEnum = pgEnum("issue_type", [
  "pothole",
  "cracks",
  "drainage",
  "signage",
  "other",
]);
export const severityEnum = pgEnum("severity", ["Low", "Medium", "High"]);
export const statusEnum = pgEnum("status", [
  "Reported",
  "In Progress",
  "Completed",
]);

export const roadIssues = pgTable("road_issues", {
  id: serial("id").primaryKey(),
  roadName: varchar("road_name", { length: 255 }).notNull(),
  locationDetails: text("location_details").notNull(),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  issueType: issueTypeEnum("issue_type").notNull(),
  severity: severityEnum("severity").default("Low").notNull(),
  status: statusEnum("status").default("Reported").notNull(),
  photoUrl: text("photo_url"),

  // Relationship: Foreign Key to the users table
  assignedTo: integer("assigned_to").references(() => users.id),

  reportedAt: timestamp("reported_at").defaultNow(),
});
