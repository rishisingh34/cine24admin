"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import {
  useDeleteFeedbackQuestion,
  useFeedbackQuestions,
  useSaveFeedbackQuestion,
} from "@/hooks/queries/use-feedback-questions";
import type { FeedbackQuestion } from "@/lib/api/feedback-questions";
import LoadingCenter from "@/components/ui/LoadingCenter";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function FeedbackManager() {
  const { data, isLoading } = useFeedbackQuestions();
  const saveMutation = useSaveFeedbackQuestion();
  const deleteMutation = useDeleteFeedbackQuestion();

  const questions = data?.data ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<FeedbackQuestion>({
    question: "",
    type: "text",
  });
  const [edited, setEdited] = useState(false);
  const [localQuestions, setLocalQuestions] = useState<FeedbackQuestion[]>([]);

  useEffect(() => {
    if (questions.length > 0) {
      setLocalQuestions(questions);
      setActiveIndex(0);
      setCurrentQuestion(questions[0]);
      setEdited(false);
    } else if (!isLoading) {
      setLocalQuestions([]);
      setCurrentQuestion({ question: "", type: "text" });
    }
  }, [questions, isLoading]);

  useEffect(() => {
    if (localQuestions[activeIndex]) {
      setCurrentQuestion(localQuestions[activeIndex]);
      setEdited(false);
    }
  }, [activeIndex, localQuestions]);

  const handleChange = (field: keyof FeedbackQuestion, value: string) => {
    setCurrentQuestion((prev) => {
      const updated = { ...prev, [field]: value };
      const original = localQuestions[activeIndex] || {
        question: "",
        type: "text" as const,
      };
      setEdited(
        updated.question !== original.question || updated.type !== original.type
      );
      return updated;
    });
  };

  const handleAddNew = () => {
    const newQuestion: FeedbackQuestion = { question: "", type: "text" };
    const updated = [...localQuestions, newQuestion];
    setLocalQuestions(updated);
    setActiveIndex(updated.length - 1);
    setCurrentQuestion(newQuestion);
    setEdited(true);
  };

  const handleSave = async () => {
    try {
      const result = await saveMutation.mutateAsync(currentQuestion);
      if (result.success) {
        const updatedList = [...localQuestions];
        updatedList[activeIndex] = result.data;
        setLocalQuestions(updatedList);
        setEdited(false);
        setCurrentQuestion(result.data);
        toast.success("Question saved");
      }
    } catch (error) {
      console.error("Failed to save feedback question", error);
      toast.error("Failed to save question");
    }
  };

  const handleDelete = async () => {
    if (!currentQuestion._id) return;

    try {
      const result = await deleteMutation.mutateAsync(currentQuestion._id);
      if (result.success) {
        const updatedList = [...localQuestions];
        updatedList.splice(activeIndex, 1);
        setLocalQuestions(updatedList);

        const newIndex = Math.max(0, activeIndex - 1);
        setActiveIndex(newIndex);
        setCurrentQuestion(
          updatedList[newIndex] || { question: "", type: "text" }
        );
        setEdited(false);
        toast.success("Question deleted");
      }
    } catch (error) {
      console.error("Failed to delete question", error);
      toast.error("Failed to delete question");
    }
  };

  if (isLoading) {
    return <LoadingCenter className="h-screen" />;
  }

  return (
    <div className="-mx-6 -my-6 flex h-screen w-[calc(100%+3rem)] overflow-y-auto bg-[#0f0f0f] text-white">
      <div className="w-3/5 space-y-6 p-6">
        <h2 className="mb-4 text-2xl font-semibold">
          Feedback Question - {activeIndex + 1}
        </h2>

        <div className="max-w-xl space-y-4">
          <Textarea
            label="Question"
            rows={4}
            value={currentQuestion.question}
            onChange={(e) => handleChange("question", e.target.value)}
          />

          <Select
            label="Type"
            value={currentQuestion.type}
            onChange={(e) => handleChange("type", e.target.value)}
          >
            <option value="text">Text</option>
            <option value="rating">Rating</option>
          </Select>

          <div className="flex gap-4">
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={!currentQuestion._id || deleteMutation.isPending}
            >
              Delete
            </Button>

            <Button
              variant="success"
              onClick={handleSave}
              disabled={!edited}
              loading={saveMutation.isPending}
            >
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className="w-2/5 border-r border-gray-800 bg-[#111] p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Questions</h2>
          <button
            onClick={handleAddNew}
            className="rounded-lg bg-blue-600 p-2 hover:bg-blue-500"
            title="Add Question"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {localQuestions.length > 0 ? (
            localQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`rounded-lg p-3 text-center font-medium transition duration-200 ease-out ${
                  activeIndex === index
                    ? "bg-blue-600 text-white"
                    : "bg-[#1a1a1a] hover:bg-[#2a2a2a]"
                }`}
              >
                {index + 1}
              </button>
            ))
          ) : (
            <div className="col-span-3 rounded-lg border border-dashed border-gray-600 p-4 text-center text-gray-500">
              No Feedbacks
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
