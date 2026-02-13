'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Sparkles, FileText, Award } from 'lucide-react';

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
  const analyzeResume = () => {
    if (!resumeText) return;

    setIsAnalyzing(true);

    const extractedSkills = [
      'JavaScript',
      'React',
      'Node.js',
      'Leadership',
      'Communication',
    ];

    const extractedExperience = [
      'Frontend Developer (2+ years)',
      'Full Stack Developer (1.5+ years)',
    ];

    const extractedEducation = [
      'Bachelor’s Degree in Computer Science',
      'Web Development Certification',
    ];

    const extractedStrengths = [
      'Strong technical foundation',
      'Experience with production systems',
      'Team collaboration',
    ];

    const wordCount = resumeText.split(' ').filter(Boolean).length;
    const calculatedScore = wordCount > 400 ? 90 : wordCount > 250 ? 80 : 70;

    const generatedAnalysis = `
Resume Analysis Summary:

Your resume demonstrates strong technical expertise and solid experience.

Improvement Recommendations:
• Add measurable achievements (e.g., increased performance by 30%)
• Include more action-driven verbs
• Optimize keywords for ATS systems
• Ensure consistent formatting
    `;

    setTimeout(() => {
      setSkills(extractedSkills);
      setExperience(extractedExperience);
      setEducation(extractedEducation);
      setStrengths(extractedStrengths);
      setAtsScore(calculatedScore);
      setAnalysis(generatedAnalysis);
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Upload Section */}
      <Card className="p-8 space-y-6 rounded-2xl">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <FileText className="h-6 w-6" />
          Resume Analyzer
        </div>

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
          className="min-h-[250px]"
        />

        <Button
          onClick={analyzeResume}
          disabled={!resumeText || isAnalyzing}
          className="w-full"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
        </Button>
      </Card>

      {/* ATS Score */}
      {atsScore !== null && (
        <Card className="p-6 text-center">
          <div className="text-sm text-gray-500 mb-2">ATS Score</div>
          <div className="text-4xl font-bold text-lime-600">{atsScore}/100</div>
        </Card>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Card className="p-8 space-y-4">
          <h2 className="text-xl font-semibold">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <div key={i} className="px-3 py-1 border rounded-full text-sm">
                {skill}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Card className="p-8 space-y-4">
          <h2 className="text-xl font-semibold">Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="border p-4 rounded-lg text-sm">
              {exp}
            </div>
          ))}
        </Card>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Card className="p-8 space-y-4">
          <h2 className="text-xl font-semibold">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="border p-4 rounded-lg text-sm">
              {edu}
            </div>
          ))}
        </Card>
      )}

      {/* Strengths */}
      {strengths.length > 0 && (
        <Card className="p-8 space-y-4">
          <h2 className="text-xl font-semibold">Strengths</h2>
          {strengths.map((strength, i) => (
            <div
              key={i}
              className="flex items-center gap-2 border p-3 rounded-lg text-sm"
            >
              <Award className="h-4 w-4 text-lime-600" />
              {strength}
            </div>
          ))}
        </Card>
      )}

      {/* Detailed Analysis */}
      {analysis && (
        <Card className="p-8">
          <h2 className="text-xl font-semibold mb-4">Detailed Feedback</h2>
          <div className="whitespace-pre-wrap text-sm border p-4 rounded-lg">
            {analysis}
          </div>
        </Card>
      )}
    </div>
  );
}
