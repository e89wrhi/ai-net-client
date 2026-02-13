export interface ExtractActionItemsRequestDto {
  Transcript: string;
  IncludeActionItems: boolean;
  IncludeDescisions: boolean;
  Language: string;
  ModelId: string | null;
}
export interface ExtractActionItemsResponseDto {
  MeetingId: string;
  ActionItems: string;
  ModelId: string;
  ProviderName: string | null;
}
