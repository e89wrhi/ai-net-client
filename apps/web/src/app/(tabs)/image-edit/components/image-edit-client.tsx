'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Paintbrush, Eraser, Sparkles } from 'lucide-react';
import Image from 'next/image';
import ImageEditHeader from './image-edit-header';
import { toast } from 'sonner';

export default function ImageEditingClient() {
  const [uploadedImage, setUploadedImage] = useState('');
  const [editPrompt, setEditPrompt] = useState('');
  const [editedImage, setEditedImage] = useState('');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedImage(URL.createObjectURL(file));
    setActiveTab('edit');
    toast.success('Image loaded successfully');
  };

  const handleEdit = () => {
    if (!editPrompt.trim()) return;
    // Simulate image editing
    setEditedImage(
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'
    );
    setActiveTab('result');
  };

  const handleReset = () => {
    toast('Session Reset');
  };

  return (
    <div className="container mx-auto py-2">
      <ImageEditHeader
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
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full rounded-full grid-cols-3 mb-4">
                <TabsTrigger className="rounded-full" value="upload">
                  Upload
                </TabsTrigger>
                <TabsTrigger className="rounded-full" value="edit">
                  Edit
                </TabsTrigger>
                <TabsTrigger className="rounded-full" value="result">
                  Result
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-4">
                <div className="rounded-lg p-12 text-center">
                  <Upload className="h-16 w-16 mx-auto mb-4" />
                  <p className="mb-2">Upload an image to edit</p>
                  <p className="text-sm text-gray-400 mb-4">
                    JPG, PNG, WEBP (Max 10MB)
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                  />
                  <Button
                    className="rounded-full"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Choose File
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
                    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&q=80',
                    'https://images.unsplash.com/photo-1472491235688-bdc81a63246e?w=400&q=80',
                  ].map((img, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setUploadedImage(img);
                        setActiveTab('edit');
                      }}
                      className="rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-colors"
                    >
                      <Image
                        height={200}
                        width={200}
                        src={img}
                        alt={`Sample ${i + 1}`}
                        className="w-full h-24 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="edit" className="space-y-4">
                {uploadedImage && (
                  <div className="rounded-lg overflow-hidden border">
                    <Image
                      height={200}
                      width={200}
                      src={uploadedImage}
                      alt="Uploaded image"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}

                <div>
                  <label className="text-sm mb-2 block">
                    What would you like to edit?
                  </label>
                  <Textarea
                    placeholder="e.g., Remove the background, Change the sky to sunset, Add flowers in the foreground..."
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    className="min-h-[100px] border-none shadow-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setEditPrompt('Remove Image Background.')}
                    className="cursor-pointer w-full rounded-full"
                  >
                    <Eraser className="h-4 w-4 mr-2" />
                    Remove Background
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditPrompt('Enhance Image Quality.')}
                    className="cursor-pointer w-full rounded-full"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Enhance Quality
                  </Button>
                  <Button
                    onClick={handleEdit}
                    className="cursor-pointer w-full rounded-full"
                  >
                    <Sparkles className="h-4 w-4" />
                    Apply Edits
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="result" className="space-y-4">
                {editedImage ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm mb-2 text-gray-600">Before</p>
                        <div className="rounded-lg overflow-hidden border">
                          <Image
                            height={200}
                            width={200}
                            src={uploadedImage}
                            alt="Before"
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm mb-2 text-gray-600">After</p>
                        <div className="rounded-lg overflow-hidden border">
                          <Image
                            height={200}
                            width={200}
                            src={editedImage}
                            alt="After"
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <Card className="p-4 bg-green-50 border-green-200">
                      <p className="text-sm">
                        ✓ Edits applied successfully: {editPrompt}
                      </p>
                    </Card>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          fetch(editedImage)
                            .then((r) => r.blob())
                            .then((blob) => {
                              const a = document.createElement('a');
                              a.href = URL.createObjectURL(blob);
                              a.download = `edited_${Date.now()}.jpg`;
                              a.click();
                              toast.success('Downloaded');
                            });
                        }}
                      >
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setEditedImage('');
                          setActiveTab('edit');
                        }}
                      >
                        Try Another Edit
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-400 py-12">
                    No edits applied yet
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </Card>

        <Card
          className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
        >
          <div className="p-8">
            <div className="space-y-4">
              {[
                {
                  icon: Eraser,
                  title: 'Background Removal',
                  description:
                    'Automatically detect and remove backgrounds with precision',
                },
                {
                  icon: Sparkles,
                  title: 'Object Inpainting',
                  description:
                    'Add or remove objects seamlessly from your images',
                },
                {
                  icon: Paintbrush,
                  title: 'Style Transfer',
                  description:
                    'Apply artistic styles or change the mood of your image',
                },
                {
                  icon: Upload,
                  title: 'Quality Enhancement',
                  description: 'Upscale resolution and enhance image quality',
                },
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={i}
                    className="p-4 hover:shadow-md border-none shadow-none transition-shadow"
                  >
                    <div className="flex gap-3">
                      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
