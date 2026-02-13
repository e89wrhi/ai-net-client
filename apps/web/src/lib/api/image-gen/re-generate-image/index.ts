import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
    ReGenerateImageRequestDto,
    ReGenerateImageResponseDto,
} from '@/types/api/image-gen/re-generate-image';
import { useMutation } from '@tanstack/react-query';

export async function reGenerateImage(
    payload: ReGenerateImageRequestDto
): Promise<ReGenerateImageResponseDto | null> {
    const url = api_paths.image_gen.regenerate();

    return fetchClient<ReGenerateImageResponseDto | null>(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        token: process.env.NEXT_PUBLIC_API_TOKEN,
    });
}

export function useReGenerateImage() {
    return useMutation({
        mutationFn: (data: ReGenerateImageRequestDto) => reGenerateImage(data),
    });
}
