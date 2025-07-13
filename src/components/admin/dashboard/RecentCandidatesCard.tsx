"use client";

import Link from "next/link";

export default function RecentCandidatesCard() {
  const candidates = [
    { name: "Meena Patel", email: "meena@example.com" },
    { name: "Arjun Verma", email: "arjun@example.com" },
    { name: "Neha Yadav", email: "neha@example.com" },
  ];

  return (
    <div className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-4">
      <h2 className="text-lg font-semibold text-white mb-4">
        🧑‍🎓 Recent Candidates
      </h2>
      <ul className="space-y-3">
        {candidates.map((user, idx) => (
          <li key={idx} className="text-neutral-300 text-sm">
            <span className="font-medium text-white">{user.name}</span> –{" "}
            {user.email}
          </li>
        ))}
      </ul>
      <Link
        href="/adm/candidate"
        className="text-blue-500 text-sm mt-4 inline-block hover:underline"
      >
        View all candidates →
      </Link>
    </div>
  );
}
