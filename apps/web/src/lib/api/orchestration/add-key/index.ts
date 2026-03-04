import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  AddApiKeyRequestDto,
  AddApiKeyResponseDto,
} from '@/types/api/orchestration/add-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export async function addApiKey(
  data: AddApiKeyRequestDto
): Promise<AddApiKeyResponseDto | null> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
    return {
      id: Math.random().toString(36).substr(2, 9),
      provider: data.provider,
      label: data.label,
    };
  }

  const url = api_paths.orchestration.keys();

  return fetchClient<AddApiKeyResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(data),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useAddApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddApiKeyRequestDto) => addApiKey(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orchestration-keys'] });
    },
  });
}
