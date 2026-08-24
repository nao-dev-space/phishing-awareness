import type { QuizAnswerState, QuizQuestion } from "@/types/app";

/** 選択した回答が問題の正解と一致するか判定する。 */
export function evaluateQuizAnswer(
  question: QuizQuestion,
  selectedOptionId: string,
): QuizAnswerState {
  const isCorrect: boolean = question.correctOptionId === selectedOptionId;
  const answerState: QuizAnswerState = { questionId: question.id, selectedOptionId, isCorrect };
  return answerState;
}

/** 回答一覧から正解数を集計する。 */
export function calculateQuizScore(answers: readonly QuizAnswerState[]): number {
  const correctAnswerCount: number = answers.filter(
    (answer: QuizAnswerState): boolean => answer.isCorrect,
  ).length;
  return correctAnswerCount;
}

/** 回答一覧から誤答した問題だけを抽出する。 */
export function findIncorrectQuestions(
  questions: readonly QuizQuestion[],
  answers: readonly QuizAnswerState[],
): readonly QuizQuestion[] {
  const incorrectQuestionIds: Set<string> = new Set(
    answers
      .filter((answer: QuizAnswerState): boolean => !answer.isCorrect)
      .map((answer: QuizAnswerState): string => answer.questionId),
  );
  const incorrectQuestions: readonly QuizQuestion[] = questions.filter(
    (question: QuizQuestion): boolean => incorrectQuestionIds.has(question.id),
  );
  return incorrectQuestions;
}
