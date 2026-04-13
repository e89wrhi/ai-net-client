'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { MainNavOptions } from '@/components/layout/main-nav-options';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean;
  title?: string;
  ref?: React.Ref<HTMLElement>;
}

export const HomeHeader = ({ className, ...props }: HeaderProps) => {
  return (
    <header
      className={cn(
        'sticky top-0 z-40',
        'bg-card dark:bg-black',
        'flex h-16 items-center justify-between gap-4 p-4',
        '',
        className
      )}
      {...props}
    >
      <div
        className="flex flex-row items-center gap-2 group cursor-pointer"
        onClick={() => (window.location.href = '/')}
      >
        <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-green-400 flex items-center justify-center shadow-lg shadow-green-400/20 group-hover:scale-110 transition-transform">
          <Image
            src={'/logo.png'}
            fill
            alt="nolimit"
            className="object-contain p-1.5"
          />
          {/* Fallback Initial if no image */}
          <span className="text-black font-black text-xl">N</span>
        </div>
        <Label className="font-black text-2xl tracking-tighter">NoLimit</Label>
      </div>
      <div className="flex items-center space-x-4 mr-3 md:space-x-6 flex-row">
        <Link href={'/search'}>
          <Button variant={'ghost'} className="rounded-full">
            <Search className="h-6 w-6" />
          </Button>
        </Link>
        <MainNavOptions />
      </div>
    </header>
  );
};
