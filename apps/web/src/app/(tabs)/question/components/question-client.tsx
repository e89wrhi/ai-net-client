'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Upload,
  Copy,
  Share2,
  ArrowRight,
  FileText,
  Check,
  Search,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QuestionHeader from './question-header';
import { toast } from 'sonner';

interface QAPair {
  question: string;
  answer: string;
  timestamp: Date;
  context?: string;
}

export default function QuestionAnswerClient() {
  const [question, setQuestion] = useState('');
  const [context, setContext] = useState('');
  const [history, setHistory] = useState<QAPair[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [inputMethod, setInputMethod] = useState('text');
  const [isCopied, setIsCopied] = useState(false);
  const [responseType, setResponseType] = useState<'stream' | 'json'>('stream');
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockAnswerStream = async function* (q: string, ctx?: string) {
    const response = ctx
      ? `Based on the context provided, here's the answer to your question: "${q}". 

The document details how the current architecture supports high-concurrency requests by utilizing a distributed caching layer. It specifically mentions that latency is reduced by nearly 30% when the edge-compute nodes are active. 

In relation to your specific query about implementation milestones, it appears that Phase 1 is scheduled for completion by the end of Q2.`
      : `That's an interesting question about "${q}". 

In general terms, this topic involves understanding the intersection of machine learning and large-scale data processing. Most modern implementations focus on three core pillars: data integrity, model robustness, and ethical alignment.

If you have a more specific scenario or a document you'd like me to analyze in this regard, feel free to upload it as context for a more tailored response.`;

    const chunks = response.split(/(?<= )/);
    for (const chunk of chunks) {
      await new Promise((resolve) =>
        setTimeout(resolve, 20 + Math.random() * 40)
      );
      yield chunk;
    }
  };

  const mockAnswerJson = async (q: string, ctx?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return ctx
      ? `[JSON Response] Based on the context provided, here's the answer to your question: "${q}". 

The document details how the current architecture supports high-concurrency requests by utilizing a distributed caching layer. It specifically mentions that latency is reduced by nearly 30% when the edge-compute nodes are active.`
      : `[JSON Response] That's an interesting question about "${q}". 

In general terms, this topic involves understanding the intersection of machine learning and large-scale data processing. Most modern implementations focus on three core pillars: data integrity, model robustness, and ethical alignment.`;
  };

  const askQuestion = async () => {
    if (!question.trim()) {
      toast.error('Please enter a question');
      return;
    }

    setIsGenerating(true);
    setCurrentAnswer('');

    try {
      if (responseType === 'stream') {
        let fullAnswer = '';
        const stream = mockAnswerStream(question, context);

        for await (const chunk of stream) {
          fullAnswer += chunk;
          setCurrentAnswer(fullAnswer);
        }

        const newEntry = {
          question,
          answer: fullAnswer,
          timestamp: new Date(),
          context: context || undefined,
        };
        setHistory([newEntry, ...history]);
      } else {
        const answer = await mockAnswerJson(question, context);
        setCurrentAnswer(answer);

        const newEntry = {
          question,
          answer: answer,
          timestamp: new Date(),
          context: context || undefined,
        };
        setHistory([newEntry, ...history]);
      }

      toast.success('Answer generated');
    } catch (error) {
      console.error('Q&A failed:', error);
      toast.error('Failed to get an answer');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
      toast.error('Currently only .txt files are supported for local parsing.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setContext(content);
      toast.success(`Context loaded from ${file.name}`);
    };
    reader.readAsText(file);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentAnswer);
    setIsCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReset = () => {
    toast('Session Reset');
  };

  return (
    <div className="container mx-auto py-4 max-w-7xl animate-in fade-in duration-700">
      <QuestionHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        responseType={responseType}
        onResponseTypeChange={setResponseType}
        onSessionReset={handleReset}
      />

      <div className="grid gap-8 mt-4">
        {/* Main Q&A Area */}
        <div className="lg:col-span-8 space-y-6">
          <Card
            className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
          >
            <div className="p-8">
              <div className="space-y-6">
                <div className="relative group">
                  <Input
                    placeholder="Type your question here..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && askQuestion()}
                    className="h-16 rounded-full pl-14 pr-32 bg-zinc-100 dark:bg-zinc-800 border-none text-lg focus-visible:ring-primary/20"
                  />
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-zinc-400" />
                  <Button
                    onClick={askQuestion}
                    disabled={isGenerating || !question.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-12 rounded-full px-6 gap-2 font-bold shadow-lg shadow-primary/20"
                  >
                    <span>Ask</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                <Tabs
                  value={inputMethod}
                  onValueChange={setInputMethod}
                  className="w-full"
                >
                  <TabsList className="bg-transparent p-1 rounded-full h-12 inline-flex mb-4">
                    <TabsTrigger
                      value="text"
                      className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Context (Optional)
                    </TabsTrigger>
                    <TabsTrigger
                      value="file"
                      className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Doc
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="text" className="mt-0">
                    <Textarea
                      placeholder="Paste relevant context here to improve answer accuracy..."
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      className="min-h-[150px] rounded-2xl bg-zinc-100/50 dark:bg-zinc-800/50 border-none resize-none"
                    />
                  </TabsContent>

                  <TabsContent value="file" className="mt-0">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-3xl p-10 text-center cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all group"
                    >
                      <Upload className="h-10 w-10 mx-auto mb-3 text-zinc-400 group-hover:text-primary transition-colors" />
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                        Click to upload context
                      </p>
                      <p className="text-sm text-zinc-500">
                        PDF or TXT documents (Max 10MB)
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
                </Tabs>
              </div>
            </div>
          </Card>

          {currentAnswer && (
            <Card
              className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">AI Answer</h3>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCopy}
                      className="rounded-xl hover:bg-white dark:hover:bg-zinc-800 shadow-sm"
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
                      className="rounded-xl hover:bg-white dark:hover:bg-zinc-800 shadow-sm"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-lg leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">
                  {currentAnswer}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
