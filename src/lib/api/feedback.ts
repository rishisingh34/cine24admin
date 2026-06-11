import { apiGet } from "./client";

export type FeedbackEntry = {
  question: string;
  type: "text" | "rating";
  answer: string | number;
};

export type Feedback = {
  _id: string;
  candidateId: {
    name: string;
    email: string;
  };
  feedbacks: FeedbackEntry[];
  createdAt: string;
};

export type FeedbacksResponse = {
  success: boolean;
  data: Feedback[];
  message?: string;
};

export function fetchFeedbacks() {
  return apiGet<FeedbacksResponse>("/api/feedback");
}
