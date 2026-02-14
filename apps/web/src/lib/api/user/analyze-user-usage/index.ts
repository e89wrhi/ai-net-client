import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  AnalyzeUserUsageWithAIRequestDto,
  AnalyzeUserUsageWithAIResponseDto,
} from '@/types/api/user/analyze-user-usage';
import { useMutation } from '@tanstack/react-query';

export async function analyzeUserUsage(
  payload: AnalyzeUserUsageWithAIRequestDto
): Promise<AnalyzeUserUsageWithAIResponseDto | null> {
  const url = api_paths.user.analyze_usage();

  return fetchClient<AnalyzeUserUsageWithAIResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useAnalyzeUserUsage() {
  return useMutation({
    mutationFn: (data: AnalyzeUserUsageWithAIRequestDto) =>
      analyzeUserUsage(data),
  });
}
