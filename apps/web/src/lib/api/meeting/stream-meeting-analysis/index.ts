import { api_paths } from '@/lib/api-routes';
import { StreamMeetingAnalysisRequestDto } from '@/types/api/meeting/stream-meeting-analysis';
import { useMutation } from '@tanstack/react-query';

export async function* streamMeetingAnalysis(
    payload: StreamMeetingAnalysisRequestDto
): AsyncGenerator<string, void, unknown> {
    const url = api_paths.meeting.analyze_stream();

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

export function useStreamMeetingAnalysis() {
    return useMutation({
        mutationFn: (data: StreamMeetingAnalysisRequestDto) =>
            streamMeetingAnalysis(data),
    });
}
