'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function AdminSignupPage() {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Admin signup logic - redirect to admin dashboard
    router.push("/admin-dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-hero-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to admin login */}
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin Login
          </Link>
        </Button>

        <Card className="shadow-brand">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-8 w-8 text-brand mr-2" />
              <CardTitle className="text-2xl font-bold">Create Admin Account</CardTitle>
            </div>
            <CardDescription>
              Register for administrative access to ReplyRush platform
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-signup-name">Full Name</Label>
                <Input
                  id="admin-signup-name"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-signup-email">Admin Email</Label>
                <Input
                  id="admin-signup-email"
                  type="email"
                  placeholder="Enter your admin email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="admin-signup-password">Admin Password</Label>
                <Input
                  id="admin-signup-password"
                  type="password"
                  placeholder="Create a secure password"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-signup-confirm-password">Confirm Password</Label>
                <Input
                  id="admin-signup-confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-signup-code">Admin Access Code</Label>
                <Input
                  id="admin-signup-code"
                  type="password"
                  placeholder="Enter admin access code"
                  required
                />
              </div>

              <Button type="submit" variant="brand" className="w-full">
                Create Admin Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an admin account?{" "}
                <Link href="/admin" className="text-brand hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
