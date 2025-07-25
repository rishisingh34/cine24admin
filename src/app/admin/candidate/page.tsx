"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";

type Candidate = {
  _id: string;
  name: string;
  studentNumber: string;
  branch: string;
  gender: string;
  email: string;
  residence: string;
  phone: string;
  isVerified: boolean;
};

export default function CandidatePage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    gender: "",
    branch: "",
    residence: "",
  });

  const limit = 10;
  const router = useRouter();

  // Debounced and throttled versions of search/filter state
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [throttledFilters, setThrottledFilters] = useState(filters);

  // Debounce search input (300ms)
  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
      }, 300),
    []
  );

  // Throttle filters (update at most once per 1s)
  const throttledSetFilter = useMemo(
    () =>
      throttle((value: typeof filters) => {
        setThrottledFilters(value);
      }, 1000),
    []
  );

  useEffect(() => {
    debouncedSetSearch(search);
  }, [search, debouncedSetSearch]);

  useEffect(() => {
    throttledSetFilter(filters);
  }, [filters, throttledSetFilter]);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);

      const query = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(throttledFilters.gender && { gender: throttledFilters.gender }),
        ...(throttledFilters.branch && { branch: throttledFilters.branch }),
        ...(throttledFilters.residence && {
          residence: throttledFilters.residence,
        }),
      });

      const res = await fetch(`/api/candidate?${query.toString()}`);
      const data = await res.json();
      setCandidates(data.data);
      setTotalPages(data.totalPages);
      setLoading(false);
    };

    fetchCandidates();
  }, [page, debouncedSearch, throttledFilters]);

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const skeletonRows = Array.from({ length: limit }).map((_, idx) => (
    <tr key={idx} className="border-t border-gray-700 animate-pulse">
      <td className="p-3">
        <div className="h-4 bg-gray-700 rounded w-3/4" />
      </td>
      <td className="p-3">
        <div className="h-4 bg-gray-700 rounded w-4/5" />
      </td>
      <td className="p-3">
        <div className="h-4 bg-gray-700 rounded w-2/3" />
      </td>
      <td className="p-3">
        <div className="h-4 bg-gray-700 rounded w-1/2" />
      </td>
      <td className="p-3">
        <div className="h-4 bg-gray-700 rounded w-3/5" />
      </td>
      <td className="p-3">
        <div className="h-4 bg-gray-700 rounded w-2/5" />
      </td>
    </tr>
  ));

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none z-0" />

      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Candidates</h2>
          <Link
            href="/admin/candidate/add"
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded transition"
          >
            + Add Candidate
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name, email, number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded bg-[#1a1a1a] border border-gray-700 text-white w-40 lg:w-80 md:w-100"
          />

          <select
            value={filters.gender}
            onChange={(e) => handleFilterChange("gender", e.target.value)}
            className="px-4 py-2 rounded bg-[#1a1a1a] border border-gray-700 text-white"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select
            value={filters.branch}
            onChange={(e) => handleFilterChange("branch", e.target.value)}
            className="px-4 py-2 rounded bg-[#1a1a1a] border border-gray-700 text-white"
          >
            <option value="">All Branches</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="ME">ME</option>
          </select>

          <select
            value={filters.residence}
            onChange={(e) => handleFilterChange("residence", e.target.value)}
            className="px-4 py-2 rounded bg-[#1a1a1a] border border-gray-700 text-white"
          >
            <option value="">All Residences</option>
            <option value="Hosteller">Hosteller</option>
            <option value="Day Scholar">Day Scholar</option>
            <option value="Outstation">Other</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 shadow-xl rounded-lg bg-[#0f0f0f]">
            <thead className="bg-[#1a1a1a] text-gray-300">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Branch</th>
                <th className="p-3 text-left">Residence</th>
                <th className="p-3 text-left">Gender</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? skeletonRows
                : candidates.map((candidate) => (
                    <tr
                      key={candidate._id}
                      onClick={() =>
                        router.push(`/admin/candidate/${candidate._id}`)
                      }
                      className="border-t border-gray-700 hover:bg-[#1c1c1c] cursor-pointer"
                    >
                      <td className="p-3">{candidate.name}</td>
                      <td className="p-3">{candidate.email}</td>
                      <td className="p-3">{candidate.phone}</td>
                      <td className="p-3">{candidate.branch}</td>
                      <td className="p-3">{candidate.residence}</td>
                      <td className="p-3">{candidate.gender}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1 || loading}
            className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-40"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-300">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages || loading}
            className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
