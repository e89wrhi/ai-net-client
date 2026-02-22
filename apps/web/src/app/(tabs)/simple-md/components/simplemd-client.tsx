'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { FileText, Sparkles, CheckCircle } from 'lucide-react';
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
      <Card className="p-8 space-y-6 border-none rounded-3xl">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <FileText className="h-6 w-6" />
          Markdown Analyzer
        </div>

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
          className="min-h-[250px]"
        />

        <Button
          onClick={analyzeMarkdown}
          disabled={!mdContent || isAnalyzing}
          className="w-full"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {isAnalyzing ? 'Analyzing...' : 'Analyze Markdown'}
        </Button>
      </Card>

      {/* Analysis Output */}
      {analysis && (
        <Card className="p-8">
          <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
            <CheckCircle className="h-5 w-5 text-lime-600" />
            Analysis Result
          </div>

          <div className="whitespace-pre-wrap text-sm border p-4 rounded-lg">
            {analysis}
          </div>
        </Card>
      )}
    </div>
  );
}
