export interface ReGenerateCodeRequestDto {
  SessionId: string;
  Instruction: string;
  ModelId: string | null;
}
export interface ReGenerateCodeResponseDto {
  ResultId: string;
  Code: string;
  ModelId: string;
  ProviderName: string | null;
}
