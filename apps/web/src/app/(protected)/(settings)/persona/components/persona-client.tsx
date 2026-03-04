'use client';

import React from 'react';
import { useGetCurrentUser } from '@/lib/api/user/get-current';
import GenericHeader from '../../_components/generic-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

import { Sparkles, Brain, Fingerprint, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { useGenerateUserPersona } from '@/lib/api/user/generate-user-persona';

export default function PersonaClient() {
  const { data: user } = useGetCurrentUser('user-key');
  const { mutate: generatePersona, isPending } = useGenerateUserPersona();

  const handleRegenerate = () => {
    generatePersona(
      { UserId: user?.userId || 'usr-001' },
      {
        onSuccess: () => toast.success('Persona synthesis updated (mock)'),
        onError: () => toast.error('Failed to regenerate persona'),
      }
    );
  };

  return (
    <div className="space-y-8">
      <GenericHeader
        title="AI Persona"
        description="Your AI Persona is a reflection of your interaction history, specialized knowledge, and preferred communication style."
        action={
          <Button
            variant="outline"
            className="rounded-full gap-2 transition-all hover:pr-6"
            onClick={handleRegenerate}
            disabled={isPending}
          >
            <RefreshCw className={`size-4 ${isPending ? 'animate-spin' : ''}`} />
            Regenerate
          </Button>
        }
      />

      <div className="grid gap-8">
        <Card className="overflow-hidden border-none bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl shadow-sm">
          <CardHeader className="flex flex-row items-center gap-6 pb-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-background bg-muted">
                <Image
                  src={user?.image || '/avatar-fallback.png'}
                  alt={user?.name || 'User'}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl">{user?.name}</CardTitle>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                  {user?.status || 'Active Agent'}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4 pb-8">
            {[
              { icon: Brain, label: 'Cognitive Style', value: 'Analytical' },
              { icon: Sparkles, label: 'Tone', value: 'Professional' },
              { icon: Fingerprint, label: 'Uniqueness', value: '98%' },
            ].map((trait, i) => (
              <div
                key={i}
                className="p-4 rounded-3xl bg-background/50 border border-border/50 flex flex-col items-center gap-2 text-center"
              >
                <trait.icon className="size-5 text-primary" />
                <div className="space-y-0.5">
                  <p className="text-[10px] uppercase tracking-tighter text-muted-foreground font-bold">
                    {trait.label}
                  </p>
                  <p className="font-semibold">{trait.value}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="p-8 border border-dashed rounded-3xl bg-muted/5 flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <Sparkles className="size-8 text-primary animate-spin-slow" />
          </div>
          <div className="max-w-md space-y-2">
            <h3 className="font-bold text-lg text-foreground">
              Persona Synthesis in Progress
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We are currently analyzing your interaction patterns to synthesize
              a tailored AI assistant behavior. This feature will allow your AI
              to better anticipate your needs and match your preferred execution
              style.
            </p>
          </div>
          <style jsx global>{`
            @keyframes spin-slow {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            .animate-spin-slow {
              animation: spin-slow 8s linear infinite;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
