import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  StartChatRequest,
  StartChatRequestResponse,
} from '@/types/api/chat/start-chat';
import { useMutation } from '@tanstack/react-query';

export async function startChat(
  payload: StartChatRequest
): Promise<StartChatRequestResponse | null> {
  const url = api_paths.chat.start();

  return fetchClient<StartChatRequestResponse | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useStartChat() {
  return useMutation({
    mutationFn: (data: StartChatRequest) => startChat(data),
  });
}
