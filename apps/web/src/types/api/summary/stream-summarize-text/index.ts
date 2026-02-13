import { SummaryDetailLevel } from '@/types/enums/summary';

export interface StreamSummarizeTextRequestDto {
  Text: string;
  DetailLevel: SummaryDetailLevel;
  Language: string;
  ModelId: string | null;
}
