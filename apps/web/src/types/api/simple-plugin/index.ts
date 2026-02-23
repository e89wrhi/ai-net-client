export interface BingSearchRequestDto {
  Query: string;
  ModelId: string | null;
}

export interface PluginResult {
  title: string;
  snippet: string;
  url: string;
}

export interface BingSearchResponseDto {
  SessionId: string;
  Results: PluginResult[];
  ModelId: string;
  ProviderName: string | null;
}

export interface StreamBingSearchRequestDto {
  UserId: string;
  Query: string;
  ModelId: string | null;
}
