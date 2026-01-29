"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronRight,
  LayoutDashboard,
  FileText,
  Users,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

type NavItem = {
  title: string
  url: string
  iconKey?: string
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

const iconMap: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  issues: FileText,
  workers: Users,
  report: AlertTriangle,
}

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.iconKey ? iconMap[item.iconKey] : undefined
          const isActive = pathname === item.url || (item.items && item.items.some(subItem => pathname === subItem.url))
          const hasActiveSubItem = item.items && item.items.some(subItem => pathname === subItem.url)

          if (item.items && item.items.length > 0) {
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={hasActiveSubItem || item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} isActive={isActive}>
                      {Icon && <Icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const isSubItemActive = pathname === subItem.url
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={isSubItemActive}>
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          }

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                <Link href={item.url}>
                  {Icon && <Icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
