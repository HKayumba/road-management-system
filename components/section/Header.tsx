"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Construction, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Report an Issue",
    href: "/report",
  },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
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

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  isActive
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link href="/auth/login" className="hidden md:block">
            <Button>Staff Login</Button>
          </Link>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "border-t border-border bg-background md:hidden",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <nav className="container mx-auto flex flex-col gap-2 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  isActive
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <Link href="/login" onClick={() => setMobileOpen(false)}>
            <Button className="mt-2 w-full">Staff Login</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
