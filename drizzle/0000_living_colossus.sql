CREATE TYPE "public"."user_role" AS ENUM('Admin', 'FieldOfficer');--> statement-breakpoint
CREATE TYPE "public"."issue_type" AS ENUM('pothole', 'cracks', 'drainage', 'signage', 'other');--> statement-breakpoint
CREATE TYPE "public"."severity" AS ENUM('Low', 'Medium', 'High');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('Reported', 'In Progress', 'Completed');--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"role" "user_role" DEFAULT 'FieldOfficer' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "road_issues" (
	"id" serial PRIMARY KEY NOT NULL,
	"road_name" varchar(255) NOT NULL,
	"location_details" text NOT NULL,
	"latitude" double precision,
	"longitude" double precision,
	"issue_type" "issue_type" NOT NULL,
	"severity" "severity" DEFAULT 'Low' NOT NULL,
	"status" "status" DEFAULT 'Reported' NOT NULL,
	"assigned_to" integer,
	"reported_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "road_issues" ADD CONSTRAINT "road_issues_assigned_to_users_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;