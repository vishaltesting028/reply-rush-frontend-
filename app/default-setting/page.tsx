'use client';

import { useState, useEffect } from 'react';
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Info, Upload, Phone, Video, Image, MessageCircle, Download, Trash2 } from "lucide-react";

interface DefaultSettings {
  triggerType: string;
  keywordTriggers: string[];
  excludeKeywords: string[];
  templateType: string;
  textMessage: string;
  quickReplies: string;
  urlWhenPressed: string;
  buttonTitle: string;
  headline: string;
  textDescription: string;
  sendOnce: boolean;
  delayMessage: number;
  suggestMore: boolean;
  uploadedImage?: string;
}

export default function DefaultSettingPage() {
  const [settings, setSettings] = useState<DefaultSettings>({
    triggerType: 'keywords',
    keywordTriggers: ['Buy', 'Link', 'Purchase', 'DM'],
    excludeKeywords: ['Bad', 'Horrible', 'Disappointed'],
    templateType: 'media',
    textMessage: 'Automation Powered by @ReplyRushh',
    quickReplies: 'Text Message',
    urlWhenPressed: '',
    buttonTitle: '',
    headline: '',
    textDescription: 'Automation Powered by @ReplyRushh',
    sendOnce: true,
    delayMessage: 5,
    suggestMore: true
  });

  const [newKeyword, setNewKeyword] = useState('');
  const [newExcludeKeyword, setNewExcludeKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const addKeyword = () => {
    if (newKeyword.trim() && !settings.keywordTriggers.includes(newKeyword.trim())) {
      setSettings(prev => ({
        ...prev,
        keywordTriggers: [...prev.keywordTriggers, newKeyword.trim()]
      }));
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setSettings(prev => ({
      ...prev,
      keywordTriggers: prev.keywordTriggers.filter(k => k !== keyword)
    }));
  };

  const addExcludeKeyword = () => {
    if (newExcludeKeyword.trim() && !settings.excludeKeywords.includes(newExcludeKeyword.trim())) {
      setSettings(prev => ({
        ...prev,
        excludeKeywords: [...prev.excludeKeywords, newExcludeKeyword.trim()]
      }));
      setNewExcludeKeyword('');
    }
  };

  const removeExcludeKeyword = (keyword: string) => {
    setSettings(prev => ({
      ...prev,
      excludeKeywords: prev.excludeKeywords.filter(k => k !== keyword)
    }));
  };

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/default-settings', {
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

  // Image upload handlers
  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        setSettings(prev => ({ ...prev, uploadedImage: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const downloadImage = () => {
    if (uploadedImage) {
      const link = document.createElement('a');
      link.href = uploadedImage;
      link.download = 'template-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setSettings(prev => ({ ...prev, uploadedImage: undefined }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/default-settings', {
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
          // You could add a toast notification here
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
        {/* Phone Frame */}
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
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-tl-md p-3 max-w-[200px] shadow-sm">
                {/* Image Placeholder */}
                <div className="bg-gray-200 rounded-lg mb-3 h-32 flex items-center justify-center overflow-hidden">
                  {uploadedImage ? (
                    <img 
                      src={uploadedImage} 
                      alt="Template preview" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white rounded-full mx-auto mb-2 flex items-center justify-center">
                        <Image className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="w-16 h-3 bg-white rounded mx-auto mb-1"></div>
                      <div className="w-12 h-3 bg-white rounded mx-auto"></div>
                    </div>
                  )}
                </div>
                
                {/* Headline */}
                <div className="font-semibold text-sm text-gray-900 mb-1">
                  {settings.headline || 'Headline'}
                </div>
                
                {/* Description */}
                <div className="text-xs text-gray-600 mb-3">
                  {settings.textDescription || 'Automation Powered by @ReplyRushh'}
                </div>
                
                {/* Button */}
                <div className="bg-gray-100 rounded-lg px-3 py-2 text-center">
                  <span className="text-sm font-medium text-gray-700">
                    {settings.buttonTitle || 'Button Title'}
                  </span>
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
                <span>Default Settings</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Default Settings</h1>
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

            {/* Choose Trigger Type */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Choose Trigger Type
                  <Info className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Select value={settings.triggerType} onValueChange={(value) => setSettings(prev => ({ ...prev, triggerType: value }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="keywords">Keywords</SelectItem>
                      <SelectItem value="mentions">Mentions</SelectItem>
                      <SelectItem value="hashtags">Hashtags</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Keyword Trigger */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      Keyword Trigger
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add keywords"
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                      />
                      <Button onClick={addKeyword} size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      * Save each trigger keyword by pressing the Enter or Add key
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {settings.keywordTriggers.map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {keyword}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeKeyword(keyword)} />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Exclude Keyword Trigger */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      Exclude Keyword Trigger
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add keywords"
                        value={newExcludeKeyword}
                        onChange={(e) => setNewExcludeKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addExcludeKeyword()}
                      />
                      <Button onClick={addExcludeKeyword} size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      * Save each trigger keyword by pressing the Enter or Add key
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {settings.excludeKeywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {keyword}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeExcludeKeyword(keyword)} />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Template */}
            <Card>
              <CardHeader>
                <CardTitle>Template</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    Choose Template Type
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </Label>
                  <div className="flex gap-4">
                    <Button
                      variant={settings.templateType === 'media' ? 'default' : 'outline'}
                      onClick={() => setSettings(prev => ({ ...prev, templateType: 'media' }))}
                      className="flex items-center gap-2"
                    >
                      Media Template
                    </Button>
                    <Button
                      variant={settings.templateType === 'text' ? 'default' : 'outline'}
                      onClick={() => setSettings(prev => ({ ...prev, templateType: 'text' }))}
                      className="flex items-center gap-2"
                    >
                      Text Message
                    </Button>
                    <Button
                      variant={settings.templateType === 'quick' ? 'default' : 'outline'}
                      onClick={() => setSettings(prev => ({ ...prev, templateType: 'quick' }))}
                      className="flex items-center gap-2"
                    >
                      Quick Replies
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Add Template (1/10)
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="flex items-center gap-2">
                          URL (When this button is Pressed)
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </Label>
                        <Input
                          placeholder="Enter URL"
                          value={settings.urlWhenPressed}
                          onChange={(e) => setSettings(prev => ({ ...prev, urlWhenPressed: e.target.value }))}
                        />
                      </div>

                      <div>
                        <Label className="flex items-center gap-2">
                          Button Title
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </Label>
                        <Input
                          placeholder="Button Title"
                          value={settings.buttonTitle}
                          onChange={(e) => setSettings(prev => ({ ...prev, buttonTitle: e.target.value }))}
                        />
                        <p className="text-xs text-muted-foreground mt-1">0/40</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="flex items-center gap-2">
                          Headline
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </Label>
                        <Input
                          placeholder="Enter headline"
                          value={settings.headline}
                          onChange={(e) => setSettings(prev => ({ ...prev, headline: e.target.value }))}
                        />
                        <p className="text-xs text-muted-foreground mt-1">0/40</p>
                      </div>

                      <div>
                        <Label className="flex items-center gap-2">
                          Text Description
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </Label>
                        <Textarea
                          placeholder="Enter description"
                          value={settings.textDescription}
                          onChange={(e) => setSettings(prev => ({ ...prev, textDescription: e.target.value }))}
                          className="min-h-[100px]"
                        />
                        <p className="text-xs text-muted-foreground mt-1">37/500</p>
                      </div>
                    </div>
                  </div>

                  {/* Image Upload Area */}
                  <div className="space-y-4">
                    {uploadedImage ? (
                      /* Image Preview */
                      <div className="relative border-2 border-gray-200 rounded-lg p-4">
                        <img 
                          src={uploadedImage} 
                          alt="Uploaded template" 
                          className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                        <div className="flex justify-center gap-3">
                          <Button
                            onClick={downloadImage}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                          <Button
                            onClick={removeImage}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      /* Upload Area */
                      <div 
                        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                          dragActive 
                            ? 'border-blue-400 bg-blue-50' 
                            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('image-upload')?.click()}
                      >
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          Upload Image (Recommended size: 1080×1080)
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PNG, JPG, GIF up to 10MB
                        </p>
                        
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </div>
                    )}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="flex items-center gap-2">
                          Send Once
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </Label>
                        <p className="text-xs text-muted-foreground">Send once per user per post</p>
                      </div>
                      <Switch
                        checked={settings.sendOnce}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, sendOnce: checked }))}
                      />
                    </div>

                    <div>
                      <Label className="flex items-center gap-2">
                        Suggest More
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </Label>
                      <p className="text-xs text-muted-foreground mb-2">
                        Increase user engagement and sales by sending multiple suggestion cards.
                      </p>
                      <Switch
                        checked={settings.suggestMore}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, suggestMore: checked }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="flex items-center gap-2">
                        Reply Time
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </Label>
                      <p className="text-xs text-muted-foreground mb-2">Delay Message</p>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={settings.delayMessage}
                          onChange={(e) => setSettings(prev => ({ ...prev, delayMessage: parseInt(e.target.value) || 0 }))}
                          className="w-20"
                        />
                        <span className="text-sm text-muted-foreground">mins</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6">
                  <Button variant="outline">
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
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
