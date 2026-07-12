"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useRBAC } from "@/hooks/use-rbac";
import { ROLES, RoleId } from "@/lib/roles";
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
  Bus,
  ShieldCheck
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

type NavItem = {
  title: string;
  url: string;
  icon: any;
  allowedRoles: RoleId[];
};

const navItems: NavItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, allowedRoles: [ROLES.ADMIN, ROLES.FLEET_MANAGER, ROLES.DRIVER, ROLES.FINANCIAL_ANALYST] },
  { title: "Vehicles", url: "/vehicles", icon: CarFront, allowedRoles: [ROLES.ADMIN, ROLES.FLEET_MANAGER] },
  { title: "Drivers", url: "/drivers", icon: Users, allowedRoles: [ROLES.ADMIN, ROLES.FLEET_MANAGER] },
  { title: "Routes", url: "/routes", icon: Route, allowedRoles: [ROLES.ADMIN, ROLES.FLEET_MANAGER] },
  { title: "Trips", url: "/trips", icon: Navigation, allowedRoles: [ROLES.ADMIN, ROLES.FLEET_MANAGER, ROLES.DRIVER] },
  { title: "Maintenance", url: "/maintenance", icon: Wrench, allowedRoles: [ROLES.ADMIN, ROLES.FLEET_MANAGER] },
  { title: "Analytics", url: "/analytics", icon: BarChart3, allowedRoles: [ROLES.ADMIN, ROLES.FINANCIAL_ANALYST] },
  { title: "Reports", url: "/reports", icon: FileText, allowedRoles: [ROLES.ADMIN, ROLES.FINANCIAL_ANALYST] },
  { title: "Users", url: "/users", icon: ShieldCheck, allowedRoles: [ROLES.ADMIN] },
  { title: "Settings", url: "/settings", icon: Settings, allowedRoles: [ROLES.ADMIN] },
];

const getRoleName = (roleId?: number) => {
  switch (roleId) {
    case ROLES.ADMIN: return "Admin";
    case ROLES.FLEET_MANAGER: return "Fleet Manager";
    case ROLES.DRIVER: return "Driver";
    case ROLES.FINANCIAL_ANALYST: return "Financial Analyst";
    default: return "";
  }
};

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { hasAnyRole } = useRBAC();

  const filteredNavItems = navItems.filter((item) => hasAnyRole(item.allowedRoles));

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
              {filteredNavItems.map((item) => {
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
            <AvatarImage src="" alt={user ? `${user.first_name} ${user.last_name}` : "User"} />
            <AvatarFallback>
              {user ? `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-sm">
            <span className="font-semibold text-foreground">
              {user ? `${user.first_name} ${user.last_name} (${getRoleName(user.role_id)})` : "Loading..."}
            </span>
            <span className="text-xs text-muted-foreground">
              {user?.email || ""}
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
