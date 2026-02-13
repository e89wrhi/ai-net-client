import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
    AnalyzeSentimentRequestDto,
    AnalyzeSentimentResponseDto,
} from '@/types/api/sentiment/analyze-sentiment';
import { useMutation } from '@tanstack/react-query';

export async function analyzeSentiment(
    payload: AnalyzeSentimentRequestDto
): Promise<AnalyzeSentimentResponseDto | null> {
    const url = api_paths.sentiment.analyze();

    return fetchClient<AnalyzeSentimentResponseDto | null>(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        token: process.env.NEXT_PUBLIC_API_TOKEN,
    });
}

export function useAnalyzeSentiment() {
    return useMutation({
        mutationFn: (data: AnalyzeSentimentRequestDto) => analyzeSentiment(data),
    });
}
