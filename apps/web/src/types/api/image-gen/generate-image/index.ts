import { ImageQuality, ImageSize, ImageStyle } from '@/types/enums/image-gen';

export interface GenerateImageRequestDto {
  Prompt: string;
  Size: ImageSize;
  Style: ImageStyle;
  Quality: ImageQuality;
  ModelId: string | null;
}
export interface GenerateImageResponseDto {
  SessionId: string;
  ResultId: string;
  ImageUrl: string;
  ModelId: string;
  ProviderName: string | null;
}
