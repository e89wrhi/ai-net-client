'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';
import { useStreamSummarizeMarkdown } from '@/lib/api/simple-md/stream-summarize';
import { useSummarizeMarkdown } from '@/lib/api/simple-md/summarize';
import SimpleMDHeader from './simplemd-header';
import { toast } from 'sonner';

export default function SimpleMDClient() {
  const [mdFile, setMdFile] = useState<File | null>(null);
  const [mdContent, setMdContent] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [responseType, setResponseType] = useState<'stream' | 'json'>('stream');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  // Toggle for development
  const USE_MOCK = true;

  const mockMDStream = async function* () {
    const response = `[Streaming MD Analysis] Your markdown file has been parsed. 
    
Key Sections:
# Introduction
# Functional Requirements
# Implementation Details

The document uses standard CommonMark syntax and includes 3 code blocks. 
Recommended improvements:
- Add a table of contents.
- Use more descriptive link text.`;

    const chunks = response.split(/(?<= )/);
    for (const chunk of chunks) {
      await new Promise((resolve) =>
        setTimeout(resolve, 30 + Math.random() * 50)
      );
      yield chunk;
    }
  };

  const mockMDJson = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `[JSON Response MD Analysis] Markdown analysis complete. Word count: 450. Suggested tags: Documentation, Frontend, API.`;
  };

  const { mutateAsync: streamSummarize, isPending: isStreamPending } =
    useStreamSummarizeMarkdown();
  const { mutateAsync: jsonSummarize, isPending: isJsonPending } =
    useSummarizeMarkdown();

  const isPending = isStreamPending || isJsonPending;

  // ----------------------------
  // Handle .md file upload
  // ----------------------------
  const handleFileUpload = async (file: File | null) => {
    if (!file) return;

    setMdFile(file);

    if (file.type === 'text/markdown' || file.name.endsWith('.md')) {
      const text = await file.text();
      setMdContent(text);
    } else {
      setMdContent('Unsupported file type. Please upload a .md file.');
    }
  };

  // ----------------------------
  // Analyze Markdown
  // ----------------------------
  const analyzeMarkdown = async () => {
    if (!mdContent) return;

    setAnalysis('');
    setIsAnalyzing(true);

    try {
      if (responseType === 'stream') {
        const stream = USE_MOCK
          ? mockMDStream()
          : await streamSummarize({
              UserId: 'user-1',
              Content: mdContent,
              ModelId: selectedModel,
            });

        for await (const chunk of stream) {
          setAnalysis((prev) => prev + chunk);
        }
      } else {
        const result = USE_MOCK
          ? await mockMDJson()
          : (
              await jsonSummarize({
                Content: mdContent,
                ModelId: selectedModel,
              })
            )?.Summary;

        if (result) {
          setAnalysis(result);
        }
      }
    } catch (error) {
      console.error('Markdown analysis failed:', error);
      toast.error('Failed to analyze markdown');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    toast('Session Reset');
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <SimpleMDHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        responseType={responseType}
        onResponseTypeChange={setResponseType}
        onSessionReset={handleReset}
      />
      {/* Upload Section */}
      <Card
        className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
      >
        <div className="p-8">
          <Input
            type="file"
            accept=".md,text/markdown"
            onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
          />

          {mdFile && (
            <div className="text-sm text-gray-500">Uploaded: {mdFile.name}</div>
          )}

          <Textarea
            placeholder="Or paste Markdown content here..."
            value={mdContent}
            onChange={(e) => setMdContent(e.target.value)}
            className="min-h-[250px] border-none shadow-none"
          />

          <Button
            onClick={analyzeMarkdown}
            disabled={!mdContent || isPending}
            className="w-full rounded-full cursor-pointer"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isPending ? 'Analyzing...' : 'Analyze Markdown'}
          </Button>
        </div>
      </Card>

      {/* Analysis Output */}
      {analysis && (
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
          <div className="whitespace-pre-wrap text-lg">{analysis}</div>
        </Card>
      )}
    </div>
  );
}
