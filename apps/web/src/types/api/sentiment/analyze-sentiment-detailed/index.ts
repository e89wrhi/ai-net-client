import { SentimentDetailLevel } from '@/types/enums/sentiment';

export interface AnalyzeSentimentDetailedRequestDto {
  Text: string;
  Language: string;
  DetailLevel: SentimentDetailLevel;
  ModelId: string | null;
}
export interface AnalyzeSentimentDetailedResponseDto {
  SessionId: string;
  ResultId: string;
  Sentiment: string;
  Score: number;
  Explanation: string;
  ModelId: string;
  ProviderName: string | null;
}
