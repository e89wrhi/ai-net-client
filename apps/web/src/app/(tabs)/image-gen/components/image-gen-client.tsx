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
import { Image as ImageIcon, Download, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import ImageGenHeader from './image-gen-header';

export default function ImageGenerationClient() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
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

  return (
    <div className="container mx-auto py-2">
      <ImageGenHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-8 border-none rounded-3xl">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="h-5 w-5 text-purple-600" />
            <h2>Image Prompt</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm mb-2 block">
                Describe the image you want
              </label>
              <Textarea
                placeholder="e.g., A serene mountain landscape at sunset with vibrant colors..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[150px]"
              />
            </div>

            <div>
              <label className="text-sm mb-2 block">Style</label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realistic">Realistic</SelectItem>
                  <SelectItem value="cartoon">Cartoon</SelectItem>
                  <SelectItem value="abstract">Abstract</SelectItem>
                  <SelectItem value="artistic">Artistic</SelectItem>
                  <SelectItem value="anime">Anime</SelectItem>
                  <SelectItem value="oil-painting">Oil Painting</SelectItem>
                  <SelectItem value="watercolor">Watercolor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={generateImage}
              className="w-full"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>Generate Image</>
              )}
            </Button>

            <Card className="p-4">
              <h3 className="text-sm mb-3">Example Prompts</h3>
              <div className="space-y-2 text-sm">
                {[
                  'A futuristic city with flying cars at night',
                  'Cute cat wearing sunglasses on a beach',
                  'Abstract geometric patterns in vibrant colors',
                  'Fantasy forest with magical creatures',
                ].map((example, i) => (
                  <button
                    key={i}
                    onClick={() => setPrompt(example)}
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-sm mb-2">💡 Tips for Better Results</h3>
              <ul className="text-sm space-y-1">
                <li>• Be specific about colors, mood, and details</li>
                <li>• Mention the desired composition</li>
                <li>• Include lighting and atmosphere preferences</li>
                <li>• Specify art style or reference artists</li>
              </ul>
            </Card>
          </div>
        </Card>

        <Card className="p-8 border-none rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <h2>Generated Image</h2>
            {generatedImage && (
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            )}
          </div>

          {generatedImage ? (
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden border">
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
                  <div className="text-xl text-purple-600">1024×1024</div>
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
            <div className="flex flex-col items-center justify-center min-h-[500px] text-gray-400 border-2 border-dashed rounded-lg">
              <ImageIcon className="h-16 w-16 mb-4" />
              <p>Your generated image will appear here</p>
              <p className="text-sm mt-2">
                Enter a prompt and click &quot;Generate Image&quot;
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
