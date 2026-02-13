import { CompletionMode } from '@/types/enums/autocomplete';

export interface GenerateAutoCompleteRequestDto {
  Prompt: string;
  Mode: CompletionMode;
  ModelId: string | null;
}
export interface GenerateAutoCompleteResponseDto {
  Completion: string;
  TokensUsed: number;
  EstimatedCost: number;
  ModelId: string;
  ProviderName: string | null;
}
