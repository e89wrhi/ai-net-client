export interface ApiKeyDto {
  id: string;
  providerName: string;
  label: string;
  isActive: boolean;
  lastUsedAt?: string;
  maskedKey?: string;
  fullKey?: string;
}

export type GetApiKeysResponseDto = ApiKeyDto[];
