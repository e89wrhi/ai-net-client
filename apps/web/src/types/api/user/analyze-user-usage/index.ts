export interface AnalyzeUserUsageWithAIRequestDto {
  UserId: string;
}
export interface AnalyzeUserUsageWithAIResponseDto {
  UsageSummary: string;
  Recommendations: string;
}
