import { pgTable, serial, text, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["Admin", "FieldOfficer"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: userRoleEnum("role").default("FieldOfficer").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});