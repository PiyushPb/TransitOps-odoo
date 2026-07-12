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
  { id: "R-01", name: "Downtown Express", origin: "North Station", destination: "South Station", status: "Active", distance: "12 km" },
  { id: "R-02", name: "Airport Shuttle", origin: "City Center", destination: "Intl Airport", status: "Active", distance: "28 km" },
  { id: "R-03", name: "University Line", origin: "West Campus", destination: "East Campus", status: "Suspended", distance: "8 km" },
  { id: "R-04", name: "Suburban Loop", origin: "Mall", destination: "Mall", status: "Active", distance: "35 km" },
  { id: "R-05", name: "Business District", origin: "North Station", destination: "Tech Park", status: "Planned", distance: "15 km" },
];

export default function RoutesPage() {
  const [selectedRoute, setSelectedRoute] = React.useState<typeof data[0] | null>(null);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const handleView = (route: typeof data[0]) => {
    setSelectedRoute(route);
    setIsSheetOpen(true);
  };

  const columns = [
    {
      accessorKey: "id",
      header: "Route ID",
      cell: ({ row }: any) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: "Route Name",
    },
    {
      accessorKey: "origin",
      header: "Origin",
    },
    {
      accessorKey: "destination",
      header: "Destination",
    },
    {
      accessorKey: "distance",
      header: "Distance",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.getValue("status");
        return (
          <Badge variant={status === "Active" ? "success" : status === "Suspended" ? "destructive" : "secondary"}>
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const route = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger className={buttonVariants({ variant: "ghost" }) + " h-8 w-8 p-0"}>
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleView(route)}>
                <Eye className="mr-2 h-4 w-4" /> View Map
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" /> Edit Route
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
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
        title="Routes" 
        description="Design, optimize, and manage transit routes."
        actionButtonText="Add Route"
      />

      <DataTable 
        columns={columns} 
        data={data} 
        searchKey="name"
        searchPlaceholder="Search routes by name..."
      />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md w-full border-border">
          <SheetHeader>
            <SheetTitle>Route Details</SheetTitle>
            <SheetDescription>
              Configuration for {selectedRoute?.name} ({selectedRoute?.id}).
            </SheetDescription>
          </SheetHeader>
          {selectedRoute && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Route ID</p>
                  <p className="font-semibold">{selectedRoute.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant={selectedRoute.status === "Active" ? "success" : selectedRoute.status === "Suspended" ? "destructive" : "secondary"}>
                    {selectedRoute.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Origin</p>
                  <p className="font-medium">{selectedRoute.origin}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Destination</p>
                  <p className="font-medium">{selectedRoute.destination}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Distance</p>
                  <p className="font-medium">{selectedRoute.distance}</p>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="mt-6 w-full h-48 bg-muted rounded-md border border-border flex items-center justify-center text-muted-foreground">
                Map View Placeholder
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
