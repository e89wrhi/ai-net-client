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
import { useStreamAutoComplete } from '@/lib/api/autocomplete/generate-stream';
import { CompletionMode } from '@/types/enums/autocomplete';
import AutocompleteHeader from './autocomplete-header';

export default function AutocompleteClient() {
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [messageText, setMessageText] = useState('');
  const [formStyle, setFormStyle] = useState('professional');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const { mutateAsync: streamComplete, isPending } = useStreamAutoComplete();

  const quickComplete = async () => {
    if (!emailBody.trim()) return;

    try {
      const stream = await streamComplete({
        Prompt: emailBody,
        Mode: CompletionMode.Text,
        ModelId: selectedModel,
      });

      setEmailBody((prev) => prev + (prev.endsWith('\n\n') ? '' : '\n\n'));

      for await (const chunk of stream) {
        setEmailBody((prev) => prev + chunk);
      }
    } catch (error) {
      console.error('Autocomplete failed:', error);
    }
  };

  return (
    <div className="container mx-auto py-2">
      <AutocompleteHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />

      <div className="flex flex-col space-y-7">
        <Card className="p-8 border-none rounded-3xl">
          <div className="flex font-bold text-2xl items-center gap-2 mb-4">
            <h2>Email Composer</h2>
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
              <Button
                onClick={quickComplete}
                className="flex-1"
                disabled={isPending}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isPending ? 'Completing...' : 'Complete with AI'}
              </Button>
              <Button variant="outline" onClick={() => setEmailBody('')}>
                Clear
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-8 border-none rounded-3xl">
          <h2 className="mb-4">Quick Message</h2>

          <div className="space-y-4">
            <Textarea
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="min-h-[100px]"
            />

            <Card className="p-3">
              <p className="text-sm text-gray-600 mb-2">Quick completions:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Thanks for the update!',
                  "I'll get back to you soon.",
                  'Looking forward to it.',
                  'Let me know if you need anything.',
                ].map((quick, i) => (
                  <button
                    key={i}
                    onClick={() => setMessageText(quick)}
                    className="text-xs px-3 py-1 border rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {quick}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </Card>

        <Card className="p-8 border-none rounded-3xl">
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
      </div>
    </div>
  );
}
