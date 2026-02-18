'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ExternalLink, Option, Cross } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ModeToggle } from '@/components/shared/mode-toggle';

interface Props {
  link: string;
  onNewSession?: () => void;
}
export function QuestionOptions(props: Props) {
  const { link, onNewSession } = props;
  const router = useRouter();
  const handleOpenLink = () => {
    router.push(link);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 px-0 rounded-full 
        hover:text-main-green"
        >
          <Option className="" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="space-y-3 p-2 rounded-2xl m-4"
      >
        <DropdownMenuItem onClick={handleOpenLink}>
          <ExternalLink className="mr-2 h-4 w-4" />
          <span>Learn More</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onNewSession}>
          <Cross className="mr-2 h-4 w-4" />
          <span>New Session</span>
        </DropdownMenuItem>
        <ModeToggle />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
