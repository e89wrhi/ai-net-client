'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useGetUserUsageSummary } from '@/lib/api/user/get-user-usage-summary';
import DetailWidthWrapper from '@/components/layout/detail-width-wrapper';
import DetailHeader from '@/components/layout/detail-header';
import GenericHeader from '../../_components/generic-header';

export default function UsageClient() {
  const { data: usage, isLoading } = useGetUserUsageSummary();

  return (
    <DetailWidthWrapper>
      <DetailHeader />
      <GenericHeader title="Usage" />

      <div className="mt-8">
        {isLoading ? (
          <div>Loading usage summary...</div>
        ) : (
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Period: {usage?.Period || 'N/A'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">
                      Tokens Used
                    </div>
                    <div className="text-2xl font-bold">
                      {usage?.TokenUsed || 0}
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">
                      Total Requests
                    </div>
                    <div className="text-2xl font-bold">
                      {usage?.RequestsCount || 0}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DetailWidthWrapper>
  );
}
