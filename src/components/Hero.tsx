import { Button } from "@/components/ui/button";
import Link from "next/link";
import heroImage from "@/assets/hero-dashboard.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Automate Your{" "}
              <span className="text-brand">Customer Engagement</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mt-6 max-w-2xl">
              Manage your engagement and track your sales through an advanced web dashboard, 
              and stay connected anytime with our powerful platform. 
              ReplyRushh is up to 90% more efficient than other platforms.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild variant="brand" size="lg" className="text-lg px-8 py-4 h-auto">
                <Link href="/login">Get Started Free</Link>
              </Button>
              
              <Button asChild variant="brand-outline" size="lg" className="text-lg px-8 py-4 h-auto">
                <Link href="/features">View Features</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 text-center lg:text-left">
              <div>
                <div className="text-2xl font-bold text-foreground">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">90%</div>
                <div className="text-sm text-muted-foreground">Cost Savings</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-brand">
              <img
                src={heroImage.src}
                alt="ReplyRushh Dashboard Preview"
                className="w-full h-auto object-cover"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 via-transparent to-transparent"></div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-brand rounded-full flex items-center justify-center shadow-brand animate-pulse">
              <div className="text-brand-foreground font-bold">AI</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-card border-2 border-brand rounded-xl flex items-center justify-center shadow-elegant">
              <div className="w-8 h-8 bg-gradient-hero rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;