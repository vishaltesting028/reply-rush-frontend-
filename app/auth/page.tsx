'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // User login logic - redirect to user dashboard
    router.push("/user-dashboard");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // User signup logic - redirect to user dashboard
    router.push("/user-dashboard");
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
            <CardTitle className="text-2xl font-bold">Welcome to ReplyRush</CardTitle>
            <CardDescription>
              Access your dashboard and manage your engagement
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button type="submit" variant="brand" className="w-full">
                Login
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Don't have an account?
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
