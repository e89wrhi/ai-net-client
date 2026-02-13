import { ImageEditQuality, ImageFormat } from '@/types/enums/image-edit';

export interface RemoveBackgroundRequestDto {
  ImageUrlOrBase64: string;
  Quality: ImageEditQuality;
  Format: ImageFormat;
  ModelId: string | null;
}
export interface RemoveBackgroundResponseDto {
  SessionId: string;
  ResultId: string;
  ResultImageUrl: string;
  ModelId: string;
  ProviderName: string | null;
}
