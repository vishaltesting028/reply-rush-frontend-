'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function AdminAuthPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Admin login logic - redirect to admin dashboard
    router.push("/admin-dashboard");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Admin signup logic - redirect to admin dashboard
    router.push("/admin-dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-hero-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <Card className="shadow-brand">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-8 w-8 text-brand mr-2" />
              <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
            </div>
            <CardDescription>
              Administrative access to ReplyRush platform
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-login-email">Admin Email</Label>
                <Input
                  id="admin-login-email"
                  type="email"
                  placeholder="Enter your admin email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="admin-login-password">Admin Password</Label>
                <Input
                  id="admin-login-password"
                  type="password"
                  placeholder="Enter your admin password"
                  required
                />
              </div>

              <Button type="submit" variant="brand" className="w-full">
                Login as Admin
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Need an admin account?
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/signup">Create Admin Account</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
