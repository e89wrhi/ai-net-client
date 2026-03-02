'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import React from 'react';
import Image from 'next/image';
import {
  ChevronUp,
  KeyIcon,
  LogOut,
  Pencil,
  Settings,
  Sparkle,
  Sparkles,
  User,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

interface Props {
  name: string;
  image: string;
  status: string;
  onOpen: () => void;
}

export default function SidebarFooterLayout(props: Props) {
  const { name, image, status, onOpen } = props;
  const router = useRouter();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-full"
            >
              <Image
                src={image ?? '/avatar-fallback.png'}
                alt={name}
                width={36}
                height={36}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="grid flex-1 text-left text-sm leading-tight sidebar-title">
                <span className="truncate font-semibold">{name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {status}
                </span>
              </div>
              <ChevronUp className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-2xl border-none bg-white dark:bg-black p-4"
            side="top"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Image
                  src={image ?? '/avatar-fallback.png'}
                  alt={name}
                  width={36}
                  height={36}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {status}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="space-y-3">
              <DropdownMenuItem onClick={onOpen}>
                <User className="mr-2 size-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/api-keys')}>
                <KeyIcon className="mr-2 size-4" />
                Manage Api Keys
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/settings')}>
                <Settings className="mr-2 size-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/activity')}>
                <Sparkle className="mr-2 size-4" />
                Analyze Activity
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/usage')}>
                <Sparkles className="mr-2 size-4" />
                Analyze Usage
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/persona')}>
                <User className="mr-2 size-4" />
                Generate Persona
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/account')}>
                <Pencil className="mr-2 size-4" />
                Edit
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => router.push('/logout')}
            >
              <LogOut className="mr-2 size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
