'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Paintbrush, Eraser, Sparkles } from 'lucide-react';
import Image from 'next/image';
import ImageEditHeader from './image-edit-header';

export default function ImageEditingClient() {
  const [uploadedImage, setUploadedImage] = useState('');
  const [editPrompt, setEditPrompt] = useState('');
  const [editedImage, setEditedImage] = useState('');
  const [activeTab, setActiveTab] = useState('upload');

  const handleEdit = () => {
    if (!editPrompt.trim()) return;
    // Simulate image editing
    setEditedImage(
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'
    );
    setActiveTab('result');
  };

  return (
    <div className="container mx-auto py-2">
      <ImageEditHeader />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-8 border-none rounded-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Paintbrush className="h-5 w-5 text-cyan-600" />
            <h2>Edit Instructions</h2>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="result">Result</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-12 text-center">
                <Upload className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-2">Upload an image to edit</p>
                <p className="text-sm text-gray-400 mb-4">
                  JPG, PNG, WEBP (Max 10MB)
                </p>
                <Button
                  onClick={() => {
                    setUploadedImage(
                      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
                    );
                    setActiveTab('edit');
                  }}
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
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full">
                  <Eraser className="h-4 w-4 mr-2" />
                  Remove Background
                </Button>
                <Button variant="outline" className="w-full">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Enhance Quality
                </Button>
              </div>

              <Button onClick={handleEdit} className="w-full">
                Apply Edits
              </Button>

              <Card className="p-4">
                <h3 className="text-sm mb-2">Quick Edits</h3>
                <div className="space-y-2 text-sm">
                  {[
                    'Remove the person in the background',
                    'Change daytime to nighttime',
                    'Make the colors more vibrant',
                    'Add a mountain in the distance',
                  ].map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => setEditPrompt(suggestion)}
                      className="block w-full text-left p-2 rounded hover:bg-gray-100 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </Card>
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
                    <Button variant="outline" className="flex-1">
                      Download
                    </Button>
                    <Button variant="outline" className="flex-1">
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
        </Card>

        <Card className="p-8 border-none rounded-3xl">
          <h2 className="mb-4">Editing Capabilities</h2>

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
                <Card key={i} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-3">
                    <div className="bg-cyan-100 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-cyan-600" />
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

          <Card className="p-4 mt-6">
            <h3 className="text-sm mb-3">💡 Pro Tips</h3>
            <ul className="text-sm space-y-2">
              <li>• Be specific about what you want to change</li>
              <li>• Use high-quality source images for best results</li>
              <li>• Try multiple variations to find the perfect edit</li>
              <li>• Combine multiple edits for complex transformations</li>
            </ul>
          </Card>
        </Card>
      </div>
    </div>
  );
}
