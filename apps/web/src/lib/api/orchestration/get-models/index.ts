import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import { GetModelsResponseDto } from '@/types/api/orchestration/get-models';
import { useQuery } from '@tanstack/react-query';

export async function getModels(): Promise<GetModelsResponseDto | null> {
    const url = api_paths.orchestration.models();

    return fetchClient<GetModelsResponseDto | null>(url, {
        method: 'GET',
        token: process.env.NEXT_PUBLIC_API_TOKEN,
    });
}

export function useGetModels() {
    return useQuery({
        queryKey: ['orchestration-models'],
        queryFn: () => getModels(),
    });
}
