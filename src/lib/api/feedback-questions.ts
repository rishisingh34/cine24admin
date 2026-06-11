import { apiDelete, apiGet, apiPost, apiPut } from "./client";

export type FeedbackQuestion = {
  _id?: string;
  question: string;
  type: "text" | "rating";
};

export type FeedbackQuestionsResponse = {
  success: boolean;
  data: FeedbackQuestion[];
};

export type FeedbackQuestionResponse = {
  success: boolean;
  data: FeedbackQuestion;
};

export function fetchFeedbackQuestions() {
  return apiGet<FeedbackQuestionsResponse>("/api/feedback-questions");
}

export function createFeedbackQuestion(data: FeedbackQuestion) {
  return apiPost<FeedbackQuestionResponse>("/api/feedback-questions", data);
}

export function updateFeedbackQuestion(id: string, data: FeedbackQuestion) {
  return apiPut<FeedbackQuestionResponse>(
    `/api/feedback-questions/${id}`,
    data
  );
}

export function deleteFeedbackQuestion(id: string) {
  return apiDelete<FeedbackQuestionResponse>(
    `/api/feedback-questions/${id}`
  );
}
