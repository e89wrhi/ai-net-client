export interface AiUsageDto {
  id: { value: string };
  userId: string;
  modelId: { value: string };
  tokensConsumed: number;
  cost: number;
  providerName?: string;
  apiKeyId?: string;
  createdAt: string;
}

export type GetUsageResponseDto = AiUsageDto[];
