import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  GenerateUserPersonaWithAIRequestDto,
  GenerateUserPersonaWithAIResponseDto,
} from '@/types/api/user/generate-user-persona';
import { useMutation } from '@tanstack/react-query';

export async function generateUserPersona(
  payload: GenerateUserPersonaWithAIRequestDto
): Promise<GenerateUserPersonaWithAIResponseDto | null> {
  const url = api_paths.user.persona();

  return fetchClient<GenerateUserPersonaWithAIResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useGenerateUserPersona() {
  return useMutation({
    mutationFn: (data: GenerateUserPersonaWithAIRequestDto) =>
      generateUserPersona(data),
  });
}
