const base_url = 'http://localhost:5000/api/v1';

export const api_paths = {
  chat: {
    start: (): string => `${base_url}/chat`,
    delete: (chatId: string) => `${base_url}/chat/${chatId}`,
    sendMessage: (): string => `${base_url}/chat/send-message`,
    history: (userId: string): string => `${base_url}/chat/history/${userId}`,
  },
  image: {
    upload: (): string => `${base_url}/image/upload`,
    generateCaption: (): string => `${base_url}/image/generate-caption`,
  },
  assistant: {
    lesson: (): string => `${base_url}/assistant/lesson`,
    quizSubmit: (): string => `${base_url}/assistant/quiz/submit`,
  },
  meeting: {
    upload: (): string => `${base_url}/meeting/upload`,
    summary: (meetingId: string): string =>
      `${base_url}/meeting/${meetingId}/summary`,
  },
  resume: {
    upload: (): string => `${base_url}/resume/upload`,
    analysis: (resumeId: string): string =>
      `${base_url}/resume/${resumeId}/analysis`,
  },
  user: {
    usage: (userId: string): string => `${base_url}/user/usage/${userId}`,
    activity: (userId: string): string => `${base_url}/user/activity/${userId}`,
  },
};
