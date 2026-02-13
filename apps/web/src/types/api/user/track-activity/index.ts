import { TrackedModule } from '@/types/enums/user';

export interface TrackActivityRequest {
  UserId: string;
  Module: TrackedModule;
  Action: string;
  ResourceId: string;
}
export interface TrackActivityRequestResponse {
  Id: string;
}
