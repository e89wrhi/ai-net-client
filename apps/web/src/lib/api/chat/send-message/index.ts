import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  SendMessageRequest,
  SendMessageRequestResponse,
} from '@/types/api/chat/send-message';
import { useMutation } from '@tanstack/react-query';

export async function sendMessage(
  payload: SendMessageRequest
): Promise<SendMessageRequestResponse | null> {
  const url = api_paths.chat.send_message();

  return fetchClient<SendMessageRequestResponse | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useSendMessage() {
  return useMutation({
    mutationFn: (data: SendMessageRequest) => sendMessage(data),
  });
}
