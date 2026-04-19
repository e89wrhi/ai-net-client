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
import { Image as ImageIcon, Download, Sparkles } from 'lucide-react';
import Image from 'next/image';
import ImageGenHeader from './image-gen-header';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

export default function ImageGenerationClient() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [resolution, setResolution] = useState('1024x1024');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // Simulate generation time
    setTimeout(() => {
      setGeneratedImage(
        'https://images.unsplash.com/photo-1686148688490-c0b94ab77931?w=800&q=80'
      );
      setIsGenerating(false);
    }, 2000);
  };

  const handleReset = () => {
    toast('Session Reset');
  };

  return (
    <div className="container mx-auto py-2">
      <ImageGenHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
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
                placeholder="e.g., A serene mountain landscape at sunset with vibrant colors..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[150px] border-none shadow-none"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger className="px-4 rounded-full border-none shadow-none bg-neutral-100 dark:bg-black">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="p-4 rounded-3xl space-y-3 border-none shadow-none bg-neutral-100 dark:bg-black">
                    <SelectItem value="realistic">Realistic</SelectItem>
                    <SelectItem value="cartoon">Cartoon</SelectItem>
                    <SelectItem value="abstract">Abstract</SelectItem>
                    <SelectItem value="artistic">Artistic</SelectItem>
                    <SelectItem value="anime">Anime</SelectItem>
                    <SelectItem value="oil-painting">Oil Painting</SelectItem>
                    <SelectItem value="watercolor">Watercolor</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={resolution} onValueChange={setResolution}>
                  <SelectTrigger className="px-4 rounded-full border-none shadow-none bg-neutral-100 dark:bg-black">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="p-4 rounded-3xl space-y-3 border-none shadow-none bg-neutral-100 dark:bg-black">
                    <SelectItem value="1024x1024">1:1 Square</SelectItem>
                    <SelectItem value="1024x576">16:9 Wide</SelectItem>
                    <SelectItem value="576x1024">9:16 Tall</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={generateImage}
                  className="w-full rounded-full cursor-pointer"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <Spinner className="h-4 w-4" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {isGenerating ? <>Generating</> : <>Generate</>}
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
              <h2 className="text-xl font-bold">Generated Image</h2>
            </div>
          </div>
          <div className="">
            <div className="flex items-center justify-between mb-4">
              {generatedImage && (
                <Button variant="outline" size="sm" onClick={() => {
                  fetch(generatedImage).then(r => r.blob()).then(blob => {
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = `ai_${Date.now()}.jpg`;
                    a.click();
                    toast.success('Downloaded Image');
                  }).catch(() => toast.error('Download Failed'));
                }}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              )}
            </div>

            {generatedImage ? (
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden">
                  <Image
                    height={200}
                    width={200}
                    src={generatedImage}
                    alt="Generated AI Image"
                    className="w-full h-auto"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <Card className="p-3">
                    <div className="text-xl text-purple-600">{style}</div>
                    <div className="text-gray-600">Style</div>
                  </Card>
                  <Card className="p-3">
                    <div className="text-lg md:text-xl text-purple-600">{resolution}</div>
                    <div className="text-gray-600">Resolution</div>
                  </Card>
                  <Card className="p-3">
                    <div className="text-xl text-purple-600">2.1s</div>
                    <div className="text-gray-600">Generated</div>
                  </Card>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Regenerate
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Create Variation
                  </Button>
                </div>

                <Card className="p-4">
                  <h3 className="text-sm mb-2">Prompt Used</h3>
                  <p className="text-sm text-gray-700">{prompt}</p>
                </Card>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[500px] text-gray-400 rounded-lg">
                <ImageIcon className="h-16 w-16 mb-4" />
                <p>Your generated image will appear here</p>
                <p className="text-sm mt-2">
                  Enter a prompt and click &quot;Generate Image&quot;
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
