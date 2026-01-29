/**
 * Staff Login Page
 * 
 * Authentication page for Admin and Field Worker staff members.
 * Features:
 * - Email and password authentication
 * - Role-based redirect after login (Admin -> /dashboard/admin, FieldWorker -> /dashboard/fieldworker)
 * - Session management via HTTP-only cookies
 * - Error handling and validation
 * 
 * Route: /auth/login
 * Server Action: login() - validates credentials and creates session
 */
"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Construction, ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { login } from "../actions/actions";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, { error: null });

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Construction className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-sm font-semibold text-foreground">
                Road Maintenance
              </span>
              <span className="text-xs text-muted-foreground">
                Management System
              </span>
            </div>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Login Form */}
      <main className="flex flex-1 items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md space-y-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Staff Login</CardTitle>
              <CardDescription>
                Enter your credentials to access the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@roadmaintenance.gov"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                  />
                </div>

                {state.error && (
                  <p className="text-sm text-destructive">{state.error}</p>
                )}

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          {/* <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Demo Credentials</AlertTitle>
            <AlertDescription className="mt-2 space-y-2 text-sm">
              <p className="font-medium">Admin Account:</p>
              <p className="font-mono text-xs">
                admin@roadmaintenance.gov / demo123
              </p>
              <p className="mt-2 font-medium">Field Officer Account:</p>
              <p className="font-mono text-xs">
                officer@roadmaintenance.gov / demo123
              </p>
            </AlertDescription>
          </Alert>

          <p className="text-center text-sm text-muted-foreground">
            This is a demo system. Contact your administrator for access.
          </p> */}
        </div>
      </main>
    </div>
  );
}
