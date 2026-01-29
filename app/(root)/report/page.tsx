/**
 * Public Issue Reporting Page
 * 
 * Allows citizens to report road maintenance issues without requiring an account.
 * Features:
 * - Public access (no authentication required)
 * - Issue reporting form with photo upload
 * - GPS location capture (optional)
 * - Civilian report indicator
 * 
 * Route: /report
 * Component: ReportForm (handles form submission and image upload)
 */
"use client";

import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";
import ReportForm from "@/components/Forms/ReportForm";

function page() {
  return (
    <>
      <section className="py-16">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            {/* Header */}
            <div className="mb-8">
              <h1 className="mb-2 text-2xl font-bold text-foreground lg:text-3xl">
                Report a Road Problem
              </h1>
              <p className="text-muted-foreground">
                Help us maintain safe roads by reporting issues you encounter.
                No account required.
              </p>
            </div>

            {/* Info banner */}
            <div className="mb-8 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Civilian Report
                </p>
                <p className="text-sm text-muted-foreground">
                  Reports submitted through this form will be marked as civilian
                  submissions and will require verification by our team before
                  action is taken.
                </p>
              </div>
            </div>

            {/*Form */}
            <div>
              <ReportForm />
            </div>

            {/* Note */}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              For emergencies or immediate hazards, please contact emergency
              services at <span className="font-medium">911</span> or the Public
              Works hotline at{" "}
              <span className="font-medium">(555) 123-4567</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default page;
