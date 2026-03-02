'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useGetUserActivity } from '@/lib/api/user/get-user-activity';
import DetailWidthWrapper from '@/components/layout/detail-width-wrapper';
import DetailHeader from '@/components/layout/detail-header';
import GenericHeader from '../../_components/generic-header';

export default function ActivityClient() {
  const { data: activities, isLoading } = useGetUserActivity();

  return (
    <DetailWidthWrapper>
      <DetailHeader />
      <GenericHeader title="Activity" />

      <div className="mt-8">
        {isLoading ? (
          <div>Loading activities...</div>
        ) : (
          <div className="space-y-4">
            {activities?.map((activity) => (
              <Card key={activity.Id}>
                <CardHeader className="py-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium">
                      {activity.Action}
                    </CardTitle>
                    <span className="text-xs text-muted-foreground">
                      {new Date(activity.TimeStamp).toLocaleString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="text-xs text-muted-foreground">
                    Module: {activity.Module}
                  </div>
                </CardContent>
              </Card>
            ))}
            {activities?.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No activity found.
              </div>
            )}
          </div>
        )}
      </div>
    </DetailWidthWrapper>
  );
}
