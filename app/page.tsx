'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-hero-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-brand">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-brand-600">ReplyRush</CardTitle>
            <CardDescription className="text-lg">
              AI-powered social media management platform
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Access your dashboard and manage your engagement
            </p>
            
            <div className="space-y-3">
              <Button asChild variant="brand" className="w-full" size="lg">
                <Link href="/login">Login</Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
            
            <div className="pt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Welcome to ReplyRush Platform
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
