'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import React, { useState } from 'react';
import GenericHeader from '../../_components/generic-header';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useResetUsageCounters } from '@/lib/api/user/reset-usage-counters';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from 'next-themes';

export default function SettingsClient() {
  const { setTheme, theme } = useTheme();
  const [historyEnabled, setHistoryEnabled] = useState(true);
  const { mutate: resetUsage } = useResetUsageCounters();

  const handleClearHistory = () => {
    resetUsage(
      { UserId: 'usr-001' },
      {
        onSuccess: () => {
          localStorage.clear();
          toast.success('All history and local data cleared.');
        },
        onError: () => toast.error('Failed to clear history.'),
      }
    );
  };

  return (
    <div className="space-y-8">
      <GenericHeader
        title="Settings"
        description="Configure your preferences for appearance, history tracking, and local data."
      />

      <div className="grid gap-6">
        {/* Theme & Language Card */}
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-muted/30">
          <CardHeader className="bg-muted/20">
            <CardTitle className="text-lg flex items-center gap-2">
              General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-bold">Appearance</Label>
                <p className="text-sm text-muted-foreground">
                  Customize how the app looks on your device.
                </p>
              </div>
              <Select onValueChange={(e) => setTheme(e)} value={theme || 'system'}>
                <SelectTrigger className="w-[140px] rounded-full bg-background border-none shadow-sm">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-bold">Language</Label>
                <p className="text-sm text-muted-foreground">
                  Select your preferred interface language.
                </p>
              </div>
              <Select defaultValue="en">
                <SelectTrigger className="w-[140px] rounded-full bg-background border-none shadow-sm">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* History Card */}
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-muted/30">
          <CardHeader className="bg-muted/20">
            <CardTitle className="text-lg flex items-center gap-2">
              History
            </CardTitle>
            <CardDescription className="text-xs">
              Interaction history is stored locally in your browser's{' '}
              <code>localStorage</code>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-bold">Enable Tracking</Label>
                <p className="text-sm text-muted-foreground">
                  Save your interactions to the history page.
                </p>
              </div>
              <Switch
                checked={historyEnabled}
                onCheckedChange={setHistoryEnabled}
              />
            </div>

            <div className="pt-6 border-t flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-bold text-destructive">
                  Danger Zone
                </Label>
                <p className="text-sm text-muted-foreground">
                  Permanently clear all data from local storage.
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="secondary"
                    className="rounded-full bg-destructive/5 text-destructive hover:bg-destructive/10 border-none transition-colors"
                  >
                    Clear Data
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-3xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      Clear all history?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete your entire history from this
                      device. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-full">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="rounded-full bg-destructive hover:bg-destructive/90"
                      onClick={handleClearHistory}
                    >
                      Clear Everything
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
