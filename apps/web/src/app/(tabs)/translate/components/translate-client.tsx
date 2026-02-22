'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Languages, ArrowRight, RefreshCw, Copy } from 'lucide-react';
import { useStreamTranslateText } from '@/lib/api/translate/stream-translate-text';
import { TranslationDetailLevel } from '@/types/enums/translate';
import TranslateHeader from './translate-header';
import { toast } from 'sonner';

const languages = [
  { code: 'auto', name: 'Auto-detect' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
];

export default function TranslationClient() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('es');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [detectedLang, setDetectedLang] = useState('');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const { mutateAsync: streamTranslate, isPending } = useStreamTranslateText();

  const translate = async () => {
    if (!sourceText.trim()) return;

    setTranslatedText('');
    // setDetectedLang(''); // We might need a way to get detected lang from stream or response?
    // For now, let's just stream the translation.

    try {
      const stream = await streamTranslate({
        Text: sourceText,
        SourceLanguage: sourceLang,
        TargetLanguage: targetLang,
        DetailLevel: TranslationDetailLevel.Standard,
        ModelId: selectedModel,
      });

      for await (const chunk of stream) {
        setTranslatedText((prev) => prev + chunk);
      }
    } catch (error) {
      console.error('Translation failed:', error);
    }
  };

  const swapLanguages = () => {
    if (sourceLang !== 'auto') {
      const temp = sourceLang;
      setSourceLang(targetLang);
      setTargetLang(temp);
      setSourceText(translatedText);
      setTranslatedText(sourceText);
    }
  };

  const handleReset = () => {
    toast('Session Reset');
  };

  return (
    <div className="container mx-auto py-2">
      <TranslateHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        onSessionReset={handleReset}
      />

      <Card className="p-8 border-none rounded-3xl">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex-1">
            <label className="text-sm mb-2 block text-center">From</label>
            <Select value={sourceLang} onValueChange={setSourceLang}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={swapLanguages}
            className="mt-6"
            disabled={sourceLang === 'auto'}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>

          <div className="flex-1">
            <label className="text-sm mb-2 block text-center">To</label>
            <Select value={targetLang} onValueChange={setTargetLang}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages
                  .filter((lang) => lang.code !== 'auto')
                  .map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm">Source Text</label>
              {detectedLang && sourceLang === 'auto' && (
                <span className="text-xs text-blue-600">
                  Detected: {detectedLang}
                </span>
              )}
            </div>
            <Textarea
              placeholder="Enter text to translate..."
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              className="min-h-[250px]"
            />
            <div className="text-xs text-gray-500">
              {sourceText.length} characters
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm">Translation</label>
              {translatedText && (
                <Button variant="ghost" size="sm">
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              )}
            </div>
            <Textarea
              placeholder="Translation will appear here..."
              value={translatedText}
              readOnly
              className="min-h-[250px]"
            />
            <div className="text-xs">{translatedText.length} characters</div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={translate}
            size="lg"
            className="gap-2"
            disabled={isPending}
          >
            <Languages className="h-4 w-4" />
            {isPending ? 'Translating...' : 'Translate'}
            {!isPending && <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>
      </Card>
    </div>
  );
}
