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
import DetailWidthWrapper from '@/components/layout/detail-width-wrapper';
import DetailHeader from '@/components/layout/detail-header';
import SettingsHeader from './settings-detail-header';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
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
import { useRouter } from 'next/navigation';

export default function SettingsClient() {
  const { setTheme } = useTheme();
  const router = useRouter();
  const [historyEnabled, setHistoryEnabled] = useState(true);

  const handleOpenHistory = () => {
    router.push(`/history`);
  };

  return (
    <DetailWidthWrapper>
      <DetailHeader />
      <SettingsHeader />

      <div className="grid gap-6">
        {/* Theme & Language Card */}
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-bold">Appearance</Label>
                <p className="text-sm text-muted-foreground">
                  Customize how the app looks.
                </p>
              </div>
              <Select onValueChange={(e) => setTheme(e)} defaultValue="system">
                <SelectTrigger className="w-[140px] rounded-full border-none">
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
                  Select your interface language.
                </p>
              </div>
              <Select defaultValue="en">
                <SelectTrigger className="w-[140px] rounded-full border-none">
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
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              History
            </CardTitle>
            <CardDescription>
              We use <code>localStorage</code> with a unique project key to save
              your progress.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-bold">Enable Tracking</Label>
                <p className="text-sm text-muted-foreground">
                  Save articles to your history page.
                </p>
              </div>
              <Switch
                checked={historyEnabled}
                onCheckedChange={setHistoryEnabled}
              />
            </div>
            <div
              onClick={handleOpenHistory}
              className="flex items-center justify-between"
            >
              <div className="space-y-0.5">
                <Label className="text-base font-bold">View History</Label>
                <p className="text-sm text-muted-foreground">
                  view watch hitory
                </p>
              </div>
            </div>
            <div className="pt-4 border-t flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-bold text-destructive">
                  Danger Zone
                </Label>
                <p className="text-sm text-muted-foreground">
                  Clear all items from your local storage.
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="secondary"
                    className="rounded-full hover:bg-destructive/10"
                  >
                    Clear
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      Are you absolutely sure?
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
                    <AlertDialogAction className="rounded-full hover:bg-destructive/90">
                      Clear
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </DetailWidthWrapper>
  );
}
