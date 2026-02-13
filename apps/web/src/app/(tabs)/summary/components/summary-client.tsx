'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { FileText, Upload, Link as LinkIcon } from 'lucide-react';
import { useStreamSummarizeText } from '@/lib/api/summary/stream-summarize-text';
import { SummaryDetailLevel } from '@/types/enums/summary';
import SummaryHeader from './summary-header';

export default function SummarizationClient() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [summaryType, setSummaryType] = useState('paragraph');
  const [topicFocus, setTopicFocus] = useState('general');
  const [length, setLength] = useState('medium');
  const [inputMethod, setInputMethod] = useState('text');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const { mutateAsync: streamSummarize, isPending } = useStreamSummarizeText();

  const generateSummary = async () => {
    if (!inputText.trim()) return;

    setSummary('');

    // Map length to detail level
    let detailLevel = SummaryDetailLevel.Standard;
    if (length === 'short') detailLevel = SummaryDetailLevel.Short;
    if (length === 'detailed') detailLevel = SummaryDetailLevel.Detailed;

    try {
      const stream = await streamSummarize({
        Text: inputText,
        DetailLevel: detailLevel,
        Language: 'en', // Default to English for now as UI doesn't have language selector
        ModelId: selectedModel,
      });

      for await (const chunk of stream) {
        setSummary((prev) => prev + chunk);
      }
    } catch (error) {
      console.error('Summarization failed:', error);
    }
  };

  return (
    <div className="container mx-auto py-2">
      <SummaryHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-8 border-none rounded-3xl">
          <h2 className="mb-4">Input</h2>

          <Tabs
            value={inputMethod}
            onValueChange={setInputMethod}
            className="mb-4"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="text">
                <FileText className="h-4 w-4 mr-2" />
                Text
              </TabsTrigger>
              <TabsTrigger value="file">
                <Upload className="h-4 w-4 mr-2" />
                File
              </TabsTrigger>
              <TabsTrigger value="url">
                <LinkIcon className="h-4 w-4 mr-2" />
                URL
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text">
              <Textarea
                placeholder="Paste your text here to summarize..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[300px]"
              />
            </TabsContent>

            <TabsContent value="file">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-2">Upload a document</p>
                <p className="text-sm text-gray-400">
                  PDF, DOCX, TXT (Max 10MB)
                </p>
                <Button className="mt-4">Choose File</Button>
              </div>
            </TabsContent>

            <TabsContent value="url">
              <Input
                type="url"
                placeholder="https://example.com/article"
                className="mb-4"
              />
              <Button className="w-full">Fetch Content</Button>
            </TabsContent>
          </Tabs>

          <div className="space-y-4 mt-6">
            <div>
              <label className="text-sm mb-2 block">Summary Type</label>
              <Select value={summaryType} onValueChange={setSummaryType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paragraph">Paragraph</SelectItem>
                  <SelectItem value="bullets">Bullet Points</SelectItem>
                  <SelectItem value="headline">Headline</SelectItem>
                  <SelectItem value="abstract">Abstract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm mb-2 block">Topic Focus</label>
              <Select value={topicFocus} onValueChange={setTopicFocus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="key-takeaways">Key Takeaways</SelectItem>
                  <SelectItem value="action-items">Action Items</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm mb-2 block">Summary Length</label>
              <Select value={length} onValueChange={setLength}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={generateSummary} className="w-full" disabled={isPending}>
              {isPending ? 'Generating...' : 'Generate Summary'}
            </Button>
          </div>
        </Card>

        <Card className="p-8 border-none rounded-3xl">
          <h2 className="mb-4">Summary Output</h2>

          {summary ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg min-h-[300px] whitespace-pre-wrap">
                {summary}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Copy to Clipboard
                </Button>
                <Button variant="outline" className="flex-1">
                  Export
                </Button>
              </div>

              <Card className="p-4 bg-blue-50">
                <h3 className="text-sm mb-2">Summary Stats</h3>
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="text-2xl text-blue-600">85%</div>
                    <div className="text-gray-600">Compression</div>
                  </div>
                  <div>
                    <div className="text-2xl text-blue-600">
                      {summary.split(' ').length}
                    </div>
                    <div className="text-gray-600">Words</div>
                  </div>
                  <div>
                    <div className="text-2xl text-blue-600">0.8s</div>
                    <div className="text-gray-600">Processing</div>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-400 border-2 border-dashed rounded-lg">
              Your summary will appear here
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
