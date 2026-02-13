import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { withContentlayer } from 'next-contentlayer2';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },
  transpilePackages: ['@aishow/ui', '@aishow/lib'],
  turbopack: {
    root: '../../',
  },
};

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/i18n/requests.ts',
});
export default withContentlayer(withNextIntl(nextConfig));
