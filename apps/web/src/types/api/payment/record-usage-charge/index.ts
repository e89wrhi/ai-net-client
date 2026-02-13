export interface RecordUsageChargeRequest {
  SubscriptionId: string;
  TokenUsed: string;
  Description: string;
  Cost: number;
  Currency: string;
  Module: string;
}
export interface RecordUsageChargeRequestResponse {
  Id: string;
}
