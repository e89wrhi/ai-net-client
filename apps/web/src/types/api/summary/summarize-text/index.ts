import { SummaryDetailLevel } from '@/types/enums/summary';

export interface SummarizeTextRequestDto {
  Text: string;
  DetailLevel: SummaryDetailLevel;
  Language: string;
  ModelId: string | null;
}
export interface SummarizeTextResponseDto {
  SessionId: string;
  ResultId: string;
  Summary: string;
  ModelId: string;
  ProviderName: string | null;
}
