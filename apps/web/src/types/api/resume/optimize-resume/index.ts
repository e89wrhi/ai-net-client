export interface OptimizeResumeRequestDto {
  ResumeContent: string;
  JobDescription: string;
  IncludeSkill: boolean;
  IncludeEducation: boolean;
  IncludeExpireance: boolean;
  ModelId: string | null;
}
export interface OptimizeResumeResponseDto {
  ResultId: string;
  OptimizedResume: string;
  ModelId: string;
  ProviderName: string | null;
}
