import React from 'react';
import PersonaClient from './components/persona-client';

export default async function PersonaPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <PersonaClient />
    </div>
  );
}
