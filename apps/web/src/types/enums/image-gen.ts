export enum ImageGenerationFailureReason {
  UnsafePrompt = 0,
  TokenLimitExceeded = 1,
  Timeout = 2,
  ProviderError = 3,
}

export enum ImageGenerationStatus {
  Active = 0,
  Completed = 1,
  Failed = 2,
}

export enum ImageQuality {
  Low = 0,
  Medium = 1,
  High = 2,
  Ultra = 3,
}

export enum ImageSize {
  Small = 0,
  Medium = 1,
  Large = 2,
  Square = 3,
  Portrait = 4,
  Landscape = 5,
}

export enum ImageStyle {
  Realistic = 0,
  Illustration = 1,
  Anime = 2,
  Sketch = 3,
  DigitalArt = 4,
  OilPainting = 5,
  Watercolor = 6,
}
