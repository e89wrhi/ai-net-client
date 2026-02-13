import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
    DetectLanguageRequestDto,
    DetectLanguageResponseDto,
} from '@/types/api/translate/detect-language';
import { useMutation } from '@tanstack/react-query';

export async function detectLanguage(
    payload: DetectLanguageRequestDto
): Promise<DetectLanguageResponseDto | null> {
    const url = api_paths.translate.detect();

    return fetchClient<DetectLanguageResponseDto | null>(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        token: process.env.NEXT_PUBLIC_API_TOKEN,
    });
}

export function useDetectLanguage() {
    return useMutation({
        mutationFn: (data: DetectLanguageRequestDto) => detectLanguage(data),
    });
}
