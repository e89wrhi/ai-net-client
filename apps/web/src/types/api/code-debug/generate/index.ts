export interface GenerateFixRequestDto {
  SessionId: string;
  ReportId: string;
  ModelId: string | null;
}
export interface GenerateFixResponseDto {
  FixedCode: string;
  Explanation: string;
  ModelId: string;
  ProviderName: string | null;
}
