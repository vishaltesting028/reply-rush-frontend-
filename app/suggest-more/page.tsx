'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronUp, ChevronDown } from "lucide-react";

interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface SuggestMoreSettings {
  enabled: boolean;
  products: Product[];
  notes: string;
}

export default function SuggestMorePage() {
  const [settings, setSettings] = useState<SuggestMoreSettings>({
    enabled: false,
    products: [
      {
        id: 1,
        image: '/api/placeholder/150/200',
        title: 'Stylish Outfit',
        description: 'Perfect for casual wear'
      },
      {
        id: 2,
        image: '/api/placeholder/150/200',
        title: 'Fashion Accessory',
        description: 'Complete your look'
      },
      {
        id: 3,
        image: '/api/placeholder/150/200',
        title: 'Trendy Wear',
        description: 'Latest fashion trends'
      },
      {
        id: 4,
        image: '/api/placeholder/150/200',
        title: 'Designer Item',
        description: 'Premium quality'
      }
    ],
    notes: 'The "Suggest More" feature lets you auto-send predefined templates, offering users extra product recommendations or information with a simple tap.'
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Redirect to configure page when toggle is enabled
  useEffect(() => {
    if (settings.enabled) {
      router.push('/suggest-more/configure');
    }
  }, [settings.enabled, router]);

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/suggest-more', {
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
      const response = await fetch('/api/suggest-more', {
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

  // Product Carousel Component
  const ProductCarousel = () => (
    <div className="relative bg-white rounded-lg p-8 min-h-[500px] flex items-center justify-center">
      <div className="relative">
        {/* Main Instagram Post */}
        <div className="w-72 h-96 bg-gray-100 rounded-2xl shadow-lg relative overflow-hidden">
          {/* Main fashion image - realistic photo style */}
          <div className="w-full h-full relative" style={{
            backgroundImage: 'linear-gradient(135deg, #f5f1eb 0%, #e8ddd4 50%, #d4c4b0 100%)',
          }}>
            {/* Fashion model silhouette */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Model figure */}
                <div className="w-24 h-56 relative">
                  {/* Head */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-orange-300 rounded-full"></div>
                  {/* Hair */}
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-orange-800 rounded-full"></div>
                  {/* Sunglasses */}
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-black rounded-full"></div>
                  {/* Brown top */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-orange-900 rounded-t-lg"></div>
                  {/* Blue jeans */}
                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-14 h-32 bg-blue-700 rounded-b-lg"></div>
                  {/* Brown bag */}
                  <div className="absolute top-12 -right-2 w-6 h-8 bg-orange-800 rounded-lg transform rotate-12"></div>
                </div>
              </div>
            </div>
            
            {/* Instagram overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">F</span>
                </div>
                <span className="text-white text-sm font-medium">fashion_cloth</span>
              </div>
              <div className="text-white text-sm mb-2">
                Comment 'Link' and I'll send to your DM 😍
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                <span className="text-white text-xs">Send Me Link Please</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product suggestion cards */}
        {/* Top left product */}
        <div className="absolute -top-6 left-4 w-20 h-28 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="w-full h-16 bg-orange-500 relative">
          </div>
          <div className="p-1 text-center">
            <div className="text-xs text-gray-600 mb-1">Summer Collection</div>
            <div className="text-xs font-semibold bg-gray-100 px-1 py-1 rounded">Shop Now</div>
          </div>
          {/* Arrow pointing down */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-l-transparent border-r-transparent border-t-gray-300"></div>
        </div>

        {/* Top center product */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-8 h-28 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="w-full h-16 bg-pink-400 relative">
          </div>
          <div className="p-1 text-center">
            <div className="text-xs text-gray-600 mb-1">S</div>
            <div className="text-xs font-semibold bg-gray-100 px-1 py-1 rounded text-xs">Shop</div>
          </div>
          {/* Arrow pointing down */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-l-transparent border-r-transparent border-t-gray-300"></div>
        </div>

        {/* Top right product */}
        <div className="absolute -top-6 right-4 w-20 h-28 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="w-full h-16 bg-red-500 relative">
          </div>
          <div className="p-1 text-center">
            <div className="text-xs text-gray-600 mb-1">Summer Collection</div>
            <div className="text-xs font-semibold bg-gray-100 px-1 py-1 rounded">Shop Now</div>
          </div>
          {/* Arrow pointing down */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-l-transparent border-r-transparent border-t-gray-300"></div>
        </div>

        {/* Right side product */}
        <div className="absolute top-16 -right-4 w-20 h-28 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="w-full h-16 bg-yellow-400 relative">
          </div>
          <div className="p-1 text-center">
            <div className="text-xs text-gray-600 mb-1">Buy Now!</div>
            <div className="text-xs font-semibold bg-gray-100 px-1 py-1 rounded">Buy Now</div>
          </div>
          {/* Arrow pointing left */}
          <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-0 h-0 border-t-3 border-b-3 border-r-3 border-t-transparent border-b-transparent border-r-gray-300"></div>
        </div>

        {/* Dotted connection lines */}
        <div className="absolute top-18 left-16 w-8 border-t-2 border-dotted border-gray-400"></div>
        <div className="absolute top-18 left-1/2 transform -translate-x-1/2 w-8 border-t-2 border-dotted border-gray-400"></div>
        <div className="absolute top-18 right-16 w-8 border-t-2 border-dotted border-gray-400"></div>
        <div className="absolute top-28 right-12 h-8 border-r-2 border-dotted border-gray-400"></div>

        {/* Suggest More Button */}
        <div className="absolute bottom-12 right-2">
          <div className="relative">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl text-sm font-medium shadow-lg">
              Suggest More
            </div>
            <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-blue-500"></div>
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
                <span>Suggest More</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Suggest More</h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Suggest More Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Suggest More</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Suggest More</Label>
                  </div>
                  <Switch
                    checked={settings.enabled}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enabled: checked }))}
                  />
                </div>

                {/* Product Carousel Display */}
                <div className="flex justify-center">
                  <img
                    className=''
                    src='/images/Suggest_More.png'
                    alt="Suggest More Preview"
                  />
                </div>

                {/* Notes */}
                <div className="space-y-2 mt-6">
                  <Label className="text-sm font-medium text-muted-foreground">Notes:</Label>
                  <p className="text-sm text-muted-foreground italic">
                    {settings.notes}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
