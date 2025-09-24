import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Check, Zap, Users, Crown } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "Perfect for individual creators and small accounts",
      icon: Zap,
      features: [
        "Up to 1,000 responses/month",
        "Basic AI responses",
        "1 social media account",
        "Email support",
        "Basic analytics",
        "Response templates"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$79",
      period: "per month",
      description: "Ideal for growing creators and small businesses",
      icon: Users,
      features: [
        "Up to 10,000 responses/month",
        "Advanced AI responses",
        "5 social media accounts",
        "Priority support",
        "Advanced analytics",
        "Custom templates",
        "Brand voice training",
        "Sentiment analysis"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "per month",
      description: "For large creators, agencies, and enterprises",
      icon: Crown,
      features: [
        "Unlimited responses",
        "Premium AI responses",
        "Unlimited accounts",
        "24/7 phone support",
        "Custom analytics",
        "White-label options",
        "API access",
        "Team collaboration",
        "Custom integrations",
        "Dedicated account manager"
      ],
      popular: false
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
              Simple Pricing
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Choose Your
              <span className="text-brand"> Perfect Plan</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Start free and scale as you grow. All plans include our core features with no hidden fees or long-term commitments.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative shadow-brand hover:shadow-lg transition-all duration-300 ${
                    plan.popular ? 'ring-2 ring-brand scale-105 bg-brand/5' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge variant="default" className="px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <div className={`mx-auto p-3 rounded-full w-fit mb-4 ${
                      plan.popular ? 'bg-brand text-white' : 'bg-brand/10 text-brand'
                    }`}>
                      <plan.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {plan.description}
                    </CardDescription>
                    <div className="mt-6">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">{plan.period}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <Button 
                      asChild 
                      className={`w-full mb-6 ${
                        plan.popular ? 'variant-brand' : ''
                      }`}
                      variant={plan.popular ? "brand" : "outline"}
                    >
                      <Link href="/login">
                        {plan.popular ? "Start Free Trial" : "Get Started"}
                      </Link>
                    </Button>
                    
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-brand flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-card/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: "Can I change plans anytime?",
                  answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
                },
                {
                  question: "Is there a free trial?",
                  answer: "Yes, all plans come with a 14-day free trial. No credit card required to start."
                },
                {
                  question: "What happens if I exceed my limits?",
                  answer: "We'll notify you when you're approaching your limits and offer easy upgrade options."
                },
                {
                  question: "Do you offer refunds?",
                  answer: "Yes, we offer a 30-day money-back guarantee on all paid plans."
                }
              ].map((faq, index) => (
                <Card key={index} className="shadow-brand">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
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
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of creators who trust ReplyRushh to manage their social media engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="brand">
                <Link href="/login">Start Free Trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
