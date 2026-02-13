import { CompletionMode } from '@/types/enums/autocomplete';

export interface StreamAutoCompleteRequestDto {
  Prompt: string;
  Mode: CompletionMode;
  ModelId: string | null;
}
