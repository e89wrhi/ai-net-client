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
import { Slider } from '@/components/ui/slider';
import {
  Volume2,
  Play,
  Pause,
  Download,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import TextToSpeechHeader from './text-to-speech-header';
import { toast } from 'sonner';

export default function TextToSpeechClient() {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('female');
  const [style, setStyle] = useState('neutral');
  const [speed, setSpeed] = useState([1]);
  const [pitch, setPitch] = useState([1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioGenerated, setAudioGenerated] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const generateSpeech = () => {
    if (!text.trim()) return;
    setAudioGenerated(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Simulate audio playback
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  const handleReset = () => {
    toast('Session Reset');
  };

  return (
    <div className="container mx-auto py-2">
      <TextToSpeechHeader
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
                placeholder="Type or paste your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[200px] border-none shadow-none"
              />
              <div className="text-xs text-gray-500 mt-1">
                {text.length} characters •{' '}
                {text.split(' ').filter((w) => w).length} words
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm mb-2 block">Voice</label>
                  <Select value={voice} onValueChange={setVoice}>
                    <SelectTrigger className="px-4 rounded-full border-none shadow-none bg-neutral-100 dark:bg-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="p-4 rounded-3xl space-y-3 border-none shadow-none bg-neutral-100 dark:bg-black">
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm mb-2 block">Style</label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="px-4 rounded-full border-none shadow-none bg-neutral-100 dark:bg-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="p-4 rounded-3xl space-y-3 border-none shadow-none bg-neutral-100 dark:bg-black">
                      <SelectItem value="neutral">Neutral</SelectItem>
                      <SelectItem value="cheerful">Cheerful</SelectItem>
                      <SelectItem value="serious">Serious</SelectItem>
                      <SelectItem value="calm">Calm</SelectItem>
                      <SelectItem value="energetic">Energetic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm mb-2 block">
                  Speed: {speed[0]!.toFixed(1)}x
                </label>
                <Slider
                  value={speed}
                  onValueChange={setSpeed}
                  min={0.5}
                  max={2}
                  step={0.1}
                />
              </div>

              <div>
                <label className="text-sm mb-2 block">
                  Pitch: {pitch[0]!.toFixed(1)}x
                </label>
                <Slider
                  value={pitch}
                  onValueChange={setPitch}
                  min={0.5}
                  max={2}
                  step={0.1}
                />
              </div>

              <Button
                onClick={generateSpeech}
                className="w-full rounded-full mt-6 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                Generate Speech
              </Button>
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
              <h2 className="text-xl font-bold">Audio Output</h2>
            </div>
          </div>
          <div className="">
            <div className="flex items-center justify-between mb-4">
              {audioGenerated && (
                <Button variant="outline" size="sm" className="rounded-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download MP3
                </Button>
              )}
            </div>

            {audioGenerated ? (
              <div className="space-y-6">
                <Card className="p-8 border-none shadow-none">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full shadow-lg">
                      <Volume2
                        className={`h-10 w-10 text-teal-600 ${isPlaying ? 'animate-pulse' : ''}`}
                      />
                    </div>

                    <div>
                      <p className="mb-2">Audio Generated Successfully</p>
                      <p className="text-sm text-gray-600">
                        Voice: {voice.charAt(0).toUpperCase() + voice.slice(1)}{' '}
                        • Style:{' '}
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </p>
                    </div>

                    <div className="flex justify-center gap-2">
                      <Button
                        onClick={togglePlay}
                        size="lg"
                        className="rounded-full"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="h-5 w-5 mr-2" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-5 w-5 mr-2" />
                            Play Audio
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full"
                      >
                        <RotateCcw className="h-5 w-5" />
                      </Button>
                    </div>

                    {isPlaying && (
                      <div className="w-full rounded-full h-2">
                        <div
                          className="bg-teal-600 h-2 rounded-full animate-pulse"
                          style={{ width: '60%' }}
                        ></div>
                      </div>
                    )}
                  </div>
                </Card>

                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <Card className="p-3">
                    <div className="text-2xl text-teal-600">8s</div>
                    <div className="text-gray-600">Duration</div>
                  </Card>
                  <Card className="p-3">
                    <div className="text-2xl text-teal-600">
                      {speed[0]!.toFixed(1)}x
                    </div>
                    <div className="text-gray-600">Speed</div>
                  </Card>
                  <Card className="p-3">
                    <div className="text-2xl text-teal-600">320kbps</div>
                    <div className="text-gray-600">Quality</div>
                  </Card>
                </div>

                <Card className="p-4">
                  <h3 className="text-sm mb-2">Original Text</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {text}
                  </p>
                </Card>

                <Card className="p-4">
                  <h3 className="text-sm mb-2">Available Formats</h3>
                  <div className="grid grid-cols-4 gap-2">
                    <Button variant="outline" size="sm">
                      MP3
                    </Button>
                    <Button variant="outline" size="sm">
                      WAV
                    </Button>
                    <Button variant="outline" size="sm">
                      OGG
                    </Button>
                    <Button variant="outline" size="sm">
                      FLAC
                    </Button>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[500px] text-gray-400 rounded-lg">
                <Volume2 className="h-16 w-16 mb-4" />
                <p>Your audio will appear here</p>
                <p className="text-sm mt-2">
                  Enter text and click &quot;Generate Speech&quot;
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
