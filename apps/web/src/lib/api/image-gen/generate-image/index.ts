import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
    GenerateImageRequestDto,
    GenerateImageResponseDto,
} from '@/types/api/image-gen/generate-image';
import { useMutation } from '@tanstack/react-query';

export async function generateImage(
    payload: GenerateImageRequestDto
): Promise<GenerateImageResponseDto | null> {
    const url = api_paths.image_gen.generate();

    return fetchClient<GenerateImageResponseDto | null>(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        token: process.env.NEXT_PUBLIC_API_TOKEN,
    });
}

export function useGenerateImage() {
    return useMutation({
        mutationFn: (data: GenerateImageRequestDto) => generateImage(data),
    });
}
