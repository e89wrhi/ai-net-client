'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useGetApiKeys } from '@/lib/api/orchestration/get-keys';
import { useRemoveApiKey } from '@/lib/api/orchestration/remove-key';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, KeyIcon } from 'lucide-react';
import { toast } from 'sonner';
import DetailWidthWrapper from '@/components/layout/detail-width-wrapper';
import DetailHeader from '@/components/layout/detail-header';
import GenericHeader from '../../_components/generic-header';

export default function ApiKeysClient() {
    const { data: keys, isLoading } = useGetApiKeys();
    const { mutate: removeKey } = useRemoveApiKey();

    const handleRemove = (id: string) => {
        removeKey(id, {
            onSuccess: () => toast.success('API key removed successfully'),
            onError: () => toast.error('Failed to remove API key'),
        });
    };

    return (
        <DetailWidthWrapper>
            <DetailHeader />
            <GenericHeader title="API Keys" />

            <div className="mt-8 space-y-6">
                <div className="flex justify-end">
                    <Button onClick={() => toast('Add key modal coming soon')}>
                        <Plus className="mr-2 size-4" />
                        Add New Key
                    </Button>
                </div>

                {isLoading ? (
                    <div>Loading keys...</div>
                ) : (
                    <div className="grid gap-4">
                        {keys?.map((key) => (
                            <Card key={key.id}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <div className="flex items-center gap-2">
                                        <KeyIcon className="size-4 text-muted-foreground" />
                                        <CardTitle className="text-sm font-medium">{key.label}</CardTitle>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => handleRemove(key.id)}>
                                        <Trash2 className="size-4 text-destructive" />
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        Provider: {key.providerName}
                                    </div>
                                    {key.lastUsedAt && (
                                        <div className="text-xs text-muted-foreground">
                                            Last used: {new Date(key.lastUsedAt).toLocaleDateString()}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                        {keys?.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground border rounded-lg border-dashed">
                                No API keys found. Add one to get started.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </DetailWidthWrapper>
    );
}
