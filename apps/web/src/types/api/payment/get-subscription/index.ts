export interface SubscriptionDto {
  Id: string;
  UserId: string;
  Plan: string;
  Status: string;
  StartedAt: Date | null;
  ExpiresAt: Date | null;
}
