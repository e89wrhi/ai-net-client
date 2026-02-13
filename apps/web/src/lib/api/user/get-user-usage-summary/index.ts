import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import { UserUsageSummaryDto } from '@/types/api/user/get-user-usage-summary';
import { useQuery } from '@tanstack/react-query';

export async function getUserUsageSummary(): Promise<UserUsageSummaryDto | null> {
  const url = api_paths.user.usage_summary();

  return fetchClient<UserUsageSummaryDto | null>(url, {
    method: 'GET',
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useGetUserUsageSummary() {
  return useQuery({
    queryKey: ['user-usage-summary'],
    queryFn: () => getUserUsageSummary(),
  });
}
