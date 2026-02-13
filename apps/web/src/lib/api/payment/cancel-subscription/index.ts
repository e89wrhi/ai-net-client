import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
    CancelSubscriptionRequest,
    CancelSubscriptionRequestResponse,
} from '@/types/api/payment/cancel-subscription';
import { useMutation } from '@tanstack/react-query';

export async function cancelSubscription(
    payload: CancelSubscriptionRequest
): Promise<CancelSubscriptionRequestResponse | null> {
    const url = api_paths.payment.cancel_subscription();

    return fetchClient<CancelSubscriptionRequestResponse | null>(url, {
        method: 'POST', // or DELETE depending on backend, usually POST for actions not strictly resource deletion by ID in URL
        body: JSON.stringify(payload),
        token: process.env.NEXT_PUBLIC_API_TOKEN,
    });
}

export function useCancelSubscription() {
    return useMutation({
        mutationFn: (data: CancelSubscriptionRequest) => cancelSubscription(data),
    });
}
