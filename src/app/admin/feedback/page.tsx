"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Star, User } from "lucide-react";
import { useFeedbacks } from "@/hooks/queries/use-feedback";
import PageHeader from "@/components/ui/PageHeader";
import LoadingCenter from "@/components/ui/LoadingCenter";

export default function FeedbackPage() {
  const { data, isLoading } = useFeedbacks();
  const feedbacks = data?.data ?? [];
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Candidate Feedback" />

      {isLoading ? (
        <LoadingCenter className="h-64" />
      ) : feedbacks.length === 0 ? (
        <p className="text-gray-500">No feedbacks found.</p>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((f) => {
            const isOpen = openIds[f._id] ?? false;
            return (
              <div
                key={f._id}
                className="rounded-lg border border-[#333] bg-[#2b2b2b]"
              >
                <button
                  onClick={() => toggleOpen(f._id)}
                  className="flex w-full items-center justify-between px-5 py-4 transition duration-200 ease-out hover:bg-[#2f2f2f] focus:outline-none"
                >
                  <div className="text-left">
                    <p className="flex items-center gap-2 text-lg font-medium">
                      <User size={18} strokeWidth={1.5} className="text-neutral-400" />
                      {f.candidateId.name} ({f.candidateId.email})
                    </p>
                    <p className="text-sm text-gray-400">
                      Submitted: {new Date(f.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {isOpen ? (
                    <ChevronDown className="text-gray-300" strokeWidth={1.5} />
                  ) : (
                    <ChevronRight className="text-gray-300" strokeWidth={1.5} />
                  )}
                </button>

                {isOpen && (
                  <div className="space-y-4 px-5 pb-5">
                    {f.feedbacks.map((fb, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-[#444] bg-[#1f1f1f] p-4"
                      >
                        <p className="text-sm text-gray-300">Q: {fb.question}</p>
                        <p className="mt-1 font-medium text-orange-400">
                          A:{" "}
                          {fb.type === "rating" ? (
                            <span className="inline-flex items-center gap-1">
                              {fb.answer}
                              <Star
                                size={14}
                                className="fill-orange-400 text-orange-400"
                              />
                            </span>
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
