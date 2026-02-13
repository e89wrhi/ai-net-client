import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import { UserActivityDto } from '@/types/api/user/get-user-activity';
import { useQuery } from '@tanstack/react-query';

export async function getUserActivity(): Promise<UserActivityDto[] | null> {
  const url = api_paths.user.activities();

  return fetchClient<UserActivityDto[] | null>(url, {
    method: 'GET',
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useGetUserActivity() {
  return useQuery({
    queryKey: ['user-activities'],
    queryFn: () => getUserActivity(),
  });
}
