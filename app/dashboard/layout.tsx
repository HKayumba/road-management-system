/**
 * Dashboard Layout Component
 * 
 * Shared layout wrapper for all dashboard pages. Provides:
 * - Authentication check (redirects to login if not authenticated)
 * - Role-based sidebar navigation (different nav items for Admin vs Field Worker)
 * - Sidebar with collapsible navigation
 * - Header with breadcrumbs and logout button
 * - User information display
 * 
 * Navigation Items:
 * - Admin: Dashboard, Issues (with sub-items), Field Workers (with sub-items)
 * - Field Worker: Dashboard, Report Issue
 * 
 * Route: /dashboard/* (all dashboard routes)
 * Access: Protected (requires authentication)
 */
import { redirect } from "next/navigation";
import { getSession } from "@/app/auth/actions/actions";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { logout } from "@/app/auth/actions/actions";
import { Button } from "@/components/ui/button";
//import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const isAdmin = session.role === "Admin";

  const navItems = isAdmin
    ? [
        {
          title: "Dashboard",
          url: "/dashboard/admin",
          iconKey: "dashboard",
          isActive: true,
        },
        {
          title: "Issues",
          url: "/dashboard/admin/issues",
          iconKey: "issues",
          items: [
            {
              title: "All Issues",
              url: "/dashboard/admin/issues",
            },
          ],
        },
        {
          title: "Field Workers",
          url: "/dashboard/admin/workers",
          iconKey: "workers",
          items: [
            {
              title: "All Field Workers",
              url: "/dashboard/admin/workers",
            },
            {
              title: "Add New User",
              url: "/dashboard/admin/workers/new",
            },
          ],
        },
      ]
    : [
        {
          title: "Dashboard",
          url: "/dashboard/fieldworker",
          iconKey: "dashboard",
          isActive: true,
        },
        {
          title: "Report Issue",
          url: "/dashboard/fieldworker",
          iconKey: "report",
        },
      ];

  return (
    <SidebarProvider>
      <AppSidebar
        navItems={navItems}
        user={{
          name: session.name,
          email: session.email,
          avatar: "",
        }}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <div className="flex items-center gap-2 flex-1">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href={isAdmin ? "/dashboard/admin" : "/dashboard/fieldworker"}>
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{session.name}</span>
            <form action={logout}>
              <Button type="submit" variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </form>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
