export enum CodeDebugFailureReason {
  UnsupportedLanguage = 0,
  TokenLimitExceeded = 1,
  Timeout = 2,
  ProviderError = 3,
}

export enum CodeDebugStatus {
  Active = 0,
  Completed = 1,
  Failed = 2,
}

export enum DebugDepth {
  Surface = 0,
  Standard = 1,
  Deep = 2,
}

export enum ProgrammingLanguage {
  CSharp = 0,
  JavaScript = 1,
  TypeScript = 2,
  Python = 3,
  Java = 4,
  Go = 5,
  Rust = 6,
  Other = 7,
}
