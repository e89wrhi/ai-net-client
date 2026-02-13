import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
    TranscribeAudioRequestDto,
    TranscribeAudioResponseDto,
} from '@/types/api/speech-to-text/transcribe-audio';
import { useMutation } from '@tanstack/react-query';

export async function transcribeAudio(
    payload: TranscribeAudioRequestDto
): Promise<TranscribeAudioResponseDto | null> {
    const url = api_paths.speech.transcribe();

    return fetchClient<TranscribeAudioResponseDto | null>(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        token: process.env.NEXT_PUBLIC_API_TOKEN,
    });
}

export function useTranscribeAudio() {
    return useMutation({
        mutationFn: (data: TranscribeAudioRequestDto) => transcribeAudio(data),
    });
}
