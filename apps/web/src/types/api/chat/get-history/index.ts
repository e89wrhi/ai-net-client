export interface ChatDto {
  Id: string;
  UserId: string;
  Title: string;
  Summary: string;
  AiModelId: string;
  SessionStatus: string;
  LastSentAt: Date;
  TotalTokens: number;
}
