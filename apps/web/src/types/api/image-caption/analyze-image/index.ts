export interface GenerateCaptionRequest {
  imageId: string;
  captionText: string;
  confidence: number;
  language: string;
}
