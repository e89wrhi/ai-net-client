import { CaptionDetailLevel } from '@/types/enums/image-caption';

export interface ImageCaptionRequestDto {
  ImageUrlOrBase64: string;
  Level: CaptionDetailLevel;
  ModelId: string | null;
}
export interface ImageCaptionResponseDto {
  SessionId: string;
  ResultId: string;
  Caption: string;
  ModelId: string;
  ProviderName: string | null;
}
