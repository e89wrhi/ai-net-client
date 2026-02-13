'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Check, FileAudio, Sparkles, ClipboardList } from 'lucide-react';

export default function MeetingClient() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [actionItems, setActionItems] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);

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
  // Generate Summary + Actions
  // ----------------------------
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const generateSummary = (text: string) => {
    const generatedSummary = `
Meeting Summary:

The team discussed Q4 marketing strategy improvements. 
Key focus areas include increasing ad spend, optimizing landing pages, 
and implementing updates within a two-week timeline.

Overall Tone:
Collaborative and solution-focused.
    `;

    const generatedActions = [
      'Increase ad spend by 20%',
      'Optimize landing pages',
      'Implement updates within two weeks',
      'Update marketing campaign settings',
    ];

    setSummary(generatedSummary);
    setActionItems(generatedActions);
  };

  // ----------------------------
  // Export (Mock)
  // ----------------------------
  const exportReport = () => {
    alert('Report exported (mock). Integrate PDF generation if needed.');
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Upload Section */}
      <Card className="p-8 space-y-6 rounded-2xl">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <FileAudio className="h-6 w-6" />
          Meeting Analyzer
        </div>

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
            disabled={!audioFile || isProcessing}
            className="w-full"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isProcessing ? 'Processing...' : 'Generate Transcript'}
          </Button>
        </div>
      </Card>

      {/* Transcript Section */}
      {transcript && (
        <Card className="p-8 space-y-4">
          <h2 className="text-xl font-semibold">Transcript</h2>

          <Textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="min-h-[200px]"
          />

          <div className="text-sm text-gray-500">
            Word Count: {transcript.split(' ').filter(Boolean).length}
          </div>
        </Card>
      )}

      {/* Summary Section */}
      {summary && (
        <Card className="p-8 space-y-6">
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
        </Card>
      )}
    </div>
  );
}
