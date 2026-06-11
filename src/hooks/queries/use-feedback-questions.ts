import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFeedbackQuestion,
  deleteFeedbackQuestion,
  fetchFeedbackQuestions,
  updateFeedbackQuestion,
  type FeedbackQuestion,
} from "@/lib/api/feedback-questions";

export const feedbackQuestionKeys = {
  all: ["feedback-questions"] as const,
};

export function useFeedbackQuestions() {
  return useQuery({
    queryKey: feedbackQuestionKeys.all,
    queryFn: fetchFeedbackQuestions,
  });
}

export function useSaveFeedbackQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (question: FeedbackQuestion) =>
      question._id
        ? updateFeedbackQuestion(question._id, question)
        : createFeedbackQuestion(question),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedbackQuestionKeys.all });
    },
  });
}

export function useDeleteFeedbackQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteFeedbackQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedbackQuestionKeys.all });
    },
  });
}
