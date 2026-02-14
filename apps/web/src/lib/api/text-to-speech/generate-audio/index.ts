import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  GenerateAudioRequestDto,
  GenerateAudioResponseDto,
} from '@/types/api/text-to-speech/generate-audio';
import { useMutation } from '@tanstack/react-query';

export async function generateAudio(
  payload: GenerateAudioRequestDto
): Promise<GenerateAudioResponseDto | null> {
  const url = api_paths.speech.generate_ai();

  return fetchClient<GenerateAudioResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useGenerateAudio() {
  return useMutation({
    mutationFn: (data: GenerateAudioRequestDto) => generateAudio(data),
  });
}
