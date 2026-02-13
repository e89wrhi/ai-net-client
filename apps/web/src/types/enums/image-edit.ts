export enum EditOperation {
  Resize = 0,
  Crop = 1,
  Enhance = 2,
  StyleTransfer = 3,
  BackgroundRemoval = 4,
  ObjectRemoval = 5,
  ObjectInsertion = 6,
}

export enum ImageEditFailureReason {
  InvalidImage = 0,
  UnsupportedFormat = 1,
  Timeout = 2,
  ProviderError = 3,
}

export enum ImageEditQuality {
  Low = 0,
  Medium = 1,
  High = 2,
}

export enum ImageEditStatus {
  Active = 0,
  Completed = 1,
  Failed = 2,
}

export enum ImageFormat {
  Png = 0,
  Jpeg = 1,
  Webp = 2,
}
