import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import { InvoiceDto } from '@/types/api/payment/get-invoices';
import { useQuery } from '@tanstack/react-query';

export async function getInvoices(
    subscriptionId: string
): Promise<InvoiceDto[] | null> {
    const url = api_paths.payment.get_invoices(subscriptionId);

    return fetchClient<InvoiceDto[] | null>(url, {
        method: 'GET',
        token: process.env.NEXT_PUBLIC_API_TOKEN,
    });
}

export function useGetInvoices(subscriptionId: string) {
    return useQuery({
        queryKey: ['invoices', subscriptionId],
        queryFn: () => getInvoices(subscriptionId),
        enabled: !!subscriptionId,
    });
}
