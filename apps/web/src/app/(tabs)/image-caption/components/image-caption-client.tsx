'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import ImageCaptionHeader from './image-caption-header';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

export default function ImageCaptioningClient() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  // -----------------------------
  // Handle Image Upload
  // -----------------------------
  const handleImageUpload = (file: File | null) => {
    if (!file) return;

    setImageFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setCaption('');
  };

  // -----------------------------
  // Generate Caption (Mock AI)
  // -----------------------------
  const generateCaption = () => {
    if (!imageFile) return;

    setIsGenerating(true);

    // Simulate AI caption generation
    setTimeout(() => {
      const generatedCaption = `A scenic photo showcasing ${imageFile.name.replace(
        /\..+$/,
        ''
      )}, captured with attention to color and composition.`;

      setCaption(generatedCaption);
      setIsGenerating(false);
    }, 1200);
  };

  const handleReset = () => {
    toast('Session Reset');
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <ImageCaptionHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        onSessionReset={handleReset}
      />
      {/* Upload Section */}
      <Card
        className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
      >
        <div className="p-8">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files?.[0] || null)}
          />

          {previewUrl && (
            <div className="mt-4 flex justify-center">
              <Image
                height={400}
                width={400}
                src={previewUrl}
                alt="Preview"
                className="max-h-64 rounded-lg border"
              />
            </div>
          )}

          <Button
            onClick={generateCaption}
            disabled={!imageFile || isGenerating}
            className="w-full mt-4 rounded-full cursor-pointer"
          >
            {isGenerating ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {isGenerating ? 'Generating...' : 'Generate Caption'}
          </Button>
        </div>
      </Card>

      {/* Caption Output */}
      {caption && (
        <Card
          className="p-8 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
        >
          <div className="pb-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">Image Caption</h2>
            </div>
          </div>
          <div className="">
            <div className="whitespace-pre-wrap text-sm p-4 rounded-lg">
              {caption}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
