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
import { Bug, Lightbulb, RefreshCw, Sparkles } from 'lucide-react';
import { useStreamAnalyzeCode } from '@/lib/api/code-debug/stream-analyze-code';
import { DebugDepth, ProgrammingLanguage } from '@/types/enums/code-debug';
import CodeDebugHeader from './code-debug-header';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

export default function CodeDebugClient() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [analysisType, setAnalysisType] = useState('explain');
  const [result, setResult] = useState('');
  const [responseType, setResponseType] = useState<'stream' | 'json'>('stream');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const { mutateAsync: streamAnalyze, isPending } = useStreamAnalyzeCode();

  const getLanguageEnum = (lang: string): ProgrammingLanguage => {
    switch (lang) {
      case 'python':
        return ProgrammingLanguage.Python;
      case 'javascript':
        return ProgrammingLanguage.JavaScript;
      case 'typescript':
        return ProgrammingLanguage.TypeScript;
      case 'java':
        return ProgrammingLanguage.Java;
      case 'go':
        return ProgrammingLanguage.Go;
      case 'rust':
        return ProgrammingLanguage.Rust;
      case 'csharp':
        return ProgrammingLanguage.CSharp;
      default:
        return ProgrammingLanguage.Other;
    }
  };

  const analyzeCode = async () => {
    if (!code.trim()) return;

    setResult('');

    try {
      const stream = await streamAnalyze({
        UserId: 'user-1', // Placeholder
        Code: code,
        Language: getLanguageEnum(language),
        Depth: DebugDepth.Standard,
        IncludeSuggestion: true,
        ModelId: selectedModel,
      });

      for await (const chunk of stream) {
        setResult((prev) => prev + chunk);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    }
  };

  const handleReset = () => {
    toast('Session Reset');
  };

  return (
    <div className="container mx-auto py-2">
      <CodeDebugHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        responseType={responseType}
        onResponseTypeChange={setResponseType}
        onSessionReset={handleReset}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card
          className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
        >
          <div className="p-8">
            <div className="space-y-4">
              <Textarea
                placeholder="Enter your code snippet..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[300px] border-none shadow-none font-mono text-sm"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="px-4 rounded-full border-none shadow-none bg-neutral-100 dark:bg-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="p-4 rounded-3xl space-y-3 border-none shadow-none bg-neutral-100 dark:bg-black">
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select value={analysisType} onValueChange={setAnalysisType}>
                    <SelectTrigger className="px-4 rounded-full border-none shadow-none bg-neutral-100 dark:bg-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="p-4 rounded-3xl space-y-3 border-none shadow-none bg-neutral-100 dark:bg-black">
                      <SelectItem value="explain">Explain Code</SelectItem>
                      <SelectItem value="debug">Find Bugs</SelectItem>
                      <SelectItem value="refactor">Refactor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={analyzeCode}
                  className="w-full rounded-full cursor-pointer"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Spinner className="h-4 w-4" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {isPending ? 'Analyzing...' : 'Analyze Code'}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card
          className="p-8 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
        >
          <div className="pb-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">Code Analysis</h2>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            {result && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </div>
            )}
          </div>

          {result ? (
            <div className="space-y-4">
              <Tabs defaultValue="analysis">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="analysis">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Analysis
                  </TabsTrigger>
                  <TabsTrigger value="suggestions">
                    <Bug className="h-4 w-4 mr-2" />
                    Issues
                  </TabsTrigger>
                  <TabsTrigger value="metrics">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Metrics
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="analysis" className="min-h-[400px]">
                  <div className="p-4 rounded-lg whitespace-pre-wrap text-sm">
                    {result}
                  </div>
                </TabsContent>

                <TabsContent value="suggestions">
                  <div className="space-y-3">
                    {[
                      {
                        severity: 'high',
                        issue: 'Potential null pointer exception',
                        line: 15,
                      },
                      {
                        severity: 'medium',
                        issue: 'Consider adding input validation',
                        line: 8,
                      },
                      {
                        severity: 'low',
                        issue: 'Variable naming could be improved',
                        line: 3,
                      },
                    ].map((item, i) => (
                      <Card key={i} className="p-3">
                        <div className="flex items-start gap-3">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              item.severity === 'high'
                                ? 'bg-red-100 text-red-700'
                                : item.severity === 'medium'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {item.severity}
                          </span>
                          <div className="flex-1">
                            <div className="text-sm">{item.issue}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              Line {item.line}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="metrics">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4 text-center">
                      <div className="text-3xl text-blue-600">8.5/10</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Code Quality
                      </div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-3xl text-green-600">92%</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Maintainability
                      </div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-3xl text-orange-600">3</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Issues Found
                      </div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-3xl text-purple-600">O(n)</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Complexity
                      </div>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-400 rounded-lg">
              <Bug className="h-12 w-12 mb-4" />
              <p>Paste your code and click &quot;Analyze Code&quot;</p>
              <p className="text-sm mt-2">
                Get insights, debug suggestions, and refactoring tips
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
