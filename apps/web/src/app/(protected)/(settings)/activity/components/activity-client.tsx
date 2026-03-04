'use client';

import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetUserActivity } from '@/lib/api/user/get-user-activity';
import GenericHeader from '../../_components/generic-header';

export default function ActivityClient() {
  const { data: activities, isLoading } = useGetUserActivity();

  return (
    <div className="space-y-6">
      <GenericHeader
        title="Activity"
        description="Monitor your account activity and security events."
      />

      <div className="grid gap-4">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 w-full animate-pulse rounded-xl bg-muted"
              />
            ))}
          </div>
        ) : (
          <>
            {activities?.map((activity) => (
              <Card
                key={activity.Id}
                className="group overflow-hidden border-none bg-muted/30 transition-all hover:bg-muted/50"
              >
                <CardHeader className="py-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-semibold">
                        {activity.Action}
                      </CardTitle>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-background border text-[10px] uppercase tracking-wider font-medium">
                          {activity.Module}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] text-muted-foreground font-medium">
                      {new Date(activity.TimeStamp).toLocaleString()}
                    </span>
                  </div>
                </CardHeader>
              </Card>
            ))}
            {activities?.length === 0 && (
              <div className="text-center py-20 border rounded-3xl border-dashed">
                <p className="text-muted-foreground">No activity found.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
