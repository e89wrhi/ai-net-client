import * as React from 'react';
import Link from 'next/link';

import { FooterLinks, siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn('', className)}>
      <div className="container flex flex-row justify-between grid max-w-6xl gap-6 py-4">
        {FooterLinks().map((section) => (
          <div key={section.title}>
            <div className="flex flex-col lg:flex-row mt-4 space-x-5 list-inside space-y-3">
              {section.items?.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="py-4">
        <div className="container flex max-w-6xl items-center">
          <span className="text-muted-foreground text-sm">
            Copyright &copy; 2026. All rights reserved.
          </span>
          <p className="text-left text-sm text-muted-foreground">
            Built by{' '}
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              mark
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
