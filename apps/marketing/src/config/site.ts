import { SiteConfig } from '@/types';
import icon from '@/assets/favicon.png';

export const siteConfig: SiteConfig = {
  name: 'AI-net',
  description: 'play with AI on .net',
  url: 'https://about.ainet.com',
  ogImage: icon.src,
  author: '',
  locale: '',
  featuredPostCount: 2,
  postsPerPage: 3,
  links: {
    instagram: 'https://instagram.com/',
    twitter: 'https://twitter.com/',
    youtube: 'https://youtube.com/',
    telegram: 'https://t.me/',
    tiktok: 'https://tiktok.com/',
    facebook: 'https://facebook.com/',
  },
};

export function FooterLinks() {
  return [
    {
      title: 'AI-net',
      items: [
        { title: 'About', href: '/about' },
        { title: 'Terms', href: '/terms' },
        { title: 'Privacy Policy', href: '/privacy' },
      ],
    },
  ];
}
