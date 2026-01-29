"use client";

import * as React from "react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  navItems: {
    title: string
    url: string
    iconKey?: string
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
  user: {
    name: string
    email: string
    avatar?: string
  }
}

export function AppSidebar({ navItems, user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold">Road Maintenance</h2>
          <p className="text-xs text-muted-foreground">Management System</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
