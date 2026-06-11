import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createQuestion,
  fetchQuestions,
  updateQuestion,
  type QuestionPayload,
} from "@/lib/api/questions";

export const questionKeys = {
  all: ["questions"] as const,
};

export function useQuestions() {
  return useQuery({
    queryKey: questionKeys.all,
    queryFn: fetchQuestions,
  });
}

export function useSaveQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id?: string;
      payload: QuestionPayload;
    }) => (id ? updateQuestion(id, payload) : createQuestion(payload)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: questionKeys.all });
    },
  });
}
