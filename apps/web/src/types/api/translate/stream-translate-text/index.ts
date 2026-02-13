import { TranslationDetailLevel } from '@/types/enums/translate';

export interface StreamTranslateTextRequestDto {
  Text: string;
  SourceLanguage: string;
  TargetLanguage: string;
  DetailLevel: TranslationDetailLevel;
  ModelId: string | null;
}
