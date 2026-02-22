'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, BookOpen, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ModeToggle } from '@/components/shared/mode-toggle';

interface Props {
  link: string;
  onSessionReset?: () => void;
}
export function ImageGenOptions(props: Props) {
  const { link, onSessionReset } = props;
  const router = useRouter();
  const handleOpenLink = () => {
    router.push(link);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full hover:bg-muted transition-colors"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 m-2 p-3 space-y-2 rounded-2xl bg-popover border-none shadow-md animate-in fade-in zoom-in-95 duration-100"
      >
        <DropdownMenuItem
          onClick={handleOpenLink}
          className="rounded-full cursor-pointer text-sm"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          <span>Documentation</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onSessionReset}
          className="rounded-full cursor-pointer text-sm text-destructive focus:text-destructive active:bg-destructive/10"
        >
          <RefreshCcw className="mr-2 h-4 w-4 text-red-400" />
          <span className="font-medium">Reset Session</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1.5" />

        <div className="px-1 my-2">
          <ModeToggle variant="minimal" />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
