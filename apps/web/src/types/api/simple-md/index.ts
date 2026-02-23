export interface SummarizeMarkdownRequestDto {
  Content: string;
  ModelId: string | null;
}

export interface SummarizeMarkdownResponseDto {
  SessionId: string;
  Summary: string;
  ModelId: string;
  ProviderName: string | null;
}

export interface StreamSummarizeMarkdownRequestDto {
  UserId: string;
  Content: string;
  ModelId: string | null;
}

export interface ChatMarkdownRequestDto {
  Context: string;
  Question: string;
  ModelId: string | null;
}

export interface ChatMarkdownResponseDto {
  SessionId: string;
  Answer: string;
  ModelId: string;
  ProviderName: string | null;
}

export interface StreamChatMarkdownRequestDto {
  UserId: string;
  Context: string;
  Question: string;
  ModelId: string | null;
}
