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
import { Mic, Upload, Square } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useStreamTranscribeAudio } from '@/lib/api/speech-to-text/stream-transcribe-audio';
import { SpeechToTextDetailLevel } from '@/types/enums/speechtotext';
import SpeechToTextHeader from './speech-to-text-header';
import { toast } from 'sonner';

export default function SpeechToTextClient() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [language, setLanguage] = useState('auto');
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutateAsync: streamTranscribe, isPending } =
    useStreamTranscribeAudio();

  const handleTranscribe = async (audioUrl: string) => {
    setTranscription('');
    try {
      const stream = await streamTranscribe({
        UserId: 'user-1', // Placeholder
        AudioUrl: audioUrl,
        Language: language === 'auto' ? 'en' : language,
        IncludePunctuation: true,
        DetailLevel: SpeechToTextDetailLevel.Standard,
        ModelId: selectedModel,
      });

      for await (const chunk of stream) {
        setTranscription((prev) => prev + chunk);
      }
    } catch (error) {
      console.error('Transcription failed:', error);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    // Simulate recording timer
    const interval = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= 10) {
          stopRecording();
          clearInterval(interval);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    // In a real app, we would upload the recorded blob and get a URL
    // For now, we simulate a URL
    await handleTranscribe('https://example.com/recorded-audio.wav');
  };

  const uploadAudio = async () => {
    // In a real app, we would upload the file and get a URL
    await handleTranscribe('https://example.com/uploaded-file.mp3');
  };

  const handleReset = () => {
    toast('Session Reset');
  };

  return (
    <div className="container mx-auto py-2">
      <SpeechToTextHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        onSessionReset={handleReset}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card
          className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
        >
          <div className="p-8">
            <div className="space-y-6">
              <div>
                <label className="text-sm mb-2 block">Language Detection</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="px-4 rounded-full border-none shadow-none bg-neutral-100 dark:bg-black">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="p-4 rounded-3xl space-y-3 border-none shadow-none bg-neutral-100 dark:bg-black">
                    <SelectItem value="auto">Auto-detect</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Card className="p-8 border-none rounded-3xl">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full shadow-lg">
                    {isRecording ? (
                      <div className="w-12 h-12 rounded-full bg-red-500 animate-pulse"></div>
                    ) : (
                      <Mic className="h-10 w-10" />
                    )}
                  </div>

                  {isRecording ? (
                    <>
                      <div>
                        <div className="text-2xl mb-2">{recordingTime}s</div>
                        <p className="text-sm text-gray-600">
                          Recording in progress...
                        </p>
                      </div>
                      <Progress value={recordingTime * 10} className="w-full" />
                      <Button
                        onClick={stopRecording}
                        variant="destructive"
                        className="rounded-full cursor-pointer"
                      >
                        <Square className="h-4 w-4 mr-2" />
                        Stop Recording
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600">Click to start recording</p>
                      <Button
                        onClick={startRecording}
                        size="lg"
                        className="rounded-full cursor-pointer"
                      >
                        <Mic className="h-4 w-4 mr-2" />
                        Start Recording
                      </Button>
                    </>
                  )}
                </div>
              </Card>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2">Or</span>
                </div>
              </div>

              <Card className="p-0 border-none shadow-none">
                <div className="p-8">
                  <div className="text-center space-y-3">
                    <Upload className="h-12 w-12 mx-auto" />
                    <div>
                      <p className="text-gray-600 mb-1">Upload Audio File</p>
                      <p className="text-sm text-gray-400">
                        MP3, WAV, M4A (Max 25MB)
                      </p>
                    </div>
                    <Button
                      onClick={uploadAudio}
                      className="rounded-full cursor-pointer"
                    >
                      Choose File
                    </Button>
                  </div>
                </div>
              </Card>
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
              <h2 className="text-xl font-bold">Transcript</h2>
            </div>
          </div>
          <div className="">
            <div className="flex items-center justify-between mb-4">
              {transcription && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              )}
            </div>

            {transcription ? (
              <div className="space-y-4">
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="flex items-center justify-between text-sm">
                    <span>Language: English</span>
                    <span>Confidence: 98%</span>
                    <span>Duration: 12s</span>
                  </div>
                </Card>

                <Textarea
                  value={transcription}
                  onChange={(e) => setTranscription(e.target.value)}
                  className="min-h-[300px]"
                />

                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 text-center">
                    <div className="text-2xl text-yellow-600">250</div>
                    <div className="text-sm text-gray-600">Words</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl text-yellow-600">1.2s</div>
                    <div className="text-sm text-gray-600">Processing Time</div>
                  </Card>
                </div>

                <Card className="p-4">
                  <h3 className="text-sm mb-3">Export Options</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm">
                      TXT
                    </Button>
                    <Button variant="outline" size="sm">
                      DOCX
                    </Button>
                    <Button variant="outline" size="sm">
                      SRT
                    </Button>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-400 rounded-lg">
                <Mic className="h-16 w-16 mb-4" />
                <p>Your transcription will appear here</p>
                <p className="text-sm mt-2">
                  Record audio or upload a file to get started
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
