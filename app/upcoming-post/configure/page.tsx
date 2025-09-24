'use client';

import { useState } from 'react';
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";

interface ButtonData {
  id: string;
  title: string;
  url: string;
}

export default function UpcomingPostConfigurePage() {
  const [isToggleEnabled, setIsToggleEnabled] = useState(true);
  const [buttons, setButtons] = useState<ButtonData[]>([
    { id: '1', title: 'Price', url: 'https://www.instagram.com/p/DMH_nqhPnAr/' }
  ]);
  const [keywordTriggers, setKeywordTriggers] = useState<string[]>(['Buy', 'Link', 'Purchase', 'DM']);
  const [excludeKeywords, setExcludeKeywords] = useState<string[]>(['bad', 'horrible', 'Disappointed']);
  const [newKeyword, setNewKeyword] = useState('');
  const [newExcludeKeyword, setNewExcludeKeyword] = useState('');
  const [headline, setHeadline] = useState('Instagram');
  const [textDescription, setTextDescription] = useState('Automation Powered by @ReplyRush');

  const handleSave = () => {
    console.log('Saving upcoming post configuration...', {
      buttons,
      keywordTriggers,
      excludeKeywords,
      headline,
      textDescription
    });
    // Add save logic here - could send to backend API
    alert('Configuration saved successfully!');
  };

  const handleCancel = () => {
    console.log('Cancelling upcoming post configuration...');
    // Reset form or navigate back
    window.history.back();
  };

  const addNewButton = () => {
    if (buttons.length < 3) {
      const newButton: ButtonData = {
        id: Date.now().toString(),
        title: '',
        url: ''
      };
      setButtons([...buttons, newButton]);
    }
  };

  const removeButton = (buttonId: string) => {
    setButtons(buttons.filter(button => button.id !== buttonId));
  };

  const updateButton = (buttonId: string, field: 'title' | 'url', value: string) => {
    setButtons(buttons.map(button => 
      button.id === buttonId ? { ...button, [field]: value } : button
    ));
  };

  const addKeyword = (keyword: string, type: 'trigger' | 'exclude') => {
    if (keyword.trim()) {
      if (type === 'trigger') {
        setKeywordTriggers([...keywordTriggers, keyword.trim()]);
        setNewKeyword('');
      } else {
        setExcludeKeywords([...excludeKeywords, keyword.trim()]);
        setNewExcludeKeyword('');
      }
    }
  };

  const removeKeyword = (keyword: string, type: 'trigger' | 'exclude') => {
    if (type === 'trigger') {
      setKeywordTriggers(keywordTriggers.filter(k => k !== keyword));
    } else {
      setExcludeKeywords(excludeKeywords.filter(k => k !== keyword));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, keyword: string, type: 'trigger' | 'exclude') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword(keyword, type);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/upcoming-post" className="flex items-center space-x-2 text-blue-500 hover:text-blue-600">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Back to Upcoming Post</span>
              </Link>
            </div>
          </div>
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-foreground">Configure Upcoming Post</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            <div className="max-w-6xl mx-auto">
              {/* Configuration Sections */}
              <div className="space-y-8">
                {/* Keywords Section */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Choose Trigger Type</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>Keywords</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-md font-medium text-gray-700 mb-3">Keyword Trigger</h4>
                    <p className="text-sm text-gray-500 mb-3">AI will detect keywords in double-quotes and capital word of your caption.</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Keyword Trigger</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            value={newKeyword}
                            onChange={(e) => setNewKeyword(e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e, newKeyword, 'trigger')}
                            placeholder="Save each trigger keyword by pressing the Enter or Add Key"
                            className="w-full p-3 border border-gray-300 rounded-md pr-10"
                          />
                          <button 
                            onClick={() => addKeyword(newKeyword, 'trigger')}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-blue-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {keywordTriggers.map((keyword, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1">
                              {keyword}
                              <button 
                                onClick={() => removeKeyword(keyword, 'trigger')}
                                className="hover:text-blue-900 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Exclude Keyword Trigger</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            value={newExcludeKeyword}
                            onChange={(e) => setNewExcludeKeyword(e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e, newExcludeKeyword, 'exclude')}
                            placeholder="Save each trigger keyword by pressing the Enter or Add Key"
                            className="w-full p-3 border border-gray-300 rounded-md pr-10"
                          />
                          <button 
                            onClick={() => addKeyword(newExcludeKeyword, 'exclude')}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-blue-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {excludeKeywords.map((keyword, index) => (
                            <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm flex items-center gap-1">
                              {keyword}
                              <button 
                                onClick={() => removeKeyword(keyword, 'exclude')}
                                className="hover:text-red-900 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Template Section */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Template</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Choose Template Type</label>
                    <div className="flex space-x-4">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Media Template</button>
                      <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Text Message</button>
                      <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Quick Replies</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <button className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-sm">Add Template (1/10)</button>
                      </div>
                      
                      {/* Dynamic Button Management */}
                      <div className="space-y-4 mb-6">
                        {buttons.map((button, index) => (
                          <div key={button.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-3">
                              <h5 className="text-sm font-medium text-gray-700">Button {index + 1}</h5>
                              {buttons.length > 1 && (
                                <button 
                                  onClick={() => removeButton(button.id)}
                                  className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                            
                            <div className="mb-3">
                              <label className="block text-sm font-medium text-gray-700 mb-2">URL (When this button is Pressed)</label>
                              <input 
                                type="url" 
                                value={button.url}
                                onChange={(e) => updateButton(button.id, 'url', e.target.value)}
                                placeholder="https://www.instagram.com/p/DMH_nqhPnAr/"
                                className="w-full p-2 border border-gray-300 rounded-md"
                              />
                            </div>

                            <div className="mb-3">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Button Title</label>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm">T</span>
                                <input 
                                  type="text" 
                                  value={button.title}
                                  onChange={(e) => updateButton(button.id, 'title', e.target.value)}
                                  placeholder="Price"
                                  className="flex-1 p-2 border border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={addNewButton}
                        disabled={buttons.length >= 3}
                        className={`px-4 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                          buttons.length >= 3 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                        Add New Button ({buttons.length}/3)
                      </button>

                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
                        <input 
                          type="text" 
                          value={headline}
                          onChange={(e) => setHeadline(e.target.value)}
                          placeholder="Instagram"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Text Description</label>
                        <textarea 
                          value={textDescription}
                          onChange={(e) => setTextDescription(e.target.value)}
                          placeholder="Automation Powered by @ReplyRush"
                          className="w-full p-2 border border-gray-300 rounded-md h-20"
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
                </div>

                {/* Options Section */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Options</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="mb-6">
                        <h4 className="text-md font-medium text-gray-700 mb-2">Comment Auto Reply</h4>
                        <p className="text-sm text-gray-500 mb-3">Automatically send a reply to the user's comment on the post.</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Send Once</span>
                          <div className="relative inline-flex items-center">
                            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500 cursor-pointer">
                              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Send once per user per post</p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-md font-medium text-gray-700 mb-2">Engagement Starter</h4>
                        <p className="text-sm text-gray-500 mb-3">Automatically sends a introductory message or DM to users (Opening DM).</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Email Collector</span>
                          <div className="relative inline-flex items-center">
                            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 cursor-pointer">
                              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Send message to collect user email</p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-md font-medium text-gray-700 mb-2">Follow-Gated DM</h4>
                        <p className="text-sm text-gray-500 mb-3">Sends a message to user who don't follow your account.</p>
                      </div>
                    </div>

                    <div>
                      <div className="mb-6">
                        <h4 className="text-md font-medium text-gray-700 mb-2">Suggest More</h4>
                        <p className="text-sm text-gray-500 mb-3">Increase user engagement and sales by sending multiple suggested cards.</p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-md font-medium text-gray-700 mb-2">Reply Time</h4>
                        <div className="flex items-center space-x-2">
                          <label className="text-sm font-medium text-gray-700">Delay Message</label>
                          <input 
                            type="number" 
                            placeholder="mm:ss"
                            className="w-20 p-1 border border-gray-300 rounded text-center text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4 mt-8">
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
