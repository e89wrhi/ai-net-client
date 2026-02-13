import { SpeechToTextDetailLevel } from '@/types/enums/speechtotext';

export interface StreamTranscribeAudioRequestDto {
  UserId: string;
  AudioUrl: string;
  Language: string;
  IncludePunctuation: boolean;
  DetailLevel: SpeechToTextDetailLevel;
  ModelId: string | null;
}
