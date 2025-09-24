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
import { ArrowLeft, Plus, X } from "lucide-react";

interface TriggerConfig {
  name: string;
  type: string;
  triggerType: string;
  keywordTriggers: string[];
  excludeKeywords: string[];
  templateType: string;
  headline: string;
  textDescription: string;
  buttonTitle: string;
  url: string;
  sendOnce: boolean;
  delayMessage: number;
}

export default function CreateGlobalTriggerPage() {
  const router = useRouter();
  const [config, setConfig] = useState<TriggerConfig>({
    name: '',
    type: 'Story',
    triggerType: 'keywords',
    keywordTriggers: [],
    excludeKeywords: [],
    templateType: 'media',
    headline: '',
    textDescription: 'Automation Powered by @ReplyRush',
    buttonTitle: '',
    url: '',
    sendOnce: true,
    delayMessage: 5
  });

  const [newKeyword, setNewKeyword] = useState('');
  const [newExcludeKeyword, setNewExcludeKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !config.keywordTriggers.includes(newKeyword.trim())) {
      setConfig(prev => ({
        ...prev,
        keywordTriggers: [...prev.keywordTriggers, newKeyword.trim()]
      }));
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setConfig(prev => ({
      ...prev,
      keywordTriggers: prev.keywordTriggers.filter(k => k !== keyword)
    }));
  };

  const handleAddExcludeKeyword = () => {
    if (newExcludeKeyword.trim() && !config.excludeKeywords.includes(newExcludeKeyword.trim())) {
      setConfig(prev => ({
        ...prev,
        excludeKeywords: [...prev.excludeKeywords, newExcludeKeyword.trim()]
      }));
      setNewExcludeKeyword('');
    }
  };

  const handleRemoveExcludeKeyword = (keyword: string) => {
    setConfig(prev => ({
      ...prev,
      excludeKeywords: prev.excludeKeywords.filter(k => k !== keyword)
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/global-triggers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        router.push('/global-triggers');
      } else {
        console.error('Failed to create trigger');
      }
    } catch (error) {
      console.error('Error creating trigger:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/global-triggers');
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
              onClick={() => router.push('/global-triggers')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                <span>Home</span>
                <span>›</span>
                <span>Global Triggers</span>
                <span>›</span>
                <span>Create</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Create Global Trigger</h1>
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
                  <Label htmlFor="name">Trigger Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter trigger name"
                    value={config.name}
                    onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={config.type} onValueChange={(value) => setConfig(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Story">Story</SelectItem>
                      <SelectItem value="Post">Post</SelectItem>
                      <SelectItem value="Reel">Reel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Keywords Section */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Trigger Type</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Keywords</Label>
                  <Select value={config.triggerType} onValueChange={(value) => setConfig(prev => ({ ...prev, triggerType: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="keywords">Keywords</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-3">Keyword Trigger</h4>
                  <p className="text-sm text-gray-500 mb-3">AI will detect keywords in double-quotes and capital word of your caption.</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2">Keyword Trigger</Label>
                      <div className="relative">
                        <Input 
                          placeholder="Save each trigger keyword by pressing the Enter or Add Key"
                          value={newKeyword}
                          onChange={(e) => setNewKeyword(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                          className="pr-10"
                        />
                        <button 
                          onClick={handleAddKeyword}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {config.keywordTriggers.map((keyword, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center">
                            {keyword}
                            <button 
                              onClick={() => handleRemoveKeyword(keyword)}
                              className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2">Exclude Keyword Trigger</Label>
                      <div className="relative">
                        <Input 
                          placeholder="Save each trigger keyword by pressing the Enter or Add Key"
                          value={newExcludeKeyword}
                          onChange={(e) => setNewExcludeKeyword(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddExcludeKeyword()}
                          className="pr-10"
                        />
                        <button 
                          onClick={handleAddExcludeKeyword}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {config.excludeKeywords.map((keyword, index) => (
                          <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm flex items-center">
                            {keyword}
                            <button 
                              onClick={() => handleRemoveExcludeKeyword(keyword)}
                              className="ml-1 text-red-600 hover:text-red-800"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Template Section */}
            <Card>
              <CardHeader>
                <CardTitle>Template</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Choose Template Type</Label>
                  <div className="flex space-x-4 mt-2">
                    <button 
                      onClick={() => setConfig(prev => ({ ...prev, templateType: 'media' }))}
                      className={`px-4 py-2 rounded-md ${config.templateType === 'media' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      Media Template
                    </button>
                    <button 
                      onClick={() => setConfig(prev => ({ ...prev, templateType: 'text' }))}
                      className={`px-4 py-2 rounded-md ${config.templateType === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      Text Message
                    </button>
                    <button 
                      onClick={() => setConfig(prev => ({ ...prev, templateType: 'quick' }))}
                      className={`px-4 py-2 rounded-md ${config.templateType === 'quick' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      Quick Replies
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="url">URL (When this button is Pressed)</Label>
                      <Input
                        id="url"
                        type="url"
                        placeholder="https://www.instagram.com/p/DMH_nqhPnAr/"
                        value={config.url}
                        onChange={(e) => setConfig(prev => ({ ...prev, url: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="buttonTitle">Button Title</Label>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">T</span>
                        <Input
                          id="buttonTitle"
                          placeholder="Price"
                          value={config.buttonTitle}
                          onChange={(e) => setConfig(prev => ({ ...prev, buttonTitle: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="headline">Headline</Label>
                      <Input
                        id="headline"
                        placeholder="Instagram"
                        value={config.headline}
                        onChange={(e) => setConfig(prev => ({ ...prev, headline: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Text Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Automation Powered by @ReplyRush"
                        value={config.textDescription}
                        onChange={(e) => setConfig(prev => ({ ...prev, textDescription: e.target.value }))}
                        className="h-20"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-48 h-64 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-2xl">📷</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Options Section */}
            <Card>
              <CardHeader>
                <CardTitle>Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-md font-medium text-gray-700 mb-2">Comment Auto Reply</h4>
                      <p className="text-sm text-gray-500 mb-3">Automatically send a reply to the user's comment on the post.</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Send Once</span>
                        <Switch
                          checked={config.sendOnce}
                          onCheckedChange={(checked) => setConfig(prev => ({ ...prev, sendOnce: checked }))}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Send once per user per post</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-md font-medium text-gray-700 mb-2">Reply Time</h4>
                      <div className="flex items-center space-x-2">
                        <Label className="text-sm font-medium text-gray-700">Delay Message</Label>
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
                </div>

                <div className="flex justify-center space-x-4 mt-8">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave}
                    disabled={isLoading || !config.name.trim()}
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
