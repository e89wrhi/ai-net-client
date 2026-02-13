export enum TranslationDetailLevel {
  Basic = 0,
  Standard = 1,
  Fluent = 2,
  Formal = 3,
}

export enum TranslationFailureReason {
  InvalidText = 0,
  UnsupportedLanguage = 1,
  TokenLimitExceeded = 2,
  Timeout = 3,
  ProviderError = 4,
}

export enum TranslationStatus {
  Active = 0,
  Completed = 1,
  Failed = 2,
}
