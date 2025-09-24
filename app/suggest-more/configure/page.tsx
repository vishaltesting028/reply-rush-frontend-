'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Plus, X } from "lucide-react";

interface SuggestMoreConfig {
  enabled: boolean;
  automaticallyEnable: boolean;
  enableForLinkedPosts: boolean;
  buttonTitle: string;
  url: string;
  headline: string;
  textDescription: string;
  uploadedImage: string | null;
}

export default function SuggestMoreConfigurePage() {
  const router = useRouter();
  const [config, setConfig] = useState<SuggestMoreConfig>({
    enabled: true,
    automaticallyEnable: true,
    enableForLinkedPosts: false,
    buttonTitle: 'Button Title',
    url: '',
    headline: 'Headline',
    textDescription: 'Automation Powered by @ReplyRush',
    uploadedImage: null
  });

  const handleSave = () => {
    console.log('Saving Suggest More configuration...', config);
    // Add save logic here
    router.push('/suggest-more');
  };

  const handleCancel = () => {
    router.push('/suggest-more');
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b border-border px-6 py-4">
        <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => router.push('/suggest-more')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
    
              <div>
                {/* <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                  <span>Home</span>
                  <span>›</span>
                  <span>Suggest More</span>
                </div> */}
                <h1 className="text-2xl font-bold text-foreground">Suggest More</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Main Toggle */}
            <Card>
              <CardHeader>
                <CardTitle>Suggest More</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Suggest More</Label>
                  </div>
                  <Switch
                    checked={config.enabled}
                    onCheckedChange={(checked) => setConfig(prev => ({ ...prev, enabled: checked }))}
                  />
                </div>

                {/* Configuration Options */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Automatically enable on new post</Label>
                      <p className="text-xs text-muted-foreground">Enable this feature automatically for new posts</p>
                    </div>
                    <Switch
                      checked={config.automaticallyEnable}
                      onCheckedChange={(checked) => setConfig(prev => ({ ...prev, automaticallyEnable: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Enable for Already linked Posts/Stories</Label>
                      <p className="text-xs text-muted-foreground">Apply to existing linked content</p>
                    </div>
                    <Switch
                      checked={config.enableForLinkedPosts}
                      onCheckedChange={(checked) => setConfig(prev => ({ ...prev, enableForLinkedPosts: checked }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Template Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Button Title</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Form */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <Button size="sm" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        Add Template (1/10)
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="url" className="text-sm font-medium">URL (When this button is Pressed)</Label>
                        <Input
                          id="url"
                          type="url"
                          placeholder="Enter url"
                          value={config.url}
                          onChange={(e) => setConfig(prev => ({ ...prev, url: e.target.value }))}
                          className="mt-1"
                        />
                        <p className="text-xs text-muted-foreground mt-1">0/40</p>
                      </div>

                      <div>
                        <Label htmlFor="buttonTitle" className="text-sm font-medium">Button Title</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm">T</span>
                          <Input
                            id="buttonTitle"
                            placeholder="Enter Title"
                            value={config.buttonTitle}
                            onChange={(e) => setConfig(prev => ({ ...prev, buttonTitle: e.target.value }))}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">0/40</p>
                      </div>

                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Button (1/3)
                      </Button>

                      <div>
                        <Label htmlFor="headline" className="text-sm font-medium">Headline</Label>
                        <Input
                          id="headline"
                          placeholder="Enter Headline"
                          value={config.headline}
                          onChange={(e) => setConfig(prev => ({ ...prev, headline: e.target.value }))}
                          className="mt-1"
                        />
                        <p className="text-xs text-muted-foreground mt-1">0/40</p>
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-sm font-medium">Text Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Automation Powered by @ReplyRush"
                          value={config.textDescription}
                          onChange={(e) => setConfig(prev => ({ ...prev, textDescription: e.target.value }))}
                          className="mt-1 h-20"
                        />
                        <p className="text-xs text-muted-foreground mt-1">32/500</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Preview */}
                  <div className="flex items-center justify-center">
                    {/* Device Frame */}
                    <div className="relative">
                      {/* Phone Frame */}
                      <div className="w-72 h-[500px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
                        {/* Screen */}
                        <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                          {/* Status Bar */}
                          <div className="h-6 bg-white flex items-center justify-between px-6 text-xs font-medium">
                            <span>9:41</span>
                            <div className="flex items-center space-x-1">
                              <div className="w-4 h-2 bg-black rounded-sm"></div>
                              <div className="w-6 h-3 border border-black rounded-sm">
                                <div className="w-4 h-1 bg-black rounded-sm mt-0.5 ml-0.5"></div>
                              </div>
                            </div>
                          </div>

                          {/* App Header */}
                          <div className="bg-blue-500 text-white px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                <span className="text-blue-500 text-sm font-bold">←</span>
                              </div>
                              <span className="text-sm font-semibold">tsvisha09</span>
                            </div>
                            <div className="flex space-x-1">
                              <div className="w-3 h-3 bg-white/30 rounded-sm"></div>
                              <div className="w-3 h-3 bg-white/30 rounded-sm"></div>
                              <div className="w-3 h-3 bg-white/30 rounded-sm"></div>
                            </div>
                          </div>

                          {/* Content Area */}
                          <div className="p-4 space-y-4 bg-gray-50 h-full">
                            {/* Image Upload Area */}
                            <div className="w-full h-40 bg-gray-200 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                              <div className="text-center text-gray-500">
                                <div className="w-12 h-12 mx-auto mb-2 bg-gray-400 rounded-lg flex items-center justify-center">
                                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                                <p className="text-xs font-medium">Upload Image Recommended size</p>
                                <p className="text-xs">1080×1080</p>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-3">
                              {/* Headline */}
                              <div>
                                <p className="font-semibold text-sm text-gray-900">{config.headline}</p>
                              </div>

                              {/* Description */}
                              <div>
                                <p className="text-xs text-gray-600 leading-relaxed">{config.textDescription}</p>
                              </div>

                              {/* Button Title */}
                              <div className="pt-2">
                                <p className="text-sm font-medium text-gray-900 mb-2">{config.buttonTitle}</p>
                              </div>

                              {/* Action Button */}
                              <div>
                                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-3 px-4 rounded-lg transition-colors">
                                  Shop Now
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Bottom Navigation Hint */}
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                            <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Notes:</span> The "Suggest More" feature lets you auto-send predefined templates, offering users extra product recommendations or information with a simple tap.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 pt-6">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600">
                    Save
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
