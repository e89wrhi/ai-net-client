export enum ChatFailureReason {
  ModelUnavailable = 0,
  TokenLimitExceeded = 1,
  Timeout = 2,
  ProviderError = 3,
}

export enum MessageSender {
  System = 0,
  User = 1,
  Assistant = 2,
  Tool = 3,
}

export enum SessionStatus {
  Active = 0,
  Completed = 1,
  Failed = 2,
  Deleted = 3,
}
