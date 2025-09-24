import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Users, MessageSquare, TrendingUp, Zap, Star, Award } from "lucide-react";

export default function CreatorsPage() {
  const creatorFeatures = [
    {
      icon: MessageSquare,
      title: "Smart Auto-Reply",
      description: "AI-powered responses that match your brand voice and engage followers authentically."
    },
    {
      icon: TrendingUp,
      title: "Growth Analytics",
      description: "Track your engagement growth with detailed insights and performance metrics."
    },
    {
      icon: Zap,
      title: "Instant Engagement",
      description: "Never miss an opportunity with lightning-fast response times to your audience."
    },
    {
      icon: Award,
      title: "Brand Protection",
      description: "Maintain your reputation with smart filtering and professional response templates."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      followers: "2.5M",
      quote: "ReplyRushh helped me increase my engagement by 300% while saving 10 hours per week!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Influencer",
      followers: "1.8M",
      quote: "The AI responses are so natural, my followers can't tell the difference. Game changer!",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Brand Ambassador",
      followers: "950K",
      quote: "Finally, I can focus on creating content while ReplyRushh handles my community engagement.",
      rating: 5
    }
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-hero-subtle">
        {/* Hero Section */}
        <section className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="secondary" className="mb-4">
              For Content Creators
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Supercharge Your
              <span className="text-brand"> Social Presence</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join thousands of creators who use ReplyRushh to automate engagement, 
              grow their audience, and focus on what they do best - creating amazing content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="brand">
                <Link href="/login">Start Free Trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/features">See How It Works</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Built for Creators Like You
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to manage your social media engagement efficiently and authentically.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {creatorFeatures.map((feature, index) => (
                <Card key={index} className="shadow-brand hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-brand/10 rounded-lg">
                        <feature.icon className="h-6 w-6 text-brand" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Loved by Creators Worldwide
              </h2>
              <p className="text-lg text-muted-foreground">
                See what successful creators are saying about ReplyRushh
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="shadow-brand">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                      <Badge variant="secondary">
                        <Users className="h-3 w-3 mr-1" />
                        {testimonial.followers}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-brand text-brand" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic">
                      "{testimonial.quote}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Transform Your Engagement?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join the creator revolution. Start your free trial today and see the difference ReplyRushh can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="brand">
                <Link href="/login">Get Started Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Talk to Our Team</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
