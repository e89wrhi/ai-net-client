import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import { GetApiKeysResponseDto } from '@/types/api/orchestration/get-keys';
import { useQuery } from '@tanstack/react-query';

export async function getApiKeys(): Promise<GetApiKeysResponseDto | null> {
  const url = api_paths.orchestration.keys();

  return fetchClient<GetApiKeysResponseDto | null>(url, {
    method: 'GET',
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useGetApiKeys() {
  return useQuery({
    queryKey: ['orchestration-keys'],
    queryFn: () => getApiKeys(),
  });
}
