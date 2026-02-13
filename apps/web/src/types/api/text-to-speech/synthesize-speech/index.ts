import { SpeechSpeed, VoiceType } from '@/types/enums/texttospeech';

export interface SynthesizeSpeechRequestDto {
  Text: string;
  Voice: VoiceType;
  Speed: SpeechSpeed;
  Language: string;
  ModelId: string | null;
}
export interface SynthesizeSpeechResponseDto {
  SessionId: string;
  ResultId: string;
  AudioUrl: string;
  ModelId: string;
  ProviderName: string | null;
}
