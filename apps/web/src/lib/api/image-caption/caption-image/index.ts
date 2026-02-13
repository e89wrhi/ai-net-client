import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
  ImageCaptionRequestDto,
  ImageCaptionResponseDto,
} from '@/types/api/image-caption/caption-image';
import { useMutation } from '@tanstack/react-query';

export async function captionImage(
  payload: ImageCaptionRequestDto
): Promise<ImageCaptionResponseDto | null> {
  const url = api_paths.image_caption.caption();

  return fetchClient<ImageCaptionResponseDto | null>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useCaptionImage() {
  return useMutation({
    mutationFn: (data: ImageCaptionRequestDto) => captionImage(data),
  });
}
