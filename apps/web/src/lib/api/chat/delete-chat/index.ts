import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  DeleteChatRequest,
  DeleteChatRequestResponse,
} from '@/types/api/chat/delete-chat';
import { useMutation } from '@tanstack/react-query';

export async function deleteChat(
  payload: DeleteChatRequest
): Promise<DeleteChatRequestResponse | null> {
  const url = api_paths.chat.delete(payload.SessionId);

  return fetchClient<DeleteChatRequestResponse | null>(url, {
    method: 'DELETE',
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useDeleteChat() {
  return useMutation({
    mutationFn: (data: DeleteChatRequest) => deleteChat(data),
  });
}
