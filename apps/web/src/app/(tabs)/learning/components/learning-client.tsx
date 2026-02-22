'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Check, Sparkles, HelpCircle } from 'lucide-react';
import { useStreamLesson } from '@/lib/api/learning/stream-lesson';
import { DifficultyLevel, LearningMode } from '@/types/enums/learn';
import LearningHeader from './learning-header';
import { toast } from 'sonner';

export default function LearningClient() {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<
    'beginner' | 'intermediate' | 'advanced'
  >('beginner');

  const [lesson, setLesson] = useState('');
  const [studentAnswer, setStudentAnswer] = useState('');
  const [question, setQuestion] = useState('');

  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const [hints, setHints] = useState<string[]>([]);
  const [showHints, setShowHints] = useState(false);

  const [completedLessons, setCompletedLessons] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  // ---------------------------
  // Lesson Generator
  // ---------------------------
  // ---------------------------
  // Lesson Generator
  // ---------------------------
  const { mutateAsync: streamLesson, isPending } = useStreamLesson();

  const generateLesson = async () => {
    if (!topic) return;

    setLesson('');
    setStudentAnswer('');
    setFeedback('');
    setScore(null);

    let diffLevel = DifficultyLevel.Easy;
    if (difficulty === 'intermediate') diffLevel = DifficultyLevel.Medium;
    if (difficulty === 'advanced') diffLevel = DifficultyLevel.Hard;

    try {
      const stream = await streamLesson({
        UserId: 'user-1', // Placeholder
        Topic: topic,
        Mode: LearningMode.Guided,
        DifficultyLevel: diffLevel,
        ModelId: selectedModel,
      });

      for await (const chunk of stream) {
        setLesson((prev) => prev + chunk);
      }
    } catch (error) {
      console.error('Lesson generation failed:', error);
    }
  };

  // ---------------------------
  // Submit Answer + Grade
  // ---------------------------
  const submitAnswer = () => {
    if (!studentAnswer) return;

    const wordCount = studentAnswer.split(' ').filter(Boolean).length;

    let calculatedScore = 50;

    if (wordCount > 50) calculatedScore = 95;
    else if (wordCount > 30) calculatedScore = 85;
    else if (wordCount > 15) calculatedScore = 75;
    else calculatedScore = 60;

    setScore(calculatedScore);

    setFeedback(`
Evaluation:
• Clarity: ${wordCount > 20 ? 'Good' : 'Needs improvement'}
• Depth: ${wordCount > 30 ? 'Strong understanding' : 'Surface-level explanation'}
• Structure: ${
      studentAnswer.includes('.')
        ? 'Well structured'
        : 'Could use clearer sentences'
    }

Final Score: ${calculatedScore}/100

Suggestions:
- Add clearer definitions
- Provide more examples
- Expand on why the concept is important
    `);

    // Update progress
    const newCompleted = completedLessons + 1;
    const newAverage =
      (averageScore * completedLessons + calculatedScore) / newCompleted;

    setCompletedLessons(newCompleted);
    setAverageScore(Math.round(newAverage));

    // Adaptive difficulty
    if (calculatedScore > 85 && difficulty !== 'advanced') {
      setDifficulty(difficulty === 'beginner' ? 'intermediate' : 'advanced');
    }
  };

  // ---------------------------
  // Hint Generator
  // ---------------------------
  const generateHints = () => {
    if (!topic) return;

    setHints([
      `Start by clearly defining "${topic}".`,
      'Explain why the concept matters.',
      'Include a real-world example.',
      'Break your explanation into clear paragraphs.',
    ]);
    setShowHints(true);
  };

  // ---------------------------
  // Ask AI (Mocked)
  // ---------------------------
  const askAI = () => {
    if (!question) return;

    setFeedback(`
Answer to your question:

${question}

Explanation:
This concept relates to the core principles of ${
      topic || 'the subject you are studying'
    }. Focus on understanding the foundational logic first before moving to advanced details.
    `);
  };

  const handleReset = () => {
    toast('Session Reset');
  };

  return (
    <div className="container mx-auto space-y-4 py-2">
      <LearningHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        onSessionReset={handleReset}
      />
      {/* Lesson Generator */}
      <Card
        className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
      >
        <div className="p-8">
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Enter topic (e.g., Photosynthesis)"
                value={topic}
                className="min-h-[100px] border-none shadow-none bg-none"
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="items-center grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                value={difficulty}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onValueChange={(v: any) => setDifficulty(v)}
              >
                <SelectTrigger className="px-4 rounded-full border-none shadow-none bg-neutral-100 dark:bg-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="p-4 rounded-3xl space-y-3 border-none shadow-none bg-neutral-100 dark:bg-black">
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={generateLesson}
                className="w-full rounded-full cursor-pointer"
                disabled={isPending}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isPending ? 'Generating Lesson...' : 'Generate Lesson'}
              </Button>
            </div>
          </div>

          {lesson && (
            <div className="whitespace-pre-wrap text-sm border p-4 rounded-lg bg-muted">
              {lesson}
            </div>
          )}
        </div>
      </Card>

      {/* Student Submission */}
      {lesson && (
        <Card
          className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
        >
          <div className="p-8">
            <h2 className="text-xl font-semibold">Submit Your Answer</h2>

            <Textarea
              placeholder="Write your explanation here..."
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              className="min-h-[150px]"
            />

            <div className="flex gap-4">
              <Button onClick={submitAnswer} className="flex-1">
                <Check className="h-4 w-4 mr-2" />
                Submit Answer
              </Button>

              <Button variant="outline" onClick={generateHints}>
                <HelpCircle className="h-4 w-4 mr-2" />
                Get Hints
              </Button>
            </div>

            {showHints && (
              <div className="bg-blue-50 border p-4 rounded-lg text-sm">
                {hints.map((hint, i) => (
                  <div key={i}>• {hint}</div>
                ))}
              </div>
            )}

            {feedback && (
              <div className="whitespace-pre-wrap text-sm border p-4 rounded-lg">
                {feedback}
              </div>
            )}

            {score !== null && (
              <div className="text-center text-3xl font-bold text-lime-600">
                {score}/100
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Ask AI */}
      <Card
        className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
      >
        <div className="p-8">
          <div className="text-xl font-semibold">Ask a Question</div>

          <Textarea
            placeholder="Ask anything about the topic..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[100px]"
          />

          <Button onClick={askAI} className="w-full">
            Ask AI
          </Button>
        </div>
      </Card>

      {/* Progress Dashboard */}
      <Card
        className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
      >
        <div className="p-8">
          <h3 className="text-lg font-semibold">Progress Dashboard</h3>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-3xl font-bold text-lime-600">
                {completedLessons}
              </div>
              <div className="text-sm text-gray-500">Lessons Completed</div>
            </div>

            <div>
              <div className="text-3xl font-bold text-lime-600">
                {averageScore}%
              </div>
              <div className="text-sm text-gray-500">Average Score</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
