'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  const handleChange = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      title="Toggle theme"
      onClick={handleChange}
      className="size-8 -my-2 -me-2 rounded-full"
    >
      {/* Sun icon for light mode, shown when theme is not set to dark */}
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

      {/* Moon icon for dark mode, shown when theme is set to dark */}
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
