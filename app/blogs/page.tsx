import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

export default function BlogsPage() {
  const blogPosts = [
    {
      title: "The Future of AI-Powered Social Media Management",
      excerpt: "Discover how artificial intelligence is revolutionizing the way creators and businesses manage their social media presence.",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "AI & Technology",
      featured: true
    },
    {
      title: "10 Best Practices for Authentic Social Media Engagement",
      excerpt: "Learn the proven strategies that top creators use to build genuine connections with their audience while scaling their presence.",
      author: "Mike Chen",
      date: "March 12, 2024",
      readTime: "7 min read",
      category: "Strategy"
    },
    {
      title: "How to Maintain Your Brand Voice with Automated Responses",
      excerpt: "A comprehensive guide to training AI systems to respond in your unique brand voice while maintaining authenticity.",
      author: "Emma Davis",
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "Brand Management"
    },
    {
      title: "The ROI of Social Media Automation: A Data-Driven Analysis",
      excerpt: "Explore the measurable benefits of social media automation and how it impacts engagement rates, growth, and revenue.",
      author: "Alex Rodriguez",
      date: "March 8, 2024",
      readTime: "8 min read",
      category: "Analytics"
    },
    {
      title: "Building Community: Beyond Automated Responses",
      excerpt: "While automation handles the volume, learn how to create meaningful community experiences that foster long-term loyalty.",
      author: "Lisa Park",
      date: "March 5, 2024",
      readTime: "5 min read",
      category: "Community Building"
    },
    {
      title: "Platform-Specific Engagement Strategies for 2024",
      excerpt: "Each social platform has its unique culture. Here's how to tailor your automated engagement for maximum impact.",
      author: "David Kim",
      date: "March 3, 2024",
      readTime: "9 min read",
      category: "Platform Strategy"
    }
  ];

  const categories = ["All", "AI & Technology", "Strategy", "Brand Management", "Analytics", "Community Building", "Platform Strategy"];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-hero-subtle">
        {/* Hero Section */}
        <section className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="secondary" className="mb-4">
              ReplyRushh Blog
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Insights & Resources for
              <span className="text-brand"> Smart Creators</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Stay ahead of the curve with expert insights, best practices, and the latest trends in social media automation and engagement.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "brand" : "outline"}
                  size="sm"
                  className="mb-2"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Featured Article</h2>
            </div>
            
            <Card className="shadow-brand hover:shadow-lg transition-shadow bg-gradient-to-r from-brand/5 to-brand/10 border-brand/20">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="default">Featured</Badge>
                  <Badge variant="secondary">{blogPosts[0].category}</Badge>
                </div>
                <CardTitle className="text-3xl mb-3">{blogPosts[0].title}</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  {blogPosts[0].excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{blogPosts[0].date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                  <Button variant="brand" size="sm">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Latest Articles</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post, index) => (
                <Card key={index} className="shadow-brand hover:shadow-lg transition-shadow group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-brand transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                      <Button variant="ghost" size="sm" className="group-hover:text-brand">
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-card/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Stay Updated
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get the latest insights, tips, and updates delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-border bg-background"
              />
              <Button variant="brand">
                Subscribe
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Put These Insights to Work?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start implementing these strategies with ReplyRushh today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="brand">
                <Link href="/login">Start Free Trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
