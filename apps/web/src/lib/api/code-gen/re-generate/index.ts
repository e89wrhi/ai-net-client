import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  ReGenerateCodeRequestDto,
  ReGenerateCodeResponseDto,
} from '@/types/api/code-gen/re-generate';
import { useMutation } from '@tanstack/react-query';

export async function reGenerateCode(
  payload: ReGenerateCodeRequestDto
): Promise<ReGenerateCodeResponseDto | null> {
  const url = api_paths.code_gen.regenerate();

  return fetchClient<ReGenerateCodeResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useReGenerateCode() {
  return useMutation({
    mutationFn: (data: ReGenerateCodeRequestDto) => reGenerateCode(data),
  });
}
