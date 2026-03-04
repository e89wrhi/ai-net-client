'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    User,
    Settings,
    History,
    Key,
    Zap,
    UserCircle
} from 'lucide-react';

const navItems = [
    {
        title: 'Account',
        href: '/account',
        icon: User,
    },
    {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
    },
    {
        title: 'Activity',
        href: '/activity',
        icon: History,
    },
    {
        title: 'Usage',
        href: '/usage',
        icon: Zap,
    },
    {
        title: 'API Keys',
        href: '/api-keys',
        icon: Key,
    },
    {
        title: 'AI Persona',
        href: '/persona',
        icon: UserCircle,
    },
];

export function SettingsSidebar() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col space-y-1 w-full md:w-64 pr-8">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground',
                        pathname === item.href
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground'
                    )}
                >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                </Link>
            ))}
        </nav>
    );
}
