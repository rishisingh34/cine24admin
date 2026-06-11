import { apiGet, apiPost, apiPut } from "./client";

export type Candidate = {
  _id: string;
  name: string;
  studentNumber: string;
  branch: string;
  gender: string;
  email: string;
  residence: string;
  phone: string;
  isVerified: boolean;
  password?: string;
};

export type CandidateListParams = {
  page: number;
  limit: number;
  search?: string;
  gender?: string;
  branch?: string;
  residence?: string;
};

export type CandidateListResponse = {
  success: boolean;
  data: Candidate[];
  page: number;
  totalPages: number;
  total: number;
};

export type CandidateResponse = {
  success: boolean;
  data: Candidate;
  message?: string;
};

export function fetchCandidates(params: CandidateListParams) {
  const query = new URLSearchParams({
    page: params.page.toString(),
    limit: params.limit.toString(),
    ...(params.search && { search: params.search }),
    ...(params.gender && { gender: params.gender }),
    ...(params.branch && { branch: params.branch }),
    ...(params.residence && { residence: params.residence }),
  });
  return apiGet<CandidateListResponse>(`/api/candidate?${query}`);
}

export function fetchCandidate(id: string) {
  return apiGet<CandidateResponse>(`/api/candidate/${id}`);
}

export function createCandidate(data: Omit<Candidate, "_id">) {
  return apiPost<CandidateResponse>("/api/candidate", data);
}

export function updateCandidate(
  id: string,
  data: Partial<Omit<Candidate, "_id">>
) {
  return apiPut<CandidateResponse>(`/api/candidate/${id}`, data);
}
