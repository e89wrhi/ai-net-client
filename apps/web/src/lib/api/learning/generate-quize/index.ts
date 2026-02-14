import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  GenerateQuizRequestDto,
  GenerateQuizResponseDto,
} from '@/types/api/learning/generate-quize';
import { useMutation } from '@tanstack/react-query';

export async function generateQuiz(
  payload: GenerateQuizRequestDto
): Promise<GenerateQuizResponseDto | null> {
  const url = api_paths.assistant.generate_quiz();

  return fetchClient<GenerateQuizResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useGenerateQuiz() {
  return useMutation({
    mutationFn: (data: GenerateQuizRequestDto) => generateQuiz(data),
  });
}
