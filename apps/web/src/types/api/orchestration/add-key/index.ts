export interface AddApiKeyRequestDto {
  provider: string;
  key: string;
  label: string;
}

export interface AddApiKeyResponseDto {
  id: string;
  provider: string;
  label: string;
}
