/**
 * 404 Not Found Page
 * 
 * Custom error page displayed when a user navigates to a non-existent route.
 * Features:
 * - Themed 404 error message with road maintenance context
 * - Navigation buttons to return to homepage or report an issue
 * - Decorative elements matching the application theme
 * 
 * Route: Any non-existent route (handled by Next.js automatically)
 * Access: Public
 */
import Link from "next/link";
import { MoveLeft, HardHat, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <section className="min-h-full flex flex-col items-center justify-center px-6 py-16">
        <div className="relative flex justify-center">
          {/* Decorative background element */}
          <div
            aria-hidden
            className="absolute -inset-12 rounded-full bg-primary/10 blur-3xl"
          />

          {/* Icon group */}
          <div className="relative flex items-center justify-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-background shadow-lg">
              <HardHat className="h-16 w-16 text-red-500" />
            </div>

            {/* Alert badge */}
            <div className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-red-100 shadow">
              <TriangleAlert className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </div>

        <div className="text-center max-w-2xl">
          <h1 className="text-7xl font-black tracking-tight text-red-600 mb-4">
            404
          </h1>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            Roadblock Ahead!
          </h2>
          <p className="text-muted-foreground mb-10">
            The page you are looking for has been moved, closed for maintenance,
            or never existed. Let&apos;s get you back on the right track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="cursor-pointer">
              <Button className="gap-2 px-8 text-md cursor-pointer" size="lg">
                <MoveLeft className="h-5 w-5" />
                Back to Home
              </Button>
            </Link>

            <Link href="/report" className="cursor-pointer">
              <Button
                variant="outline"
                size="lg"
                className="px-8 text-md bg-transparent cursor-pointer"
              >
                Report an Issue
              </Button>
            </Link>
          </div>
        </div>

        {/* Subtle road line decoration at the bottom */}
        <div className="mt-20 w-full max-w-xs flex gap-4">
          <div className="h-2 flex-1 bg-slate-200 rounded-full" />
          <div className="h-2 flex-1 bg-blue-500 rounded-full" />
          <div className="h-2 flex-1 bg-slate-200 rounded-full" />
        </div>
      </section>
    </>
  );
}
