'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Creators", path: "/creators" },
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact Us", path: "/contact" },
    { name: "Help Center", path: "/help" },
  ];

  return (
    <nav className="bg-background border-b shadow-elegant sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <h1 className="text-2xl font-bold text-foreground">ReplyRushhh</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-brand ${
                  pathname === item.path
                    ? "text-brand"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex space-x-3">
            <Button asChild variant="outline">
              <Link href="/admin">Admin</Link>
            </Button>
            <Button asChild variant="brand">
              <Link href="/login">Sign up Free</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-muted-foreground hover:text-brand py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 mt-4">
                <Button asChild variant="outline">
                  <Link href="/admin" onClick={() => setIsOpen(false)}>
                    Admin Login
                  </Link>
                </Button>
                <Button asChild variant="brand">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    Sign up Free
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;