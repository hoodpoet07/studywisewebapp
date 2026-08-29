import React, { useState } from 'react';
import { Sparkles, CheckCircle, XCircle, ArrowRight, Brain } from 'lucide-react';

export default function AdaptiveReader() {
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const mockChunks = [
    {
      id: 1,
      title: "Memoization & Dynamic Programming",
      content: "Memoization is an optimization technique that speeds up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.",
      question: "What is the primary goal of memoization?",
      options: [
        { id: "A", text: "To compress database storage size" },
        { id: "B", text: "To cache function results and eliminate redundant execution", correct: true },
        { id: "C", text: "To encrypt network API payloads" },
      ]
    },
    {
      id: 2,
      title: "Tabulation (Bottom-Up Approach)",
      content: "Unlike Memoization (Top-Down), Tabulation fills an array or table sequentially starting from the base cases up to the desired target value, avoiding call-stack recursion overhead.",
      question: "How does Tabulation differ from Memoization?",
      options: [
        { id: "A", text: "Tabulation builds solutions iteratively from base cases up", correct: true },
        { id: "B", text: "Tabulation requires recursive stack calls" },
        { id: "C", text: "Tabulation only works on unindexed text files" },
      ]
    }
  ];

  const currentChunk = mockChunks[currentChunkIndex];

  const handleSelectOption = (option) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);
  };

  const handleNextChunk = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCurrentChunkIndex((prev) => (prev + 1) % mockChunks.length);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Chunk Reader Container */}
      <div className="p-5 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Adaptive Micro-Bit #{currentChunk.id}
          </div>
          <span className="text-xs text-gray-400">Concept: {currentChunk.title}</span>
        </div>

        <p className="text-sm leading-relaxed text-gray-800 dark:text-zinc-200">
          {currentChunk.content}
        </p>
      </div>

      {/* Active Recall Quiz Card */}
      <div className="p-5 rounded-xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <Brain className="w-4 h-4" />
          Active Recall Check
        </div>

        <h3 className="text-sm font-bold text-gray-900 dark:text-zinc-100">
          {currentChunk.question}
        </h3>

        <div className="flex flex-col gap-2 mt-1">
          {currentChunk.options.map((opt) => {
            const isSelected = selectedAnswer?.id === opt.id;
            let btnStyle = "border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-900";

            if (isAnswered) {
              if (opt.correct) {
                btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium";
              } else if (isSelected && !opt.correct) {
                btnStyle = "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 font-medium";
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt)}
                disabled={isAnswered}
                className={`w-full p-3 rounded-lg border text-left text-xs transition flex items-center justify-between ${btnStyle}`}
              >
                <span>{opt.id}. {opt.text}</span>
                {isAnswered && opt.correct && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                {isAnswered && isSelected && !opt.correct && <XCircle className="w-4 h-4 text-red-500" />}
              </button>
            );
          })}
        </div>

        {/* Next Step Control */}
        {isAnswered && (
          <div className="pt-3 border-t border-gray-100 dark:border-zinc-900 flex justify-end">
            <button
              onClick={handleNextChunk}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition flex items-center gap-1.5"
            >
              <span>Next Learning Chunk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}