import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  BingSearchRequestDto,
  BingSearchResponseDto,
} from '@/types/api/simple-plugin';
import { useMutation } from '@tanstack/react-query';

export async function bingSearch(
  payload: BingSearchRequestDto
): Promise<BingSearchResponseDto | null> {
  const url = api_paths.simple_plugin.bing();

  return fetchClient<BingSearchResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useBingSearch() {
  return useMutation({
    mutationFn: (data: BingSearchRequestDto) => bingSearch(data),
  });
}
