export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export type QuizData = Question[];
