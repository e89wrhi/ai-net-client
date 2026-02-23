'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import SimplePluginHeader from './simpleplugin-header';
import { toast } from 'sonner';

type PluginResult = {
  title: string;
  snippet: string;
  url: string;
};

export default function SimplePluginClient() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PluginResult[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [toolLog, setToolLog] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [responseType, setResponseType] = useState<'stream' | 'json'>('stream');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  // -------------------------
  // Simulated Bing Search Plugin
  // -------------------------
  const runBingSearchPlugin = async () => {
    if (!query) return;

    setIsRunning(true);

    setToolLog((prev) => [
      ...prev,
      `🔌 Plugin invoked: bing_search`,
      `📥 Query received: "${query}"`,
      `⏳ Fetching search results...`,
    ]);

    // Simulated API delay
    setTimeout(() => {
      const fakeResults: PluginResult[] = [
        {
          title: `Result 1 for "${query}"`,
          snippet:
            'This is a simulated Bing search result description explaining relevant information.',
          url: 'https://example.com/result1',
        },
        {
          title: `Result 2 for "${query}"`,
          snippet:
            'Additional contextual information related to your query from trusted sources.',
          url: 'https://example.com/result2',
        },
      ];

      setResults(fakeResults);

      setToolLog((prev) => [
        ...prev,
        `✅ Plugin execution completed`,
        `📤 Returned ${fakeResults.length} results`,
      ]);

      setIsRunning(false);
    }, 1500);
  };

  const handleReset = () => {
    toast('Session Reset');
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <SimplePluginHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        responseType={responseType}
        onResponseTypeChange={setResponseType}
        onSessionReset={handleReset}
      />

      {/* Plugin Invocation */}
      <Card
        className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
      >
        <div className="p-8 space-y-15">
          <h2 className="text-xl font-semibold">Bing Search Plugin</h2>

          <Input
            placeholder="Enter search query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Button
            onClick={runBingSearchPlugin}
            disabled={!query || isRunning}
            className="w-full cursor-pointer rounded-full"
          >
            <Search className="h-4 w-4 mr-2" />
            {isRunning ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <Card
          className="p-8 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
        >
          <div className="pb-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">Result</h2>
            </div>
          </div>
          <div className="space-y-5">
            {results.map((result, i) => (
              <div key={i} className="p-4 rounded-lg space-y-2 text-sm">
                <div className="font-semibold">{result.title}</div>
                <div className="text-gray-600">{result.snippet}</div>
                <div className="text-blue-600 text-xs">{result.url}</div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
