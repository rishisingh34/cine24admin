import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAdminProfile,
  updateAdminProfile,
  type UpdateAdminPayload,
} from "@/lib/api/admin";

export const adminKeys = {
  profile: ["admin-profile"] as const,
};

export function useAdminProfile() {
  return useQuery({
    queryKey: adminKeys.profile,
    queryFn: fetchAdminProfile,
  });
}

export function useUpdateAdminProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateAdminPayload) => updateAdminProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.profile });
    },
  });
}
