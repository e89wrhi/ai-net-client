export interface UploadMeetingAudioRequest {
    File: File;
    MeetingId?: string;
}

export interface UploadMeetingAudioResponse {
    TranscriptId: string;
    Status: string;
}
