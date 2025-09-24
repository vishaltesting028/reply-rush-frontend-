'use client';

import { useState, useEffect } from 'react';
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, User, Eye, EyeOff } from "lucide-react";
// import { useAuth } from "../../hooks/useAuth";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  company: string;
  website: string;
}

export default function ProfilePage() {
  // const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    name: '',
    email: '',
    phone: '',
    bio: '',
    avatar: '',
    company: '',
    website: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      // Get user data from authentication endpoint
      const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/me`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        if (userData.success && userData.user) {
          setIsAuthenticated(true);
          setProfile(prev => ({
            ...prev,
            id: userData.user.id,
            name: userData.user.name || userData.user.facebook?.name || 'Guest User',
            email: userData.user.email || '',
            avatar: userData.user.facebook?.picture || prev.avatar
          }));
        } else {
          // User not authenticated, show default profile but allow form access
          setIsAuthenticated(false);
          setProfile(prev => ({
            ...prev,
            name: '',
            email: ''
          }));
        }
      } else {
        // Check URL parameters for user data (from OAuth callback)
        const urlParams = new URLSearchParams(window.location.search);
        const userName = urlParams.get('user');
        if (userName) {
          setIsAuthenticated(true);
          setProfile(prev => ({
            ...prev,
            name: decodeURIComponent(userName)
          }));
        } else {
          // No authentication found, show empty profile form
          setIsAuthenticated(false);
          setProfile(prev => ({
            ...prev,
            name: '',
            email: ''
          }));
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      // Fallback: Check URL parameters for user data
      const urlParams = new URLSearchParams(window.location.search);
      const userName = urlParams.get('user');
      if (userName) {
        setIsAuthenticated(true);
        setProfile(prev => ({
          ...prev,
          name: decodeURIComponent(userName)
        }));
      } else {
        // Show empty profile form for guest users
        setIsAuthenticated(false);
        setProfile(prev => ({
          ...prev,
          name: '',
          email: ''
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      if (!token && !isAuthenticated) {
        // For non-authenticated users, just show a message
        alert('Profile information saved locally. Please log in to save to your account.');
        setIsSaving(false);
        return;
      }
      if (!token) {
        console.error('No authentication token found');
        alert('Please log in to save your profile changes.');
        setIsSaving(false);
        return;
      }

      let updatedProfile = { ...profile };

      // Upload image if selected
      if (selectedImage) {
        try {
          const imageUrl = await uploadImage(selectedImage);
          updatedProfile.avatar = imageUrl;
        } catch (error) {
          console.error('Error uploading image:', error);
          return; // Don't proceed with profile update if image upload fails
        }
      }

      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setProfile(data.data);
          setSelectedImage(null);
          setImagePreview('');
          console.log('Profile updated successfully');
        }
      } else {
        console.error('Failed to save profile:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('avatar', file);

    const token = localStorage.getItem('token');
    const response = await fetch('/api/upload/avatar', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      return data.data.url;
    }
    throw new Error('Failed to upload image');
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      console.error('Password must be at least 6 characters');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setShowPasswordModal(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        console.log('Password changed successfully');
      } else {
        console.error('Failed to change password:', data.message);
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE') {
      console.error('Please type DELETE to confirm');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/delete-account', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
      } else {
        console.error('Failed to delete account:', data.message);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
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
                <span>Profile</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Profile</h1>
            </div>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading profile...</p>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Picture Section */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={imagePreview || (profile.avatar ? `${process.env.NEXT_PUBLIC_IMAGE_URL || 'http://localhost:5000'}${profile.avatar}` : '')} alt={profile.name} />
                    <AvatarFallback className="text-2xl">
                      {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('avatar-upload')?.click()}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      JPG, GIF or PNG. Max size of 2MB.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      disabled={isAuthenticated}
                      className={isAuthenticated ? "bg-gray-50 cursor-not-allowed" : ""}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={profile.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell us about yourself"
                    className="h-24"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Change Password</h4>
                    <p className="text-sm text-muted-foreground">
                      Update your password to keep your account secure
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowPasswordModal(true)}
                  >
                    Change Password
                  </Button>
                </div>


                <div className="flex items-center justify-between p-4 border rounded-lg border-red-200">
                  <div>
                    <h4 className="font-medium text-red-600">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          )}
        </main>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                  >
                    {showPasswords.current ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="Enter new password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                  >
                    {showPasswords.new ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                }}
              >
                Cancel
              </Button>
              <Button onClick={handlePasswordChange}>
                Update Password
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-red-600">Delete Account</h3>

            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800 mb-2">
                  <strong>Warning:</strong> This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                </p>
              </div>

              <div>
                <Label htmlFor="delete-confirmation">Type "DELETE" to confirm</Label>
                <Input
                  id="delete-confirmation"
                  type="text"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  placeholder="Type DELETE to confirm"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmation('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation !== 'DELETE'}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
