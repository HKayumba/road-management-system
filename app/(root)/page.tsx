/**
 * Home Page (Landing Page)
 *
 * Public-facing homepage for the Road Maintenance Management System.
 * Displays:
 * - Hero section with call-to-action buttons
 * - System statistics
 * - Features and benefits
 * - How it works process
 * - Types of issues that can be reported
 * - Final call-to-action section
 *
 * Routes:
 * - /report - Public issue reporting form
 * - /auth/login - Staff login page
 */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin } from "lucide-react";
//import Image from "next/image";
import Link from "next/link";
import { features, roadIssue, stats, steps } from "@/data/index";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="px-4 md:px-20 py-16">
        <div className="comtainer mx-auto">
          <div className="max-w-6xl mx-auto mt-20 px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 mb-6">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">
                Report Road Issues Instantly
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl text-balance">
              Help Us Keep Our Roads Safe and Maintained
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
              Help authorities identify and fix road issues quickly. Report
              potholes, broken signage, or drainage problems in seconds.
            </p>

            <div className="flex gap-4 justify-center">
              <Link href="/report">
                <Button size="lg" className="gap-2">
                  Report an Issue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  size="lg"
                  className="gap-2 bg-transparent text-primary border boder-primary hover:text-white"
                >
                  Staff Login
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="px-4 md:px-20 py-16 bg-stone-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-[#334155] lg:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*Why report on Our System */}
      <section className="px-4 md:px-20 py-16 bg-stone-50">
        <div className="container mx-auto">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              Why Report Through Our System?
            </h2>
            <p className="text-muted-foreground">
              Our digital reporting system streamlines the process of
              identifying and fixing road issues across the city.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="border border-t-4 border-t-blue-700 bg-card transition-shadow hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/*How it works */}
      <section className="px-4 md:px-20 py-16">
        <div className="container mx-auto">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              From report to resolution - our streamlined process ensures
              efficient handling of all road maintenance issues.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="mb-4 text-5xl font-bold text-primary/20">
                  {step.number}
                </div>
                <h3 className="mb-2 font-semibold text-primary">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-8 hidden h-0.5 w-12 bg-border lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*What Can You Report */}
      <section className="px-4 md:px-20 py-16">
        <div className="container mx-auto">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              What Can You Report?
            </h2>
            <p className="text-muted-foreground">
              We handle a variety of road maintenance issues. Select the
              appropriate category when submitting your report.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {roadIssue.map((issue, index) => (
              <Card
                key={index}
                className="border border-t-4 border-t-red-500 bg-card text-center hover:scale-104 duration-300"
              >
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                    <issue.icon className="h-7 w-7 text-destructive" />
                  </div>
                  <h3 className="mb-1 font-semibold text-card-foreground">
                    {issue.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {issue.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/*CTA */}
      <section className="px-4 md:px-20 py-16">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-primary rounded-xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Report?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              It takes less than 2 minutes to submit a report. Help us maintain
              safer roads for everyone.
            </p>
            <Link href="/report">
              <Button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary-foreground text-primary font-medium hover:bg-primary-foreground/90 transition-colors">
                Report Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
