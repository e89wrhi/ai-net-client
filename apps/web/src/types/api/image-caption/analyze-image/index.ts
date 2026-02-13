import { CaptionDetailLevel } from '@/types/enums/image-caption';

export interface AnalyzeImageRequestDto {
  ImageUrlOrBase64: string;
  Level: CaptionDetailLevel;
  ModelId: string | null;
}
export interface AnalyzeImageResponseDto {
  SessionId: string;
  ResultId: string;
  Analysis: string;
  ModelId: string;
  ProviderName: string | null;
}
