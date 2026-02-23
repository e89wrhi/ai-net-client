import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  SummarizeMarkdownRequestDto,
  SummarizeMarkdownResponseDto,
} from '@/types/api/simple-md';
import { useMutation } from '@tanstack/react-query';

export async function summarizeMarkdown(
  payload: SummarizeMarkdownRequestDto
): Promise<SummarizeMarkdownResponseDto | null> {
  const url = api_paths.simple_md.summarize();

  return fetchClient<SummarizeMarkdownResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useSummarizeMarkdown() {
  return useMutation({
    mutationFn: (data: SummarizeMarkdownRequestDto) => summarizeMarkdown(data),
  });
}
