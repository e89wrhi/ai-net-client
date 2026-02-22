'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';
import SimpleMDHeader from './simplemd-header';
import { toast } from 'sonner';

export default function SimpleMDClient() {
  const [mdFile, setMdFile] = useState<File | null>(null);
  const [mdContent, setMdContent] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

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
  const analyzeMarkdown = () => {
    if (!mdContent) return;

    setIsAnalyzing(true);

    // Mock analysis logic
    const headings = mdContent
      .split('\n')
      .filter((line) => line.startsWith('#'))
      .map((h) => h.replace(/^#+\s*/, ''));

    const wordCount = mdContent.split(' ').filter(Boolean).length;

    const keyPoints = headings.length
      ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
        headings.map((h, i) => `• ${h}`)
      : ['• No headings found'];

    const generatedAnalysis = `
Markdown Analysis Summary:

Word count: ${wordCount}
Number of headings: ${headings.length}

Key Points:
${keyPoints.join('\n')}

Suggestions:
- Add more descriptive headings
- Ensure consistent formatting
- Include code blocks or lists where relevant
    `;

    setTimeout(() => {
      setAnalysis(generatedAnalysis);
      setIsAnalyzing(false);
    }, 800);
  };

  const handleReset = () => {
    toast('Session Reset');
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <SimpleMDHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
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
            disabled={!mdContent || isAnalyzing}
            className="w-full rounded-full cursor-pointer"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze Markdown'}
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
