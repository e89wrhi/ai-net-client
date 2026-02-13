export interface StartChatRequest {
  userId: string; // GUID
  title: string;
  aiModelId: string; // e.g., "gpt-4"
}
