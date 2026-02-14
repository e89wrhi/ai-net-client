import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  UpdateChatRequest,
  UpdateChatRequestResponse,
} from '@/types/api/chat/update-chat';
import { useMutation } from '@tanstack/react-query';

export async function updateChat(
  sessionId: string,
  payload: UpdateChatRequest
): Promise<UpdateChatRequestResponse | null> {
  const url = api_paths.chat.update(sessionId);

  return fetchClient<UpdateChatRequestResponse | null>(url, {
    method: 'PUT',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useUpdateChat() {
  return useMutation({
    mutationFn: ({
      sessionId,
      payload,
    }: {
      sessionId: string;
      payload: UpdateChatRequest;
    }) => updateChat(sessionId, payload),
  });
}
