'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Upload, HelpCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QuestionHeader from './question-header';

interface QAPair {
  question: string;
  answer: string;
  timestamp: Date;
}

export default function QuestionAnswerClient() {
  const [question, setQuestion] = useState('');
  const [context, setContext] = useState('');
  const [history, setHistory] = useState<QAPair[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const askQuestion = () => {
    if (!question.trim()) return;

    // Simulate AI answer
    const answer = context
      ? `Based on the provided context, here's the answer: ${question} - This answer is derived from analyzing the context you provided. In a real implementation, this would use advanced NLP models to extract relevant information and formulate accurate responses.`
      : `Direct answer to "${question}": This is a simulated response. In production, this would connect to an AI model that can answer questions based on its training data or provided context.`;

    setCurrentAnswer(answer);
    setHistory([{ question, answer, timestamp: new Date() }, ...history]);
    setQuestion('');
  };

  return (
    <div className="container mx-auto py-2">
      <QuestionHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 border-none rounded-3xl">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              <h2>Ask Your Question</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm mb-2 block">Question</label>
                <Input
                  placeholder="What would you like to know?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      askQuestion();
                    }
                  }}
                />
              </div>

              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text">Add Context (Optional)</TabsTrigger>
                  <TabsTrigger value="file">Upload Document</TabsTrigger>
                </TabsList>

                <TabsContent value="text">
                  <Textarea
                    placeholder="Paste relevant context here to improve answer accuracy..."
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    className="min-h-[150px]"
                  />
                </TabsContent>

                <TabsContent value="file">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-2">
                      Upload a document for context
                    </p>
                    <p className="text-sm text-gray-400">
                      PDF, DOCX, TXT (Max 10MB)
                    </p>
                    <Button className="mt-4">Choose File</Button>
                  </div>
                </TabsContent>
              </Tabs>

              <Button onClick={askQuestion} className="w-full">
                Get Answer
              </Button>
            </div>
          </Card>

          {currentAnswer && (
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="mb-4">Answer</h3>
              <div className="p-4 rounded-lg">{currentAnswer}</div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  Copy Answer
                </Button>
                <Button variant="outline" size="sm">
                  Share
                </Button>
              </div>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="p-8 border-none rounded-3xl">
            <h2 className="mb-4">Question History</h2>

            {history.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                No questions yet
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {history.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuestion(item.question);
                      setCurrentAnswer(item.answer);
                    }}
                    className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-sm mb-1 line-clamp-2">
                      {item.question}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.timestamp.toLocaleTimeString()}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-8 border-none rounded-3xl mt-6">
            <h3 className="text-sm mb-3">Suggested Questions</h3>
            <div className="space-y-2">
              {[
                'What is artificial intelligence?',
                'How does machine learning work?',
                'Explain natural language processing',
                'What are neural networks?',
              ].map((q, i) => (
                <button
                  key={i}
                  onClick={() => setQuestion(q)}
                  className="w-full text-left text-sm p-2 rounded hover:bg-gray-100 transition-colors"
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
