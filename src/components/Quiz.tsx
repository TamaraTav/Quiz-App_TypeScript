import { useState, useEffect } from "react";

import quizDataRaw from "../data.json";
import { QuizData } from "../types";
import { validateQuizData, ValidationError } from "../utils/validation";
import Question from "./Question";
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

  useEffect(() => {
    if (quizData.length === 0 && validationError) {
      console.error("Quiz data is invalid:", validationError);
    }
  }, []);

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

  function onSelectOption(selectedOption: string) {
    const currentQuestion = quizData[currentQuestionIndex];
    if (!currentQuestion) {
      console.error("Current question is undefined");
      return;
    }

    if (selectedOption === currentQuestion.correctAnswer) {
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
  }

  function restartQuiz() {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
  }

  const currentQuestion = quizData[currentQuestionIndex];

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

  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;

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
          <button
            className="quiz-restart-button"
            onClick={restartQuiz}
            aria-label="Restart quiz and start over"
          >
            Restart Quiz
          </button>
        </section>
      ) : (
        <section aria-label="Quiz Questions">
          <header className="quiz-header">
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
    </main>
  );
}
