import { describe, expect, it } from "vitest";
import { QUIZ_QUESTIONS } from "@/config/content";
import { calculateQuizScore, evaluateQuizAnswer, findIncorrectQuestions } from "@/services/quiz";
import type { QuizAnswerState, QuizQuestion } from "@/types/app";

describe("クイズ判定", (): void => {
  it("正解と不正解を問題定義から判定する", (): void => {
    const question: QuizQuestion = QUIZ_QUESTIONS[0]!;
    const correctAnswer: QuizAnswerState = evaluateQuizAnswer(question, question.correctOptionId);
    const incorrectAnswer: QuizAnswerState = evaluateQuizAnswer(question, "link");

    expect(correctAnswer.isCorrect).toBe(true);
    expect(incorrectAnswer.isCorrect).toBe(false);
  });

  it("正解数と誤答問題を集計する", (): void => {
    const firstQuestion: QuizQuestion = QUIZ_QUESTIONS[0]!;
    const secondQuestion: QuizQuestion = QUIZ_QUESTIONS[1]!;
    const answers: readonly QuizAnswerState[] = [
      evaluateQuizAnswer(firstQuestion, firstQuestion.correctOptionId),
      evaluateQuizAnswer(secondQuestion, "mail"),
    ];

    expect(calculateQuizScore(answers)).toBe(1);
    expect(findIncorrectQuestions(QUIZ_QUESTIONS, answers)).toEqual([secondQuestion]);
  });
});
