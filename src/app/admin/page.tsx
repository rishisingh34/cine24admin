"use client";

import React, { useEffect, useState } from "react";
import { useSocketStore } from "@/stores/socketstore";

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

    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="space-y-8 p-4">
            <h1 className="text-3xl font-bold text-white">Leaderboard</h1>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-md">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-white border-separate border-spacing-y-2">
                        <thead className="bg-neutral-800 rounded">
                            <tr>
                                <th className="px-4 py-3">#</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Student No</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Gender</th>
                                <th className="px-4 py-3">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedLeaderboard.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-6 text-center text-neutral-400"
                                    >
                                        Loading leaderboard...
                                    </td>
                                </tr>
                            ) : (
                                paginatedLeaderboard.map((entry, idx) => (
                                    <tr
                                        key={entry.email}
                                        className="bg-neutral-800 hover:bg-neutral-700 transition rounded"
                                    >
                                        <td className="px-4 py-3 font-semibold text-white">
                                            {(currentPage - 1) * PAGE_SIZE +
                                                idx +
                                                1}
                                        </td>
                                        <td className="px-4 py-3">
                                            {entry.name}
                                        </td>
                                        <td className="px-4 py-3">
                                            {entry.studentNumber}
                                        </td>
                                        <td className="px-4 py-3">
                                            {entry.email}
                                        </td>
                                        <td className="px-4 py-3 capitalize">
                                            {entry.gender}
                                        </td>
                                        <td className="px-4 py-3 font-bold text-green-400">
                                            {entry.score}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-6">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-white">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;