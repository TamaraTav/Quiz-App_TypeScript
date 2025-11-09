import { useState } from "react";

import quizDataRaw from "../data.json";
import { QuizData } from "../types";
import Question from "./Question";
import "./Quiz.css";

const quizData = quizDataRaw as QuizData;

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);

  function onSelectOption(selectedOption: string) {
    if (selectedOption === quizData[currentQuestionIndex].correctAnswer) {
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
