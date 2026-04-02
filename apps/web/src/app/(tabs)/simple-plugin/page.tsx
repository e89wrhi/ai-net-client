import React, { Suspense } from 'react';
import DetailWidthWrapper from '@/components/layout/detail-width-wrapper';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import LoadingView from '@/components/layout/state/loading-view';
import SimplePluginClient from './components/simpleplugin-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI-net | Simple Plugin',
};

export default async function Page() {
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
        <SimplePluginClient />
      </DetailWidthWrapper>
    </HydrationBoundary>
  );
}
