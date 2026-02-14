import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  RecordUsageChargeRequest,
  RecordUsageChargeRequestResponse,
} from '@/types/api/payment/record-usage-charge';
import { useMutation } from '@tanstack/react-query';

export async function recordUsageCharge(
  payload: RecordUsageChargeRequest
): Promise<RecordUsageChargeRequestResponse | null> {
  const url = api_paths.payment.record_charge();

  return fetchClient<RecordUsageChargeRequestResponse | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useRecordUsageCharge() {
  return useMutation({
    mutationFn: (data: RecordUsageChargeRequest) => recordUsageCharge(data),
  });
}
