import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import icon from '@/assets/favicon.png';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = icon.src,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    keywords: [],
    authors: [],
    creator: 'tj',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title,
      description,
      siteName: title,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: 'tj',
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    manifest: '/manifest.json',
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// formatted time for list item
export function formatDate(input: Date | null): string {
  if (!input) return 'N/A';
  var date = new Date(input);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
  });
}

// formatted count
export function formatCount(value: number): string {
  return Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(value);
}

type Locale = 'en';

const unitMap: Record<Locale, Record<string, string>> = {
  en: {
    s: 's',
    m: 'm',
    h: 'h',
    d: 'd',
    w: 'w',
    mo: 'mo',
    y: 'y',
    sd: ' seconds ago',
    md: ' minutes ago',
    hd: ' hours ago',
    dd: ' days ago',
    wd: ' weeks ago',
    mod: ' months ago',
    yd: ' years ago',
  },
};

// relative time for list 2mo
export function formatRelativeTime(
  date: Date | null,
  locale: Locale = 'en'
): string {
  if (!date) return 'N/A';
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  // If in the future, return formatted date
  if (date > now) {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: '2-digit',
    });
  }

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const map = unitMap[locale];

  if (seconds < 60) return `${seconds}${map.s}`;
  if (minutes < 60) return `${minutes}${map.m}`;
  if (hours < 24) return `${hours}${map.h}`;
  if (days < 7) return `${days}${map.d}`;
  if (weeks < 4) return `${weeks}${map.w}`;
  if (months < 12) return `${months}${map.mo}`;
  return `${years}${map.y}`;
}

// relative time for detail 2 months ago
export function formatRelativeTimeDetail(
  date: Date | null,
  locale: Locale = 'en'
): string {
  if (!date) return 'N/A';
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  // If in the future, return formatted date
  if (date > now) {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: '2-digit',
    });
  }

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const map = unitMap[locale];

  if (seconds < 60) return `${seconds}${map.sd}`;
  if (minutes < 60) return `${minutes}${map.md}`;
  if (hours < 24) return `${hours}${map.hd}`;
  if (days < 7) return `${days}${map.dd}`;
  if (weeks < 4) return `${weeks}${map.wd}`;
  if (months < 12) return `${months}${map.mod}`;
  return `${years}${map.yd}`;
}
export const getHeadingMargin = (depth: number) =>
  depth <= 2 ? '' : `ml-${(depth - 2) * 4}`;
