'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import {
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  CreditCardIcon,
  SunIcon,
  MoonIcon,
  History,
  SaveAll,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function MainNavOptions() {
  const { setTheme, theme } = useTheme();
  const router = useRouter();

  const handleOpenProfile = () => {
    router.push(`/me`);
  };

  const handleOpenSettings = () => {
    router.push(`/settings`);
  };

  const handleOpenSubcription = () => {
    router.push(`/subscription`);
  };

  const handleOpenSaved = () => {
    router.push(`/saved`);
  };

  const handleOpenHistory = () => {
    router.push(`/history`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 overflow-hidden rounded-full"
        >
          <Image
            fill
            src="/_avatars/a1.png"
            alt="User avatar"
            className="object-cover"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="end"
        className="border-none w-56"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1 p-2">
            <p className="text-sm font-medium leading-none">Hallie Richards</p>
            <p className="text-xs leading-none text-muted-foreground">
              hallie@example.com
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="space-y-2">
          <DropdownMenuItem onClick={handleOpenProfile}>
            <UserIcon className="mr-2 h-5 w-5" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpenSettings}>
            <SettingsIcon className="mr-2 h-5 w-5" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpenSubcription}>
            <CreditCardIcon className="mr-2 h-5 w-5" />
            <span>Subscription</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpenSaved}>
            <SaveAll className="mr-2 h-5 w-5" />
            <span>Saved</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpenHistory}>
            <History className="mr-2 h-5 w-5" />
            <span>History</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {/* Theme Toggle */}
          <DropdownMenuItem
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <SunIcon className="mr-2 h-4 w-4" />
            ) : (
              <MoonIcon className="mr-2 h-4 w-4" />
            )}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="p-2 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950">
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
