'use client';

import { useState, useRef } from 'react';
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
import {
  FileText,
  Upload,
  Link as LinkIcon,
  Sparkles,
  Copy,
  ExternalLink,
  Zap,
  Clock,
  BarChart3,
  Check
} from 'lucide-react';
import { useStreamSummarizeText } from '@/lib/api/summary/stream-summarize-text';
import { SummaryDetailLevel } from '@/types/enums/summary';
import SummaryHeader from './summary-header';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function SummarizationClient() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [summaryType, setSummaryType] = useState('paragraph');
  const [topicFocus, setTopicFocus] = useState('general');
  const [length, setLength] = useState('medium');
  const [inputMethod, setInputMethod] = useState('text');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [url, setUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: streamSummarize, isPending } = useStreamSummarizeText();

  // Toggle for development
  const USE_MOCK = true;

  const mockSummarizeStream = async function* () {
    const response = `Based on the content provided, here are the key takeaways:

1. Core Objective: The primary goal of this initiative is to streamline the document analysis process using advanced AI models.
2. Technical Infrastructure: The system utilizes a distributed architecture with low-latency streaming capabilities for real-time feedback.
3. User Experience: By focusing on minimalist UI design and predictive features like Tab-to-accept, productivity is expected to increase by 40%.
4. Future Roadmap: Upcoming updates will include multi-language support and integration with external cloud storage providers.

In conclusion, the proposed solution addresses current bottlenecks while providing a scalable foundation for future growth.`;

    const chunks = response.split(/(?<= )/);
    for (const chunk of chunks) {
      await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 50));
      yield chunk;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
      toast.error('Only .txt files are supported in this demo. PDF/DOCX require server-side parsing.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInputText(content);
      toast.success(`Loaded ${file.name}`);
    };
    reader.readAsText(file);
  };

  const handleUrlFetch = () => {
    if (!url) return;
    toast.loading('Fetching content...', { id: 'url-fetch' });

    // Simulate URL content fetching
    setTimeout(() => {
      setInputText(`This is mock content fetched from ${url}. In a production environment, we would use a library like Cheerio or a dedicated scraper service to extract the main article text, removing ads, navigation, and other boilerplate.`);
      toast.success('Content fetched successfully', { id: 'url-fetch' });
    }, 1500);
  };

  const generateSummary = async () => {
    if (!inputText.trim()) {
      toast.error('Please provide some text to summarize');
      return;
    }

    setSummary('');

    // Map length to detail level
    let detailLevel = SummaryDetailLevel.Standard;
    if (length === 'short') detailLevel = SummaryDetailLevel.Short;
    if (length === 'detailed') detailLevel = SummaryDetailLevel.Detailed;

    try {
      const stream = USE_MOCK
        ? mockSummarizeStream()
        : await streamSummarize({
          Text: inputText,
          DetailLevel: detailLevel,
          Language: 'en',
          ModelId: selectedModel,
        });

      for await (const chunk of stream) {
        setSummary((prev) => prev + chunk);
      }
    } catch (error) {
      console.error('Summarization failed:', error);
      toast.error('Failed to generate summary');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setIsCopied(true);
    toast.success('Summary copied to clipboard');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="container mx-auto py-4 max-w-7xl animate-in fade-in duration-700">
      <SummaryHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />

      <div className="grid gap-8 lg:grid-cols-12 mt-4">
        {/* Left Column: Input & Configuration */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-1 border-none bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl shadow-2xl rounded-[2rem] ring-1 ring-zinc-200 dark:ring-zinc-800">
            <Tabs
              value={inputMethod}
              onValueChange={setInputMethod}
              className="w-full"
            >
              <div className="px-6 pt-6">
                <TabsList className="grid w-full grid-cols-3 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-2xl h-12">
                  <TabsTrigger value="text" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:shadow-sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Text
                  </TabsTrigger>
                  <TabsTrigger value="file" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:shadow-sm">
                    <Upload className="h-4 w-4 mr-2" />
                    File
                  </TabsTrigger>
                  <TabsTrigger value="url" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:shadow-sm">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    URL
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="text" className="mt-0">
                  <Textarea
                    placeholder="Paste the text you want to distill into a summary..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[350px] border-none bg-transparent resize-none text-base focus-visible:ring-0 placeholder:text-zinc-400"
                  />
                </TabsContent>

                <TabsContent value="file" className="mt-0">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-3xl p-12 text-center cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all group"
                  >
                    <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-zinc-900 dark:text-zinc-100 font-semibold mb-1 text-lg">Select a file</p>
                    <p className="text-sm text-zinc-500 max-w-[200px] mx-auto">
                      PDF, DOCX, or TXT documents (Max 10MB)
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".txt"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="url" className="mt-0 space-y-4">
                  <div className="relative">
                    <Input
                      type="url"
                      placeholder="https://article.com/interesting-story"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="h-14 rounded-2xl pl-12 bg-zinc-100 dark:bg-zinc-800 border-none"
                    />
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                  </div>
                  <Button onClick={handleUrlFetch} className="w-full h-12 rounded-2xl gap-2 font-bold" variant="secondary">
                    <ExternalLink className="h-4 w-4" />
                    Extract Document Text
                  </Button>
                </TabsContent>
              </div>
            </Tabs>

            <div className="px-6 pb-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                    <Zap className="h-3 w-3 text-yellow-500" />
                    Style
                  </label>
                  <Select value={summaryType} onValueChange={setSummaryType}>
                    <SelectTrigger className="rounded-xl border-zinc-200 dark:border-zinc-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-zinc-200 dark:border-zinc-700">
                      <SelectItem value="paragraph" className="rounded-lg">Paragraph</SelectItem>
                      <SelectItem value="bullets" className="rounded-lg">Bullet Points</SelectItem>
                      <SelectItem value="headline" className="rounded-lg">Headline</SelectItem>
                      <SelectItem value="abstract" className="rounded-lg">Abstract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                    <Clock className="h-3 w-3 text-blue-500" />
                    Length
                  </label>
                  <Select value={length} onValueChange={setLength}>
                    <SelectTrigger className="rounded-xl border-zinc-200 dark:border-zinc-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-zinc-200 dark:border-zinc-700">
                      <SelectItem value="short" className="rounded-lg">Short</SelectItem>
                      <SelectItem value="medium" className="rounded-lg">Medium</SelectItem>
                      <SelectItem value="detailed" className="rounded-lg">Detailed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={generateSummary}
                className="w-full h-14 rounded-2xl gap-2 text-lg font-bold shadow-xl shadow-primary/20 relative overflow-hidden group"
                disabled={isPending || !inputText.trim()}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex items-center gap-2">
                  {isPending ? (
                    <Sparkles className="h-5 w-5 animate-pulse" />
                  ) : (
                    <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  )}
                  {isPending ? 'Crafting Summary...' : 'Summarize Document'}
                </div>
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column: Output */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="min-h-[600px] border-none bg-white dark:bg-zinc-900 shadow-2xl rounded-[2rem] flex flex-col ring-1 ring-zinc-200 dark:ring-zinc-800">
            <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-xl">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Summary Output</h2>
              </div>

              {summary && (
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={handleCopy} className="rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>

            <div className="flex-1 p-8">
              {summary ? (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                    {summary}
                  </div>

                  <Card className="p-6 border-none bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl mt-12 ring-1 ring-zinc-200 dark:ring-zinc-800">
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      <h3 className="font-bold text-sm uppercase tracking-widest text-zinc-500">Summary Metrics</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="space-y-1">
                        <div className="text-2xl font-black text-primary">82%</div>
                        <div className="text-[10px] font-bold uppercase text-zinc-400">Compression</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-2xl font-black text-primary">
                          {summary.split(/\s+/).filter(Boolean).length}
                        </div>
                        <div className="text-[10px] font-bold uppercase text-zinc-400">Word Count</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-2xl font-black text-primary italic">~0.4s</div>
                        <div className="text-[10px] font-bold uppercase text-zinc-400">AI Latency</div>
                      </div>
                    </div>
                  </Card>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-full">
                    <Zap className="h-16 w-16 text-zinc-300" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">Ready to analyze</p>
                    <p className="text-zinc-500 max-w-[300px]">
                      Upload a file or paste text to see the AI magic happen here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
