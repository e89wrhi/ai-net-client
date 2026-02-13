import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
    AnalyzeSentimentDetailedRequestDto,
    AnalyzeSentimentDetailedResponseDto,
} from '@/types/api/sentiment/analyze-sentiment-detailed';
import { useMutation } from '@tanstack/react-query';

export async function analyzeSentimentDetailed(
    payload: AnalyzeSentimentDetailedRequestDto
): Promise<AnalyzeSentimentDetailedResponseDto | null> {
    const url = api_paths.sentiment.analyze_detailed();

    return fetchClient<AnalyzeSentimentDetailedResponseDto | null>(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        token: process.env.NEXT_PUBLIC_API_TOKEN,
    });
}

export function useAnalyzeSentimentDetailed() {
    return useMutation({
        mutationFn: (data: AnalyzeSentimentDetailedRequestDto) =>
            analyzeSentimentDetailed(data),
    });
}
