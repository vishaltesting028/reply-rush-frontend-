'use client';

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-hero-subtle flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-brand mb-4">404</h1>
        <h2 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="brand">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}
