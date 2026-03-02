import React from 'react';
import ActivityClient from './components/activity-client';

export default async function ActivityPage() {
  return (
    <div className="min-h-screen bg-background">
      <ActivityClient />
    </div>
  );
}
