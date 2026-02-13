export enum SpeechToTextDetailLevel {
  Basic = 0,
  Standard = 1,
  Detailed = 2,
}

export enum SpeechToTextFailureReason {
  InvalidAudio = 0,
  UnsupportedFormat = 1,
  TokenLimitExceeded = 2,
  Timeout = 3,
  ProviderError = 4,
}

export enum SpeechToTextStatus {
  Active = 0,
  Completed = 1,
  Failed = 2,
}
