'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Sparkles, Award } from 'lucide-react';
import ResumeHeader from './resume-header';
import { useAnalyzeResume } from '@/lib/api/resume/analyze-resume';
import { toast } from 'sonner';

export default function ResumeClient() {
  const [resumeText, setResumeText] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState<string[]>([]);
  const [education, setEducation] = useState<string[]>([]);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [responseType, setResponseType] = useState<'stream' | 'json'>('stream');

  // Toggle for development
  const USE_MOCK = true;

  const mockResumeStream = async function* () {
    const response = `[Streaming Analysis] Your resume is being processed...
    
Summary: Experienced software engineer with a focus on React and Node.js.
Estimated ATS Score: 85/100.

Identified Strengths:
- Proficiency in modern frontend frameworks.
- Strong understanding of cloud architecture.
- Excellent communication skills.

Recommendations for Improvement:
- Add more quantifiable achievements.
- Include a section for industry certifications.`;

    const chunks = response.split(/(?<= )/);
    for (const chunk of chunks) {
      await new Promise((resolve) =>
        setTimeout(resolve, 30 + Math.random() * 50)
      );
      yield chunk;
    }
  };

  const mockResumeJson = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      Summary: `[JSON Response Analysis] Your resume demonstrates solid experience in the tech industry. Key skills identified include React, TypeScript, and MongoDB.`,
      Score: 82,
    };
  };

  const { mutateAsync: jsonAnalyze, isPending: isJsonPending } =
    useAnalyzeResume();

  const isPending = isJsonPending || isAnalyzing;

  // ----------------------------
  // Handle File Upload
  // ----------------------------
  const handleFileUpload = async (file: File | null) => {
    if (!file) return;

    setUploadedFileName(file.name);

    const fileType = file.type;

    if (fileType === 'text/plain') {
      const text = await file.text();
      setResumeText(text);
    } else {
      // For PDF/DOCX (requires backend parsing for full support)
      const text = await file.text().catch(() => '');
      setResumeText(
        text || 'File uploaded. Full parsing requires backend integration.'
      );
    }
  };

  // ----------------------------
  // Resume Analysis
  // ----------------------------
  const analyzeResume = async () => {
    if (!resumeText) return;

    setAnalysis('');
    setAtsScore(null);
    setSkills([]);
    setExperience([]);
    setEducation([]);
    setStrengths([]);
    setIsAnalyzing(true);

    try {
      if (responseType === 'stream') {
        const stream = USE_MOCK ? mockResumeStream() : null; // Would call real stream API if it existed

        if (stream) {
          for await (const chunk of stream) {
            setAnalysis((prev) => prev + chunk);
          }
        }
        setAtsScore(85);
        setSkills(['React', 'Node.js', 'TypeScript']);
      } else {
        const res = USE_MOCK
          ? await mockResumeJson()
          : await jsonAnalyze({
              ResumeContent: resumeText,
              IncludeSkill: true,
              IncludeEducation: true,
              IncludeExpireance: true,
              ModelId: selectedModel,
            });

        if (res) {
          setAnalysis(res.Summary);
          setAtsScore(res.Score);
          setSkills(['React', 'Node.js', 'Cloud Architecture']);
        }
      }
    } catch (error) {
      console.error('Resume analysis failed:', error);
      toast.error('Failed to analyze resume');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    toast('Session Reset');
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <ResumeHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        responseType={responseType}
        onResponseTypeChange={setResponseType}
        onSessionReset={handleReset}
      />
      {/* Upload Section */}
      <Card
        className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
      >
        <div className="p-8">
          <Input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
          />

          {uploadedFileName && (
            <div className="text-sm text-gray-500">
              Uploaded: {uploadedFileName}
            </div>
          )}

          <Textarea
            placeholder="Or paste your resume content here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="min-h-[250px] border-none shadow-none"
          />

          <Button
            onClick={analyzeResume}
            disabled={!resumeText || isPending}
            className="w-full cursor-pointer rounded-full"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isPending ? 'Analyzing...' : 'Analyze Resume'}
          </Button>
        </div>
      </Card>

      {/* ATS Score */}
      {atsScore !== null && (
        <Card
          className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
        >
          <div className="p-8">
            <div className="text-sm text-gray-500 mb-2">ATS Score</div>
            <div className="text-4xl md:text-5xl font-black text-green-500">
              {atsScore}/100
            </div>
          </div>
        </Card>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Card
          className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
        >
          <div className="p-8">
            <h2 className="text-xl font-semibold">Skills</h2>
            <div className="flex mt-5 flex-wrap gap-2">
              {skills.map((skill, i) => (
                <div key={i} className="px-3 py-1 border rounded-full text-sm">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Card
          className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
        >
          <div className="p-8 space-y-5">
            <h2 className="text-xl font-semibold">Experience</h2>
            {experience.map((exp, i) => (
              <div key={i} className="border p-4 rounded-2xl text-sm">
                {exp}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Card
          className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
        >
          <div className="p-8 space-y-5">
            <h2 className="text-xl font-semibold">Education</h2>
            {education.map((edu, i) => (
              <div key={i} className="border p-4 rounded-2xl text-sm">
                {edu}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Strengths */}
      {strengths.length > 0 && (
        <Card
          className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
        >
          <div className="p-8 space-y-5">
            <h2 className="text-xl font-semibold">Strengths</h2>
            {strengths.map((strength, i) => (
              <div
                key={i}
                className="flex items-center gap-2 border p-3 rounded-2xl text-sm"
              >
                <Award className="h-4 w-4 text-green-400" />
                {strength}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Detailed Analysis */}
      {analysis && (
        <Card
          className="p-0 border-none bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] 
                     rounded-[2.5rem] overflow-hidden 
                     ring-1 ring-neutral-200 dark:ring-neutral-800 transition-all 
                     duration-500 hover:ring-primary/20"
        >
          <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Detailed Feedback</h2>
            <div className="whitespace-pre-wrap text-lg">{analysis}</div>
          </div>
        </Card>
      )}
    </div>
  );
}
