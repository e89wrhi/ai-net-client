import { DifficultyLevel, LearningMode } from '@/types/enums/learn';

export interface StreamAILessonRequestDto {
  UserId: string;
  Topic: string;
  Mode: LearningMode;
  DifficultyLevel: DifficultyLevel;
  ModelId: string | null;
}
