import { useQuery } from "@tanstack/react-query";
import { fetchFeedbacks } from "@/lib/api/feedback";

export const feedbackKeys = {
  all: ["feedbacks"] as const,
};

export function useFeedbacks() {
  return useQuery({
    queryKey: feedbackKeys.all,
    queryFn: fetchFeedbacks,
  });
}
