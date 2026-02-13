import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  AnalyzeResumeRequestDto,
  AnalyzeResumeResponseDto,
} from '@/types/api/resume/analyze-resume';
import { useMutation } from '@tanstack/react-query';

export async function analyzeResume(
  payload: AnalyzeResumeRequestDto
): Promise<AnalyzeResumeResponseDto | null> {
  const url = api_paths.resume.analyze_ai();

  return fetchClient<AnalyzeResumeResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useAnalyzeResume() {
  return useMutation({
    mutationFn: (data: AnalyzeResumeRequestDto) => analyzeResume(data),
  });
}
