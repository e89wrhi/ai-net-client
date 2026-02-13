import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  OptimizeResumeRequestDto,
  OptimizeResumeResponseDto,
} from '@/types/api/resume/optimize-resume';
import { useMutation } from '@tanstack/react-query';

export async function optimizeResume(
  payload: OptimizeResumeRequestDto
): Promise<OptimizeResumeResponseDto | null> {
  const url = api_paths.resume.optimize();

  return fetchClient<OptimizeResumeResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useOptimizeResume() {
  return useMutation({
    mutationFn: (data: OptimizeResumeRequestDto) => optimizeResume(data),
  });
}
