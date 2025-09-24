import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  MessageSquare, 
  BarChart3, 
  Zap, 
  Shield, 
  Users, 
  Clock,
  Brain,
  Smartphone,
  Globe,
  CheckCircle
} from "lucide-react";

export default function FeaturesPage() {
  const mainFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Responses",
      description: "Advanced natural language processing creates responses that sound authentically human and match your brand voice.",
      highlight: true
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Respond to messages in milliseconds, ensuring your audience never waits for engagement.",
      highlight: false
    },
    {
      icon: Shield,
      title: "Brand Safe",
      description: "Smart content filtering and approval workflows protect your reputation while maintaining authentic engagement.",
      highlight: false
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive insights into engagement patterns, response effectiveness, and audience growth metrics.",
      highlight: true
    },
    {
      icon: Users,
      title: "Multi-Platform Support",
      description: "Seamlessly manage engagement across Twitter, Instagram, LinkedIn, and other major social platforms.",
      highlight: false
    },
    {
      icon: Clock,
      title: "24/7 Automation",
      description: "Never miss an engagement opportunity with round-the-clock automated responses and monitoring.",
      highlight: false
    }
  ];

  const additionalFeatures = [
    "Custom response templates",
    "Smart keyword detection",
    "Sentiment analysis",
    "Multi-language support",
    "Team collaboration tools",
    "API integrations",
    "Real-time notifications",
    "Advanced scheduling",
    "Performance reporting",
    "White-label options"
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-hero-subtle">
        {/* Hero Section */}
        <section className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="secondary" className="mb-4">
              Platform Features
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Everything You Need for
              <span className="text-brand"> Smart Engagement</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover the powerful features that make ReplyRushh the leading platform for automated social media engagement and community management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="brand">
                <Link href="/login">Try All Features</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Main Features Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Core Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Powerful tools designed to transform how you manage social media engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mainFeatures.map((feature, index) => (
                <Card 
                  key={index} 
                  className={`shadow-brand hover:shadow-lg transition-shadow ${
                    feature.highlight ? 'ring-2 ring-brand/20 bg-brand/5' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${
                        feature.highlight ? 'bg-brand text-white' : 'bg-brand/10 text-brand'
                      }`}>
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                    {feature.highlight && (
                      <Badge variant="default" className="w-fit">
                        Popular
                      </Badge>
                    )}
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

        {/* Additional Features */}
        <section className="py-16 bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                And Much More
              </h2>
              <p className="text-lg text-muted-foreground">
                Additional features to supercharge your social media management
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {additionalFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-card rounded-lg shadow-sm">
                  <CheckCircle className="h-5 w-5 text-brand flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Integration */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Works Everywhere You Do
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Seamless integration with all major social media platforms and tools
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "Twitter", icon: Globe },
                { name: "Instagram", icon: Smartphone },
                { name: "LinkedIn", icon: Users },
                { name: "Facebook", icon: MessageSquare }
              ].map((platform, index) => (
                <Card key={index} className="text-center p-6 shadow-brand hover:shadow-lg transition-shadow">
                  <platform.icon className="h-12 w-12 mx-auto mb-4 text-brand" />
                  <h3 className="font-semibold text-lg">{platform.name}</h3>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Experience These Features?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start your free trial today and discover how ReplyRushh can transform your social media engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="brand">
                <Link href="/login">Start Free Trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Schedule Demo</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
