import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  GenerateLessonRequestDto,
  GenerateLessonResponseDto,
} from '@/types/api/learning/generate-lesson';
import { useMutation } from '@tanstack/react-query';

export async function generateLesson(
  payload: GenerateLessonRequestDto
): Promise<GenerateLessonResponseDto | null> {
  const url = api_paths.assistant.generate_lesson();

  return fetchClient<GenerateLessonResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useGenerateLesson() {
  return useMutation({
    mutationFn: (data: GenerateLessonRequestDto) => generateLesson(data),
  });
}
