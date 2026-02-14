import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  GenerateCodeRequestDto,
  GenerateCodeResponseDto,
} from '@/types/api/code-gen/generate';
import { useMutation } from '@tanstack/react-query';

export async function generateCode(
  payload: GenerateCodeRequestDto
): Promise<GenerateCodeResponseDto | null> {
  const url = api_paths.code_gen.generate();

  return fetchClient<GenerateCodeResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useGenerateCode() {
  return useMutation({
    mutationFn: (data: GenerateCodeRequestDto) => generateCode(data),
  });
}
