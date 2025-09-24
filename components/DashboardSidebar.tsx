'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import InstagramOAuthModal from "./InstagramOAuthModal";

const API = process.env.NEXT_PUBLIC_API_URL; // loaded from .env.local
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  BarChart3, 
  Calendar, 
  Settings, 
  HelpCircle,
  LogOut,
  User,
  Instagram,
  CheckCircle
} from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Posts & Reels", href: "/posts-reels", icon: MessageSquare },
  { name: "Stories", href: "/stories", icon: Users },
  { name: "Upcoming Post", href: "/upcoming-post", icon: Calendar },
  { name: "Default Setting", href: "/default-setting", icon: Settings },
  { name: "Engagement Starter", href: "/engagement-starter", icon: BarChart3 },
  { name: "Suggest More", href: "/suggest-more", icon: HelpCircle },
  { name: "Global Triggers", href: "/global-triggers", icon: Settings },
  { name: "Welcome Openers", href: "/welcome-openers", icon: MessageSquare },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Connect Account", href: "/connect-account", icon: Instagram },
  { name: "Pricing Plan", href: "/pricing-plan", icon: BarChart3 },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isInstagramModalOpen, setIsInstagramModalOpen] = useState(false);
  const [instagramStatus, setInstagramStatus] = useState({
    isConnected: false,
    username: null,
    profilePicture: null,
    followersCount: 0,
    postsCount: 0,
    website: null,
    fullName: null
  });

  // Load Instagram connection status
  useEffect(() => {
    const loadInstagramStatus = async () => {
      try {
        const response = await fetch(`${API}/api/instagram/status`, {
          credentials: "include" // if you use cookies/session
        });

        if (response.ok) {
          const data = await response.json();
          setInstagramStatus({
            isConnected: data.data.isConnected,
            username: data.data.username,
            profilePicture: data.data.profilePicture || null,
            followersCount: data.data.followersCount || 0,
            postsCount: data.data.postsCount || 0,
            website: data.data.website || null,
            fullName: data.data.fullName || null
          });
        }
      } catch (error) {
        console.error('Failed to load Instagram status:', error);
      }
    };

    loadInstagramStatus();
  }, []);

  const handleInstagramSuccess = (data: any) => {
    setInstagramStatus({
      isConnected: true,
      username: data.username,
      profilePicture: data.profilePicture || null,
      followersCount: data.followersCount || 0,
      postsCount: data.postsCount || 0,
      website: data.website || null,
      fullName: data.fullName || null
    });
  };

  const handleDisconnectInstagram = async () => {
    try {
      const response = await fetch(`${API}/api/instagram/disconnect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include' // Include cookies/session for authentication
      });

      if (response.ok) {
        setInstagramStatus({
          isConnected: false,
          username: null,
          profilePicture: null,
          followersCount: 0,
          postsCount: 0,
          website: null,
          fullName: null
        });
      }
    } catch (error) {
      console.error('Failed to disconnect Instagram:', error);
    }
  };

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-brand flex items-center justify-center">
            <span className="text-sm font-bold text-brand-foreground">R</span>
          </div>
          <span className="text-lg font-bold text-sidebar-foreground">ReplyRush</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="border-t border-sidebar-border p-4">


        {/* Instagram Connection */}
        <div className="mb-3">
          {instagramStatus.isConnected ? (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-100">
              {/* Instagram Profile Header */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="relative">
                  {instagramStatus.profilePicture ? (
                    <img 
                      src={instagramStatus.profilePicture} 
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <Instagram className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <CheckCircle className="h-2 w-2 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    @{instagramStatus.username}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {instagramStatus.fullName || 'Instagram Connected'}
                  </p>
                </div>
              </div>

              {/* Profile Stats */}
              <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                <div className="text-center">
                  <div className="font-medium text-gray-900">
                    {instagramStatus.followersCount > 1000 
                      ? `${(instagramStatus.followersCount / 1000).toFixed(1)}K` 
                      : instagramStatus.followersCount}
                  </div>
                  <div className="text-gray-500">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-gray-900">{instagramStatus.postsCount}</div>
                  <div className="text-gray-500">Posts</div>
                </div>
              </div>

              {/* Website/Bio */}
              {instagramStatus.website && (
                <div className="text-xs text-gray-600 mb-3">
                  🌐 {instagramStatus.website}
                </div>
              )}

              {/* Disconnect Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDisconnectInstagram}
                className="w-full justify-center text-red-600 hover:bg-red-50 text-xs"
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsInstagramModalOpen(true)}
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100"
            >
              <Instagram className="h-4 w-4 mr-2 text-purple-600" />
              <span className="text-purple-700">Connect Instagram</span>
            </Button>
          )}
        </div>

        <Button
          variant="ghost" 
          size="sm"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
          asChild
        >
          <Link href="/">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Link>
        </Button>
      </div>

      {/* Instagram OAuth Modal */}
      <InstagramOAuthModal
        isOpen={isInstagramModalOpen}
        onClose={() => setIsInstagramModalOpen(false)}
        onSuccess={handleInstagramSuccess}
      />
    </div>
  );
}
