export interface StreamMeetingAnalysisRequestDto {
  UserId: string;
  Transcript: string;
  IncludeActionItems: boolean;
  IncludeDescisions: boolean;
  Language: string;
  ModelId: string | null;
}
