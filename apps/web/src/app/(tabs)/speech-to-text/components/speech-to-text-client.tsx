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
import SpeechToTextHeader from './speech-to-text-header';

export default function SpeechToTextClient() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [language, setLanguage] = useState('auto');
  const [recordingTime, setRecordingTime] = useState(0);

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

  const stopRecording = () => {
    setIsRecording(false);
    // Simulate transcription
    setTranscription(
      'This is a simulated transcription of your audio. In a production environment, this would use advanced speech recognition AI like Whisper to convert your spoken words into accurate text. The system can handle multiple languages, accents, and background noise.'
    );
  };

  const uploadAudio = () => {
    // Simulate file upload and transcription
    setTranscription(
      'Transcription from uploaded file: Hello, this is a sample transcription from an audio file. The AI can accurately transcribe various audio formats including MP3, WAV, and M4A. Language detection is automatic, and the system handles different accents and speaking styles.'
    );
  };

  return (
    <div className="container mx-auto py-2">
      <SpeechToTextHeader />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-8 border-none rounded-3xl">
          <div className="flex items-center gap-2 mb-6">
            <Mic className="h-5 w-5 text-yellow-600" />
            <h2>Audio Input</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm mb-2 block">Language Detection</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
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
                    <Mic className="h-10 w-10 text-yellow-600" />
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
                    <Button onClick={stopRecording} variant="destructive">
                      <Square className="h-4 w-4 mr-2" />
                      Stop Recording
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600">Click to start recording</p>
                    <Button onClick={startRecording} size="lg">
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

            <Card className="p-8 border-none rounded-3xl">
              <div className="text-center space-y-3">
                <Upload className="h-12 w-12 mx-auto text-gray-400" />
                <div>
                  <p className="text-gray-600 mb-1">Upload Audio File</p>
                  <p className="text-sm text-gray-400">
                    MP3, WAV, M4A (Max 25MB)
                  </p>
                </div>
                <Button onClick={uploadAudio}>Choose File</Button>
              </div>
            </Card>

            <Card className="p-8 border-none rounded-3xl">
              <h3 className="text-sm mb-2">Features</h3>
              <ul className="text-sm space-y-1">
                <li>✓ Automatic language detection</li>
                <li>✓ Speaker identification</li>
                <li>✓ Timestamp generation</li>
                <li>✓ Punctuation and formatting</li>
              </ul>
            </Card>
          </div>
        </Card>

        <Card className="p-8 border-none rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <h2>Transcription</h2>
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
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-400 border-2 border-dashed rounded-lg">
              <Mic className="h-16 w-16 mb-4" />
              <p>Your transcription will appear here</p>
              <p className="text-sm mt-2">
                Record audio or upload a file to get started
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
