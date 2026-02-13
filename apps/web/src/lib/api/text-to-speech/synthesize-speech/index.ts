import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
    SynthesizeSpeechRequestDto,
    SynthesizeSpeechResponseDto,
} from '@/types/api/text-to-speech/synthesize-speech';
import { useMutation } from '@tanstack/react-query';

export async function synthesizeSpeech(
    payload: SynthesizeSpeechRequestDto
): Promise<SynthesizeSpeechResponseDto | null> {
    const url = api_paths.speech.synthesize();

    return fetchClient<SynthesizeSpeechResponseDto | null>(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        token: process.env.NEXT_PUBLIC_API_TOKEN,
    });
}

export function useSynthesizeSpeech() {
    return useMutation({
        mutationFn: (data: SynthesizeSpeechRequestDto) => synthesizeSpeech(data),
    });
}
