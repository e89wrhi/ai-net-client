export interface ForecastSpendingWithAIRequestDto {
  UserId: string;
}
export interface ForecastSpendingWithAIResponseDto {
  ForecastedAmount: number;
  Currency: string;
  Insights: string;
}
