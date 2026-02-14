import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  AnalyzeCodeRequestDto,
  AnalyzeCodeResponseDto,
} from '@/types/api/code-debug/analyze-code';
import { useMutation } from '@tanstack/react-query';

export async function analyzeCode(
  payload: AnalyzeCodeRequestDto
): Promise<AnalyzeCodeResponseDto | null> {
  const url = api_paths.code_debug.analyze();

  return fetchClient<AnalyzeCodeResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useAnalyzeCode() {
  return useMutation({
    mutationFn: (data: AnalyzeCodeRequestDto) => analyzeCode(data),
  });
}
