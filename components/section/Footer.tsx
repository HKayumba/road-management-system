import { Construction } from "lucide-react";
import React from "react";
import { Separator } from "../ui/separator";
import Link from "next/link";

function Footer() {
  return (
    <>
      <footer className="px-4 md:px-20 py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Logo and description */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <Construction className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">
                    Road Maintenance
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Management System
                  </span>
                </div>
              </Link>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                A government initiative to maintain safe and well-maintained
                roads for all citizens. Report road issues quickly and track
                their resolution.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-4 text-sm font-semibold text-foreground">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/report"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Report an Issue
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Staff Portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4 text-sm font-semibold text-foreground">
                Contact
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Public Works Department</li>
                <li>City Hall, Main Street</li>
                <li>Phone: (555) 123-4567</li>
                <li>Email: roads@city.gov</li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="mt-8 bg-red-600" />
        <div className="mt-10 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Road Maintenance Management
            System. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
