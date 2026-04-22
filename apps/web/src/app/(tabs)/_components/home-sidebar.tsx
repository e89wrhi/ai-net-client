'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavGroupp } from './home-sidebar-items';
import { NavGroup } from '@/types/sidebar';
import { SidebarHeaderLayout } from './sidebar-header';
import {
  MessageCircle,
  Home,
  Image,
  Edit3,
  FileText,
  Globe,
  Code,
  Bug,
} from 'lucide-react';
import { UserDto } from '@/types/api/user/current-user';
import SidebarFooterLayout from './sidebar-footer';
import { useRouter } from 'next/navigation';

// Featured
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

// Images
const imagesGroup: NavGroup = {
  title: 'Image',
  items: [
    { title: 'Edit', icon: Edit3, url: '/image-edit', enabled: true },
    { title: 'Generate', icon: Image, url: '/image-gen', enabled: true },
  ],
};

// Text
const textGroup: NavGroup = {
  title: 'Text',
  items: [
    { title: 'Translate', icon: Globe, url: '/translate', enabled: true },
  ],
};

// Code
const codeGroup: NavGroup = {
  title: 'Code',
  items: [
    { title: 'Generate', icon: Code, url: '/code-gen', enabled: true },
    { title: 'Debug', icon: Bug, url: '/code-debug', enabled: true },
  ],
};

// Advance
const advanceGroup: NavGroup = {
  title: 'Advance',
  items: [],
};

// More
const moreGroup: NavGroup = {
  title: 'More',
  items: [{ title: 'MD', icon: FileText, url: '/simple-md', enabled: true }],
};

interface AppSidebarProps {
  userProfile: UserDto;
}

export function AppSidebar({ userProfile: profile }: AppSidebarProps) {
  const router = useRouter();

  const navGroups: NavGroup[] = [
    featuredGroup,
    imagesGroup,
    textGroup,
    codeGroup,
    advanceGroup,
    moreGroup,
  ];

  const handleOpenMe = () => {
    router.push(`/account`);
  };

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

      {/* FOOTER */}
      <SidebarFooter className="border-t border-border/80 p-3">
        <SidebarFooterLayout
          name={profile.name}
          image={profile.image}
          status={profile.status}
          onOpen={handleOpenMe}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
