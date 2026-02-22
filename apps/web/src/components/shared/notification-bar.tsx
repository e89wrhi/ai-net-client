'use client';

import { Github, AlertCircle, Info, Activity, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface BarProps {
  variant: 'info' | 'repo' | 'system';
}

function BarItem({ variant }: BarProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const content = {
    info: {
      icon: <AlertCircle className="h-4 w-4" />,
      text: 'Developer Preview: Currently running with simulated data streams for testing.',
      bgColor: 'bg-muted/30',
      borderColor: 'border-border',
      link: null,
    },
    repo: {
      icon: <Github className="h-4 w-4" />,
      text: 'Open Source: The AI-Client backend repository is now available on GitHub.',
      bgColor: 'bg-muted/30',
      borderColor: 'border-border',
      link: { label: 'GitHub', href: 'https://github.com/', icon: null },
    },
    system: {
      icon: <Activity className="h-4 w-4" />,
      text: 'System Status: All inference nodes are operational. Latency: 450ms.',
      bgColor: 'bg-muted/30',
      borderColor: 'border-border',
      link: { label: 'Details', href: '#', icon: null },
    },
  }[variant];

  return (
    <div
      className={cn(
        'w-full border-b backdrop-blur-sm transition-all duration-300 animate-in fade-in',
        content.bgColor,
        content.borderColor
      )}
    >
      <div className="container mx-auto px-4 h-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="text-muted-foreground">{content.icon}</div>
          <p className="text-xs font-medium text-foreground/80 tracking-tight">
            {content.text}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {content.link && (
            <Link
              href={content.link.href}
              target="_blank"
              className="text-[11px] font-bold hover:underline underline-offset-4 text-foreground/90 transition-colors px-2 py-0.5"
            >
              {content.link.label}
            </Link>
          )}
          <button
            onClick={() => setIsVisible(false)}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NotificationBar() {
  return (
    <div className="flex flex-col">
      <BarItem variant="info" />
      <BarItem variant="repo" />
    </div>
  );
}
