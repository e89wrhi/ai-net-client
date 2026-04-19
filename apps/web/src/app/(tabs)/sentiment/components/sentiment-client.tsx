'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Heart, Frown, Meh, Smile, Sparkles } from 'lucide-react';
import { useAnalyzeSentimentDetailed } from '@/lib/api/sentiment/analyze-sentiment-detailed';
import SentimentHeader from './sentiment-header';
import { toast } from 'sonner';

interface SentimentResult {
  overall: 'positive' | 'negative' | 'neutral';
  scores: {
    positive: number;
    negative: number;
    neutral: number;
  };
  keywords: { word: string; sentiment: string }[];
}

export default function SentimentClient() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [responseType, setResponseType] = useState<'stream' | 'json'>('stream');

  // Toggle for development
  const USE_MOCK = true;

  const mockSentimentStream = async function* () {
    const response = `[Streaming Analysis] The text you provided has been analyzed. 
    
Overall Sentiment: POSITIVE. 

Detailed breakdown:
- Positivity Score: 92%
- Negative Score: 2%
- Neutral Score: 6%

Keywords identified: "Excellent", "Efficient", "Reliable". 

This analysis is being streamed to show real-time processing results.`;

    const chunks = response.split(/(?<= )/);
    for (const chunk of chunks) {
      await new Promise((resolve) =>
        setTimeout(resolve, 30 + Math.random() * 50)
      );
      yield chunk;
    }
  };

  const mockSentimentJson = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      overall: 'positive' as const,
      scores: { positive: 95, negative: 1, neutral: 4 },
      keywords: [
        { word: 'Performance', sentiment: 'positive' },
        { word: 'Scalability', sentiment: 'positive' },
      ],
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutateAsync: analyzeDetailed, isPending } =
    useAnalyzeSentimentDetailed();

  const analyzeSentiment = async () => {
    if (!text.trim()) return;

    try {
      if (responseType === 'stream') {
        const stream = USE_MOCK ? mockSentimentStream() : null; // Would call real stream API here if it existed

        if (stream) {
          // For streaming in the UI, we'd typically need a different state to show the text
          // but for this mock, let's just simulate the final result after streaming
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          for await (const _chunk of stream) {
            // just to simulate delay
          }
        }

        // Final mock result for visual consistency
        setResult({
          overall: 'positive',
          scores: { positive: 88, negative: 4, neutral: 8 },
          keywords: [{ word: 'Streaming', sentiment: 'positive' }],
        });
      } else {
        const res = USE_MOCK ? await mockSentimentJson() : null; // Would call real json API here

        if (res) {
          setResult(res);
        }
      }
    } catch (error) {
      console.error('Sentiment analysis failed:', error);
      toast.error('Failed to analyze sentiment');
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Smile className="h-18 w-18 text-green-500" />;
      case 'negative':
        return <Frown className="h-18 w-18 text-red-500" />;
      default:
        return <Meh className="h-18 w-18" />;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500';
      case 'negative':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleReset = () => {
    toast('Session Reset');
  };

  return (
    <div className="container mx-auto py-2">
      <SentimentHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        responseType={responseType}
        onResponseTypeChange={setResponseType}
        onSessionReset={handleReset}
      />

      <div className="grid gap-6 lg:grid-cols-2 mt-10">
        <Card
          className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
        >
          <div className="p-8">
            <div className="space-y-4">
              <Textarea
                placeholder="Paste text to analyze sentiment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[250px] border-none shadow-none"
              />
              <div className="text-xs text-gray-500 mt-1">
                {text.length} characters •{' '}
                {text.split(' ').filter((w) => w).length} words
              </div>

              <Button
                onClick={analyzeSentiment}
                disabled={!text.trim() || isPending}
                className="w-full
              rounded-full cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                {isPending ? 'Analyzing...' : 'Analyze Sentiment'}
              </Button>
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
              <h2 className="text-xl font-bold">Sentiment</h2>
            </div>
          </div>
          <div className="">
            {result ? (
              <div className="space-y-6">
                <Card
                  className={`p-6 border-none shadow-none ${
                    result.overall === 'positive'
                      ? 'bg-green-50 border-green-200'
                      : result.overall === 'negative'
                        ? 'bg-red-50 border-red-200'
                        : ''
                  }`}
                >
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      {getSentimentIcon(result.overall)}
                    </div>
                    <div>
                      <div className="text-2xl capitalize">
                        {result.overall}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Overall Sentiment
                      </div>
                    </div>
                  </div>
                </Card>

                <div>
                  <h3 className="text-sm mb-4">Sentiment Breakdown</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="flex items-center gap-2">
                          <Smile className="h-4 w-4 text-green-600" />
                          Positive
                        </span>
                        <span>{result.scores.positive}%</span>
                      </div>
                      <Progress
                        value={result.scores.positive}
                        className="h-2 [&>div]:bg-green-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="flex items-center gap-2">
                          <Meh className="h-4 w-4 text-gray-600" />
                          Neutral
                        </span>
                        <span>{result.scores.neutral}%</span>
                      </div>
                      <Progress value={result.scores.neutral} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="flex items-center gap-2">
                          <Frown className="h-4 w-4 text-red-600" />
                          Negative
                        </span>
                        <span>{result.scores.negative}%</span>
                      </div>
                      <Progress
                        value={result.scores.negative}
                        className="h-2 [&>div]:bg-red-500"
                      />
                    </div>
                  </div>
                </div>

                <Card className="p-4">
                  <h3 className="text-sm mb-3">Key Sentiment Phrases</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.map((keyword, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-sm ${
                          keyword.sentiment === 'positive'
                            ? 'bg-green-100 text-green-700'
                            : keyword.sentiment === 'negative'
                              ? 'bg-red-100 text-red-700'
                              : 'text-gray-700'
                        }`}
                      >
                        {keyword.word}
                      </span>
                    ))}
                  </div>
                </Card>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <Card className="p-4">
                    <div className="text-2xl text-rose-600">92%</div>
                    <div className="text-sm text-gray-600">Confidence</div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-2xl text-rose-600">0.3s</div>
                    <div className="text-sm text-gray-600">Analysis Time</div>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-400 rounded-lg">
                <Heart className="h-16 w-16 mb-4" />
                <p>Your sentiment analysis will appear here</p>
                <p className="text-sm mt-2">
                  Enter text and click &quot;Analyze Sentiment&quot;
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
