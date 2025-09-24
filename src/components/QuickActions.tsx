'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Calendar, Settings } from "lucide-react";
import Link from "next/link";

const quickActions = [
  {
    title: "Send Message",
    description: "Send a message to your contacts",
    icon: MessageSquare,
    href: "/messages",
    color: "bg-blue-50 text-blue-600 hover:bg-blue-100"
  },
  {
    title: "Manage Contacts",
    description: "View and organize your contacts",
    icon: Users,
    href: "/contacts",
    color: "bg-green-50 text-green-600 hover:bg-green-100"
  },
  {
    title: "Schedule",
    description: "Plan your engagement activities",
    icon: Calendar,
    href: "/schedule",
    color: "bg-purple-50 text-purple-600 hover:bg-purple-100"
  },
  {
    title: "Settings",
    description: "Configure your preferences",
    icon: Settings,
    href: "/settings",
    color: "bg-orange-50 text-orange-600 hover:bg-orange-100"
  }
];

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        <p className="text-sm text-muted-foreground">Frequently used features</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.title}
                variant="ghost"
                className={`h-auto p-4 flex flex-col items-center space-y-2 ${action.color}`}
                asChild
              >
                <Link href={action.href}>
                  <Icon className="h-6 w-6" />
                  <div className="text-center">
                    <p className="text-sm font-medium">{action.title}</p>
                    <p className="text-xs opacity-80">{action.description}</p>
                  </div>
                </Link>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
