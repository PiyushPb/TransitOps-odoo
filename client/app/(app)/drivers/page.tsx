"use client";

import * as React from "react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  { id: "D-401", name: "John Doe", status: "On Route", license: "CDL-A", rating: 4.8, phone: "+1 555-0101" },
  { id: "D-402", name: "Sarah Smith", status: "Available", license: "CDL-B", rating: 4.9, phone: "+1 555-0102" },
  { id: "D-403", name: "Michael Johnson", status: "Off Duty", license: "CDL-A", rating: 4.7, phone: "+1 555-0103" },
  { id: "D-404", name: "Emily Davis", status: "On Route", license: "CDL-B", rating: 5.0, phone: "+1 555-0104" },
  { id: "D-405", name: "David Wilson", status: "Sick Leave", license: "CDL-A", rating: 4.6, phone: "+1 555-0105" },
];

export default function DriversPage() {
  const [selectedDriver, setSelectedDriver] = React.useState<typeof data[0] | null>(null);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const handleView = (driver: typeof data[0]) => {
    setSelectedDriver(driver);
    setIsSheetOpen(true);
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Driver Name",
      cell: ({ row }: any) => {
        const name = row.getValue("name");
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary">{name.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{name}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "id",
      header: "Driver ID",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.getValue("status");
        return (
          <Badge variant={status === "Available" ? "success" : status === "On Route" ? "default" : "secondary"}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "license",
      header: "License Type",
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }: any) => <div className="font-medium">⭐ {row.getValue("rating")}</div>,
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const driver = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger className={buttonVariants({ variant: "ghost" }) + " h-8 w-8 p-0"}>
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleView(driver)}>
                <Eye className="mr-2 h-4 w-4" /> View Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" /> Edit Driver
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
                <Trash2 className="mr-2 h-4 w-4" /> Deactivate
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
        title="Drivers" 
        description="Manage your workforce, track schedules, and review performance."
        actionButtonText="Add Driver"
      />

      <DataTable 
        columns={columns} 
        data={data} 
        searchKey="name"
        searchPlaceholder="Search drivers by name..."
      />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md w-full border-border">
          <SheetHeader>
            <SheetTitle>Driver Profile</SheetTitle>
            <SheetDescription>
              Details and current status for {selectedDriver?.name}.
            </SheetDescription>
          </SheetHeader>
          {selectedDriver && (
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-4 border-b border-border pb-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">{selectedDriver.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedDriver.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedDriver.id}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant={selectedDriver.status === "Available" ? "success" : selectedDriver.status === "On Route" ? "default" : "secondary"}>
                    {selectedDriver.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">License</p>
                  <p className="font-medium">{selectedDriver.license}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Rating</p>
                  <p className="font-medium">⭐ {selectedDriver.rating}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedDriver.phone}</p>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
