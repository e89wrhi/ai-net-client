export enum SummaryDetailLevel {
  Short = 0,
  Standard = 1,
  Detailed = 2,
}

export enum TextSummaryFailureReason {
  InvalidText = 0,
  TokenLimitExceeded = 1,
  Timeout = 2,
  ProviderError = 3,
}

export enum TextSummaryStatus {
  Active = 0,
  Completed = 1,
  Failed = 2,
}
