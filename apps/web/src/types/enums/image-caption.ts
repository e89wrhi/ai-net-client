export enum CaptionDetailLevel {
  Short = 0,
  Standard = 1,
  Detailed = 2,
}

export enum ImageCaptionFailureReason {
  InvalidImage = 0,
  UnsupportedFormat = 1,
  Timeout = 2,
  ProviderError = 3,
}

export enum ImageCaptionStatus {
  Active = 0,
  Completed = 1,
  Failed = 2,
}
