import { memo } from "react";

import { QuizResult } from "../types";
import { getQuizResults } from "../utils/localStorage";
import "./QuizHistory.css";

interface QuizHistoryProps {
  onClose: () => void;
}

const QuizHistory = memo(function QuizHistory({ onClose }: QuizHistoryProps) {
  const results = getQuizResults();

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  if (results.length === 0) {
    return (
      <div className="quiz-history">
        <div className="quiz-history-content">
          <div className="quiz-history-header">
            <h2>Quiz History</h2>
            <button
              className="quiz-history-close"
              onClick={onClose}
              aria-label="Close history"
            >
              ×
            </button>
          </div>
          <p className="quiz-history-empty">No quiz results yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-history">
      <div className="quiz-history-content">
        <div className="quiz-history-header">
          <h2>Quiz History</h2>
          <button
            className="quiz-history-close"
            onClick={onClose}
            aria-label="Close history"
          >
            ×
          </button>
        </div>
        <div className="quiz-history-list">
          {results.map((result: QuizResult, index: number) => {
            const accuracy = Math.round((result.score / result.total) * 100);
            // Use date + index as unique key since date is ISO string
            const uniqueKey = `${result.date}-${index}`;
            return (
              <div key={uniqueKey} className="quiz-history-item">
                <div className="quiz-history-item-header">
                  <span className="quiz-history-date">
                    {formatDate(result.date)}
                  </span>
                  {result.category && (
                    <span className="quiz-history-category">
                      {result.category}
                    </span>
                  )}
                  {result.difficulty && (
                    <span
                      className={`quiz-history-difficulty ${result.difficulty}`}
                    >
                      {result.difficulty}
                    </span>
                  )}
                </div>
                <div className="quiz-history-item-stats">
                  <div className="quiz-history-stat">
                    <span className="stat-label">Score:</span>
                    <span>
                      {result.score}/{result.total}
                    </span>
                  </div>
                  <div className="quiz-history-stat">
                    <span className="stat-label">Accuracy:</span>
                    <span>{accuracy}%</span>
                  </div>
                  <div className="quiz-history-stat">
                    <span className="stat-label">Time:</span>
                    <span>{formatTime(result.timeTaken)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default QuizHistory;
