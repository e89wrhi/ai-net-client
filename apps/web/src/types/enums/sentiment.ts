export enum Sentiment {
  Positive = 0,
  Neutral = 1,
  Negative = 2,
  Mixed = 3,
}

export enum SentimentDetailLevel {
  Basic = 0,
  Standard = 1,
  Detailed = 2,
}

export enum TextSentimentFailureReason {
  InvalidText = 0,
  TokenLimitExceeded = 1,
  Timeout = 2,
  ProviderError = 3,
}

export enum TextSentimentStatus {
  Active = 0,
  Completed = 1,
  Failed = 2,
}
