import { api_paths } from '@/lib/api-routes';
import { StreamAnalyzeCodeRequestDto } from '@/types/api/code-debug/stream-analyze-code';
import { useMutation } from '@tanstack/react-query';

export async function* streamAnalyzeCode(
    payload: StreamAnalyzeCodeRequestDto
): AsyncGenerator<string, void, unknown> {
    const url = api_paths.code_debug.stream_analyze();

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
    }

    if (!response.body) {
        return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            yield decoder.decode(value, { stream: true });
        }
    } finally {
        reader.releaseLock();
    }
}

export function useStreamAnalyzeCode() {
    return useMutation({
        mutationFn: (data: StreamAnalyzeCodeRequestDto) => streamAnalyzeCode(data),
    });
}
