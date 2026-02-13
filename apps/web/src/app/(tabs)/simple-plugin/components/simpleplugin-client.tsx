'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Edit, Sparkles, Check } from 'lucide-react';
import SimplePluginHeader from './simpleplugin-header';

export default function SimplePluginClient() {
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [formStyle, setFormStyle] = useState('professional');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const styleSuggestions = {
    professional:
      'Thank you for reaching out. I would be happy to discuss this matter further at your convenience. Please let me know a suitable time for a meeting.',
    casual:
      "Hey! Thanks for getting in touch. I'd love to chat more about this. When works for you?",
    concise:
      "Thanks for contacting me. Let's schedule a meeting to discuss. What time works?",
  };

  const generateSuggestion = (text: string) => {
    if (text.length < 5) {
      setShowSuggestion(false);
      return;
    }

    const suggestions = [
      'I appreciate your prompt response and look forward to our continued collaboration.',
      'Please find the attached document for your review and consideration.',
      'I hope this message finds you well. I wanted to follow up on our previous discussion.',
      'Thank you for bringing this to my attention. I will address this matter immediately.',
    ];

    setSuggestions(suggestions);
    setShowSuggestion(true);
  };

  const applySuggestion = (suggestion: string) => {
    setEmailBody(emailBody + (emailBody ? ' ' : '') + suggestion);
    setShowSuggestion(false);
  };

  const quickComplete = () => {
    const completion =
      styleSuggestions[formStyle as keyof typeof styleSuggestions];
    setEmailBody(emailBody + (emailBody ? '\n\n' : '') + completion);
  };

  return (
    <div className="container mx-auto py-2">
      <SimplePluginHeader />

      <div className="flex flex-col space-y-7">
        <Card className="p-8 border-none rounded-3xl">
          <div className="flex font-bold text-2xl items-center gap-2 mb-4">
            <h2>Bing</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm mb-2 block">Writing Style</label>
              <Select value={formStyle} onValueChange={setFormStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="concise">Concise</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm mb-2 block">Subject</label>
              <Input
                placeholder="Email subject..."
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm mb-2 block">Email Body</label>
              <Textarea
                placeholder="Start typing and AI will suggest completions..."
                value={emailBody}
                onChange={(e) => {
                  setEmailBody(e.target.value);
                  generateSuggestion(e.target.value);
                }}
                className="min-h-[200px]"
              />
            </div>

            {showSuggestion && suggestions.length > 0 && (
              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">AI Suggestions</span>
                </div>
                <div className="space-y-2">
                  {suggestions.slice(0, 2).map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => applySuggestion(suggestion)}
                      className="block w-full text-left text-sm p-3 rounded hover:bg-gray-50 transition-colors border"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </Card>
            )}

            <div className="flex gap-2">
              <Button onClick={quickComplete} className="flex-1">
                <Sparkles className="h-4 w-4 mr-2" />
                Complete with AI
              </Button>
              <Button variant="outline" onClick={() => setEmailBody('')}>
                Clear
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-none">
          <h2 className="mb-4">Preview</h2>

          {emailBody ? (
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="mb-4 pb-4 border-b">
                  <div className="text-sm text-gray-600 mb-1">Subject:</div>
                  <div>{emailSubject || '(No subject)'}</div>
                </div>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {emailBody}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <Card className="p-3">
                  <div className="text-2xl text-lime-600">
                    {emailBody.split(' ').filter((w) => w).length}
                  </div>
                  <div className="text-gray-600">Words</div>
                </Card>
                <Card className="p-3">
                  <div className="text-2xl text-lime-600">{formStyle}</div>
                  <div className="text-gray-600">Style</div>
                </Card>
              </div>

              <Button className="w-full">
                <Check className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-400 border-2 border-dashed rounded-lg">
              <Edit className="h-12 w-12 mb-3" />
              <p>Your email preview will appear here</p>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="mb-4">AI Features</h3>
          <div className="space-y-3">
            {[
              {
                feature: 'Smart Completions',
                description: 'Context-aware sentence completions',
              },
              {
                feature: 'Style Adaptation',
                description: 'Adjust tone and formality',
              },
              {
                feature: 'Grammar Check',
                description: 'Real-time grammar corrections',
              },
              {
                feature: 'Tone Analysis',
                description: 'Ensure appropriate tone',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg">
                <div className="w-8 h-8 bg-lime-100 rounded flex items-center justify-center flex-shrink-0">
                  <Check className="h-4 w-4 text-lime-600" />
                </div>
                <div>
                  <div className="text-sm">{item.feature}</div>
                  <div className="text-xs text-gray-600">
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm mb-2">💡 Tips</h3>
          <ul className="text-sm space-y-1">
            <li>• Start typing to see AI suggestions</li>
            <li>• Switch styles for different tones</li>
            <li>• Use quick completions for common phrases</li>
            <li>• AI learns from your writing style</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
