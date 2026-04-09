'use client';

import Link from 'next/link';
import { Icons } from '../icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { ModeToggle } from './mode-toggle';
import Image from 'next/image';

interface NavigationProps {
  currentPage?: string;
}

export function Navigation({}: NavigationProps) {
  return (
    <nav className="border-b bg-white dark:bg-black sticky top-0 z-50 shadow-sm">
      <div className="flex flex-row max-w-6xl justify-between items-center container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href={'/'} className="flex flex-row font-bold items-center">
            <Image
              height={100}
              width={100}
              src={'/logo.png'}
              className="h-10 w-10"
              alt="logo"
            />
            <p className="text-green-500 text-lg">AI-net</p>
          </Link>
        </div>

        <div className="flex flex-row items-center space-x-7">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link target="_blank" href={'https://x.com/test'} className="">
                <Icons.twitter height={30} width={30} className="size-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>@Twitter</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                target="_blank"
                href={'https://github.com/test'}
                className=""
              >
                <Icons.gitHub height={30} width={30} className="size-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>@Github</p>
            </TooltipContent>
          </Tooltip>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
