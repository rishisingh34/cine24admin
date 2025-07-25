"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

interface FeedbackQuestion {
  _id?: string;
  question: string;
  type: "text" | "rating";
}

export default function FeedbackManager() {
  const [questions, setQuestions] = useState<FeedbackQuestion[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<FeedbackQuestion>({
    question: "",
    type: "text",
  });
  const [edited, setEdited] = useState(false);

  // Fetch all feedback questions
  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch("/api/feedback-questions");
      const data = await res.json();
      const loaded = data.data || [];
      setQuestions(loaded);

      // Select first question by default
      if (loaded.length > 0) {
        setActiveIndex(0);
        setCurrentQuestion(loaded[0]);
      }
    };

    fetchQuestions();
  }, []);

  // Update currentQuestion when activeIndex changes
  useEffect(() => {
    if (questions[activeIndex]) {
      setCurrentQuestion(questions[activeIndex]);
      setEdited(false);
    }
  }, [activeIndex, questions]);

  const handleChange = (field: keyof FeedbackQuestion, value: string) => {
    setCurrentQuestion((prev) => {
      const updated = { ...prev, [field]: value };
      const original = questions[activeIndex] || { question: "", type: "text" };
      setEdited(
        updated.question !== original.question || updated.type !== original.type
      );
      return updated;
    });
  };

  const handleAddNew = () => {
    const newQuestion: FeedbackQuestion = { question: "", type: "text" };
    const updated = [...questions, newQuestion];
    setQuestions(updated);
    setActiveIndex(updated.length - 1);
    setCurrentQuestion(newQuestion);
    setEdited(true);
  };

  const handleSave = async () => {
    try {
      const method = currentQuestion._id ? "PUT" : "POST";
      const endpoint =
        "/api/feedback-questions" +
        (currentQuestion._id ? `/${currentQuestion._id}` : "");

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentQuestion),
      });

      const data = await res.json();

      if (data.success) {
        const updatedList = [...questions];
        updatedList[activeIndex] = data.data;
        setQuestions(updatedList);
        setEdited(false);
        setCurrentQuestion(data.data);
      }
    } catch (error) {
      console.error("Failed to save feedback question", error);
    }
  };
  const handleDelete = async () => {
    if (!currentQuestion._id) return;

    try {
      const res = await fetch(
        `/api/feedback-questions/${currentQuestion._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (data.success) {
        const updatedList = [...questions];
        updatedList.splice(activeIndex, 1);
        setQuestions(updatedList);

        const newIndex = Math.max(0, activeIndex - 1);
        setActiveIndex(newIndex);
        setCurrentQuestion(
          updatedList[newIndex] || { question: "", type: "text" }
        );
        setEdited(false);
      }
    } catch (error) {
      console.error("Failed to delete question", error);
    }
  };


  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-white">
      <div className="w-3/5 p-6 space-y-6">
        <h2 className="text-2xl font-semibold mb-4">
          Feedback Question - {activeIndex + 1}
        </h2>

        <div className="space-y-4 max-w-xl">
          <div>
            <label className="block mb-1 text-sm text-gray-300">Question</label>
            <textarea
              rows={4}
              className="w-full p-3 bg-[#1a1a1a] border border-gray-700 rounded outline-none text-white"
              value={currentQuestion.question}
              onChange={(e) => handleChange("question", e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Type</label>
            <select
              className="w-full p-3 bg-[#1a1a1a] border border-gray-700 rounded outline-none text-white"
              value={currentQuestion.type}
              onChange={(e) => handleChange("type", e.target.value)}
            >
              <option value="text">Text</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleDelete}
              disabled={!currentQuestion._id}
              className={`px-6 py-2 rounded font-medium ${
                currentQuestion._id
                  ? "bg-red-700 hover:bg-red-500"
                  : "bg-gray-700 cursor-not-allowed"
              }`}
            >
              Delete
            </button>

            <button
              onClick={handleSave}
              disabled={!edited}
              className={`px-6 py-2 rounded font-medium ${
                edited
                  ? "bg-green-600 hover:bg-green-500"
                  : "bg-gray-700 cursor-not-allowed"
              }`}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="w-2/5 bg-[#111] p-4 border-r border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Questions</h2>
          <button
            onClick={handleAddNew}
            className="p-2 rounded bg-blue-600 hover:bg-blue-500"
            title="Add Question"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {questions.length > 0 ? (
            questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`p-3 rounded-md text-center font-semibold ${
                  activeIndex === index
                    ? "bg-blue-600 text-white"
                    : "bg-[#1a1a1a] hover:bg-[#2a2a2a]"
                }`}
              >
                {index + 1}
              </button>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500 border border-dashed border-gray-600 p-4 rounded-md">
              No Feedbacks
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
