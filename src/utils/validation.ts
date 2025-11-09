import { Question, QuizData } from "../types";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function validateQuestion(question: unknown): question is Question {
  if (typeof question !== "object" || question === null) {
    throw new ValidationError("Question must be an object");
  }

  const q = question as Record<string, unknown>;

  if (typeof q.question !== "string" || q.question.trim().length === 0) {
    throw new ValidationError("Question must be a non-empty string");
  }

  if (!Array.isArray(q.options)) {
    throw new ValidationError("Options must be an array");
  }

  if (q.options.length < 2) {
    throw new ValidationError("Question must have at least 2 options");
  }

  if (!q.options.every((opt: unknown) => typeof opt === "string")) {
    throw new ValidationError("All options must be strings");
  }

  if (typeof q.correctAnswer !== "string") {
    throw new ValidationError("Correct answer must be a string");
  }

  if (!q.options.includes(q.correctAnswer)) {
    throw new ValidationError(
      "Correct answer must be one of the provided options"
    );
  }

  return true;
}

export function validateQuizData(data: unknown): data is QuizData {
  if (!Array.isArray(data)) {
    throw new ValidationError("Quiz data must be an array");
  }

  if (data.length === 0) {
    throw new ValidationError("Quiz data cannot be empty");
  }

  data.forEach((question, index) => {
    try {
      validateQuestion(question);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new ValidationError(
          `Invalid question at index ${index}: ${error.message}`
        );
      }
      throw error;
    }
  });

  return true;
}
