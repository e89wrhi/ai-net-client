import { LucideIcon } from 'lucide-react';

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  author: string;
  locale: string;
  featuredPostCount: number;
  postsPerPage: number;
  links: {
    twitter: string;
    telegram: string;
    tiktok: string;
    instagram: string;
    facebook: string;
    youtube: string;
  };
}

export interface NavItem {
  title: string;
  badge?: string;
  icon?: React.ElementType;
  href: string;
  enabled?: boolean;
}

export interface SocialLinkBase {
  href: string;
  label: string;
}

export interface SocialLink {
  label: string;
  icon: LucideIcon;
  href: string;
}

export interface BlogData {
  title: string;
  description: string;
  date: Date;
  order?: number;
  image?: string;
  tags?: string[];
  authors?: string[];
  draft?: boolean;
}

export interface AuthorData {
  name: string;
  pronouns?: string;
  avatar: string;
  bio?: string;
  mail?: string;
  website?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  discord?: string;
}

export interface DocData {
  title: string;
  description?: string;
  category?: string;
  order?: number;
  tags?: string[];
  image?: string;
  link?: string;
  version?: string;
  status?: 'draft' | 'stable' | 'experimental';
  startDate?: Date;
  endDate?: Date;
}

export interface ContentEntry<TData> {
  id: string;
  slug: string; // The last segment of the id (e.g., 'my-post' or 'subpost')
  body: string; // Markdown/MDX content
  data: TData; // Frontmatter data
  render: () => Promise<{ headings: TOCHeading[] }>; // Mock render function
}

export type BlogEntry = ContentEntry<BlogData>;
export type AuthorEntry = ContentEntry<AuthorData>;
export type DocEntry = ContentEntry<DocData>;

// subcriptions
export interface SubscriptionPlan {
  title: string;
  description: string;
  benefits: string[];
  limitations: string[];
  prices: {
    monthly: number;
    yearly: number;
  };
  stripeIds: {
    monthly: string | null;
    yearly: string | null;
  };
}

// compare plans
export type ColumnType = string | boolean | null;
export type PlansRow = { feature: string; tooltip?: string } & Record<
  (typeof plansColumns)[number],
  ColumnType
>;
