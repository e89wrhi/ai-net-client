'use client';

import { Github, AlertTriangle, Sparkles, Activity, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface BarProps {
  variant: 'warning' | 'promo' | 'status';
}

function BarItem({ variant }: BarProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const content = {
    warning: {
      icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
      text: "Developer Preview: This project is currently in the testing stage and utilizes mock data streams.",
      bgColor: "bg-amber-50/80 dark:bg-amber-900/10",
      borderColor: "border-amber-200/50 dark:border-amber-800/30",
      link: null
    },
    promo: {
      icon: <Sparkles className="h-4 w-4 text-indigo-500" />,
      text: "We just open-sourced the new AI-Client backend! Check out the repository on GitHub.",
      bgColor: "bg-indigo-50/80 dark:bg-indigo-900/10",
      borderColor: "border-indigo-200/50 dark:border-indigo-800/30",
      link: { label: "View Source", href: "https://github.com/", icon: <Github className="h-3 w-3" /> }
    },
    status: {
      icon: <Activity className="h-4 w-4 text-emerald-500" />,
      text: "All AI models are currently operational. Average latency is around 450ms.",
      bgColor: "bg-emerald-50/80 dark:bg-emerald-900/10",
      borderColor: "border-emerald-200/50 dark:border-emerald-800/30",
      link: { label: "Status Page", href: "#", icon: null }
    }
  }[variant];

  return (
    <div className={cn(
      "w-full border-b backdrop-blur-md transition-all duration-500 animate-in slide-in-from-top",
      content.bgColor,
      content.borderColor
    )}>
      <div className="container mx-auto px-6 h-11 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="animate-pulse">
            {content.icon}
          </div>
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {content.text}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {content.link && (
            <Link
              href={content.link.href}
              target="_blank"
              className="group flex flex-row text-[13px] items-center gap-1.5 font-bold transition-all
              bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1 rounded-full shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700 hover:ring-primary/50"
            >
              {content.link.icon}
              {content.link.label}
            </Link>
          )}
          <button
            onClick={() => setIsVisible(false)}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NotificationBar() {
  return (
    <div className="flex flex-col">
      {/* Example 1: Critical Mock Data Warning */}
      <BarItem variant="warning" />

      {/* Example 2: Premium Promo Bar */}
      <BarItem variant="promo" />

      {/* Example 3: System Status Indicator */}
      <BarItem variant="status" />
    </div>
  );
}
