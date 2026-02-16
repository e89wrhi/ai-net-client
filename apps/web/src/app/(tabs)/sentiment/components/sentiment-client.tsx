'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Heart, Frown, Meh, Smile } from 'lucide-react';
import SentimentHeader from './sentiment-header';

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

  const analyzeSentiment = () => {
    if (!text.trim()) return;

    // Simulate sentiment analysis
    const hasPositive =
      text.toLowerCase().includes('good') ||
      text.toLowerCase().includes('great') ||
      text.toLowerCase().includes('love');
    const hasNegative =
      text.toLowerCase().includes('bad') ||
      text.toLowerCase().includes('hate') ||
      text.toLowerCase().includes('terrible');

    let overall: 'positive' | 'negative' | 'neutral';
    let scores;

    if (hasPositive && !hasNegative) {
      overall = 'positive';
      scores = { positive: 85, negative: 5, neutral: 10 };
    } else if (hasNegative && !hasPositive) {
      overall = 'negative';
      scores = { positive: 5, negative: 85, neutral: 10 };
    } else {
      overall = 'neutral';
      scores = { positive: 25, negative: 25, neutral: 50 };
    }

    setResult({
      overall,
      scores,
      keywords: [
        { word: 'service', sentiment: 'positive' },
        { word: 'experience', sentiment: 'positive' },
        { word: 'issue', sentiment: 'negative' },
        { word: 'quality', sentiment: 'neutral' },
      ],
    });
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Smile className="h-8 w-8 text-green-500" />;
      case 'negative':
        return <Frown className="h-8 w-8 text-red-500" />;
      default:
        return <Meh className="h-8 w-8 text-gray-500" />;
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

  return (
    <div className="container mx-auto py-2">
      <SentimentHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-8 border-none rounded-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-5 w-5 text-rose-600" />
            <h2>Text to Analyze</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm mb-2 block">
                Enter text (reviews, tweets, emails, etc.)
              </label>
              <Textarea
                placeholder="Paste text to analyze sentiment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[250px]"
              />
              <div className="text-xs text-gray-500 mt-1">
                {text.length} characters •{' '}
                {text.split(' ').filter((w) => w).length} words
              </div>
            </div>

            <Button onClick={analyzeSentiment} className="w-full">
              Analyze Sentiment
            </Button>

            <Card className="p-4">
              <h3 className="text-sm mb-3">Example Texts</h3>
              <div className="space-y-2 text-sm">
                {[
                  {
                    text: "I absolutely love this product! It's amazing and works perfectly.",
                    type: 'Positive',
                  },
                  {
                    text: 'This is terrible. Very disappointed with the quality and service.',
                    type: 'Negative',
                  },
                  {
                    text: "The product arrived on time. It's okay, nothing special.",
                    type: 'Neutral',
                  },
                ].map((example, i) => (
                  <button
                    key={i}
                    onClick={() => setText(example.text)}
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-xs text-gray-500">
                      {example.type}:
                    </span>
                    <div className="mt-1">{example.text}</div>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </Card>

        <Card className="p-8 border-none rounded-3xl">
          <h2 className="mb-4">Analysis Results</h2>

          {result ? (
            <div className="space-y-6">
              <Card
                className={`p-6 ${
                  result.overall === 'positive'
                    ? 'bg-green-50 border-green-200'
                    : result.overall === 'negative'
                      ? 'bg-red-50 border-red-200'
                      : 'border-gray-200'
                }`}
              >
                <div className="text-center space-y-3">
                  <div className="flex justify-center">
                    {getSentimentIcon(result.overall)}
                  </div>
                  <div>
                    <div className="text-2xl capitalize">{result.overall}</div>
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
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-400 border-2 border-dashed rounded-lg">
              <Heart className="h-16 w-16 mb-4" />
              <p>Your sentiment analysis will appear here</p>
              <p className="text-sm mt-2">
                Enter text and click &quot;Analyze Sentiment&quot;
              </p>
            </div>
          )}
        </Card>
      </div>

      <Card className="p-8 border-none rounded-3xl mt-6">
        <h3 className="mb-4">Use Cases</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Customer Feedback',
              description:
                'Analyze product reviews and customer support tickets to understand satisfaction levels',
            },
            {
              title: 'Social Media Monitoring',
              description:
                'Track brand sentiment across tweets, posts, and comments in real-time',
            },
            {
              title: 'Survey Analysis',
              description:
                'Automatically categorize open-ended survey responses by sentiment',
            },
          ].map((useCase, i) => (
            <Card key={i} className="p-4">
              <h4 className="text-sm mb-2">{useCase.title}</h4>
              <p className="text-sm text-gray-600">{useCase.description}</p>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
