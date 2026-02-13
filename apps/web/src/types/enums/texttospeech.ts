export enum SpeechSpeed {
  Slow = 0,
  Normal = 1,
  Fast = 2,
}

export enum TextToSpeechFailureReason {
  InvalidText = 0,
  TokenLimitExceeded = 1,
  Timeout = 2,
  ProviderError = 3,
}

export enum TextToSpeechStatus {
  Active = 0,
  Completed = 1,
  Failed = 2,
}

export enum VoiceType {
  Male = 0,
  Female = 1,
  Neutral = 2,
}
