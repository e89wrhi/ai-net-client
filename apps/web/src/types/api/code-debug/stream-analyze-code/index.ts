import { DebugDepth, ProgrammingLanguage } from '@/types/enums/code-debug';

export interface StreamAnalyzeCodeRequestDto {
  UserId: string;
  Code: string;
  Language: ProgrammingLanguage;
  Depth: DebugDepth;
  IncludeSuggestion: boolean;
  ModelId: string | null;
}
