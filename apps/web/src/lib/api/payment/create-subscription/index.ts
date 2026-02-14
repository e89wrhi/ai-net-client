import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  CreateSubscriptionRequest,
  CreateSubscriptionRequestResponse,
} from '@/types/api/payment/create-subscription';
import { useMutation } from '@tanstack/react-query';

export async function createSubscription(
  payload: CreateSubscriptionRequest
): Promise<CreateSubscriptionRequestResponse | null> {
  const url = api_paths.payment.create_subscription();

  return fetchClient<CreateSubscriptionRequestResponse | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useCreateSubscription() {
  return useMutation({
    mutationFn: (data: CreateSubscriptionRequest) => createSubscription(data),
  });
}
