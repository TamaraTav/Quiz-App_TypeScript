import { useState, useEffect } from "react";

import { Question as QuestionType } from "../types";
import "./Question.css";

type TQuestionProps = {
  question: QuestionType["question"];
  options: QuestionType["options"];
  correctAnswer: QuestionType["correctAnswer"];
  onSelectOption: (selectedOption: string) => void;
};

const Question: React.FC<TQuestionProps> = ({
  question,
  options,
  correctAnswer,
  onSelectOption,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
  }, [question]);

  function handleOptionClick(option: string) {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    setTimeout(() => {
      onSelectOption(option);
    }, 1500);
  }

  function getOptionClassName(option: string): string {
    if (!isAnswered || !selectedOption) return "";
    if (option === correctAnswer) return "correct";
    if (option === selectedOption && option !== correctAnswer)
      return "incorrect";
    return "";
  }

  return (
    <div className="question-container">
      <h2>{question}</h2>
      <div className="options-container">
        {options.map((option) => (
          <button
            key={option}
            className={`option-button ${getOptionClassName(option)}`}
            onClick={() => handleOptionClick(option)}
            disabled={isAnswered}
          >
            {option}
            {isAnswered && option === correctAnswer && (
              <span className="feedback-icon">✓</span>
            )}
            {isAnswered &&
              option === selectedOption &&
              option !== correctAnswer && (
                <span className="feedback-icon">✗</span>
              )}
          </button>
        ))}
      </div>
      {isAnswered && (
        <div className="feedback-message">
          {selectedOption === correctAnswer ? (
            <span className="feedback-correct">Correct! ✓</span>
          ) : (
            <span className="feedback-incorrect">
              Incorrect. The correct answer is: {correctAnswer}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;
