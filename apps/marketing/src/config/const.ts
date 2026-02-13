import { SocialLink } from '@/types';
import { NavItem } from '@/types';
import { Github, X } from 'lucide-react';

export const NAV_LINKS: NavItem[] = [
  {
    href: '/docs',
    title: 'Docs',
  },
  {
    href: '/news',
    title: 'Newsroom',
  },
  {
    href: '/about',
    title: 'about',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/i',
    label: 'GitHub',
    icon: Github,
  },
  {
    href: 'https://twitter.com/i',
    label: 'Twitter',
    icon: X,
  },
];
