import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
    TranslateTextRequestDto,
    TranslateTextResponseDto,
} from '@/types/api/translate/translate-text';
import { useMutation } from '@tanstack/react-query';

export async function translateText(
    payload: TranslateTextRequestDto
): Promise<TranslateTextResponseDto | null> {
    const url = api_paths.translate.translate();

    return fetchClient<TranslateTextResponseDto | null>(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        token: process.env.NEXT_PUBLIC_API_TOKEN,
    });
}

export function useTranslateText() {
    return useMutation({
        mutationFn: (data: TranslateTextRequestDto) => translateText(data),
    });
}
