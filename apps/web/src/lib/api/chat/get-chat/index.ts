import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import { ChatDto } from '@/types/api/chat/get-history';
import { useQuery } from '@tanstack/react-query';

export async function getChat(sessionId: string): Promise<ChatDto | null> {
  const url = api_paths.chat.get_by_id(sessionId);

  return fetchClient<ChatDto | null>(url, {
    method: 'GET',
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useGetChat(sessionId: string) {
  return useQuery({
    queryKey: ['chat', sessionId],
    queryFn: () => getChat(sessionId),
    enabled: !!sessionId,
  });
}
