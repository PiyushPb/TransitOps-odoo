"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen w-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="flex h-16 items-center justify-between border-b px-6 bg-white dark:bg-black">
        <h1 className="text-xl font-bold font-serif tracking-tight">TransitOps</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">
            Welcome, {user?.f_name} {user?.l_name}
          </span>
          <Button variant="outline" size="sm" onClick={logout}>
            Log out
          </Button>
        </div>
      </header>
      
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-5xl space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Overview of your transport operations.
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Placeholder cards */}
            <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-zinc-900">
              <h3 className="font-semibold leading-none tracking-tight">Total Vehicles</h3>
              <p className="text-2xl font-bold mt-2">0</p>
            </div>
            <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-zinc-900">
              <h3 className="font-semibold leading-none tracking-tight">Active Trips</h3>
              <p className="text-2xl font-bold mt-2">0</p>
            </div>
            <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-zinc-900">
              <h3 className="font-semibold leading-none tracking-tight">Drivers</h3>
              <p className="text-2xl font-bold mt-2">0</p>
            </div>
            <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-zinc-900">
              <h3 className="font-semibold leading-none tracking-tight">Alerts</h3>
              <p className="text-2xl font-bold mt-2 text-red-500">0</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
