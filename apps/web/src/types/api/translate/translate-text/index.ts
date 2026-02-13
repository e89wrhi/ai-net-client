import { TranslationDetailLevel } from '@/types/enums/translate';

export interface TranslateTextRequestDto {
  Text: string;
  SourceLanguage: string;
  TargetLanguage: string;
  DetailLevel: TranslationDetailLevel;
  ModelId: string | null;
}
export interface TranslateTextResponseDto {
  SessionId: string;
  ResultId: string;
  TranslatedText: string;
  ModelId: string;
  ProviderName: string | null;
}
