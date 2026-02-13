import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
    ForecastSpendingWithAIRequestDto,
    ForecastSpendingWithAIResponseDto,
} from '@/types/api/payment/forecast-spending';
import { useMutation } from '@tanstack/react-query';

export async function forecastSpending(
    payload: ForecastSpendingWithAIRequestDto
): Promise<ForecastSpendingWithAIResponseDto | null> {
    const url = api_paths.payment.forecast();

    return fetchClient<ForecastSpendingWithAIResponseDto | null>(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        token: process.env.NEXT_PUBLIC_API_TOKEN,
    });
}

export function useForecastSpending() {
    return useMutation({
        mutationFn: (data: ForecastSpendingWithAIRequestDto) =>
            forecastSpending(data),
    });
}
