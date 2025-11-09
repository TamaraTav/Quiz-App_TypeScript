import { QuizResult } from "../types";

const STORAGE_KEY = "quiz-results";

export function saveQuizResult(result: QuizResult): void {
  try {
    const existingResults = getQuizResults();
    const updatedResults = [result, ...existingResults].slice(0, 50); // Keep last 50 results
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResults));
  } catch (error) {
    console.error("Failed to save quiz result:", error);
  }
}

export function getQuizResults(): QuizResult[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as QuizResult[];
  } catch (error) {
    console.error("Failed to get quiz results:", error);
    return [];
  }
}

export function clearQuizResults(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear quiz results:", error);
  }
}

export function getQuizResultsByCategory(category: string): QuizResult[] {
  return getQuizResults().filter((result) => result.category === category);
}

export function getQuizResultsByDifficulty(difficulty: string): QuizResult[] {
  return getQuizResults().filter((result) => result.difficulty === difficulty);
}
