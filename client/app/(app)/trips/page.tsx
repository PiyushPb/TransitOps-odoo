"use client";

import * as React from "react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const data = [
  { id: "TR-9238", route: "R-01 Downtown Express", vehicle: "V-1001", driver: "John Doe", status: "In Progress", start: "08:00 AM", eta: "09:15 AM" },
  { id: "TR-9239", route: "R-02 Airport Shuttle", vehicle: "V-1003", driver: "Sarah Smith", status: "Completed", start: "07:30 AM", eta: "08:45 AM" },
  { id: "TR-9240", route: "R-04 Suburban Loop", vehicle: "V-1005", driver: "Emily Davis", status: "Delayed", start: "08:15 AM", eta: "09:45 AM" },
  { id: "TR-9241", route: "R-01 Downtown Express", vehicle: "V-1002", driver: "Unassigned", status: "Scheduled", start: "10:00 AM", eta: "11:15 AM" },
];

export default function TripsPage() {
  const [selectedTrip, setSelectedTrip] = React.useState<typeof data[0] | null>(null);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const handleView = (trip: typeof data[0]) => {
    setSelectedTrip(trip);
    setIsSheetOpen(true);
  };

  const columns = [
    {
      accessorKey: "id",
      header: "Trip ID",
      cell: ({ row }: any) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "route",
      header: "Route",
    },
    {
      accessorKey: "vehicle",
      header: "Vehicle",
    },
    {
      accessorKey: "driver",
      header: "Driver",
    },
    {
      accessorKey: "start",
      header: "Start Time",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.getValue("status");
        return (
          <Badge variant={status === "Completed" ? "success" : status === "In Progress" ? "default" : status === "Delayed" ? "warning" : "secondary"}>
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const trip = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger className={buttonVariants({ variant: "ghost" }) + " h-8 w-8 p-0"}>
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleView(trip)}>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" /> Edit Trip
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
                <Trash2 className="mr-2 h-4 w-4" /> Cancel Trip
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Trips" 
        description="Monitor active, scheduled, and completed trips in real-time."
        actionButtonText="Create Trip"
      />

      <DataTable 
        columns={columns} 
        data={data} 
        searchKey="id"
        searchPlaceholder="Search trips by ID..."
      />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md w-full border-border">
          <SheetHeader>
            <SheetTitle>Trip Details</SheetTitle>
            <SheetDescription>
              Information for {selectedTrip?.id}.
            </SheetDescription>
          </SheetHeader>
          {selectedTrip && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Trip ID</p>
                  <p className="font-semibold">{selectedTrip.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant={selectedTrip.status === "Completed" ? "success" : selectedTrip.status === "In Progress" ? "default" : selectedTrip.status === "Delayed" ? "warning" : "secondary"}>
                    {selectedTrip.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Route</p>
                  <p className="font-medium">{selectedTrip.route}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Driver</p>
                  <p className="font-medium">{selectedTrip.driver}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Vehicle</p>
                  <p className="font-medium">{selectedTrip.vehicle}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Start Time</p>
                  <p className="font-medium">{selectedTrip.start}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Estimated Arrival</p>
                  <p className="font-medium">{selectedTrip.eta}</p>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
