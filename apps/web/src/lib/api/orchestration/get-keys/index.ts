import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import { GetApiKeysResponseDto } from '@/types/api/orchestration/get-keys';
import { useQuery } from '@tanstack/react-query';

export async function getApiKeys(): Promise<GetApiKeysResponseDto | null> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
    return getMockApiKeys();
  }

  const url = api_paths.orchestration.keys();

  return fetchClient<GetApiKeysResponseDto | null>(url, {
    method: 'GET',
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  });
}

export function useGetApiKeys() {
  return useQuery({
    queryKey: ['orchestration-keys'],
    queryFn: () => getApiKeys(),
  });
}

function getMockApiKeys(): GetApiKeysResponseDto {
  return [
    {
      id: 'key-001',
      providerName: 'OpenAI',
      label: 'Production AI Chat',
      isActive: true,
      lastUsedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      maskedKey: 'sk-proj-••••••••••••••••3aB2',
      fullKey:
        'sk-proj-7x8v9w0z1y2x3w4v5u6t7s8r9q0p1o2n3m4l5k6j7i8h9g0f1e2d3c4b5a2',
    },
    {
      id: 'key-002',
      providerName: 'Anthropic',
      label: 'Claude Beta Testing',
      isActive: true,
      lastUsedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      maskedKey: 'sk-ant-••••••••••••••••f9Wz',
      fullKey:
        'sk-ant-api03-abcdefghijklmnopqrstuvwxyz0123456789-abcdefghijklmnopqrstuvwxyz0123456789f9Wz',
    },
    {
      id: 'key-003',
      providerName: 'Google',
      label: 'Gemini Research',
      isActive: false,
      maskedKey: 'AIzaSy••••••••••••••••7xQ9',
      fullKey: 'AIzaSy8x9w0z1y2x3w4v5u6t7s8r9q0p1o2n3m4l5k6j7i87xQ9',
    },
  ];
}
