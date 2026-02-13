export enum DifficultyLevel {
  Easy = 0,
  Medium = 1,
  Hard = 2,
  Expert = 3,
}

export enum LearningFailureReason {
  ModelUnavailable = 0,
  TokenLimitExceeded = 1,
  Timeout = 2,
  ProviderError = 3,
}

export enum LearningMode {
  Guided = 0,
  SelfPaced = 1,
  Quiz = 2,
  Interactive = 3,
}

export enum LearningSessionStatus {
  Active = 0,
  Completed = 1,
  Failed = 2,
}
