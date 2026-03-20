import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  ResetUsageCounterRequest,
  ResetUsageCounterRequestResponse,
} from '@/types/api/user/reset-usage-counters';
import { useMutation } from '@tanstack/react-query';

export async function resetUsageCounters(
  payload: ResetUsageCounterRequest
): Promise<ResetUsageCounterRequestResponse | null> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
    return {
      message: 'Usage counters reset successfully',
      status: 200,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  }

  const url = api_paths.user.reset_usage();

  return fetchClient<ResetUsageCounterRequestResponse | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useResetUsageCounters() {
  return useMutation({
    mutationFn: (data: ResetUsageCounterRequest) => resetUsageCounters(data),
  });
}
