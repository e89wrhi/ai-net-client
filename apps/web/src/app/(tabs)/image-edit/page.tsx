import React, { Suspense } from 'react';
import DetailWidthWrapper from '@/components/layout/detail-width-wrapper';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import LoadingView from '@/components/layout/state/loading-view';
import ImageEditingClient from './components/image-edit-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI-net | Edit Image',
};

export default async function ImageEditPage() {
  return (
    <div className="min-h-screen bg-background">
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
        <ImageEditingClient />
      </DetailWidthWrapper>
    </HydrationBoundary>
  );
}
