import { SpeechToTextDetailLevel } from '@/types/enums/speechtotext';

export interface TranscribeAudioRequestDto {
  AudioUrl: string;
  Language: string;
  IncludePunctuation: boolean;
  DetailLevel: SpeechToTextDetailLevel;
  ModelId: string | null;
}
export interface TranscribeAudioResponseDto {
  SessionId: string;
  ResultId: string;
  Transcript: string;
  ModelId: string;
  ProviderName: string | null;
}
