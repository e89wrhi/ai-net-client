export interface ApiKeyDto {
  id: string;
  providerName: string;
  label: string;
  isActive: boolean;
  lastUsedAt?: string;
}

export type GetApiKeysResponseDto = ApiKeyDto[];
