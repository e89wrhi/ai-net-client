import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  SubmitQuizRequest,
  SubmitQuizRequestResponse,
} from '@/types/api/learning/submit-quize';
import { useMutation } from '@tanstack/react-query';

export async function submitQuiz(
  payload: SubmitQuizRequest
): Promise<SubmitQuizRequestResponse | null> {
  const url = api_paths.assistant.submit_quiz();

  return fetchClient<SubmitQuizRequestResponse | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useSubmitQuiz() {
  return useMutation({
    mutationFn: (data: SubmitQuizRequest) => submitQuiz(data),
  });
}
