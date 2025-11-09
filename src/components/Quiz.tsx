import { useState } from "react";

import quizDataRaw from "../data.json";
import { QuizData } from "../types";
import Question from "./Question";

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

  return (
    <div>
      {showScore ? (
        <div>
          <h1>
            Your Score: {score} from {quizData.length}
          </h1>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <Question
          question={quizData[currentQuestionIndex]?.question}
          options={quizData[currentQuestionIndex].options}
          onSelectOption={onSelectOption}
        />
      )}
    </div>
  );
}
