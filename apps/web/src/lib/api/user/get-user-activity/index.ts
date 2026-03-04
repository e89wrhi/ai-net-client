import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import { UserActivityDto } from '@/types/api/user/get-user-activity';
import { useQuery } from '@tanstack/react-query';

export async function getUserActivity(): Promise<UserActivityDto[] | null> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
    return getMockUserActivity();
  }

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

function getMockUserActivity(): UserActivityDto[] {
  return [
    {
      Id: '1',
      Module: 'Chat',
      Action: 'Message Sent',
      ResourceId: 'msg-001',
      TimeStamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      Id: '2',
      Module: 'Image Gen',
      Action: 'Image Generated',
      ResourceId: 'img-042',
      TimeStamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      Id: '3',
      Module: 'Account',
      Action: 'Profile Updated',
      ResourceId: 'usr-001',
      TimeStamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
    {
      Id: '4',
      Module: 'API Keys',
      Action: 'Key Created',
      ResourceId: 'key-99',
      TimeStamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    },
  ];
}
