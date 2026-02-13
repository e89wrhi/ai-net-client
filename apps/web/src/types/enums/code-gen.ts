export enum CodeGenerationFailureReason {
  UnsupportedLanguage = 0,
  TokenLimitExceeded = 1,
  Timeout = 2,
  ProviderError = 3,
}

export enum CodeGenerationStatus {
  Active = 0,
  Completed = 1,
  Failed = 2,
}

export enum CodeQualityLevel {
  Draft = 0,
  ProductionReady = 1,
  Optimized = 2,
}

export enum CodeStyle {
  Minimal = 0,
  Standard = 1,
  Enterprise = 2,
  Functional = 3,
}
