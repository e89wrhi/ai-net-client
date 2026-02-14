import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  GenerateResponseRequestDto,
  GenerateResponseResponseDto,
} from '@/types/api/chat/generate';
import { useMutation } from '@tanstack/react-query';

export async function generateResponse(
  payload: GenerateResponseRequestDto
): Promise<GenerateResponseResponseDto | null> {
  const url = api_paths.chat.generate_response();

  return fetchClient<GenerateResponseResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useGenerateResponse() {
  return useMutation({
    mutationFn: (data: GenerateResponseRequestDto) => generateResponse(data),
  });
}
