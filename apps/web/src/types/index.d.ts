import { Icons } from '@/components/shared/icons';
import { UserRole } from '@/lib/validations/user';

export interface WhyItem {
  title: string;
  text: string;
}

export interface WhyProps {
  title: string;
  toc: WhyTocItem[];
  items: WhyItem[];
  extraSections?: ReactNode[]; // optional additional content sections
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    twitter: string;
    github: string;
  };
}

export interface NavItem {
  title: string;
  href: string;
  badge?: number;
  disabled?: boolean;
  external?: boolean;
  authorizeOnly?: UserRole;
  icon?: keyof typeof Icons;
}

export type MainNavItem = NavItem;

export interface MarketingConfig {
  mainNav: MainNavItem[];
}
