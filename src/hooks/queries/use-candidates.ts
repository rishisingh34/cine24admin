import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCandidate,
  fetchCandidate,
  fetchCandidates,
  updateCandidate,
  type CandidateListParams,
} from "@/lib/api/candidates";

export const candidateKeys = {
  all: ["candidates"] as const,
  lists: () => [...candidateKeys.all, "list"] as const,
  list: (params: CandidateListParams) =>
    [...candidateKeys.lists(), params] as const,
  details: () => [...candidateKeys.all, "detail"] as const,
  detail: (id: string) => [...candidateKeys.details(), id] as const,
};

export function useCandidates(params: CandidateListParams) {
  return useQuery({
    queryKey: candidateKeys.list(params),
    queryFn: () => fetchCandidates(params),
  });
}

export function useCandidate(id: string) {
  return useQuery({
    queryKey: candidateKeys.detail(id),
    queryFn: () => fetchCandidate(id),
    enabled: !!id,
  });
}

export function useCreateCandidate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: candidateKeys.lists() });
    },
  });
}

export function useUpdateCandidate(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof updateCandidate>[1]) =>
      updateCandidate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: candidateKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: candidateKeys.lists() });
    },
  });
}
