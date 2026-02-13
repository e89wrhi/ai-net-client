export interface SubmitQuizRequest {
  LessonId: string;
  QuizId: string;
  Score: number;
}
export interface SubmitQuizRequestResponse {
  Id: string;
}
