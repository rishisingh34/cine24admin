import { apiGet, apiPost } from "./client";

export type QuestionOption = { id: number; desc: string };

export type ApiQuestion = {
  _id: string;
  subject: string;
  question: string;
  options: QuestionOption[];
  answer: number;
  code?: string;
  codeLang?: string;
};

export type QuestionsResponse = {
  success?: boolean;
  data: ApiQuestion[];
  message?: string;
};

export type QuestionResponse = {
  success?: boolean;
  data: ApiQuestion;
  message?: string;
};

export type QuestionPayload = {
  subject: string;
  question: string;
  options: QuestionOption[];
  answer: number;
  code?: string;
  codeLang?: string;
};

export function fetchQuestions() {
  return apiGet<QuestionsResponse>("/api/question");
}

export function createQuestion(payload: QuestionPayload) {
  return apiPost<QuestionResponse>("/api/question", payload);
}

export function updateQuestion(id: string, payload: QuestionPayload) {
  return apiPost<QuestionResponse>(`/api/question/${id}`, payload);
}
