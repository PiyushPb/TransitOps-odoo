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
  { id: "M-1021", vehicle: "V-1002", type: "Preventative", status: "In Progress", date: "2023-11-01", cost: "$450" },
  { id: "M-1022", vehicle: "V-1004", type: "Repair", status: "Scheduled", date: "2023-11-05", cost: "Est. $1200" },
  { id: "M-1023", vehicle: "V-1001", type: "Inspection", status: "Completed", date: "2023-10-15", cost: "$150" },
  { id: "M-1024", vehicle: "V-1005", type: "Preventative", status: "Pending Approval", date: "2023-11-10", cost: "Est. $300" },
];

export default function MaintenancePage() {
  const [selectedItem, setSelectedItem] = React.useState<typeof data[0] | null>(null);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const handleView = (item: typeof data[0]) => {
    setSelectedItem(item);
    setIsSheetOpen(true);
  };

  const columns = [
    {
      accessorKey: "id",
      header: "Ticket ID",
      cell: ({ row }: any) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "vehicle",
      header: "Vehicle ID",
    },
    {
      accessorKey: "type",
      header: "Maintenance Type",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "cost",
      header: "Cost",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.getValue("status");
        return (
          <Badge variant={status === "Completed" ? "success" : status === "In Progress" ? "default" : status === "Pending Approval" ? "warning" : "secondary"}>
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const item = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger className={buttonVariants({ variant: "ghost" }) + " h-8 w-8 p-0"}>
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleView(item)}>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" /> Edit Ticket
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
                <Trash2 className="mr-2 h-4 w-4" /> Cancel Ticket
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
        title="Maintenance" 
        description="Schedule repairs, track service history, and monitor fleet health."
        actionButtonText="New Ticket"
      />

      <DataTable 
        columns={columns} 
        data={data} 
        searchKey="vehicle"
        searchPlaceholder="Search tickets by vehicle ID..."
      />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md w-full border-border">
          <SheetHeader>
            <SheetTitle>Maintenance Ticket</SheetTitle>
            <SheetDescription>
              Details for {selectedItem?.id}.
            </SheetDescription>
          </SheetHeader>
          {selectedItem && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Ticket ID</p>
                  <p className="font-semibold">{selectedItem.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant={selectedItem.status === "Completed" ? "success" : selectedItem.status === "In Progress" ? "default" : selectedItem.status === "Pending Approval" ? "warning" : "secondary"}>
                    {selectedItem.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Vehicle</p>
                  <p className="font-medium">{selectedItem.vehicle}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <p className="font-medium">{selectedItem.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p className="font-medium">{selectedItem.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Cost</p>
                  <p className="font-medium">{selectedItem.cost}</p>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
