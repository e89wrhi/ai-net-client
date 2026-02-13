export enum BillingCycle {
  Monthly = 0,
  Quarterly = 1,
  Yearly = 2,
}

export enum InvoiceStatus {
  Unpaid = 0,
  Paid = 1,
  Cancelled = 2,
}

export enum PaymentFailureReason {
  InsufficientFunds = 0,
  CardDeclined = 1,
  Timeout = 2,
  ProviderError = 3,
}

export enum PaymentStatus {
  Pending = 0,
  Completed = 1,
  Failed = 2,
  Refunded = 3,
}

export enum SubscriptionStatus {
  Active = 0,
  Paused = 1,
  Cancelled = 2,
}
