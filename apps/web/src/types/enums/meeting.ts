export enum MeetingAnalysisFailureReason {
  ModelUnavailable = 0,
  TokenLimitExceeded = 1,
  Timeout = 2,
  ProviderError = 3,
}

export enum MeetingAnalysisStatus {
  Active = 0,
  Completed = 1,
  Failed = 2,
}
