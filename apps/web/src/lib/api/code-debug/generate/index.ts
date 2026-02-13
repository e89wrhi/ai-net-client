import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
    GenerateFixRequestDto,
    GenerateFixResponseDto,
} from '@/types/api/code-debug/generate';
import { useMutation } from '@tanstack/react-query';

export async function generateFix(
    payload: GenerateFixRequestDto
): Promise<GenerateFixResponseDto | null> {
    const url = api_paths.code_debug.fix();

    return fetchClient<GenerateFixResponseDto | null>(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        token: process.env.NEXT_PUBLIC_API_TOKEN,
    });
}

export function useGenerateFix() {
    return useMutation({
        mutationFn: (data: GenerateFixRequestDto) => generateFix(data),
    });
}
