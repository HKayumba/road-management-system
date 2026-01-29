"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  validateCredentials,
  createSessionToken,
  parseSessionToken,
  AUTH_COOKIE_NAME,
  type User,
} from "@/lib/auth";

export async function login(
  _prevState: { error: string | null },
  formData: FormData,
): Promise<{ error: string | null }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please enter both email and password" };
  }

  const user = await validateCredentials(email, password);

  if (!user) {
    return { error: "Invalid email or password" };
  }

  const token = createSessionToken(user);
  const cookieStore = await cookies();

  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  // Redirect based on role
  if (user.role === "Admin") {
    redirect("/dashboard/admin");
  } else {
    redirect("/dashboard/fieldworker");
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  redirect("/auth/login");
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return parseSessionToken(token);
}
