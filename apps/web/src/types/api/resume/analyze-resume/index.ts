export interface AnalyzeResumeRequestDto {
  ResumeContent: string;
  IncludeSkill: boolean;
  IncludeEducation: boolean;
  IncludeExpireance: boolean;
  ModelId: string | null;
}
export interface AnalyzeResumeResponseDto {
  SessionId: string;
  ResultId: string;
  Summary: string;
  Score: number;
  ModelId: string;
  ProviderName: string | null;
}
