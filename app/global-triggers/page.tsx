'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
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

interface GlobalTrigger {
  id: number;
  name: string;
  type: string;
  open: number;
  sent: number;
  click: number;
  action: string;
  createdAt: Date;
}

export default function GlobalTriggersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [triggers, setTriggers] = useState<GlobalTrigger[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTriggers();
  }, []);

  const loadTriggers = async () => {
    try {
      const response = await fetch('/api/global-triggers', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setTriggers(data.data);
        }
      }
    } catch (error) {
      console.error('Error loading triggers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTrigger = () => {
    router.push('/global-triggers/create');
  };

  const handleViewTrigger = (id: number) => {
    router.push(`/global-triggers/${id}`);
  };

  const handleEditTrigger = (id: number) => {
    router.push(`/global-triggers/${id}/edit`);
  };

  const handleDeleteTrigger = async (id: number) => {
    if (confirm('Are you sure you want to delete this trigger?')) {
      try {
        const response = await fetch(`/api/global-triggers/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          loadTriggers();
        }
      } catch (error) {
        console.error('Error deleting trigger:', error);
      }
    }
  };

  const filteredTriggers = triggers.filter(trigger => {
    const matchesSearch = trigger.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'All' || trigger.type === filterType;
    return matchesSearch && matchesFilter;
  });

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
                <span>Global Triggers</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Global Triggers</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                onClick={handleCreateTrigger}
                className="bg-blue-500 hover:bg-blue-600 text-white"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Global Triggers
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by trigger"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Story">Story</SelectItem>
                    <SelectItem value="Post">Post</SelectItem>
                    <SelectItem value="Reel">Reel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Triggers Table */}
            <div className="bg-white rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-700">SR NO</TableHead>
                    <TableHead className="font-semibold text-gray-700">TRIGGERS</TableHead>
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
                      <TableCell colSpan={7} className="text-center py-8">
                        Loading triggers...
                      </TableCell>
                    </TableRow>
                  ) : filteredTriggers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-64 h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-purple-200 rounded"></div>
                              </div>
                              <p className="text-sm text-gray-500">No triggers found</p>
                            </div>
                          </div>
                          <Button 
                            onClick={handleCreateTrigger}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Create Your First Trigger
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTriggers.map((trigger, index) => (
                      <TableRow key={trigger.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-orange-100 rounded-lg flex items-center justify-center">
                              <div className="w-6 h-6 bg-gradient-to-br from-pink-200 to-orange-200 rounded"></div>
                            </div>
                            <div>
                              <div className="font-medium">{trigger.name}</div>
                              <div className="text-sm text-gray-500">
                                Created {new Date(trigger.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {trigger.type}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-600">{trigger.open}</TableCell>
                        <TableCell className="text-gray-600">{trigger.sent}</TableCell>
                        <TableCell className="text-gray-600">{trigger.click}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              trigger.action === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {trigger.action}
                            </span>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewTrigger(trigger.id)}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditTrigger(trigger.id)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteTrigger(trigger.id)}
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
