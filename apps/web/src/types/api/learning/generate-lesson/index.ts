import { DifficultyLevel, LearningMode } from '@/types/enums/learn';

export interface GenerateLessonRequestDto {
  Topic: string;
  Mode: LearningMode;
  DifficultyLevel: DifficultyLevel;
  ModelId: string | null;
}
export interface GenerateLessonResponseDto {
  SessionId: string;
  ActivityId: string;
  Content: string;
  ModelId: string;
  ProviderName: string | null;
}
