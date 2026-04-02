import React, { Suspense } from 'react';
import DetailWidthWrapper from '@/components/layout/detail-width-wrapper';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import LoadingView from '@/components/layout/state/loading-view';
import CodeDebugClient from './components/code-debug-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI-net | Code Debug',
};

export default async function CodeDebugPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Suspense fallback={<LoadingView />}>
        <DataLoader />
      </Suspense>
    </div>
  );
}

async function DataLoader() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailWidthWrapper>
        <CodeDebugClient />
      </DetailWidthWrapper>
    </HydrationBoundary>
  );
}
