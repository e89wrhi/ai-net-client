'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavGroupp } from './home-sidebar-items';
import { NavGroup } from '@/types/sidebar';
import { SidebarHeaderLayout } from './sidebar-header';
import {
  Flame,
  House,
  Search,
  TrendingUp,
  HousePlug,
  MessageCircle,
  Image,
  FileQuestion,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const profile = {
  name: 'Sample name',
  image: '/ai.png',
};

// featured
const featuredGroup: NavGroup = {
  title: 'Featured',
  items: [
    { title: 'Chat', icon: MessageCircle, url: '/', enabled: true },
    {
      title: 'Home',
      icon: HousePlug,
      url: 'http://localhost:3001/',
      enabled: true,
    },
  ],
};

// images
const imagesGroup: NavGroup = {
  title: 'Image',
  items: [
    { title: 'Edit', icon: Image, url: '/image-edit', enabled: true },
    { title: 'Caption', icon: Image, url: '/image-caption', enabled: true },
    {
      title: 'Generate',
      icon: Image,
      url: '/image-gen',
      enabled: true,
    },
  ],
};

// text
const textGroup: NavGroup = {
  title: 'Text',
  items: [
    { title: 'Generate', icon: House, url: '/text-gen', enabled: true },
    {
      title: 'Text to Speech',
      icon: Flame,
      url: '/text-to-speech',
      enabled: true,
    },
    {
      title: 'Speech to Text',
      icon: TrendingUp,
      url: '/speech-to-text',
      enabled: true,
    },
    {
      title: 'Summary',
      icon: Search,
      url: '/summary',
      enabled: true,
    },
    { title: 'Translate', icon: House, url: '/translate', enabled: true },
    { title: 'Senitment', icon: Flame, url: '/sentiment', enabled: true },
    { title: 'Q&A', icon: FileQuestion, url: '/question', enabled: true },
    {
      title: 'Autocomplete',
      icon: FileQuestion,
      url: '/autocomplete',
      enabled: true,
    },
  ],
};
// code
const codeGroup: NavGroup = {
  title: 'Code',
  items: [
    { title: 'Generate', icon: House, url: '/code-gen', enabled: true },
    { title: 'Debug', icon: Flame, url: '/code-debug', enabled: true },
  ],
};

// advance
const advanceGroup: NavGroup = {
  title: 'Advance',
  items: [
    { title: 'Meeting Analyzer', icon: House, url: '/meeting', enabled: true },
    { title: 'Resume Analyzer', icon: Flame, url: '/resume', enabled: true },
    {
      title: 'Learning Assistant',
      icon: TrendingUp,
      url: '/learning',
      enabled: true,
    },
  ],
};

// more
const moreGroup: NavGroup = {
  title: 'More',
  items: [
    { title: 'MD', icon: House, url: '/simple-md', enabled: true },
    { title: 'Plugin', icon: Flame, url: '/simple-plugin', enabled: true },
  ],
};

export function AppSidebar() {
  //const { userProfile: profile } = params;
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const navGroups: NavGroup[] = [
    featuredGroup,
    imagesGroup,
    textGroup,
    codeGroup,
    advanceGroup,
    moreGroup,
  ];

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className="border-r border-border/80 transition-all duration-300"
    >
      <style>{`
        .sidebar-content-scroll {
          overflow-y: auto;
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        .sidebar-content-scroll::-webkit-scrollbar {
          display: none !important;
        }
      `}</style>

      {/* HEADER */}
      <SidebarHeader className="border-b border-border/90 dark:border-neutral-800 h-14">
        <SidebarHeaderLayout />
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="sidebar-content-scroll">
        {navGroups.map((group, idx) => (
          <NavGroupp key={idx} {...group} />
        ))}
      </SidebarContent>

      {/* FOOTER - USER PROFILE OR CTA */}
      <SidebarFooter className="p-4 border-t border-border/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={cn(
                'h-12 w-full justify-start gap-4 rounded-2xl transition-all duration-200 hover:bg-muted/50',
                isCollapsed && 'justify-center px-0'
              )}
            >
              <Link href="/account" className="flex items-center">
                <Avatar className="h-8 w-8 border border-border shrink-0">
                  <AvatarImage src={profile.image ?? ''} alt={profile.name} />
                  <AvatarFallback className="font-bold text-[10px] bg-green-400 text-black">
                    {profile.name?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="flex flex-col text-left overflow-hidden">
                    <span className="text-sm font-black truncate">
                      {profile.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-medium truncate">
                      View Profile
                    </span>
                  </div>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
