import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export async function removeApiKey(id: string): Promise<boolean | null> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
    return true;
  }

  const url = api_paths.orchestration.remove_key(id);

  return fetchClient<boolean | null>(url, {
    method: 'DELETE',
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useRemoveApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeApiKey(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orchestration-keys'] });
    },
  });
}
