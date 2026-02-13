import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  ExtractActionItemsRequestDto,
  ExtractActionItemsResponseDto,
} from '@/types/api/meeting/extract-action-items';
import { useMutation } from '@tanstack/react-query';

export async function extractActionItems(
  payload: ExtractActionItemsRequestDto
): Promise<ExtractActionItemsResponseDto | null> {
  const url = api_paths.meeting.action_items();

  return fetchClient<ExtractActionItemsResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useExtractActionItems() {
  return useMutation({
    mutationFn: (data: ExtractActionItemsRequestDto) =>
      extractActionItems(data),
  });
}
