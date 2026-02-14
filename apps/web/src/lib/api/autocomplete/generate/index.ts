import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  GenerateAutoCompleteRequestDto,
  GenerateAutoCompleteResponseDto,
} from '@/types/api/autocomplete/generate';
import { useMutation } from '@tanstack/react-query';

export async function generateAutoComplete(
  payload: GenerateAutoCompleteRequestDto
): Promise<GenerateAutoCompleteResponseDto | null> {
  const url = api_paths.autocomplete.generate();

  return fetchClient<GenerateAutoCompleteResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useGenerateAutoComplete() {
  return useMutation({
    mutationFn: (data: GenerateAutoCompleteRequestDto) =>
      generateAutoComplete(data),
  });
}
