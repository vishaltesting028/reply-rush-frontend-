'use client';

import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GlobalTriggersPage() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Global Triggers</h1>
              <p className="text-sm text-muted-foreground">
                Configure global automation triggers
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="brand" size="sm">
                Create Trigger
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Global Triggers</CardTitle>
                <CardDescription>
                  Set up global automation triggers for your engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Global triggers functionality will be implemented here.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
