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
    <div>
      {showScore ? (
        <div className="quiz-score">
          <h1>
            Your Score: {score} from {quizData.length}
          </h1>
          <button className="quiz-restart-button" onClick={restartQuiz}>
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <div className="quiz-header">
            <div className="progress-info">
              <span>
                Question {currentQuestionIndex + 1} of {quizData.length}
              </span>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <Question
            question={currentQuestion?.question}
            options={currentQuestion?.options}
            correctAnswer={currentQuestion?.correctAnswer}
            onSelectOption={onSelectOption}
          />
        </div>
      )}
    </div>
  );
}
