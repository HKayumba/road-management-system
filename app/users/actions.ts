"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role: "Admin" | "FieldOfficer";
}

export async function getAllFieldWorkers() {
  try {
    const fieldWorkers = await db
      .select()
      .from(users)
      .where(eq(users.role, "FieldOfficer"));

    return { success: true, workers: fieldWorkers };
  } catch (error) {
    console.error("Error fetching field workers:", error);
    return { success: false, error: "Failed to fetch workers", workers: [] };
  }
}

export async function getAllUsers() {
  try {
    const allUsers = await db.select().from(users);
    return { success: true, users: allUsers };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, error: "Failed to fetch users", users: [] };
  }
}

export async function createUser(input: CreateUserInput) {
  try {
    // Check if user already exists
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, input.email.toLowerCase()))
      .limit(1);

    if (existingUser) {
      return { success: false, error: "User with this email already exists" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // Create user
    const [newUser] = await db
      .insert(users)
      .values({
        name: input.name,
        email: input.email.toLowerCase(),
        password: hashedPassword,
        role: input.role,
      })
      .returning();

    // Remove password from response
    const { password, ...userWithoutPassword } = newUser;

    revalidatePath("/dashboard/admin/workers");
    return { success: true, user: userWithoutPassword };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: "Failed to create user" };
  }
}

export async function deleteUser(userId: number) {
  try {
    await db.delete(users).where(eq(users.id, userId));
    revalidatePath("/dashboard/admin/workers");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}
