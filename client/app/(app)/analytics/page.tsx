"use client";

import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OverviewChart } from "@/components/overview-chart";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Analytics" description="Deep dive into fleet performance and operational metrics." actionButtonText="Export Data" />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Fleet Utilization</CardTitle>
            <CardDescription>Monthly fleet usage across all routes</CardDescription>
          </CardHeader>
          <CardContent>
            <OverviewChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fuel Consumption</CardTitle>
            <CardDescription>Fuel costs over time</CardDescription>
          </CardHeader>
          <CardContent>
            <OverviewChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
