"use client";

import { useState } from "react";
import { Plus, Save, ChevronLeft, ChevronRight } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";
import Editor from "@monaco-editor/react";
import BackgroundGridPattern from "@/components/ui/BackgroundGridPattern";

function normalizeMarkdown(text: string) {
  try {
    return text
      .replace(/\\n/g, "\n") // Convert string \n to actual newline
      .replace(/\\"/g, '"') // Optional: unescape quotes
      .replace(/\\\\/g, "\\"); // Convert double backslash \\ to single \
  } catch {
    return text;
  }
}

const SUBJECTS = [
  "HTML",
  "CSS",
  "SQL",
  "Aptitude",
  "Java",
  "Python",
  "C",
  "Cpp",
];

type Question = {
  question: string;
  options: string[];
  answer: number;
  markdown: boolean; // we'll rename this to `codeMode`
  code?: string; // new
  codeLang?: string; // new
};

export default function QuestionManager() {
  const [selectedSubject, setSelectedSubject] = useState("HTML");
  const [questions, setQuestions] = useState<Record<string, Question[]>>({
    HTML: [],
    CSS: [],
    SQL: [],
    Aptitude: [],
    Java: [],
    Python: [],
    C: [],
    Cpp: [],
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSubjects, setShowSubjects] = useState(true);

  const currentQuestions = questions[selectedSubject];
  const current = currentQuestions[currentIndex] || {
    question: "",
    options: ["", "", "", ""],
    answer: 0,
    markdown: false,
  };

  const updateCurrent = (updated: Question) => {
    const updatedList = [...currentQuestions];
    updatedList[currentIndex] = updated;
    setQuestions({ ...questions, [selectedSubject]: updatedList });
  };

  const handleOptionChange = (i: number, value: string) => {
    const updated = { ...current };
    updated.options[i] = value;
    updateCurrent(updated);
  };

  const handleAnswerChange = (i: number) => {
    const updated = { ...current, answer: i };
    updateCurrent(updated);
  };

  const handleAddQuestion = () => {
    const updatedList = [
      ...currentQuestions,
      {
        question: "",
        options: ["", "", "", ""],
        answer: 0,
        markdown: false,
      },
    ];
    setQuestions({ ...questions, [selectedSubject]: updatedList });
    setCurrentIndex(updatedList.length - 1);
  };

  const handleSave = () => {
    console.log("Saved question:", current);
    console.log("Saved:", current);
  };

  return (
    <div className="flex h-screen bg-[#1E1E1E] text-gray-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <div
        className={`${
          showSubjects ? "w-40 p-4" : "w-0 p-0"
        } transition-all duration-300 overflow-hidden bg-[#181818]`}
      >
        <div className="flex flex-col gap-2">
          {SUBJECTS.map((subj) => (
            <button
              key={subj}
              className={`text-base px-3 py-2 rounded-md transition whitespace-nowrap font-medium ${
                selectedSubject === subj
                  ? "bg-[#b35c16] text-white"
                  : "bg-[#383535] hover:bg-[#4A4A4A] text-gray-300 border border-[#555]"
              }`}
              onClick={() => {
                setSelectedSubject(subj);
                setCurrentIndex(0);
              }}
            >
              {subj}
            </button>
          ))}
        </div>
      </div>

      {/* Collapse Button */}
      <div className="flex items-start bg-[#1E1E1E]">
        <button
          className="p-2 mt-4 text-white bg-[#3A3A3A] hover:bg-[#4A4A4A] rounded-r-md"
          onClick={() => setShowSubjects(!showSubjects)}
        >
          {showSubjects ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col bg-[#1E1E1E]">
        {/* Question Number Selector */}
        <div className="p-4 border-b border-[#444] flex flex-wrap gap-2">
          {currentQuestions.map((_, idx) => (
            <button
              key={idx}
              className={`w-8 h-8 rounded-full text-base font-semibold ${
                currentIndex === idx
                  ? "bg-[#f7903d] text-white"
                  : "bg-[#3A3A3A] hover:bg-[#4A4A4A] text-gray-300"
              }`}
              onClick={() => setCurrentIndex(idx)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={handleAddQuestion}
            className="w-8 h-8 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full text-base"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Scrollable Editor */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {/* Code Mode Toggle */}
          <div className="flex items-center gap-4 mb-4">
            <label className="text-lg text-gray-300 font-bold">
              Question Format
            </label>
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded-lg text-base font-medium ${
                  !current.markdown
                    ? "bg-[#d26a14] text-white"
                    : "bg-[#3A3A3A] hover:bg-[#4A4A4A] text-gray-200"
                }`}
                onClick={() => updateCurrent({ ...current, markdown: false })}
              >
                Plain Text
              </button>
              <button
                className={`px-3 py-1 rounded-lg text-base font-medium ${
                  current.markdown
                    ? "bg-[#f7903d] text-white"
                    : "bg-[#3A3A3A] hover:bg-[#4A4A4A] text-gray-200"
                }`}
                onClick={() => updateCurrent({ ...current, markdown: true })}
              >
                Code
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="mt-6">
            <label className="text-sm text-gray-300 font-semibold block mb-2">
              Question
            </label>

            {!current.markdown ? (
              <textarea
                value={current.question}
                onChange={(e) =>
                  updateCurrent({ ...current, question: e.target.value })
                }
                rows={5}
                className="w-full bg-[#2B2B2B] text-white p-4 rounded-lg mt-1 resize-none focus-none placeholder:text-gray-500 text-base"
                placeholder="Describe your coding problem or write a plain question..."
              />
            ) : (
              <div className="bg-[#2B2B2B] rounded-xl border border-[#444] shadow-md overflow-hidden">
                {/* Language Selector */}
                <div className="flex justify-between items-center p-4 border-b border-[#444] bg-[#1A1A1A]">
                  <span className="text-sm font-medium text-gray-300">
                    Code Editor
                  </span>
                  <select
                    className="bg-[#3A3A3A] text-white text-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7903d]"
                    value={current.codeLang || "python"}
                    onChange={(e) =>
                      updateCurrent({ ...current, codeLang: e.target.value })
                    }
                  >
                    <option value="cpp">C++</option>
                    <option value="c">C</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                    <option value="sql">SQL</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                  </select>
                </div>

                {/* Monaco Editor */}
                <div className="bg-[#1E1E1E]">
                  <Editor
                    height="320px"
                    defaultLanguage={current.codeLang || "python"}
                    language={current.codeLang || "python"}
                    value={current.code || ""}
                    onChange={(val) =>
                      updateCurrent({ ...current, code: val || "" })
                    }
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      scrollBeyondLastLine: false,
                      wordWrap: "on",
                      automaticLayout: true,
                      padding: { top: 16, bottom: 16 },
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Options */}
          <div>
            <label className="text-sm text-white font-semibold block mb-2">
              Options
            </label>
            <div className="space-y-2">
              {current.options.map((opt, i) => {
                const isSelected = current.answer === i;

                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 rounded-md px-4 py-4 border transition-all duration-150 ${
                      isSelected
                        ? "bg-[#f7903d]/10 border-[#f7903d]"
                        : "bg-[#2B2B2B] border-[#3A3A3A] hover:border-[#555]"
                    }`}
                  >
                    {/* Radio Button for selecting correct answer */}
                    <input
                      type="radio"
                      name="correct"
                      checked={isSelected}
                      onChange={() => handleAnswerChange(i)}
                      className="accent-[#f7903d] w-6 h-6 shrink- cursor-pointer"
                    />

                    {/* Editable Option Text */}
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => handleOptionChange(i, e.target.value)}
                      placeholder={`Option ${i + 1}`}
                      className="w-full bg-transparent text-white text-base focus:outline-none placeholder:text-gray-300"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sticky Save Button */}
        <div className="border-t border-[#444] p-4 bg-[#1A1A1A] sticky bottom-0 z-10">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-[#c66210] hover:bg-[#ea812e] rounded-md text-white font-semibold text-base transition"
          >
            <Save size={18} />
            Save Question
          </button>
        </div>
      </div>
    </div>
  );
}
