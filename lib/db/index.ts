import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  // We use a fallback or a more graceful check if we're in a build environment
  // but for the final code, we'll keep it simple as you requested.
  console.warn("Warning: DATABASE_URL is not defined.");
}

const connectionString = process.env.DATABASE_URL || "";
const client = postgres(connectionString);

export const db = drizzle(client, { schema });