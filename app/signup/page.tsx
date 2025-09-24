'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL; // loaded from .env.local

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const fieldName = id.replace('signup-', '').replace('-', '');
    const normalizedFieldName = fieldName === 'confirmpassword' ? 'confirmPassword' : fieldName;
    
    setFormData(prev => ({
      ...prev,
      [normalizedFieldName]: value
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // Validate password length
      if (formData.password.length < 6) {
        toast({
          title: "Error",
          description: "Password must be at least 6 characters long",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // Call signup API
      const response = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify({
          id: data.data._id,
          name: data.data.name,
          email: data.data.email,
          role: data.data.role
        }));

        // Show welcome toast
        toast({
          title: "Welcome to ReplyRush!",
          description: `Welcome ${data.data.name}! Your account has been created successfully.`,
          variant: "default"
        });

        // Redirect to home page
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        toast({
          title: "Signup Failed",
          description: data.message || "An error occurred during signup",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to login */}
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/login">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>
        </Button>

        <Card className="shadow-brand">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
            <CardDescription>
              Join ReplyRush and start managing your engagement
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showPasswords.password ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPasswords(prev => ({ ...prev, password: !prev.password }))}
                  >
                    {showPasswords.password ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="signup-confirm-password"
                    type={showPasswords.confirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPasswords(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                  >
                    {showPasswords.confirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" variant="brand" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-brand hover:underline">
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
