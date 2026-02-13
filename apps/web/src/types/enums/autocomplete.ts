export enum AutoCompleteFailureReason {
  ModelUnavailable = 0,
  TokenLimitExceeded = 1,
  Timeout = 2,
  ProviderError = 3,
}

export enum AutoCompleteStatus {
  Active = 0,
  Completed = 1,
  Failed = 2,
}

export enum CompletionMode {
  Inline = 0,
  MultiLine = 1,
  Code = 2,
  Text = 3,
}
