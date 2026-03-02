'use client';

import React from 'react';
import { useGetCurrentUser } from '@/lib/api/user/get-current';
import DetailWidthWrapper from '@/components/layout/detail-width-wrapper';
import DetailHeader from '@/components/layout/detail-header';
import GenericHeader from '../../_components/generic-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function PersonaClient() {
  const { data: user } = useGetCurrentUser('user-key');

  return (
    <DetailWidthWrapper>
      <DetailHeader />
      <GenericHeader title="AI Persona" />

      <div className="mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border">
              <Image
                src={user?.image || '/avatar-fallback.png'}
                alt={user?.name || 'User'}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <CardTitle>{user?.name}</CardTitle>
              <div className="text-sm text-muted-foreground">
                Status: {user?.status}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm italic">
                AI Persona generation and analysis is coming soon. This feature
                will analyze your interaction style to create a tailored AI
                assistant behavior.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DetailWidthWrapper>
  );
}
