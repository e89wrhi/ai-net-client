export interface SendMessageRequest {
  sessionId: string; // GUID
  content: string;
  sender: string; // "User" or "AI"
  tokenUsed: number;
}
