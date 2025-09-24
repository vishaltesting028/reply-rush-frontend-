'use client';

import { useState, useEffect } from 'react';
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Phone, Video, MessageCircle, Image } from "lucide-react";

interface EngagementSettings {
  enabled: boolean;
  autoEnableNewPosts: boolean;
  enableAlreadyLiked: boolean;
  message: string;
  buttonTitle: string;
  notes: string;
}

export default function EngagementStarterPage() {
  const [settings, setSettings] = useState<EngagementSettings>({
    enabled: true,
    autoEnableNewPosts: true,
    enableAlreadyLiked: false,
    message: "Hi there! I'm thrilled to have you here—thank you for your interest! 😊 Tap the button below, and I'll send over the link right away 👇",
    buttonTitle: "Send Link Now",
    notes: "This feature automatically sends an introductory message or DM to users who have never interacted before. It initiates engagement by sending a first-time message, starting the conversation with those users."
  });

  const [isLoading, setIsLoading] = useState(false);

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/engagement-starter', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSettings(data.data);
        }
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/engagement-starter', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log('Settings saved successfully');
        }
      } else {
        console.error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  // Mobile Preview Component
  const MobilePreview = () => (
    <div className="sticky top-6">
      <div className="bg-white rounded-3xl p-1 shadow-2xl border-4 border-gray-800" style={{ width: '280px', height: '580px' }}>
        <div className="bg-white rounded-3xl h-full overflow-hidden relative">
          {/* Status Bar */}
          <div className="bg-white px-4 py-2 flex justify-between items-center text-xs font-medium">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
              <div className="w-6 h-3 border border-gray-400 rounded-sm">
                <div className="w-4 h-2 bg-green-500 rounded-sm m-0.5"></div>
              </div>
            </div>
          </div>

          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button className="text-blue-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  T
                </div>
                <span className="font-medium text-gray-900">txvishal09</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="w-5 h-5 text-gray-600" />
              <Video className="w-5 h-5 text-gray-600" />
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 bg-gray-50 px-4 py-4 space-y-4">
            {/* First Message */}
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-tl-md p-3 max-w-[200px] shadow-sm">
                <div className="text-xs text-gray-600 mb-2">
                  {settings.message}
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  Automation Powered by @ReplyRushh
                </div>
                <div className="bg-blue-500 text-white rounded-lg px-3 py-2 text-center">
                  <span className="text-xs font-medium">{settings.buttonTitle}</span>
                </div>
              </div>
            </div>

            {/* Second Message */}
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-tl-md p-3 max-w-[200px] shadow-sm">
                <div className="text-xs text-gray-600 mb-2">
                  Thank you for your lovely comment and likes.
                </div>
                <div className="text-xs text-gray-500">
                  Automation Powered by @ReplyRushh
                </div>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 px-4 py-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
                <span className="text-gray-500 text-sm">Message...</span>
              </div>
              <div className="flex items-center space-x-2">
                <Image className="w-5 h-5 text-gray-400" />
                <MessageCircle className="w-5 h-5 text-gray-400" />
                <div className="w-5 h-5 rounded-full bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
                <span>Engagement Starter</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Engagement Starter</h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex gap-6 max-w-7xl mx-auto">
            {/* Settings Form */}
            <div className="flex-1 space-y-6">
              {/* Mobile Preview for small screens */}
              <div className="lg:hidden mb-6">
                <h3 className="text-lg font-semibold mb-4">Mobile Preview</h3>
                <div className="flex justify-center">
                  <MobilePreview />
                </div>
              </div>

              {/* Engagement Starter Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Starter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Main Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Engagement Starter</Label>
                    </div>
                    <Switch
                      checked={settings.enabled}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enabled: checked }))}
                    />
                  </div>

                  {/* Auto Enable Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm">Automatically enable on new post</Label>
                    </div>
                    <Switch
                      checked={settings.autoEnableNewPosts}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoEnableNewPosts: checked }))}
                    />
                  </div>

                  {/* Enable for Already Liked Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm">Enable for Already liked Posts/Stories</Label>
                    </div>
                    <Switch
                      checked={settings.enableAlreadyLiked}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableAlreadyLiked: checked }))}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea
                      value={settings.message}
                      onChange={(e) => setSettings(prev => ({ ...prev, message: e.target.value }))}
                      className="min-h-[100px]"
                      placeholder="Enter your engagement message"
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {settings.message.length}/500
                    </p>
                  </div>

                  {/* Button Title */}
                  <div className="space-y-2">
                    <Label>Button Title</Label>
                    <Input
                      value={settings.buttonTitle}
                      onChange={(e) => setSettings(prev => ({ ...prev, buttonTitle: e.target.value }))}
                      placeholder="Enter button title"
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {settings.buttonTitle.length}/25
                    </p>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Notes:</Label>
                    <p className="text-sm text-muted-foreground italic">
                      {settings.notes}
                    </p>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-center pt-4">
                    <Button 
                      onClick={handleSave}
                      disabled={isLoading}
                      className="bg-blue-600 hover:bg-blue-700 px-8"
                    >
                      {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Desktop Mobile Preview - Right Side */}
            <div className="hidden lg:block w-80">
              <div className="sticky top-6">
                <h3 className="text-lg font-semibold mb-4">Mobile Preview</h3>
                <MobilePreview />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
