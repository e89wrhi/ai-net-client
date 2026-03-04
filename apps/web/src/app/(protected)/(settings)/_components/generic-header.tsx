'use client';

import { Separator } from '@/components/ui/separator';
import React from 'react';

interface Props {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function GenericHeader({ title, description, action }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground text-sm max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      <Separator />
    </div>
  );
}
