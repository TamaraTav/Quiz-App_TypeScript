import { useState, useEffect, useCallback, useRef, useMemo } from "react";

import quizDataRaw from "../data.json";
import { QuizData } from "../types";
import { useTimer } from "../hooks/useTimer";
import { saveQuizResult } from "../utils/localStorage";
import { validateQuizData, ValidationError } from "../utils/validation";
import Question from "./Question";
import QuizHistory from "./QuizHistory";
import "./Quiz.css";

let quizData: QuizData = [];
let validationError: string | null = null;

try {
  validateQuizData(quizDataRaw);
  quizData = quizDataRaw as QuizData;
} catch (error) {
  if (error instanceof ValidationError) {
    validationError = error.message;
    console.error("Quiz data validation failed:", error.message);
  } else {
    validationError = "Failed to load quiz data";
    console.error("Unexpected error:", error);
  }
}

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const currentQuestionIndexRef = useRef<number>(0);

  const {
    time,
    formattedTime,
    reset: resetTimer,
  } = useTimer(!showScore && quizStartTime !== null);

  // Keep ref in sync with state
  useEffect(() => {
    currentQuestionIndexRef.current = currentQuestionIndex;
  }, [currentQuestionIndex]);

  const onSelectOption = useCallback((selectedOption: string) => {
    const index = currentQuestionIndexRef.current;
    const currentQuestion = quizData[index];
    if (!currentQuestion) {
      console.error("Current question is undefined");
      return;
    }

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setCurrentQuestionIndex((prev) => {
      const nextQuestionIndex = prev + 1;
      if (nextQuestionIndex < quizData.length) {
        return nextQuestionIndex;
      } else {
        setShowScore(true);
        return prev;
      }
    });
  }, []);

  useEffect(() => {
    if (quizData.length === 0 && validationError) {
      console.error("Quiz data is invalid:", validationError);
    }
  }, []);

  useEffect(() => {
    if (!showScore && quizStartTime === null) {
      setQuizStartTime(Date.now());
      resetTimer();
    }
  }, [showScore, quizStartTime, resetTimer]);

  // Save result when quiz is completed
  useEffect(() => {
    if (showScore && quizStartTime !== null && quizData.length > 0) {
      const currentQuestion = quizData[quizData.length - 1];
      const result = {
        score,
        total: quizData.length,
        category: currentQuestion?.category,
        difficulty: currentQuestion?.difficulty,
        timeTaken: time,
        date: new Date().toISOString(),
      };
      saveQuizResult(result);
    }
  }, [showScore, score, time, quizStartTime]);

  // Memoized values (must be before conditional returns)
  const currentQuestion = useMemo(
    () => (quizData.length > 0 ? quizData[currentQuestionIndex] : undefined),
    [currentQuestionIndex]
  );

  const progress = useMemo(
    () =>
      quizData.length > 0
        ? ((currentQuestionIndex + 1) / quizData.length) * 100
        : 0,
    [currentQuestionIndex]
  );

  const accuracy = useMemo(
    () =>
      quizData.length > 0 ? Math.round((score / quizData.length) * 100) : 0,
    [score]
  );

  const handleCloseHistory = useCallback(() => {
    setShowHistory(false);
  }, []);

  const handleShowHistory = useCallback(() => {
    setShowHistory(true);
  }, []);

  const restartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    currentQuestionIndexRef.current = 0;
    setScore(0);
    setShowScore(false);
    setQuizStartTime(null);
    resetTimer();
  }, [resetTimer]);

  if (validationError || quizData.length === 0) {
    return (
      <div className="quiz-error">
        <div className="quiz-error-content">
          <h2>Failed to load quiz</h2>
          <p>{validationError || "Quiz data is empty or invalid."}</p>
          <p>Please check the data file and try again.</p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="quiz-error">
        <div className="quiz-error-content">
          <h2>Question not found</h2>
          <p>The requested question could not be loaded.</p>
          <button
            className="quiz-restart-button"
            onClick={restartQuiz}
            aria-label="Restart quiz"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <main>
      {showScore ? (
        <section
          className="quiz-score"
          aria-live="polite"
          aria-atomic="true"
          aria-label="Quiz Results"
        >
          <h1>
            Your Score: {score} from {quizData.length}
          </h1>
          <div className="quiz-stats">
            <p className="quiz-stat">
              <span className="stat-label">Time:</span> {formattedTime}
            </p>
            <p className="quiz-stat">
              <span className="stat-label">Accuracy:</span> {accuracy}%
            </p>
          </div>
          <div className="quiz-score-actions">
            <button
              className="quiz-history-button"
              onClick={handleShowHistory}
              aria-label="View quiz history"
            >
              View History
            </button>
            <button
              className="quiz-restart-button"
              onClick={restartQuiz}
              aria-label="Restart quiz and start over"
            >
              Restart Quiz
            </button>
          </div>
        </section>
      ) : (
        <section aria-label="Quiz Questions">
          <header className="quiz-header">
            <div className="quiz-header-top">
              <div
                className="progress-info"
                aria-live="polite"
                aria-atomic="true"
              >
                <span
                  id="progress-text"
                  aria-label={`Question ${currentQuestionIndex + 1} of ${
                    quizData.length
                  }`}
                >
                  Question {currentQuestionIndex + 1} of {quizData.length}
                </span>
              </div>
              <div
                className="timer-info"
                aria-label={`Time elapsed: ${formattedTime}`}
              >
                <span className="timer-icon">⏱</span>
                <span>{formattedTime}</span>
              </div>
            </div>
            <div
              className="progress-bar-container"
              role="progressbar"
              aria-valuenow={currentQuestionIndex + 1}
              aria-valuemin={0}
              aria-valuemax={quizData.length}
              aria-labelledby="progress-text"
              aria-label={`Progress: ${Math.round(progress)}% complete`}
            >
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
                aria-hidden="true"
              ></div>
            </div>
          </header>
          <Question
            question={currentQuestion?.question}
            options={currentQuestion?.options}
            correctAnswer={currentQuestion?.correctAnswer}
            onSelectOption={onSelectOption}
            questionNumber={currentQuestionIndex + 1}
          />
        </section>
      )}
      {showHistory && <QuizHistory onClose={handleCloseHistory} />}
    </main>
  );
}
