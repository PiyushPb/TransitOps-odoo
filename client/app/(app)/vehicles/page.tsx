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

// Mock Data
const data = [
  { id: "V-1001", model: "Volvo 7900", type: "Bus", status: "Active", fuel: "Electric", lastService: "2023-10-15" },
  { id: "V-1002", model: "Mercedes Citaro", type: "Bus", status: "Maintenance", fuel: "Diesel", lastService: "2023-09-02" },
  { id: "V-1003", model: "Ford Transit", type: "Van", status: "Active", fuel: "Hybrid", lastService: "2023-10-18" },
  { id: "V-1004", model: "Volvo 7900", type: "Bus", status: "Inactive", fuel: "Electric", lastService: "2023-08-11" },
  { id: "V-1005", model: "Scania Citywide", type: "Bus", status: "Active", fuel: "CNG", lastService: "2023-10-20" },
];

export default function VehiclesPage() {
  const [selectedVehicle, setSelectedVehicle] = React.useState<typeof data[0] | null>(null);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const handleView = (vehicle: typeof data[0]) => {
    setSelectedVehicle(vehicle);
    setIsSheetOpen(true);
  };

  const columns = [
    {
      accessorKey: "id",
      header: "Vehicle ID",
      cell: ({ row }: any) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "model",
      header: "Model",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "fuel",
      header: "Fuel Type",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.getValue("status");
        return (
          <Badge variant={status === "Active" ? "default" : status === "Maintenance" ? "destructive" : "secondary"}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "lastService",
      header: "Last Service",
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const vehicle = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger className={buttonVariants({ variant: "ghost" }) + " h-8 w-8 p-0"}>
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleView(vehicle)}>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" /> Edit Vehicle
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
        title="Vehicles" 
        description="Manage your fleet, track statuses, and schedule maintenance."
        actionButtonText="Add Vehicle"
      />

      <DataTable 
        columns={columns} 
        data={data} 
        searchKey="model"
        searchPlaceholder="Search vehicle models..."
      />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md w-full border-border">
          <SheetHeader>
            <SheetTitle>Vehicle Details</SheetTitle>
            <SheetDescription>
              Information and current status for {selectedVehicle?.id}.
            </SheetDescription>
          </SheetHeader>
          {selectedVehicle && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Vehicle ID</p>
                  <p className="font-semibold">{selectedVehicle.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant={selectedVehicle.status === "Active" ? "default" : selectedVehicle.status === "Maintenance" ? "destructive" : "secondary"}>
                    {selectedVehicle.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Model</p>
                  <p className="font-medium">{selectedVehicle.model}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <p className="font-medium">{selectedVehicle.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Fuel</p>
                  <p className="font-medium">{selectedVehicle.fuel}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Last Service</p>
                  <p className="font-medium">{selectedVehicle.lastService}</p>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button className="w-full">Edit Details</Button>
                <Button variant="outline" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">Mark Out of Service</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
