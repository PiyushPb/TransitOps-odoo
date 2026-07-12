"use client";

import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OverviewChart } from "@/components/overview-chart";
import { CarFront, Route, Users, Navigation, AlertTriangle, Wrench, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RoleGate } from "@/components/role-gate";
import { ROLES } from "@/lib/roles";

const LockedScreen = () => (
  <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-4 animate-in fade-in zoom-in duration-500">
    <div className="bg-muted p-6 rounded-full">
      <Lock className="h-12 w-12 text-muted-foreground" />
    </div>
    <div className="space-y-2">
      <h2 className="text-2xl font-bold tracking-tight">Dashboard Restricted</h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        Your current role does not have permission to view the executive dashboard overview. Please use the sidebar to navigate to your authorized sections.
      </p>
    </div>
  </div>
);

export default function DashboardPage() {
  return (
    <RoleGate allowedRoles={[ROLES.ADMIN, ROLES.FINANCIAL_ANALYST]} fallback={<LockedScreen />}>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Dashboard" 
        description="Overview of your fleet and operations today."
      />

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Vehicles</CardTitle>
            <CarFront className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">124</div>
            <p className="text-xs text-muted-foreground mt-1"><span className="text-success">+2</span> from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Trips</CardTitle>
            <Navigation className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">42</div>
            <p className="text-xs text-muted-foreground mt-1">Currently on route</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Drivers Available</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">18</div>
            <p className="text-xs text-muted-foreground mt-1">On standby</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Fuel Efficiency</CardTitle>
            <Route className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">8.4<span className="text-sm font-normal"> km/l</span></div>
            <p className="text-xs text-muted-foreground mt-1"><span className="text-success">+0.2%</span> avg improvement</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-danger" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
            <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Maintenance Due</CardTitle>
            <Wrench className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
            <p className="text-xs text-muted-foreground mt-1">Scheduled for this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Fleet Status</CardTitle>
            <CardDescription>
              Vehicle activity over the last 12 months
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart />
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest operations across the network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                { time: "10 min ago", title: "Trip TR-9238 Completed", desc: "Route 4, Driver: John Doe" },
                { time: "45 min ago", title: "New Incident Reported", desc: "Minor delay on Route 12", badge: "Warning" },
                { time: "2 hours ago", title: "Maintenance Finished", desc: "Vehicle #102 is back online" },
                { time: "3 hours ago", title: "Driver Shift Started", desc: "7 drivers checked in for afternoon shift" },
                { time: "5 hours ago", title: "Fuel Alert", desc: "Vehicle #304 low on fuel", badge: "Alert" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none flex items-center gap-2">
                      {activity.title}
                      {activity.badge === "Warning" && <Badge variant="outline" className="text-warning border-warning/30 bg-warning/10">Warning</Badge>}
                      {activity.badge === "Alert" && <Badge variant="outline" className="text-danger border-danger/30 bg-danger/10">Alert</Badge>}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.desc}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-xs text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </RoleGate>
  );
}
