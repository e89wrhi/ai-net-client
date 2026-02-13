export interface CreateSubscriptionRequest {
  UserId: string;
  Plan: string;
  MaxRequestsPerDay: number;
  MaxTokensPerMonth: number;
}
export interface CreateSubscriptionRequestResponse {
  Id: string;
}
