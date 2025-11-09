import { useState, useEffect } from "react";

import { Question as QuestionType } from "../types";
import "./Question.css";

type TQuestionProps = {
  question: QuestionType["question"];
  options: QuestionType["options"];
  correctAnswer: QuestionType["correctAnswer"];
  onSelectOption: (selectedOption: string) => void;
  questionNumber: number;
};

const Question: React.FC<TQuestionProps> = ({
  question,
  options,
  correctAnswer,
  onSelectOption,
  questionNumber,
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

  const questionId = `question-${questionNumber}`;

  return (
    <article
      className="question-container"
      aria-labelledby={questionId}
      role="region"
    >
      <h2 id={questionId}>{question}</h2>
      <div
        className="options-container"
        role="radiogroup"
        aria-labelledby={questionId}
        aria-describedby={isAnswered ? `feedback-${questionNumber}` : undefined}
      >
        {options.map((option, index) => {
          const optionId = `option-${questionNumber}-${index}`;
          const isSelected = selectedOption === option;
          const isCorrect = option === correctAnswer;
          const isIncorrect = isSelected && !isCorrect && isAnswered;

          return (
            <button
              key={option}
              id={optionId}
              className={`option-button ${getOptionClassName(option)}`}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${option}${
                isAnswered
                  ? isCorrect
                    ? ", correct answer"
                    : isIncorrect
                    ? ", incorrect answer"
                    : ""
                  : ""
              }`}
              aria-disabled={isAnswered}
            >
              <span>{option}</span>
              {isAnswered && isCorrect && (
                <span className="feedback-icon" aria-hidden="true">
                  ✓
                </span>
              )}
              {isAnswered && isIncorrect && (
                <span className="feedback-icon" aria-hidden="true">
                  ✗
                </span>
              )}
            </button>
          );
        })}
      </div>
      {isAnswered && (
        <div
          id={`feedback-${questionNumber}`}
          className="feedback-message"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {selectedOption === correctAnswer ? (
            <span className="feedback-correct" aria-label="Correct answer">
              Correct! ✓
            </span>
          ) : (
            <span className="feedback-incorrect">
              <span aria-label="Incorrect answer">Incorrect.</span> The correct
              answer is: <strong>{correctAnswer}</strong>
            </span>
          )}
        </div>
      )}
    </article>
  );
};

export default Question;
