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
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizData.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
    }
  }

  return (
    <div>
      {showScore ? (
        <h1>
          Your Score: {score}/{quizData.length}
        </h1>
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
