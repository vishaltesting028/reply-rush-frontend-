import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock, MessageSquare, Users, Zap } from "lucide-react";

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@ReplyRushh.com",
      availability: "24/7"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our team",
      contact: "+1 (555) 123-4567",
      availability: "Mon-Fri, 9AM-6PM EST"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Instant messaging support",
      contact: "Available in-app",
      availability: "24/7"
    }
  ];

  const offices = [
    {
      city: "San Francisco",
      address: "123 Tech Street, Suite 100, San Francisco, CA 94105",
      phone: "+1 (555) 123-4567"
    },
    {
      city: "New York",
      address: "456 Business Ave, Floor 25, New York, NY 10001",
      phone: "+1 (555) 987-6543"
    },
    {
      city: "London",
      address: "789 Innovation Lane, London, UK EC1A 1BB",
      phone: "+44 20 1234 5678"
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
              Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              We're Here to
              <span className="text-brand"> Help You Succeed</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Have questions about ReplyRushh? Need help getting started? Our team of experts is ready to assist you every step of the way.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Multiple Ways to Reach Us
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose the contact method that works best for you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <Card key={index} className="shadow-brand hover:shadow-lg transition-shadow text-center">
                  <CardHeader>
                    <div className="mx-auto p-3 bg-brand/10 rounded-full w-fit mb-4">
                      <method.icon className="h-8 w-8 text-brand" />
                    </div>
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-foreground mb-2">{method.contact}</p>
                    <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{method.availability}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-card/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Send Us a Message
              </h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>

            <Card className="shadow-brand">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter your first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email address" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input id="company" placeholder="Enter your company name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What's this about?" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us how we can help you..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button type="submit" variant="brand" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Global Offices
              </h2>
              <p className="text-lg text-muted-foreground">
                Visit us at one of our locations worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {offices.map((office, index) => (
                <Card key={index} className="shadow-brand hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-5 w-5 text-brand" />
                      <CardTitle className="text-xl">{office.city}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{office.address}</p>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-brand" />
                      <span className="font-medium">{office.phone}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Quick Links */}
        <section className="py-16 bg-card/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Need Quick Answers?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Check out our help center for instant solutions to common questions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline">
                Visit Help Center
              </Button>
              <Button size="lg" variant="outline">
                View Documentation
              </Button>
              <Button size="lg" variant="outline">
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
