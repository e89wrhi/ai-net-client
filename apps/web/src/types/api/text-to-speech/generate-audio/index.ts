import { VoiceType, SpeechSpeed } from '@/types/enums/texttospeech';

export interface GenerateAudioRequestDto {
  Text: string;
  Voice: VoiceType;
  Speed: SpeechSpeed;
  ModelId: string | null;
}
export interface GenerateAudioResponseDto {
  SessionId: string;
  AudioUrl: string;
  ModelId: string;
  ProviderName: string | null;
}
