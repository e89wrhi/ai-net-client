import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  AnalyzeImageRequestDto,
  AnalyzeImageResponseDto,
} from '@/types/api/image-caption/analyze-image';
import { useMutation } from '@tanstack/react-query';

export async function analyzeImage(
  payload: AnalyzeImageRequestDto
): Promise<AnalyzeImageResponseDto | null> {
  const url = api_paths.image_caption.analyze();

  return fetchClient<AnalyzeImageResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useAnalyzeImage() {
  return useMutation({
    mutationFn: (data: AnalyzeImageRequestDto) => analyzeImage(data),
  });
}
