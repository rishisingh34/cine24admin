"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronRight } from "lucide-react";

interface FeedbackEntry {
  question: string;
  type: "text" | "rating";
  answer: string | number;
}

interface Feedback {
  _id: string;
  candidateId: {
    name: string;
    email: string;
  };
  feedbacks: FeedbackEntry[];
  createdAt: string;
}

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      _id: "1a2b3c",
      candidateId: {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
      },
      feedbacks: [
        {
          question: "Rate the candidate's communication skills",
          type: "rating",
          answer: 4,
        },
        {
          question: "Any additional comments?",
          type: "text",
          answer: "Very clear communicator and good listener.",
        },
      ],
      createdAt: "2025-07-24T15:30:00.000Z",
    },
    {
      _id: "4d5e6f",
      candidateId: {
        name: "Bob Martinez",
        email: "bob.martinez@example.com",
      },
      feedbacks: [
        {
          question: "Rate technical problem-solving ability",
          type: "rating",
          answer: 5,
        },
        {
          question: "Suggestions for improvement?",
          type: "text",
          answer: "Should work on time management.",
        },
      ],
      createdAt: "2025-07-23T11:00:00.000Z",
    },
  ]);

  const [loading, setLoading] = useState(true);
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch("/api/feedback");
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message);
        setFeedbacks(data.data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        toast.error("Failed to load feedbacks.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-6 text-white bg-[#1e1e1e] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Candidate Feedback</h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : feedbacks.length === 0 ? (
        <p className="text-gray-500">No feedbacks found.</p>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((f) => {
            const isOpen = openIds[f._id] ?? false;
            return (
              <div
                key={f._id}
                className="bg-[#2b2b2b] rounded-lg border border-[#333]"
              >
                <button
                  onClick={() => toggleOpen(f._id)}
                  className="w-full flex justify-between items-center px-5 py-4 focus:outline-none hover:bg-[#2f2f2f] transition-colors"
                >
                  <div className="text-left">
                    <p className="font-semibold text-lg">
                      👤 {f.candidateId.name} ({f.candidateId.email})
                    </p>
                    <p className="text-sm text-gray-400">
                      Submitted: {new Date(f.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {isOpen ? (
                    <ChevronDown className="text-gray-300" />
                  ) : (
                    <ChevronRight className="text-gray-300" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 space-y-4">
                    {f.feedbacks.map((fb, idx) => (
                      <div
                        key={idx}
                        className="border border-[#444] p-4 rounded-md bg-[#1f1f1f]"
                      >
                        <p className="text-sm text-gray-300">
                          Q: {fb.question}
                        </p>
                        <p className="mt-1 font-medium text-orange-400">
                          A:{" "}
                          {fb.type === "rating" ? (
                            <span>{fb.answer} ⭐</span>
                          ) : (
                            <span>{fb.answer}</span>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}