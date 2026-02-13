import { SiteConfig } from '@/types';
import { env } from '@/../env.mjs';
import icon from '@/assets/favicon.png';

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: 'AI-net',
  description: 'Try ai features in .net',
  url: site_url,
  ogImage: icon.src,
  links: {
    twitter: 'https://twitter.com/rich',
    github: 'https://github.com/rich',
  },
  mailSupport: 'support@tj.com',
};
