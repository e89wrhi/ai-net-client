'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, Trash2, Copy, Check, Command } from 'lucide-react';
import { useStreamAutoComplete } from '@/lib/api/autocomplete/generate-stream';
import { useGenerateAutoComplete } from '@/lib/api/autocomplete/generate';
import { CompletionMode } from '@/types/enums/autocomplete';
import AutocompleteHeader from './autocomplete-header';
import { toast } from 'sonner';

export default function AutocompleteClient() {
  const [messageText, setMessageText] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [responseType, setResponseType] = useState<'stream' | 'json'>('stream');
  const [isCopied, setIsCopied] = useState(false);

  const { mutateAsync: streamComplete } = useStreamAutoComplete();
  const { mutateAsync: jsonComplete } = useGenerateAutoComplete();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Toggle this to switch between mock and real API
  const USE_MOCK = true;

  // Mock stream generator for development
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mockStreamAutoComplete = async function* (prompt: string) {
    const responses = [
      ' and I would be happy to discuss this project further with your team.',
      " that we've been working on for the past few weeks should be ready by Friday.",
      ', which will help us achieve our goals much faster than the previous approach.',
      ' and let me know if you have any other questions about the implementation.',
      ' is exactly what we need to move forward with the next phase of development.',
    ];

    const response =
      responses[Math.floor(Math.random() * responses.length)] || responses[0]!;
    const chunks = response.split(/(?<= )/); // Split by space but keep it

    for (const chunk of chunks) {
      await new Promise((resolve) =>
        setTimeout(resolve, 40 + Math.random() * 60)
      );
      yield chunk;
    }
  };

  // debounced suggestion trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      if (messageText.length > 5 && !suggestion) {
        generateLiveSuggestion(messageText);
      }
    }, 800);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageText]);

  const generateLiveSuggestion = async (prompt: string) => {
    try {
      setSuggestion('');

      if (responseType === 'stream') {
        const stream = USE_MOCK
          ? mockStreamAutoComplete(prompt)
          : await streamComplete({
              Prompt: prompt,
              Mode: CompletionMode.Inline,
              ModelId: selectedModel,
            });

        for await (const chunk of stream) {
          setSuggestion((prev) => prev + chunk);
        }
      } else {
        // JSON implementation
        if (USE_MOCK) {
          // Simple mock for JSON
          await new Promise((resolve) => setTimeout(resolve, 500));
          const mockItems = [
            ' and let me know what you think.',
            ', I hope this helps!',
            ' is exactly what we were looking for.',
          ];
          setSuggestion(
            mockItems[Math.floor(Math.random() * mockItems.length)] || ''
          );
        } else {
          const response = await jsonComplete({
            Prompt: prompt,
            Mode: CompletionMode.Inline,
            ModelId: selectedModel,
          });
          if (response?.Completion) {
            setSuggestion(response.Completion);
          }
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Suggestion failed:', error);
      }
    }
  };

  const handleAcceptSuggestion = () => {
    if (suggestion) {
      setMessageText((prev) => prev + suggestion);
      setSuggestion('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && suggestion) {
      e.preventDefault();
      handleAcceptSuggestion();
    }
    // Clear suggestion on any key press if needed, but usually we just want to hide it if they keep typing
    if (
      e.key !== 'Tab' &&
      e.key !== 'Shift' &&
      e.key !== 'Control' &&
      e.key !== 'Alt'
    ) {
      setSuggestion('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setIsCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReset = () => {
    toast('Session Reset');
  };

  return (
    <div className="container mx-auto py-4 max-w-4xl animate-in fade-in duration-700">
      <AutocompleteHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        responseType={responseType}
        onResponseTypeChange={setResponseType}
        onSessionReset={handleReset}
      />

      <div className="mt-8 relative group">
        <Card
          className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
        >
          <div className="p-8">
            <div className="relative min-h-[400px]">
              {/* Ghost Text Overlay */}
              <div
                className="absolute inset-0 p-0 pointer-events-none text-lg leading-relaxed whitespace-pre-wrap break-words text-transparent"
                style={{ font: 'inherit' }}
              >
                <span>{messageText}</span>
                <span className="text-zinc-300 dark:text-zinc-600 animate-pulse">
                  {suggestion}
                </span>
              </div>

              <Textarea
                ref={textareaRef}
                placeholder="Start typing your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="absolute shadow-none inset-0 w-full h-full p-0 text-lg border-none focus-visible:ring-0 bg-transparent resize-none leading-relaxed placeholder:text-zinc-400 z-10"
              />
            </div>
          </div>

          <div className="px-4 sm:px-8 py-4 sm:py-5 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center justify-between w-full sm:w-auto gap-2 sm:gap-4 flex-shrink-0">
              <button 
                onClick={handleAcceptSuggestion}
                disabled={!suggestion}
                className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-300 font-medium px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-sm transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Command className="h-3 w-3" />
                <span className="hidden sm:inline">Tab to Accept</span>
                <span className="sm:hidden">Accept</span>
              </button>
              <div className="text-xs text-zinc-400">
                {messageText.length} chars
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="h-10 w-10 rounded-full hover:bg-white dark:hover:bg-zinc-800 shadow-sm transition-all"
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMessageText('')}
                  className="h-10 w-10 rounded-full hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-500 transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Button
                onClick={() => generateLiveSuggestion(messageText)}
                className="rounded-full px-4 sm:px-5 gap-2 shadow-lg shadow-primary/20 sm:ml-2"
              >
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">AI completion</span>
                <span className="sm:hidden">AI</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60 hover:opacity-100 transition-opacity">
        <div className="p-4 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
            Smart Fill
          </p>
          <p className="text-sm text-zinc-500">
            Wait for AI to suggest the next words
          </p>
        </div>
        <div className="p-4 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
            Hotkeys
          </p>
          <p className="text-sm text-zinc-500">
            Press Tab to instantly accept suggestions
          </p>
        </div>
        <div className="p-4 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
            Streaming
          </p>
          <p className="text-sm text-zinc-500">
            Watch recommendations appear in real-time
          </p>
        </div>
      </div>
    </div>
  );
}
