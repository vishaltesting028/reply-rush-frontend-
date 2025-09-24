'use client';

import { useState } from 'react';
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  current: boolean;
  icon: any;
  color: string;
}

export default function PricingPlanPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free Plan',
      price: 0,
      period: 'month',
      description: 'Perfect for getting started',
      features: [
        'Up to 100 automated responses',
        '1 Instagram account',
        'Basic templates',
        'Email support',
        '7-day message history'
      ],
      popular: false,
      current: true,
      icon: Star,
      color: 'text-gray-600'
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: billingPeriod === 'monthly' ? 29 : 290,
      period: billingPeriod === 'monthly' ? 'month' : 'year',
      description: 'Best for growing businesses',
      features: [
        'Unlimited automated responses',
        'Up to 5 Instagram accounts',
        'Advanced templates & customization',
        'Priority support',
        'Unlimited message history',
        'Analytics & insights',
        'Custom triggers',
        'Welcome openers'
      ],
      popular: true,
      current: false,
      icon: Zap,
      color: 'text-blue-600'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: billingPeriod === 'monthly' ? 99 : 990,
      period: billingPeriod === 'monthly' ? 'month' : 'year',
      description: 'For large teams and agencies',
      features: [
        'Everything in Pro',
        'Unlimited Instagram accounts',
        'White-label solution',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced analytics',
        'Team collaboration',
        'SLA guarantee'
      ],
      popular: false,
      current: false,
      icon: Crown,
      color: 'text-purple-600'
    }
  ];

  const handleUpgrade = (planId: string) => {
    console.log(`Upgrading to ${planId}...`);
    // Implementation for plan upgrade
  };

  const handleDowngrade = () => {
    console.log('Downgrading plan...');
    // Implementation for plan downgrade
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                <span>Home</span>
                <span>›</span>
                <span>Pricing Plan</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Pricing Plan</h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Current Plan Status */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">Current Plan: Free Plan</h3>
                    <p className="text-blue-700">You're currently on the Free plan</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-900">$0</p>
                    <p className="text-sm text-blue-700">per month</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-4">
                  <div className="flex-1 bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full w-1/4"></div>
                  </div>
                  <span className="text-sm text-blue-700">25/100 responses used</span>
                </div>
              </CardContent>
            </Card>

            {/* Billing Toggle */}
            <div className="flex justify-center">
              <div className="bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    billingPeriod === 'monthly'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    billingPeriod === 'yearly'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Yearly
                  <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                    Save 17%
                  </Badge>
                </button>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => {
                const Icon = plan.icon;
                return (
                  <Card 
                    key={plan.id} 
                    className={`relative ${
                      plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''
                    } ${plan.current ? 'border-green-500' : ''}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-blue-500 text-white">Most Popular</Badge>
                      </div>
                    )}
                    {plan.current && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-green-500 text-white">Current Plan</Badge>
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-4">
                      <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gray-100 flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${plan.color}`} />
                      </div>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">${plan.price}</span>
                        <span className="text-muted-foreground">/{plan.period}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="pt-4">
                        {plan.current ? (
                          <Button variant="outline" className="w-full" disabled>
                            Current Plan
                          </Button>
                        ) : plan.id === 'free' ? (
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={handleDowngrade}
                          >
                            Downgrade
                          </Button>
                        ) : (
                          <Button 
                            className={`w-full ${
                              plan.popular 
                                ? 'bg-blue-500 hover:bg-blue-600' 
                                : 'bg-gray-900 hover:bg-gray-800'
                            }`}
                            onClick={() => handleUpgrade(plan.id)}
                          >
                            Upgrade to {plan.name}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Can I change my plan anytime?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">What happens if I exceed my plan limits?</h4>
                  <p className="text-sm text-muted-foreground">
                    You'll receive notifications when approaching your limits. You can upgrade your plan or additional usage will be charged at standard rates.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Is there a free trial for paid plans?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, all paid plans come with a 14-day free trial. No credit card required to start.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Do you offer refunds?</h4>
                  <p className="text-sm text-muted-foreground">
                    We offer a 30-day money-back guarantee for all paid plans if you're not satisfied.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Sales */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Need a custom solution?</h3>
                <p className="text-purple-700 mb-4">
                  Contact our sales team for enterprise pricing and custom features tailored to your needs.
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
