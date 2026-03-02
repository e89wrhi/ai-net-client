import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import { GetUsageResponseDto } from '@/types/api/orchestration/get-usage';
import { useQuery } from '@tanstack/react-query';

export async function getUsage(
  from?: string,
  to?: string
): Promise<GetUsageResponseDto | null> {
  const url = api_paths.orchestration.usage(from, to);

  return fetchClient<GetUsageResponseDto | null>(url, {
    method: 'GET',
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useGetUsage(from?: string, to?: string) {
  return useQuery({
    queryKey: ['orchestration-usage', from, to],
    queryFn: () => getUsage(from, to),
  });
}
