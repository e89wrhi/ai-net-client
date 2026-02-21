'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Upload,
  HelpCircle,
  Sparkles,
  MessageCircle,
  History,
  Trash2,
  Copy,
  Share2,
  Clock,
  ArrowRight,
  FileText,
  Check,
  Search
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QuestionHeader from './question-header';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

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
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Toggle for development
  const USE_MOCK = true;

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
      await new Promise(resolve => setTimeout(resolve, 20 + Math.random() * 40));
      yield chunk;
    }
  };

  const askQuestion = async () => {
    if (!question.trim()) {
      toast.error('Please enter a question');
      return;
    }

    setIsGenerating(true);
    setCurrentAnswer('');

    try {
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
        context: context || undefined
      };

      setHistory([newEntry, ...history]);
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

  const suggestedQuestions = [
    'How do I implement a streaming API?',
    'Explain the benefits of glassmorphism',
    'What is the best way to handle large file uploads?',
    'Describe the distributed caching architecture',
  ];

  return (
    <div className="container mx-auto py-4 max-w-7xl animate-in fade-in duration-700">
      <QuestionHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />

      <div className="grid gap-8 lg:grid-cols-12 mt-4">
        {/* Main Q&A Area */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-1 border-none bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl shadow-2xl rounded-[2.5rem] ring-1 ring-zinc-200 dark:ring-zinc-800">
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/10 p-2 rounded-xl">
                  <MessageCircle className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Ask Anything</h2>
                  <p className="text-sm text-zinc-500">Get instant answers from our AI assistant</p>
                </div>
              </div>

              <div className="relative group">
                <Input
                  placeholder="Type your question here..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && askQuestion()}
                  className="h-16 rounded-2xl pl-14 pr-32 bg-zinc-100 dark:bg-zinc-800 border-none text-lg focus-visible:ring-primary/20"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-zinc-400" />
                <Button
                  onClick={askQuestion}
                  disabled={isGenerating || !question.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-12 rounded-xl px-6 gap-2 font-bold shadow-lg shadow-primary/20"
                >
                  <span>Ask</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <Tabs value={inputMethod} onValueChange={setInputMethod} className="w-full">
                <TabsList className="bg-zinc-100 dark:bg-zinc-800 p-1 rounded-2xl h-12 inline-flex mb-4">
                  <TabsTrigger value="text" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700">
                    <FileText className="h-4 w-4 mr-2" />
                    Context (Optional)
                  </TabsTrigger>
                  <TabsTrigger value="file" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700">
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
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">Click to upload context</p>
                    <p className="text-sm text-zinc-500">PDF or TXT documents (Max 10MB)</p>
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
          </Card>

          {currentAnswer && (
            <Card className="p-8 border-none bg-primary/[0.03] dark:bg-primary/[0.05] shadow-xl rounded-[2.5rem] ring-1 ring-primary/10 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="bg-primary p-1.5 rounded-lg">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-bold text-lg">AI Answer</h3>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={handleCopy} className="rounded-xl hover:bg-white dark:hover:bg-zinc-800 shadow-sm">
                    {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white dark:hover:bg-zinc-800 shadow-sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-lg leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">
                {currentAnswer}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-8 border-none bg-white dark:bg-zinc-900 shadow-xl rounded-[2rem] ring-1 ring-zinc-200 dark:ring-zinc-800">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <History className="h-5 w-5 text-zinc-400" />
                <h2 className="font-bold text-lg">History</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setHistory([])} className="h-8 w-8 text-zinc-400 hover:text-red-500">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {history.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-full inline-block">
                  <HelpCircle className="h-8 w-8 text-zinc-300" />
                </div>
                <p className="text-sm text-zinc-500">Your recent questions will appear here</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {history.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuestion(item.question);
                      setCurrentAnswer(item.answer);
                      setContext(item.context || '');
                    }}
                    className="w-full text-left p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-primary/30 hover:bg-primary/[0.02] transition-all group"
                  >
                    <p className="text-sm font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                      {item.question}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                      <Clock className="h-3 w-3" />
                      {item.timestamp.toLocaleTimeString()}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-8 border-none bg-gradient-to-br from-zinc-900 to-zinc-800 text-white shadow-xl rounded-[2rem]">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6 italic">Quick Ideas</h3>
            <div className="space-y-2">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setQuestion(q)}
                  className="w-full text-left text-sm p-3 rounded-xl hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20"
                >
                  {q}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
