import React from 'react';
import UsageClient from './components/usage-client';

export default async function UsagePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <UsageClient />
    </div>
  );
}
