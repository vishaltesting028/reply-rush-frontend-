'use client';

import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SuggestMorePage() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Suggest More</h1>
              <p className="text-sm text-muted-foreground">
                AI-powered content and engagement suggestions
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="brand" size="sm">
                Get Suggestions
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Suggest More</CardTitle>
                <CardDescription>
                  Get AI-powered suggestions for better engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  AI suggestion functionality will be implemented here.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
