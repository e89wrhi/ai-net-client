import { DebugDepth, ProgrammingLanguage } from '@/types/enums/code-debug';

export interface AnalyzeCodeRequestDto {
  Code: string;
  Language: ProgrammingLanguage;
  Depth: DebugDepth;
  IncludeSuggestion: boolean;
  ModelId: string | null;
}
export interface AnalyzeCodeResponseDto {
  SessionId: string;
  ReportId: string;
  Summary: string;
  IssueCount: number;
  ModelId: string;
  ProviderName: string | null;
}
