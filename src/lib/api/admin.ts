import { apiGet, apiPut } from "./client";

export type AdminProfile = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export type UpdateAdminPayload = {
  name?: string;
  password?: string;
};

export function fetchAdminProfile() {
  return apiGet<AdminProfile>("/api/admin");
}

export function updateAdminProfile(data: UpdateAdminPayload) {
  return apiPut<AdminProfile>("/api/admin", data);
}
