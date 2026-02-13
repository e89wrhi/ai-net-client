import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
    GenerateInvoiceRequest,
    GenerateInvoiceRequestResponse,
} from '@/types/api/payment/generate-invoice';
import { useMutation } from '@tanstack/react-query';

export async function generateInvoice(
    payload: GenerateInvoiceRequest
): Promise<GenerateInvoiceRequestResponse | null> {
    const url = api_paths.payment.generate_invoice();

    return fetchClient<GenerateInvoiceRequestResponse | null>(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        token: process.env.NEXT_PUBLIC_API_TOKEN,
    });
}

export function useGenerateInvoice() {
    return useMutation({
        mutationFn: (data: GenerateInvoiceRequest) => generateInvoice(data),
    });
}
