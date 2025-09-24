'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, TrendingUp, Clock } from "lucide-react";

const stats = [
  {
    title: "Total Messages",
    value: "1,234",
    change: "+12% from last week",
    icon: MessageSquare,
    color: "text-blue-600"
  },
  {
    title: "Active Contacts",
    value: "856",
    change: "+18% from last week",
    icon: Users,
    color: "text-green-600"
  },
  {
    title: "Response Rate",
    value: "94%",
    change: "+2% from last week",
    icon: TrendingUp,
    color: "text-purple-600"
  },
  {
    title: "Monthly Usage",
    value: "68%",
    change: "of plan limit",
    icon: Clock,
    color: "text-orange-600"
  }
];

export default function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
