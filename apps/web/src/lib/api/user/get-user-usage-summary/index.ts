import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import { UserUsageSummaryDto } from '@/types/api/user/get-user-usage-summary';
import { useQuery } from '@tanstack/react-query';

export async function getUserUsageSummary(): Promise<UserUsageSummaryDto | null> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
    return getMockUserUsageSummary();
  }

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

function getMockUserUsageSummary(): UserUsageSummaryDto {
  return {
    Id: 'usage-001',
    Period: 'March 2026',
    TokenUsed: '12400',
    RequestsCount: 456,
  };
}
