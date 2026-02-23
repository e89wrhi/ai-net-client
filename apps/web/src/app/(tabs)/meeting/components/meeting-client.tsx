'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Check, Sparkles, ClipboardList } from 'lucide-react';
import { useStreamMeetingAnalysis } from '@/lib/api/meeting/stream-meeting-analysis';
import { useAnalyzeMeetingTranscript } from '@/lib/api/meeting/analyze-meeting-transcript';
import MeetingHeader from './meeting-header';
import { toast } from 'sonner';

export default function MeetingClient() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [responseType, setResponseType] = useState<'stream' | 'json'>('stream');
  const [actionItems, setActionItems] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  // Toggle for development
  const USE_MOCK = true;

  const mockMeetingStream = async function* () {
    const response = `[Streaming Meeting Analysis] 

Summary:
The meeting centered around the launch of the new product line. Key areas discussed were marketing strategies and budget allocation.

Key Decisions:
- Approved the increased budget for social media campaigns.
- Decided to delay the launch by one week to ensure documentation is finalized.

Timeline:
The revised launch date is now set for October 15th.`;

    const chunks = response.split(/(?<= )/);
    for (const chunk of chunks) {
      await new Promise((resolve) =>
        setTimeout(resolve, 30 + Math.random() * 50)
      );
      yield chunk;
    }
  };

  const mockMeetingJson = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `[JSON Response Meeting Analysis] Meeting summary generated. Focus points: Team expansion, project milestones, and resource optimization.`;
  };

  // ----------------------------
  // Handle Audio Upload
  // ----------------------------
  const handleAudioUpload = (file: File | null) => {
    if (!file) return;
    setAudioFile(file);

    // Mock duration estimate
    const estimatedMinutes = Math.floor(file.size / 500000);
    setDuration(estimatedMinutes > 0 ? estimatedMinutes : 1);
  };

  // ----------------------------
  // Generate Transcript (Mock)
  // ----------------------------
  const generateTranscript = async () => {
    if (!audioFile) return;

    setIsProcessing(true);

    // Simulated transcript
    const fakeTranscript = `
Speaker 1: Let's review the Q4 marketing strategy.
Speaker 2: We need to increase ad spend by 20%.
Speaker 1: Agreed. We should also optimize landing pages.
Speaker 3: Timeline for implementation should be two weeks.
Speaker 2: I'll handle the campaign updates.
    `;

    setTimeout(() => {
      setTranscript(fakeTranscript);
      generateSummary(fakeTranscript);
      setIsProcessing(false);
    }, 1500);
  };

  // ----------------------------
  const { mutateAsync: analyzeMeetingStream, isPending: isStreamPending } =
    useStreamMeetingAnalysis();
  const { mutateAsync: analyzeMeetingJson, isPending: isJsonPending } =
    useAnalyzeMeetingTranscript();

  const isAnalysisPending = isStreamPending || isJsonPending;

  const generateSummary = async (text: string) => {
    setSummary('');
    setActionItems([]); // Clear actions as we stream the full analysis into summary

    try {
      if (responseType === 'stream') {
        const stream = USE_MOCK
          ? mockMeetingStream()
          : await analyzeMeetingStream({
              UserId: 'user-1',
              Transcript: text,
              IncludeActionItems: true,
              IncludeDescisions: true,
              Language: 'en',
              ModelId: selectedModel,
            });

        for await (const chunk of stream) {
          setSummary((prev) => prev + chunk);
        }
      } else {
        const result = USE_MOCK
          ? await mockMeetingJson()
          : (
              await analyzeMeetingJson({
                Transcript: text,
                IncludeActionItems: true,
                IncludeDescisions: true,
                Language: 'en',
                ModelId: selectedModel,
              })
            )?.Summary;

        if (result) {
          setSummary(result);
        }
      }
    } catch (error) {
      console.error('Meeting analysis failed:', error);
    }
  };

  // ----------------------------
  // Export (Mock)
  // ----------------------------
  const exportReport = () => {
    alert('Report exported (mock). Integrate PDF generation if needed.');
  };

  const handleReset = () => {
    toast('Session Reset');
  };

  return (
    <div className="container mx-auto py-2">
      <MeetingHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        responseType={responseType}
        onResponseTypeChange={setResponseType}
        onSessionReset={handleReset}
      />
      <div className="space-y-8">
        {/* Upload Section */}
        <Card
          className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
        >
          <div className="p-8">
            <div className="space-y-4">
              <Input
                type="file"
                accept="audio/*"
                onChange={(e) => handleAudioUpload(e.target.files?.[0] || null)}
              />

              {audioFile && (
                <div className="text-sm text-gray-600">
                  File: {audioFile.name}
                  {duration && <div>Estimated Duration: {duration} min</div>}
                </div>
              )}

              <Button
                onClick={generateTranscript}
                disabled={!audioFile || isProcessing || isAnalysisPending}
                className="w-full cursor-pointer rounded-full"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isProcessing || isAnalysisPending
                  ? 'Processing...'
                  : 'Generate Transcript'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Transcript Section */}
        {transcript && (
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
              <Textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                className="min-h-[200px] border-none shadow-none"
              />

              <div className="text-sm text-gray-500">
                Word Count: {transcript.split(' ').filter(Boolean).length}
              </div>
            </div>
          </Card>
        )}

        {/* Summary Section */}
        {summary && (
          <Card className="p-8 space-y-6">
            <div className="p-8">
              <h2 className="text-xl font-semibold">Meeting Summary</h2>

              <div className="whitespace-pre-wrap text-sm border p-4 rounded-lg">
                {summary}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3 font-semibold">
                  <ClipboardList className="h-5 w-5" />
                  Action Items
                </div>

                <div className="space-y-2">
                  {actionItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm border p-3 rounded-lg"
                    >
                      <Check className="h-4 w-4 text-lime-600" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={exportReport} className="w-full">
                Export Report
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
