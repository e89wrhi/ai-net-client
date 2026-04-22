'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  MessageCircle,
  Home,
  Image as ImageIcon,
  Edit3,
  FileText,
  Globe,
  Code,
  Bug,
  LayoutGrid,
  KeyIcon,
  Settings,
  Sparkle,
  Sparkles,
  User,
  Pencil,
  LogOut,
  ChevronUp,
  X,
} from 'lucide-react';
import { UserDto } from '@/types/api/user/current-user';
import { NavGroup } from '@/types/sidebar';
import { Button } from '@/components/ui/button';

// ─── Nav data (mirrored from home-sidebar) ─────────────────────────────────
const featuredGroup: NavGroup = {
  title: 'Featured',
  items: [
    { title: 'Chat', icon: MessageCircle, url: '/', enabled: true },
    {
      title: 'Home',
      icon: Home,
      url: process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001/',
      enabled: true,
    },
  ],
};
const imagesGroup: NavGroup = {
  title: 'Image',
  items: [
    { title: 'Edit', icon: Edit3, url: '/image-edit', enabled: true },
    { title: 'Caption', icon: FileText, url: '/image-caption', enabled: true },
    { title: 'Generate', icon: ImageIcon, url: '/image-gen', enabled: true },
  ],
};
const textGroup: NavGroup = {
  title: 'Text',
  items: [
    { title: 'Generate', icon: FileText, url: '/text-gen', enabled: true },
    { title: 'Translate', icon: Globe, url: '/translate', enabled: true },
  ],
};
const codeGroup: NavGroup = {
  title: 'Code',
  items: [
    { title: 'Generate', icon: Code, url: '/code-gen', enabled: true },
    { title: 'Debug', icon: Bug, url: '/code-debug', enabled: true },
  ],
};
const advanceGroup: NavGroup = {
  title: 'Advance',
  items: [],
};
const moreGroup: NavGroup = {
  title: 'More',
  items: [{ title: 'MD', icon: FileText, url: '/simple-md', enabled: true }],
};

const navGroups: NavGroup[] = [
  featuredGroup,
  imagesGroup,
  textGroup,
  codeGroup,
  advanceGroup,
  moreGroup,
];

// ─── helpers ────────────────────────────────────────────────────────────────
function normalizePath(path: string) {
  const segments = path.split('/').filter(Boolean);
  const first = segments[0];
  if (first && first.length === 2) segments.shift();
  const cleanPath = '/' + segments.join('/');
  return cleanPath.endsWith('/') && cleanPath !== '/'
    ? cleanPath.slice(0, -1)
    : cleanPath;
}
function checkIsActive(href: string, itemUrl: string) {
  const current = normalizePath(href);
  const target = normalizePath(itemUrl);
  if (!target || target === '#') return false;
  if (target === '/en' || target === '/') return current === target;
  return current === target || current.startsWith(target + '/');
}

// ─── Component ──────────────────────────────────────────────────────────────
interface Props {
  userProfile: UserDto;
}

export function MobileBottomNav({ userProfile }: Props) {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigate = (url: string) => {
    setOpen(false);
    router.push(url);
  };

  return (
    // Only visible on mobile (hidden md and above)
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Frosted glass bottom bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-card/80 dark:bg-black/80 backdrop-blur-xl border-t border-border/60 shadow-2xl">
        {/* Logo / home quick tap */}
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <div className="relative h-8 w-8 overflow-hidden rounded-xl bg-green-400 flex items-center justify-center shadow-md shadow-green-400/30">
            <Image
              src="/logo.png"
              fill
              alt="logo"
              className="object-contain p-1"
            />
          </div>
        </Link>

        {/* Quick-access: show a few top icons */}
        <div className="flex items-center gap-1">
          {featuredGroup.items.map((item) => {
            const Icon = item.icon || Sparkles;
            const active = checkIsActive(pathname ?? '', item.url || ``);
            return (
              <Link
                key={item.url}
                href={item.url || ``}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all duration-200',
                  active
                    ? 'bg-green-400 text-black'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] mt-0.5 font-medium">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Menu trigger — opens full Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl bg-green-400/10 hover:bg-green-400/20 text-green-500 border border-green-400/20"
              aria-label="Open navigation menu"
            >
              <LayoutGrid className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="bottom"
            className="h-[82dvh] rounded-t-3xl p-0 border-0 bg-card dark:bg-neutral-950 overflow-hidden"
          >
            {/* drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-1 w-10 rounded-full bg-border/60" />
            </div>

            <SheetHeader className="px-5 pb-3 pt-1 border-b border-border/40">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-base font-black tracking-tight">
                  Navigation
                </SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </SheetHeader>

            {/* Scrollable nav list */}
            <div className="overflow-y-auto h-[calc(100%-10rem)] px-4 py-3 space-y-4">
              {navGroups.map((group) => (
                <div key={group.title}>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest px-2 mb-1">
                    {group.title}
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {group.items
                      .filter((i) => i.enabled)
                      .map((item) => {
                        const Icon = item.icon || Sparkles;
                        const active = checkIsActive(
                          pathname ?? '',
                          item.url || ``
                        );
                        return (
                          <button
                            key={item.url}
                            onClick={() => handleNavigate(item.url || ``)}
                            className={cn(
                              'flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all duration-150',
                              active
                                ? 'bg-green-400 text-black font-semibold'
                                : 'bg-muted/50 hover:bg-muted text-foreground/80'
                            )}
                          >
                            <Icon className="h-4 w-4 shrink-0" />
                            <span className="text-sm truncate">
                              {item.title}
                            </span>
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>

            {/* Profile footer */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-border/40 bg-card dark:bg-neutral-950 px-4 py-3">
              <Sheet open={profileOpen} onOpenChange={setProfileOpen}>
                <SheetTrigger asChild>
                  <button className="flex items-center gap-3 w-full rounded-2xl px-3 py-2 hover:bg-muted transition-colors">
                    <Image
                      src={userProfile.image ?? '/avatar-fallback.png'}
                      alt={userProfile.name}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-semibold leading-none truncate">
                        {userProfile.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {userProfile.status}
                      </p>
                    </div>
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  </button>
                </SheetTrigger>

                <SheetContent
                  side="bottom"
                  className="rounded-t-3xl border-0 bg-card dark:bg-black p-5"
                >
                  {/* drag handle */}
                  <div className="flex justify-center -mt-2 mb-4">
                    <div className="h-1 w-10 rounded-full bg-border/60" />
                  </div>

                  {/* Profile header */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/40">
                    <Image
                      src={userProfile.image ?? '/avatar-fallback.png'}
                      alt={userProfile.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{userProfile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {userProfile.status}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {[
                      { icon: User, label: 'Account', href: '/account' },
                      {
                        icon: KeyIcon,
                        label: 'Manage Api Keys',
                        href: '/api-keys',
                      },
                      { icon: Settings, label: 'Settings', href: '/settings' },
                      {
                        icon: Sparkle,
                        label: 'Analyze Activity',
                        href: '/activity',
                      },
                      {
                        icon: Sparkles,
                        label: 'Analyze Usage',
                        href: '/usage',
                      },
                      {
                        icon: User,
                        label: 'Generate Persona',
                        href: '/persona',
                      },
                      { icon: Pencil, label: 'Edit Profile', href: '/account' },
                    ].map(({ icon: Icon, label, href }) => (
                      <button
                        key={href + label}
                        onClick={() => {
                          setProfileOpen(false);
                          setOpen(false);
                          router.push(href);
                        }}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-muted transition-colors text-sm"
                      >
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        {label}
                      </button>
                    ))}

                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        setOpen(false);
                        router.push('/logout');
                      }}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-destructive/10 transition-colors text-sm text-destructive mt-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
