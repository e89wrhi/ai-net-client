import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  AnalyzeMeetingTranscriptRequestDto,
  AnalyzeMeetingTranscriptResponseDto,
} from '@/types/api/meeting/analyze-meeting-transcript';
import { useMutation } from '@tanstack/react-query';

export async function analyzeMeetingTranscript(
  payload: AnalyzeMeetingTranscriptRequestDto
): Promise<AnalyzeMeetingTranscriptResponseDto | null> {
  const url = api_paths.meeting.analyze_transcript();

  return fetchClient<AnalyzeMeetingTranscriptResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useAnalyzeMeetingTranscript() {
  return useMutation({
    mutationFn: (data: AnalyzeMeetingTranscriptRequestDto) =>
      analyzeMeetingTranscript(data),
  });
}
