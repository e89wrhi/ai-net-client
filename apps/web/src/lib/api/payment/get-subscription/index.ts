import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import { SubscriptionDto } from '@/types/api/payment/get-subscription';
import { useQuery } from '@tanstack/react-query';

export async function getSubscription(): Promise<SubscriptionDto[] | null> {
    const url = api_paths.payment.get_subscription();

    return fetchClient<SubscriptionDto[] | null>(url, {
        method: 'GET',
        token: process.env.NEXT_PUBLIC_API_TOKEN,
    });
}

export function useGetSubscription() {
    return useQuery({
        queryKey: ['subscription'],
        queryFn: () => getSubscription(),
    });
}
