import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import {
    TrackActivityRequest,
    TrackActivityRequestResponse,
} from '@/types/api/user/track-activity';
import { useMutation } from '@tanstack/react-query';

export async function trackActivity(
    payload: TrackActivityRequest
): Promise<TrackActivityRequestResponse | null> {
    const url = api_paths.user.track_activity();

    return fetchClient<TrackActivityRequestResponse | null>(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        token: process.env.NEXT_PUBLIC_API_TOKEN,
    });
}

export function useTrackActivity() {
    return useMutation({
        mutationFn: (data: TrackActivityRequest) => trackActivity(data),
    });
}
