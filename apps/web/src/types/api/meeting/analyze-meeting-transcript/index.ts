export interface AnalyzeMeetingTranscriptRequestDto {
  Transcript: string;
  IncludeActionItems: boolean;
  IncludeDescisions: boolean;
  Language: string;
  ModelId: string | null;
}
export interface AnalyzeMeetingTranscriptResponseDto {
  MeetingId: string;
  TranscriptId: string;
  Summary: string;
  ModelId: string;
  ProviderName: string | null;
}
