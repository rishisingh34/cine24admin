"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCandidates } from "@/hooks/queries/use-candidates";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import LoadingCenter from "@/components/ui/LoadingCenter";

export default function CandidatePage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    gender: "",
    branch: "",
    residence: "",
  });

  const limit = 10;
  const router = useRouter();
  const debouncedSearch = useDebouncedValue(search, 300);
  const debouncedFilters = useDebouncedValue(filters, 300);

  const { data, isLoading, isFetching } = useCandidates({
    page,
    limit,
    search: debouncedSearch || undefined,
    gender: debouncedFilters.gender || undefined,
    branch: debouncedFilters.branch || undefined,
    residence: debouncedFilters.residence || undefined,
  });

  const candidates = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;
  const loading = isLoading || isFetching;

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Candidates"
        action={
          <Link href="/admin/candidate/add">
            <Button variant="success">+ Add Candidate</Button>
          </Link>
        }
      />

      <div className="flex flex-wrap items-end gap-4">
        <div className="w-full sm:w-80">
          <Input
            label="Search"
            type="text"
            placeholder="Name, email, number..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="w-40">
          <Select
            label="Gender"
            value={filters.gender}
            onChange={(e) => handleFilterChange("gender", e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </div>

        <div className="w-40">
          <Select
            label="Branch"
            value={filters.branch}
            onChange={(e) => handleFilterChange("branch", e.target.value)}
          >
            <option value="">All Branches</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="ME">ME</option>
          </Select>
        </div>

        <div className="w-44">
          <Select
            label="Residence"
            value={filters.residence}
            onChange={(e) => handleFilterChange("residence", e.target.value)}
          >
            <option value="">All Residences</option>
            <option value="Hosteller">Hosteller</option>
            <option value="Day Scholar">Day Scholar</option>
            <option value="Outstation">Other</option>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full rounded-lg border border-gray-700 bg-[#0f0f0f] shadow-xl">
          <thead className="bg-[#1a1a1a] text-gray-300">
            <tr>
              <th className="p-3.5 text-left font-medium">Name</th>
              <th className="p-3.5 text-left font-medium">Email</th>
              <th className="p-3.5 text-left font-medium">Phone</th>
              <th className="p-3.5 text-left font-medium">Branch</th>
              <th className="p-3.5 text-left font-medium">Residence</th>
              <th className="p-3.5 text-left font-medium">Gender</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>
                  <LoadingCenter className="h-24" />
                </td>
              </tr>
            ) : (
              candidates.map((candidate) => (
                <tr
                  key={candidate._id}
                  onClick={() =>
                    router.push(`/admin/candidate/${candidate._id}`)
                  }
                  className="cursor-pointer border-t border-gray-700 transition duration-200 ease-out hover:bg-[#1c1c1c]/80"
                >
                  <td className="p-3.5">{candidate.name}</td>
                  <td className="p-3.5">{candidate.email}</td>
                  <td className="p-3.5">{candidate.phone}</td>
                  <td className="p-3.5">{candidate.branch}</td>
                  <td className="p-3.5">{candidate.residence}</td>
                  <td className="p-3.5">{candidate.gender}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="secondary"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1 || loading}
        >
          Previous
        </Button>
        <span className="px-4 py-2 text-gray-300">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="secondary"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages || loading}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
