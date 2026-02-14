import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  AnalyzeInvoiceWithAIRequestDto,
  AnalyzeInvoiceWithAIResponseDto,
} from '@/types/api/payment/analyze-invoice';
import { useMutation } from '@tanstack/react-query';

export async function analyzeInvoice(
  payload: AnalyzeInvoiceWithAIRequestDto
): Promise<AnalyzeInvoiceWithAIResponseDto | null> {
  const url = api_paths.payment.analyze_invoice();

  return fetchClient<AnalyzeInvoiceWithAIResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useAnalyzeInvoice() {
  return useMutation({
    mutationFn: (data: AnalyzeInvoiceWithAIRequestDto) => analyzeInvoice(data),
  });
}
