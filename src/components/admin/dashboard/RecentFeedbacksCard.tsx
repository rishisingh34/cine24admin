"use client";

import Link from "next/link";

export default function RecentFeedbacksCard() {
  const feedbacks = [
    { name: "Amit", message: "Loved the exam interface!" },
    { name: "Priya", message: "Need more time on section B." },
    { name: "Ravi", message: "It was smooth and intuitive." },
  ];

  return (
    <div className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-4">
      <h2 className="text-lg font-semibold text-white mb-4">
        📝 Recent Feedbacks
      </h2>
      <ul className="space-y-3">
        {feedbacks.map((fb, idx) => (
          <li key={idx} className="text-neutral-300 text-sm">
            <span className="font-medium text-white">{fb.name}:</span>{" "}
            {fb.message}
          </li>
        ))}
      </ul>
      <Link
        href="/adm/feedback"
        className="text-blue-500 text-sm mt-4 inline-block hover:underline"
      >
        View all feedbacks →
      </Link>
    </div>
  );
}
