export type Difficulty = "easy" | "medium" | "hard";
export type Category = string;

export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  category?: Category;
  difficulty?: Difficulty;
}

export type QuizData = Question[];

export interface QuizResult {
  score: number;
  total: number;
  category?: Category;
  difficulty?: Difficulty;
  timeTaken: number; // in seconds
  date: string; // ISO date string
}
