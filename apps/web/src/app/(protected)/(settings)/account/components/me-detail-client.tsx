'use client';

import React from 'react';
import AccountHeader from './me-detail-header';
import { useGetCurrentUser } from '@/lib/api/user/get-current';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, User, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { useUpdateUser } from '@/lib/api/user/update-user';

export default function AccountClient() {
  const { data: user, isLoading } = useGetCurrentUser('user-key');
  const { mutate: updateProfile } = useUpdateUser();

  const handleUpdateProfile = () => {
    updateProfile(
      {
        id: user?.userId || 'usr-001',
        payload: { name: user?.name + ' (Updated)' },
      },
      {
        onSuccess: () => toast.success('Profile updated successfully (mock)'),
        onError: () => toast.error('Failed to update profile'),
      }
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <AccountHeader />
        <div className="h-64 animate-pulse rounded-3xl bg-muted" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AccountHeader />

      <div className="grid gap-8">
        {/* Profile Card */}
        <Card className="border-none bg-muted/30 rounded-3xl overflow-hidden shadow-sm">
          <CardHeader className="flex flex-row items-center gap-6 pb-8 bg-muted/20">
            <div className="relative group">
              <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                <AvatarImage src={user?.image} />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {user?.name?.[0]?.toUpperCase() || <User />}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full size-8 shadow-lg border-2 border-background"
              >
                <Camera className="size-4" />
              </Button>
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold">{user?.name}</CardTitle>
              <Badge variant="secondary" className="rounded-full font-medium">
                {user?.status || 'Active Member'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1.5 p-4 bg-background/50 rounded-2xl border border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-widest">
                  <User className="size-3" />
                  User ID
                </div>
                <p className="font-semibold text-sm truncate">
                  {user?.userId || 'N/A'}
                </p>
              </div>
              <div className="space-y-1.5 p-4 bg-background/50 rounded-2xl border border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-widest">
                  <Shield className="size-3" />
                  Role / Tier
                </div>
                <p className="font-semibold">Professional Tier</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={handleUpdateProfile}
              >
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security / Sign Out Card */}
        <Card className="border-none bg-destructive/5 rounded-3xl overflow-hidden shadow-none">
          <CardContent className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="font-bold text-destructive">Account Actions</p>
              <p className="text-sm text-muted-foreground">
                Manage your session and account security.
              </p>
            </div>
            <Button
              variant="destructive"
              className="rounded-full px-8 shadow-lg shadow-destructive/20"
              onClick={() => toast('Sign out functionality coming soon')}
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
