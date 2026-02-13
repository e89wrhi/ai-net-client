export interface ReGenerateImageRequestDto {
  SessionId: string;
  Instruction: string;
  ModelId: string | null;
}
export interface ReGenerateImageResponseDto {
  ResultId: string;
  ImageUrl: string;
  ModelId: string;
  ProviderName: string | null;
}
