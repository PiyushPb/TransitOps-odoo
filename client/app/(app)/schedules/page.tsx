"use client";

import * as React from "react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";

const data = [
  { id: "SCH-001", route: "Downtown Express", driver: "John Doe", time: "08:00 AM", status: "Active" },
  { id: "SCH-002", route: "Airport Shuttle", driver: "Sarah Smith", time: "09:30 AM", status: "Active" },
];

export default function SchedulesPage() {
  const columns = [
    { accessorKey: "id", header: "Schedule ID" },
    { accessorKey: "route", header: "Route" },
    { accessorKey: "driver", header: "Driver" },
    { accessorKey: "time", header: "Time" },
    { accessorKey: "status", header: "Status" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Schedules" description="Manage driver and vehicle schedules." actionButtonText="Add Schedule" />
      <DataTable columns={columns} data={data} searchKey="route" searchPlaceholder="Search schedules by route..." />
    </div>
  );
}
