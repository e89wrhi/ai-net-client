import { CodeQualityLevel, CodeStyle } from '@/types/enums/code-gen';

export interface StreamGenerateCodeRequestDto {
  UserId: string;
  Prompt: string;
  Language: string;
  Quality: CodeQualityLevel;
  Style: CodeStyle;
  IncludeComments: boolean;
  ModelId: string | null;
}
