import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search, Book, MessageSquare, Video, FileText, Users, Zap, Settings, BarChart3 } from "lucide-react";

export default function HelpPage() {
  const helpCategories = [
    {
      icon: Zap,
      title: "Getting Started",
      description: "Quick setup guides and onboarding tutorials",
      articles: 12,
      popular: true
    },
    {
      icon: Settings,
      title: "Account & Settings",
      description: "Manage your account, billing, and preferences",
      articles: 8,
      popular: false
    },
    {
      icon: MessageSquare,
      title: "AI Responses",
      description: "Configure and optimize your automated responses",
      articles: 15,
      popular: true
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Understanding your engagement metrics and insights",
      articles: 10,
      popular: false
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Collaborate with team members and manage permissions",
      articles: 6,
      popular: false
    },
    {
      icon: Book,
      title: "Best Practices",
      description: "Tips and strategies for maximizing your results",
      articles: 20,
      popular: true
    }
  ];

  const popularArticles = [
    "How to set up your first automated response",
    "Training AI to match your brand voice",
    "Understanding engagement analytics",
    "Managing multiple social media accounts",
    "Troubleshooting common issues"
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-hero-subtle">
        {/* Hero Section */}
        <section className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="secondary" className="mb-4">
              Help Center
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              How Can We
              <span className="text-brand"> Help You?</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Find answers, get support, and learn how to make the most of ReplyRushh with our comprehensive help center.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search for help articles, guides, and tutorials..."
                className="pl-12 py-4 text-lg"
              />
              <Button variant="brand" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Quick Help Options
              </h2>
              <p className="text-lg text-muted-foreground">
                Get immediate assistance through multiple channels
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="shadow-brand hover:shadow-lg transition-shadow text-center cursor-pointer">
                <CardHeader>
                  <div className="mx-auto p-3 bg-brand/10 rounded-full w-fit mb-4">
                    <MessageSquare className="h-8 w-8 text-brand" />
                  </div>
                  <CardTitle className="text-xl">Live Chat</CardTitle>
                  <CardDescription>Get instant help from our support team</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="brand" className="w-full">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-brand hover:shadow-lg transition-shadow text-center cursor-pointer">
                <CardHeader>
                  <div className="mx-auto p-3 bg-brand/10 rounded-full w-fit mb-4">
                    <Video className="h-8 w-8 text-brand" />
                  </div>
                  <CardTitle className="text-xl">Video Tutorials</CardTitle>
                  <CardDescription>Watch step-by-step video guides</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Watch Videos
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-brand hover:shadow-lg transition-shadow text-center cursor-pointer">
                <CardHeader>
                  <div className="mx-auto p-3 bg-brand/10 rounded-full w-fit mb-4">
                    <FileText className="h-8 w-8 text-brand" />
                  </div>
                  <CardTitle className="text-xl">Documentation</CardTitle>
                  <CardDescription>Comprehensive guides and API docs</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    View Docs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-16 bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Browse by Category
              </h2>
              <p className="text-lg text-muted-foreground">
                Find the help you need organized by topic
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {helpCategories.map((category, index) => (
                <Card 
                  key={index} 
                  className={`shadow-brand hover:shadow-lg transition-shadow cursor-pointer ${
                    category.popular ? 'ring-2 ring-brand/20 bg-brand/5' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-lg ${
                        category.popular ? 'bg-brand text-white' : 'bg-brand/10 text-brand'
                      }`}>
                        <category.icon className="h-6 w-6" />
                      </div>
                      {category.popular && (
                        <Badge variant="default" className="text-xs">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {category.articles} articles
                      </span>
                      <Button variant="ghost" size="sm">
                        Browse →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Popular Articles
              </h2>
              <p className="text-lg text-muted-foreground">
                Most viewed help articles this week
              </p>
            </div>

            <Card className="shadow-brand">
              <CardContent className="p-8">
                <div className="space-y-4">
                  {popularArticles.map((article, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between py-3 border-b last:border-0 hover:bg-muted/50 rounded px-2 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-brand font-semibold text-lg">
                          {index + 1}
                        </span>
                        <span className="font-medium">{article}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Read →
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-16 bg-card/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Still Need Help?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Can't find what you're looking for? Our support team is here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="brand">
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button size="lg" variant="outline">
                Schedule Demo
              </Button>
              <Button size="lg" variant="outline">
                Join Community
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
