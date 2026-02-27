import React from 'react';
import ApiKeysClient from './components/api-keys-client';

export default async function ApiKeysPage() {
    return (
        <div className="min-h-screen bg-background">
            <ApiKeysClient />
        </div>
    );
}
