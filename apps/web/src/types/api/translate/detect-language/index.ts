export interface DetectLanguageRequestDto {
  Text: string;
  ModelId: string | null;
}
export interface DetectLanguageResponseDto {
  DetectedLanguageCode: string;
  Confidence: number;
  ModelId: string;
  ProviderName: string | null;
}
