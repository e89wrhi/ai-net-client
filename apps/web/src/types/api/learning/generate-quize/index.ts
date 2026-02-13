import { DifficultyLevel, LearningMode } from '@/types/enums/learn';

export interface GenerateQuizRequestDto {
  Topic: string;
  QuestionCount: number;
  Mode: LearningMode;
  DifficultyLevel: DifficultyLevel;
  ModelId: string | null;
}
export interface GenerateQuizResponseDto {
  SessionId: string;
  ActivityId: string;
  QuizContent: string;
  ModelId: string;
  ProviderName: string | null;
}
