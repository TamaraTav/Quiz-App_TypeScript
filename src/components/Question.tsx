import { Question as QuestionType } from "../types";

type TQuestionProps = {
  question: QuestionType["question"];
  options: QuestionType["options"];
  onSelectOption: (selectedOption: string) => void;
};

const Question: React.FC<TQuestionProps> = ({
  question,
  options,
  onSelectOption,
}) => {
  return (
    <div>
      <h2>{question}</h2>
      <ul>
        {options.map((option) => (
          <li key={option}>
            <button onClick={() => onSelectOption(option)}>{option}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
