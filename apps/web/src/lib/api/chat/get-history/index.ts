import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import { ChatDto } from '@/types/api/chat/get-history';
import { useQuery } from '@tanstack/react-query';

export async function getHistory(): Promise<ChatDto[] | null> {
  const url = api_paths.chat.history();

  return fetchClient<ChatDto[] | null>(url, {
    method: 'GET',
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useGetHistory() {
  return useQuery({
    queryKey: ['chat-history'],
    queryFn: () => getHistory(),
  });
}
