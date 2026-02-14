import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  SummarizeTextRequestDto,
  SummarizeTextResponseDto,
} from '@/types/api/summary/summarize-text';
import { useMutation } from '@tanstack/react-query';

export async function summarizeText(
  payload: SummarizeTextRequestDto
): Promise<SummarizeTextResponseDto | null> {
  const url = api_paths.summary.summarize();

  return fetchClient<SummarizeTextResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useSummarizeText() {
  return useMutation({
    mutationFn: (data: SummarizeTextRequestDto) => summarizeText(data),
  });
}
