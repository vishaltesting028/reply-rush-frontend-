'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { 
  ArrowLeft, 
  Users, 
  BarChart3, 
  DollarSign, 
  Activity,
  UserPlus,
  Settings,
  Shield,
  Database
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" size="icon">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="default">Administrator</Badge>
              <Button variant="brand" size="sm">System Settings</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Admin Control Center
          </h2>
          <p className="text-muted-foreground">
            Monitor system performance and manage platform operations.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">12,543</span>
                <Users className="h-5 w-5 text-brand" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                +18% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Monthly Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">$45,231</span>
                <DollarSign className="h-5 w-5 text-brand" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                +23% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                System Uptime
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">99.9%</span>
                <Activity className="h-5 w-5 text-brand" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Last 30 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Storage Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">73%</span>
                <Database className="h-5 w-5 text-brand" />
              </div>
              <Progress value={73} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current platform health and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { service: "API Gateway", status: "Operational", uptime: "99.9%" },
                  { service: "Database", status: "Operational", uptime: "99.8%" },
                  { service: "AI Processing", status: "Operational", uptime: "99.7%" },
                  { service: "Message Queue", status: "Operational", uptime: "100%" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="text-sm font-medium">{item.service}</p>
                      <p className="text-xs text-muted-foreground">Uptime: {item.uptime}</p>
                    </div>
                    <Badge variant="default" className="text-xs">
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Admin Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Admin Actions</CardTitle>
              <CardDescription>System management tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  <span>User Management</span>
                </Button>
                
                <Button variant="outline" className="h-20 flex-col">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  <span>Analytics</span>
                </Button>
                
                <Button variant="outline" className="h-20 flex-col">
                  <Shield className="h-6 w-6 mb-2" />
                  <span>Security</span>
                </Button>
                
                <Button variant="outline" className="h-20 flex-col">
                  <Settings className="h-6 w-6 mb-2" />
                  <span>System Config</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
