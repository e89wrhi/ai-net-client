export interface UploadImageRequest {
  userId: string;
  imageUrl: string;
  fileName: string;
  width: number;
  height: number;
  size: number;
  format: string;
}
