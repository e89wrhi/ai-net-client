import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  UpdateUserRequestDto,
  UpdateUserResponseDto,
} from '@/types/api/user/update-user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export async function updateUser(
  id: string,
  payload: UpdateUserRequestDto
): Promise<UpdateUserResponseDto | null> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
    return {
      success: true,
      message: 'User updated successfully (mock)',
    };
  }

  const url = api_paths.user.persona(); // Assuming we use persona or similar to update metadata

  return fetchClient<UpdateUserResponseDto | null>(url, {
    method: 'PATCH',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateUserRequestDto;
    }) => updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}
