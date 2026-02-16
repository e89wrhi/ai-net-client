'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plug, Terminal } from 'lucide-react';
import SimplePluginHeader from './simpleplugin-header';

type PluginResult = {
  title: string;
  snippet: string;
  url: string;
};

export default function SimplePluginClient() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PluginResult[]>([]);
  const [toolLog, setToolLog] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
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

  return (
    <div className="container mx-auto py-6 space-y-8">
      <SimplePluginHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />
      {/* Header */}
      <Card className="p-8 space-y-4 border-none rounded-3xl">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <Plug className="h-6 w-6" />
          AI Plugins Showcase
        </div>
        <div className="text-sm text-gray-500">
          Demonstration of AI calling external tools (e.g., Bing Search Plugin).
        </div>
      </Card>

      {/* Plugin Invocation */}
      <Card className="p-8 space-y-6 border-none rounded-3xl">
        <h2 className="text-xl font-semibold">Bing Search Plugin</h2>

        <Input
          placeholder="Enter search query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Button
          onClick={runBingSearchPlugin}
          disabled={!query || isRunning}
          className="w-full"
        >
          <Search className="h-4 w-4 mr-2" />
          {isRunning ? 'Running Plugin...' : 'Run Bing Search Plugin'}
        </Button>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <Card className="p-8 space-y-4 rounded-3xl border-none">
          <h2 className="text-xl font-semibold">Search Results</h2>

          {results.map((result, i) => (
            <div key={i} className="border p-4 rounded-lg space-y-2 text-sm">
              <div className="font-semibold">{result.title}</div>
              <div className="text-gray-600">{result.snippet}</div>
              <div className="text-blue-600 text-xs">{result.url}</div>
            </div>
          ))}
        </Card>
      )}

      {/* Tool Execution Log */}
      {toolLog.length > 0 && (
        <Card className="p-8 space-y-4 border-none rounded-3xl">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Terminal className="h-5 w-5" />
            Tool Execution Log
          </div>

          <div className="bg-black text-green-400 text-xs p-4 rounded-lg font-mono space-y-1">
            {toolLog.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>
        </Card>
      )}

      {/* Plugin Marketplace Preview */}
      <Card className="p-8 space-y-4 rounded-3xl border-none">
        <h2 className="text-xl font-semibold">Available Plugins</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="border p-4 rounded-lg">
            <div className="font-semibold">Bing Search</div>
            <div className="text-gray-500">
              Retrieve up-to-date web information.
            </div>
          </div>

          <div className="border p-4 rounded-2xl">
            <div className="font-semibold">Weather API</div>
            <div className="text-gray-500">Get real-time weather updates.</div>
          </div>

          <div className="border p-4 rounded-lg">
            <div className="font-semibold">Stock Market</div>
            <div className="text-gray-500">
              Retrieve current financial data.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
