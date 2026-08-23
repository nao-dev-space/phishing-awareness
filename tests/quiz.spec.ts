import { describe, expect, it } from "vitest";
import { QUIZ_QUESTIONS } from "@/config/content";
import { calculateQuizScore, evaluateQuizAnswer, findIncorrectQuestions } from "@/services/quiz";
import type { QuizAnswerState, QuizQuestion } from "@/types/app";

/**
 * 設定済みクイズから指定位置の問題を取得する。
 * @param questionIndex 取得する問題のゼロ始まり位置。
 * @returns 指定位置に存在するクイズ問題。
 * @throws 問題が存在しない場合はテストデータ不備を表すErrorを送出する。
 */
function getQuizQuestion(questionIndex: number): QuizQuestion {
  const question: QuizQuestion | undefined = QUIZ_QUESTIONS[questionIndex];

  // テスト前提となる問題数を検証し、非nullアサーションによる誤った成功を防ぐ。
  if (!question) {
    throw new Error("Expected quiz question was not found.");
  }
  return question;
}

describe("クイズ判定", (): void => {
  it("正解と不正解を問題定義から判定する", (): void => {
    const question: QuizQuestion = getQuizQuestion(0);
    const correctAnswer: QuizAnswerState = evaluateQuizAnswer(question, question.correctOptionId);
    const incorrectAnswer: QuizAnswerState = evaluateQuizAnswer(question, "link");

    expect(correctAnswer.isCorrect).toBe(true);
    expect(incorrectAnswer.isCorrect).toBe(false);
  });

  it("正解数と誤答問題を集計する", (): void => {
    const firstQuestion: QuizQuestion = getQuizQuestion(0);
    const secondQuestion: QuizQuestion = getQuizQuestion(1);
    const answers: readonly QuizAnswerState[] = [
      evaluateQuizAnswer(firstQuestion, firstQuestion.correctOptionId),
      evaluateQuizAnswer(secondQuestion, "mail"),
    ];

    expect(calculateQuizScore(answers)).toBe(1);
    expect(findIncorrectQuestions(QUIZ_QUESTIONS, answers)).toEqual([secondQuestion]);
  });

  it("問題に存在しない選択肢IDを正解として扱わない", (): void => {
    const question: QuizQuestion = getQuizQuestion(0);
    const unknownAnswer: QuizAnswerState = evaluateQuizAnswer(question, "unknown-option");

    expect(unknownAnswer.isCorrect).toBe(false);
  });
});
