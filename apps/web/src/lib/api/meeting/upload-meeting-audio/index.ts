import { api_paths } from '@/lib/api-routes';
import {
    UploadMeetingAudioRequest,
    UploadMeetingAudioResponse,
} from '@/types/api/meeting/upload-meeting-audio';
import { useMutation } from '@tanstack/react-query';

export async function uploadMeetingAudio(
    payload: UploadMeetingAudioRequest
): Promise<UploadMeetingAudioResponse | null> {
    const url = api_paths.meeting.upload();

    const formData = new FormData();
    formData.append('file', payload.File);
    if (payload.MeetingId) {
        formData.append('meetingId', payload.MeetingId);
    }

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
            body: formData,
        });

        if (!res.ok) return null;

        return (await res.json()) as UploadMeetingAudioResponse;
    } catch (error) {
        console.error('Upload failed', error);
        return null;
    }
}

export function useUploadMeetingAudio() {
    return useMutation({
        mutationFn: (data: UploadMeetingAudioRequest) => uploadMeetingAudio(data),
    });
}
