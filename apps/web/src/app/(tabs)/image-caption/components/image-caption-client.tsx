'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageIcon, Sparkles, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import ImageCaptionHeader from './image-caption-header';
import { toast } from 'sonner';

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
      <Card className="p-8 space-y-6 border-none rounded-3xl">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <ImageIcon className="h-6 w-6" />
          Image Caption Generator
        </div>

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
          className="w-full mt-4"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {isGenerating ? 'Generating...' : 'Generate Caption'}
        </Button>
      </Card>

      {/* Caption Output */}
      {caption && (
        <Card className="p-8 border-none rounded-3xl">
          <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
            <CheckCircle className="h-5 w-5 text-lime-600" />
            Generated Caption
          </div>
          <div className="whitespace-pre-wrap text-sm border p-4 rounded-lg">
            {caption}
          </div>
        </Card>
      )}
    </div>
  );
}
