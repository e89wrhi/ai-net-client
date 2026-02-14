import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  RemoveBackgroundRequestDto,
  RemoveBackgroundResponseDto,
} from '@/types/api/image-edit/remove-background';
import { useMutation } from '@tanstack/react-query';

export async function removeBackground(
  payload: RemoveBackgroundRequestDto
): Promise<RemoveBackgroundResponseDto | null> {
  const url = api_paths.image_edit.remove_background();

  return fetchClient<RemoveBackgroundResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useRemoveBackground() {
  return useMutation({
    mutationFn: (data: RemoveBackgroundRequestDto) => removeBackground(data),
  });
}
