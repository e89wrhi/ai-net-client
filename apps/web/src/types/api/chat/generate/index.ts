export interface GenerateResponseRequestDto {
  SessionId: string;
  ModelId: string | null;
}
export interface GenerateResponseResponseDto {
  MessageId: string;
  Content: string;
  ModelId: string;
  ProviderName: string | null;
}
