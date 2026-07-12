"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  CarFront, 
  Users, 
  Route, 
  Navigation, 
  CalendarDays, 
  Wrench, 
  AlertTriangle, 
  Bell, 
  BarChart3, 
  FileText, 
  Settings,
  Bus
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Vehicles", url: "/vehicles", icon: CarFront },
  { title: "Drivers", url: "/drivers", icon: Users },
  { title: "Routes", url: "/routes", icon: Route },
  { title: "Trips", url: "/trips", icon: Navigation },
  { title: "Schedules", url: "/schedules", icon: CalendarDays },
  { title: "Maintenance", url: "/maintenance", icon: Wrench },
  { title: "Incidents", url: "/incidents", icon: AlertTriangle },
  { title: "Alerts", url: "/alerts", icon: Bell },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="h-16 flex justify-center px-4 border-b border-border/50">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Bus className="h-5 w-5" />
          </div>
          <span className="text-lg tracking-tight font-serif">TransitOps</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              {navItems.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton render={<Link href={item.url} />} isActive={isActive} tooltip={item.title}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-sm">
            <span className="font-semibold text-foreground">Admin User</span>
            <span className="text-xs text-muted-foreground">admin@transitops.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
