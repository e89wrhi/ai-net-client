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
import {
  ExternalLink,
  Settings,
  Trash2,
  Download,
  Share,
  HelpCircle,
  MoreHorizontal
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ModeToggle } from '@/components/shared/mode-toggle';
import { toast } from 'sonner';

interface Props {
  link: string;
  onNewSession?: () => void;
  onClearHistory?: () => void;
}

export function QuestionOptions({ link, onNewSession, onClearHistory }: Props) {
  const router = useRouter();

  const handleOpenLink = () => {
    router.push(link);
  };

  const handleExport = () => {
    toast.success('Exporting session...');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg hover:bg-muted transition-colors"
        >
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-52 p-1.5 rounded-xl bg-popover border-border shadow-md animate-in fade-in zoom-in-95 duration-100"
      >
        <div className="px-2 py-1.5 mb-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">Actions</p>
        </div>

        <DropdownMenuItem onClick={handleOpenLink} className="rounded-md cursor-pointer text-sm">
          <ExternalLink className="mr-2 h-3.5 w-3.5" />
          <span>Documentation</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleExport} className="rounded-md cursor-pointer text-sm">
          <Download className="mr-2 h-3.5 w-3.5" />
          <span>Export Session</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="rounded-md cursor-pointer text-sm">
          <Share className="mr-2 h-3.5 w-3.5" />
          <span>Share Results</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1.5" />

        <div className="px-2 py-1.5 mb-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">Appearance</p>
        </div>

        <div className="px-1 mb-1">
          <ModeToggle variant="minimal" />
        </div>

        <DropdownMenuItem className="rounded-md cursor-pointer text-sm">
          <Settings className="mr-2 h-3.5 w-3.5" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1.5" />

        <DropdownMenuItem
          onClick={onClearHistory}
          className="rounded-md cursor-pointer text-sm text-destructive focus:text-destructive active:bg-destructive/10"
        >
          <Trash2 className="mr-2 h-3.5 w-3.5" />
          <span className="font-medium">Clear History</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="rounded-md cursor-pointer text-xs mt-1 bg-muted/50 text-muted-foreground">
          <HelpCircle className="mr-2 h-3 w-3" />
          <span>Help Center</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
