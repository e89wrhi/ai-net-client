'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useGetApiKeys } from '@/lib/api/orchestration/get-keys';
import { useRemoveApiKey } from '@/lib/api/orchestration/remove-key';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, KeyIcon, Eye, EyeOff, Copy } from 'lucide-react';
import { toast } from 'sonner';
import GenericHeader from '../../_components/generic-header';
import { useAddApiKey } from '@/lib/api/orchestration/add-key';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

export default function ApiKeysClient() {
  const { data: keys, isLoading } = useGetApiKeys();
  const { mutate: removeKey } = useRemoveApiKey();
  const { mutate: addKey, isPending: isAdding } = useAddApiKey();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});
  const [newKey, setNewKey] = useState({
    provider: '',
    label: '',
    key: '',
  });

  const toggleKeyVisibility = (id: string) => {
    setShowKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRemove = (id: string) => {
    removeKey(id, {
      onSuccess: () => toast.success('API key removed successfully'),
      onError: () => toast.error('Failed to remove API key'),
    });
  };

  const handleAddKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey.provider || !newKey.key || !newKey.label) {
      toast.error('Please fill in all fields');
      return;
    }

    addKey(newKey, {
      onSuccess: () => {
        toast.success('API key added successfully');
        setIsDialogOpen(false);
        setNewKey({ provider: '', label: '', key: '' });
      },
      onError: () => toast.error('Failed to add API key'),
    });
  };

  const ActionButton = (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full shadow-lg shadow-primary/20">
          <Plus className="mr-2 size-4" />
          Add New Key
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl sm:max-w-[425px]">
        <form onSubmit={handleAddKey}>
          <DialogHeader>
            <DialogTitle>Add API Key</DialogTitle>
            <DialogDescription>
              Enter a label and the API key from your provider.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <Select
                value={newKey.provider}
                onValueChange={(v) => setNewKey({ ...newKey, provider: v })}
              >
                <SelectTrigger className="rounded-full">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OpenAI">OpenAI</SelectItem>
                  <SelectItem value="Anthropic">Anthropic</SelectItem>
                  <SelectItem value="Google">Google (Gemini)</SelectItem>
                  <SelectItem value="DeepSeek">DeepSeek</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                placeholder="e.g. Production OpenAI Key"
                className="rounded-full"
                value={newKey.label}
                onChange={(e) => setNewKey({ ...newKey, label: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="key">API Key</Label>
              <Input
                id="key"
                type="password"
                placeholder="sk-..."
                className="rounded-full font-mono"
                value={newKey.key}
                onChange={(e) => setNewKey({ ...newKey, key: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="rounded-full w-full"
              disabled={isAdding}
            >
              {isAdding ? 'Adding...' : 'Save API Key'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      <GenericHeader
        title="API Keys"
        description="Manage your integration keys for various AI providers (OpenAI, Anthropic, etc.)."
        action={ActionButton}
      />

      <div className="grid gap-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-32 w-full animate-pulse rounded-3xl bg-muted"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keys?.map((key) => (
              <Card
                key={key.id}
                className="group relative overflow-hidden border-none bg-muted/30 transition-all hover:bg-muted/50 rounded-3xl"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-background rounded-full border">
                      <KeyIcon className="size-4 text-primary" />
                    </div>
                    <CardTitle className="text-sm font-bold">
                      {key.label}
                    </CardTitle>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-3xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove API Key?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the key "
                          <span className="font-semibold text-foreground">
                            {key.label}
                          </span>
                          ". Any services using this key will stop working.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-full">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="rounded-full bg-destructive hover:bg-destructive/90"
                          onClick={() => handleRemove(key.id)}
                        >
                          Remove Key
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="flex items-center justify-between p-3 bg-background rounded-2xl border font-mono text-sm group/key">
                    <span className="truncate max-w-[180px]">
                      {showKeys[key.id]
                        ? key.fullKey || key.maskedKey || '••••••••••••••••'
                        : '••••••••••••••••••••'}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 rounded-lg opacity-0 group-hover/key:opacity-100 transition-opacity"
                        onClick={() => toggleKeyVisibility(key.id)}
                      >
                        {showKeys[key.id] ? (
                          <EyeOff className="size-3" />
                        ) : (
                          <Eye className="size-3" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 rounded-lg opacity-0 group-hover/key:opacity-100 transition-opacity"
                        onClick={() => {
                          const toCopy = key.fullKey || key.maskedKey;
                          if (toCopy) {
                            navigator.clipboard.writeText(toCopy);
                            toast.success('Key copied to clipboard');
                          }
                        }}
                      >
                        <Copy className="size-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/70">
                      <span>Provider</span>
                      <span className="text-foreground">{key.providerName}</span>
                    </div>
                    {key.lastUsedAt && (
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/70">
                        <span>Last Used</span>
                        <span className="text-foreground">
                          {new Date(key.lastUsedAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            {keys?.length === 0 && (
              <div className="col-span-full border border-dashed rounded-3xl py-20 bg-muted/5 flex flex-col items-center justify-center gap-4">
                <div className="p-4 bg-muted/20 rounded-full">
                  <KeyIcon className="size-8 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-muted-foreground">
                    No keys found
                  </p>
                  <p className="text-sm text-muted-foreground/60">
                    Add an API key to start using specialized AI models.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
