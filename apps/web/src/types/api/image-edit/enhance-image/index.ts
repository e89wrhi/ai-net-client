import { ImageEditQuality, ImageFormat } from '@/types/enums/image-edit';

export interface EnhanceImageRequestDto {
  ImageUrlOrBase64: string;
  Prompt: string;
  Quality: ImageEditQuality;
  Format: ImageFormat;
  ModelId: string | null;
}
export interface EnhanceImageResponseDto {
  SessionId: string;
  ResultId: string;
  ResultImageUrl: string;
  ModelId: string;
  ProviderName: string | null;
}
