'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sun, Moon, Monitor, Laptop } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModeToggleProps {
  variant?: 'dropdown' | 'minimal';
}

export function ModeToggle({ variant = 'dropdown' }: ModeToggleProps) {
  const { setTheme, theme } = useTheme();

  if (variant === 'minimal') {
    return (
      <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg w-full">
        {[
          { id: 'light', icon: <Sun className="h-3.5 w-3.5" />, label: 'Light' },
          { id: 'dark', icon: <Moon className="h-3.5 w-3.5" />, label: 'Dark' },
          { id: 'system', icon: <Laptop className="h-3.5 w-3.5" />, label: 'System' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setTheme(item.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[10px] font-bold transition-all",
              theme === item.id
                ? "bg-popover shadow-sm text-foreground ring-1 ring-border"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg hover:bg-muted"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl p-1">
        <DropdownMenuItem onClick={() => setTheme('light')} className="rounded-lg">
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className="rounded-lg">
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} className="rounded-lg">
          <Laptop className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
