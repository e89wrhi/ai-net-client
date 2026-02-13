export interface ChatDto {
  id: string;
  userId: string;
  title: string;
  summary: string;
  aiModelId: string;
  sessionStatus: string;
  lastSentAt: string; // ISO Date string
  totalTokens: number;
}

export interface ChatHistoryResponse {
  chatDtos: ChatDto[];
}
