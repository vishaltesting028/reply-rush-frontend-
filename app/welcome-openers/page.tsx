'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Edit, Trash2, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface WelcomeOpener {
  id: number;
  question: string;
  type: string;
  open: number;
  sent: number;
  click: number;
  action: string;
  createdAt: Date;
}

export default function WelcomeOpenersPage() {
  const router = useRouter();
  const [openers, setOpeners] = useState<WelcomeOpener[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOpeners();
  }, []);

  const loadOpeners = async () => {
    try {
      const response = await fetch('/api/welcome-openers', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setOpeners(data.data);
        }
      }
    } catch (error) {
      console.error('Error loading openers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOpener = () => {
    router.push('/welcome-openers/create');
  };

  const handleViewOpener = (id: number) => {
    router.push(`/welcome-openers/${id}`);
  };

  const handleEditOpener = (id: number) => {
    router.push(`/welcome-openers/${id}/edit`);
  };

  const handleDeleteOpener = async (id: number) => {
    if (confirm('Are you sure you want to delete this opener?')) {
      try {
        const response = await fetch(`/api/welcome-openers/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          loadOpeners();
        }
      } catch (error) {
        console.error('Error deleting opener:', error);
      }
    }
  };

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
                <span>Welcome Openers</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Welcome Openers</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                onClick={handleCreateOpener}
                className="bg-blue-500 hover:bg-blue-600 text-white"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Welcome Opener (0/4)
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Welcome Openers Table */}
            <div className="bg-white rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-700">QUESTION</TableHead>
                    <TableHead className="font-semibold text-gray-700">TYPE</TableHead>
                    <TableHead className="font-semibold text-gray-700">OPEN</TableHead>
                    <TableHead className="font-semibold text-gray-700">SENT</TableHead>
                    <TableHead className="font-semibold text-gray-700">CLICK</TableHead>
                    <TableHead className="font-semibold text-gray-700">ACTION</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        Loading openers...
                      </TableCell>
                    </TableRow>
                  ) : openers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-16">
                        <div className="flex flex-col items-center space-y-6">
                          {/* Instagram-style conversation mockup */}
                          <div className="relative w-80 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 flex flex-col justify-center items-center">
                            {/* Profile section */}
                            <div className="absolute top-4 left-4 flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">U</span>
                              </div>
                              <span className="text-sm font-medium text-gray-600">User</span>
                            </div>

                            {/* Chat messages */}
                            <div className="space-y-3 w-full max-w-xs">
                              {/* User message */}
                              <div className="flex justify-end">
                                <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-br-md text-sm max-w-xs">
                                  Hey! I love your content
                                </div>
                              </div>

                              {/* Bot response */}
                              <div className="flex justify-start">
                                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-md text-sm max-w-xs">
                                  Thank you! Check out our latest collection
                                </div>
                              </div>

                              {/* Quick reply options */}
                              <div className="flex justify-start">
                                <div className="space-y-2">
                                  <div className="bg-white border border-blue-200 text-blue-600 px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-blue-50">
                                    Yes Please
                                  </div>
                                  <div className="bg-white border border-blue-200 text-blue-600 px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-blue-50">
                                    Tell me more
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute bottom-4 right-4 w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20"></div>
                            <div className="absolute top-1/2 right-8 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-30"></div>
                          </div>

                          <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Welcome Openers Yet</h3>
                            <p className="text-gray-500">Create your first welcome opener to automatically engage with new followers</p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    openers.map((opener) => (
                      <TableRow key={opener.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                              <div className="w-6 h-6 bg-gradient-to-br from-blue-200 to-indigo-200 rounded"></div>
                            </div>
                            <div>
                              <div className="font-medium">{opener.question}</div>
                              <div className="text-sm text-gray-500">
                                Created {new Date(opener.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {opener.type}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-600">{opener.open}</TableCell>
                        <TableCell className="text-gray-600">{opener.sent}</TableCell>
                        <TableCell className="text-gray-600">{opener.click}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              opener.action === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {opener.action}
                            </span>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewOpener(opener.id)}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditOpener(opener.id)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteOpener(opener.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
