'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useGetUserUsageSummary } from '@/lib/api/user/get-user-usage-summary';
import GenericHeader from '../../_components/generic-header';

import { Zap, Activity, BarChart3, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function UsageClient() {
  const { data: usage, isLoading } = useGetUserUsageSummary();

  const mockLimit = 25000;
  const tokenUsed = Number(usage?.TokenUsed || 0);
  const usagePercentage = Math.min((tokenUsed / mockLimit) * 100, 100);

  return (
    <div className="space-y-8">
      <GenericHeader
        title="Usage"
        description="Track your token consumption and request activity across all AI services."
      />

      <div className="grid gap-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-48 animate-pulse rounded-3xl bg-muted" />
            <div className="h-48 animate-pulse rounded-3xl bg-muted" />
          </div>
        ) : (
          <>
            {/* Overview Card */}
            <Card className="border-none bg-muted/30 rounded-3xl overflow-hidden shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Zap className="size-5 text-primary" />
                    Resource Consumption
                  </CardTitle>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground bg-background px-2 py-1 rounded-full border">
                    {usage?.Period || 'Current Month'}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div className="space-y-0.5">
                      <p className="text-3xl font-bold tracking-tighter">
                        {usage?.TokenUsed || 0}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        Tokens Consumed
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round(usagePercentage)}% of monthly limit
                    </p>
                  </div>
                  <Progress value={usagePercentage} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  label: 'Total Requests',
                  value: usage?.RequestsCount || 0,
                  icon: Activity,
                  color: 'text-blue-500',
                },
                {
                  label: 'Avg. Efficiency',
                  value: '94%',
                  icon: BarChart3,
                  color: 'text-green-500',
                },
                {
                  label: 'Active Hours',
                  value: '124h',
                  icon: Clock,
                  color: 'text-purple-500',
                },
              ].map((stat, i) => (
                <Card
                  key={i}
                  className="border-none bg-muted/20 rounded-3xl shadow-none"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl bg-background border ${stat.color}`}>
                        <stat.icon className="size-5" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
