'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus } from "lucide-react";

interface OpenerConfig {
  question: string;
  type: string;
  message: string;
  template: {
    type: string;
    headline: string;
    description: string;
    buttonTitle: string;
    url: string;
  };
  autoReply: boolean;
  delayMessage: number;
}

export default function CreateWelcomeOpenerPage() {
  const router = useRouter();
  const [config, setConfig] = useState<OpenerConfig>({
    question: '',
    type: 'DM',
    message: 'Welcome! Thank you for following us.',
    template: {
      type: 'media',
      headline: 'Welcome',
      description: 'Thank you for joining our community!',
      buttonTitle: 'Get Started',
      url: ''
    },
    autoReply: true,
    delayMessage: 5
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/welcome-openers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        router.push('/welcome-openers');
      } else {
        console.error('Failed to create opener');
      }
    } catch (error) {
      console.error('Error creating opener:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/welcome-openers');
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b border-border px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push('/welcome-openers')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                <span>Home</span>
                <span>›</span>
                <span>Welcome Openers</span>
                <span>›</span>
                <span>Create</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Create Welcome Opener</h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="question">Question/Title</Label>
                  <Input
                    id="question"
                    placeholder="Enter welcome opener title"
                    value={config.question}
                    onChange={(e) => setConfig(prev => ({ ...prev, question: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={config.type} onValueChange={(value) => setConfig(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DM">DM</SelectItem>
                      <SelectItem value="Comment">Comment</SelectItem>
                      <SelectItem value="Story">Story</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Message Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Welcome Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="message">Welcome Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your welcome message"
                    value={config.message}
                    onChange={(e) => setConfig(prev => ({ ...prev, message: e.target.value }))}
                    className="h-20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="headline">Headline</Label>
                      <Input
                        id="headline"
                        placeholder="Welcome"
                        value={config.template.headline}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          template: { ...prev.template, headline: e.target.value }
                        }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Thank you for joining our community!"
                        value={config.template.description}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          template: { ...prev.template, description: e.target.value }
                        }))}
                        className="h-20"
                      />
                    </div>

                    <div>
                      <Label htmlFor="buttonTitle">Button Title</Label>
                      <Input
                        id="buttonTitle"
                        placeholder="Get Started"
                        value={config.template.buttonTitle}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          template: { ...prev.template, buttonTitle: e.target.value }
                        }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="url">URL (When button is pressed)</Label>
                      <Input
                        id="url"
                        type="url"
                        placeholder="https://example.com"
                        value={config.template.url}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          template: { ...prev.template, url: e.target.value }
                        }))}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-64 h-80 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                      {/* Header */}
                      <div className="bg-blue-500 text-white p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <span className="text-blue-500 text-xs">←</span>
                          </div>
                          <span className="text-sm font-medium">Welcome Message</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-4">
                        {/* Image placeholder */}
                        <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="text-center text-gray-400">
                            <div className="w-8 h-8 mx-auto mb-2 bg-gray-300 rounded"></div>
                            <p className="text-xs">Welcome Image</p>
                          </div>
                        </div>

                        {/* Headline */}
                        <div>
                          <p className="font-medium text-sm">{config.template.headline || 'Welcome'}</p>
                        </div>

                        {/* Description */}
                        <div>
                          <p className="text-xs text-gray-600">{config.template.description || 'Thank you for joining our community!'}</p>
                        </div>

                        {/* Button */}
                        <div>
                          <Button size="sm" className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs">
                            {config.template.buttonTitle || 'Get Started'}
                          </Button>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gray-50 p-2 text-center">
                        <p className="text-xs text-gray-500">Welcome Message</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Options */}
            <Card>
              <CardHeader>
                <CardTitle>Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Auto Reply</Label>
                        <p className="text-xs text-gray-500">Automatically send welcome message</p>
                      </div>
                      <Switch
                        checked={config.autoReply}
                        onCheckedChange={(checked) => setConfig(prev => ({ ...prev, autoReply: checked }))}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <Label className="text-sm font-medium">Delay Message</Label>
                      <Input
                        type="number"
                        placeholder="5"
                        value={config.delayMessage}
                        onChange={(e) => setConfig(prev => ({ ...prev, delayMessage: parseInt(e.target.value) || 0 }))}
                        className="w-20 text-center"
                      />
                      <span className="text-sm text-gray-500">seconds</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4 pt-6">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave}
                    disabled={isLoading || !config.question.trim()}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    {isLoading ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
