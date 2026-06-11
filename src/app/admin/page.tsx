"use client";

import React, { useEffect, useState } from "react";
import { useSocketStore } from "@/stores/socketstore";
import LoadingCenter from "@/components/ui/LoadingCenter";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";

const PAGE_SIZE = 10;

function AdminDashboard() {
  const { initSocket, leaderboard } = useSocketStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  const totalPages = Math.ceil(leaderboard.length / PAGE_SIZE);
  const paginatedLeaderboard = leaderboard.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Leaderboard" />

      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-1 text-left text-sm text-white">
            <thead className="rounded bg-neutral-800">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Student No</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Gender</th>
                <th className="px-4 py-3 font-medium">Score</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLeaderboard.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center">
                    <LoadingCenter className="h-32" />
                  </td>
                </tr>
              ) : (
                paginatedLeaderboard.map((entry, idx) => (
                  <tr
                    key={entry.email}
                    className="rounded bg-neutral-800/50 transition duration-200 ease-out hover:bg-neutral-800"
                  >
                    <td className="px-4 py-3.5 font-medium text-white">
                      {(currentPage - 1) * PAGE_SIZE + idx + 1}
                    </td>
                    <td className="px-4 py-3.5">{entry.name}</td>
                    <td className="px-4 py-3.5">{entry.studentNumber}</td>
                    <td className="px-4 py-3.5">{entry.email}</td>
                    <td className="px-4 py-3.5 capitalize">{entry.gender}</td>
                    <td className="px-4 py-3.5 font-semibold text-green-400">
                      {entry.score}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="secondary"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-white">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="secondary"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
