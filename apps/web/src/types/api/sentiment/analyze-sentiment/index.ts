export interface AnalyzeSentimentRequestDto {
  Text: string;
  ModelId: string | null;
}
export interface AnalyzeSentimentResponseDto {
  SessionId: string;
  ResultId: string;
  Sentiment: string;
  Score: number;
  ModelId: string;
  ProviderName: string | null;
}
