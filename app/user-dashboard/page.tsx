'use client';

import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardStats from "@/components/DashboardStats";
import RecentActivity from "@/components/RecentActivity";
import QuickActions from "@/components/QuickActions";
import Link from "next/link";

export default function UserDashboard() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">User Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Here's your engagement overview for today.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-muted-foreground">Free Plan</span>
              <Button variant="brand" size="sm" asChild>
                <Link href="/pricing">Upgrade</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Welcome Message */}
            <div className="bg-gradient-hero-subtle rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Welcome back, User!
              </h2>
              <p className="text-muted-foreground">
                Here's your engagement overview for today.
              </p>
            </div>

            {/* Stats */}
            <DashboardStats />

            {/* Activity and Actions */}
            <div className="grid gap-6 lg:grid-cols-2">
              <RecentActivity />
              <QuickActions />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
