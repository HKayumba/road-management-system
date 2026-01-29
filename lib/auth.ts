import bcrypt from "bcryptjs";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

export interface User {
  id: number;
  email: string;
  name: string;
  role: "Admin" | "FieldOfficer";
}

export const AUTH_COOKIE_NAME = "rmms_session";

export async function validateCredentials(
  email: string,
  password: string,
): Promise<User | null> {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as "Admin" | "FieldOfficer",
    };
  } catch (error) {
    console.error("Error validating credentials:", error);
    return null;
  }
}

export function createSessionToken(user: User): string {
  // In production, use proper JWT tokens
  return btoa(JSON.stringify(user));
}

export function parseSessionToken(token: string): User | null {
  try {
    const decoded = atob(token);
    const user = JSON.parse(decoded) as User;
    // Validate the parsed user has required fields
    if (user.id && user.email && user.name && user.role) {
      return user;
    }
    return null;
  } catch {
    return null;
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as "Admin" | "FieldOfficer",
    };
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
}
