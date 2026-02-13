import { CodeQualityLevel, CodeStyle } from '@/types/enums/code-gen';

export interface GenerateCodeRequestDto {
  Prompt: string;
  Language: string;
  Quality: CodeQualityLevel;
  Style: CodeStyle;
  IncludeComments: boolean;
  ModelId: string | null;
}
export interface GenerateCodeResponseDto {
  SessionId: string;
  ResultId: string;
  Code: string;
  ModelId: string;
  ProviderName: string | null;
}
