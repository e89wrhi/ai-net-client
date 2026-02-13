import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
    EnhanceImageRequestDto,
    EnhanceImageResponseDto,
} from '@/types/api/image-edit/enhance-image';
import { useMutation } from '@tanstack/react-query';

export async function enhanceImage(
    payload: EnhanceImageRequestDto
): Promise<EnhanceImageResponseDto | null> {
    const url = api_paths.image_edit.enhance();

    return fetchClient<EnhanceImageResponseDto | null>(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        token: process.env.NEXT_PUBLIC_API_TOKEN,
    });
}

export function useEnhanceImage() {
    return useMutation({
        mutationFn: (data: EnhanceImageRequestDto) => enhanceImage(data),
    });
}
