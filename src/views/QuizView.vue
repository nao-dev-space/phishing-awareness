<template>
  <div class="quiz-view">
    <PageIntro :eyebrow="eyebrow" :title="title" :description="description" />
    <div v-if="!isComplete" class="quiz-view-question-card">
      <div class="quiz-view-progress" :aria-label="progressLabel">
        <div :class="['quiz-view-progress-bar', progressClass]"></div>
      </div>
      <AppText :text="questionCountLabel" :tone="accentTone" />
      <AppHeading
        :level="questionHeadingLevel"
        :text="currentQuestion.prompt"
        :size="cardHeadingSize"
      />
      <div class="quiz-view-options" role="radiogroup" :aria-label="optionGroupLabel">
        <AppRadioOption
          v-for="option in currentQuestion.options"
          :key="option.id"
          :model-value="selectedOptionId"
          :name="currentQuestion.id"
          :value="option.id"
          :label="option.label"
          :disabled="hasAnswered"
          @update:model-value="updateSelectedOption"
        />
      </div>
      <AppButton
        v-if="!hasAnswered"
        :label="answerLabel"
        :disabled="!selectedOptionId"
        @click="submitAnswer"
      />
      <div v-else class="quiz-view-feedback" aria-live="polite">
        <NoticeBox
          :title="feedbackTitle"
          :message="currentQuestion.explanation"
          :tone="feedbackTone"
        />
        <AppButton :label="nextLabel" @click="goToNextQuestion" />
      </div>
    </div>
    <div v-else class="quiz-view-result">
      <div class="quiz-view-score">{{ scoreLabel }}</div>
      <AppHeading :level="resultHeadingLevel" :text="resultTitle" />
      <AppText :text="resultMessage" :size="leadSize" />
      <div v-if="incorrectQuestions.length" class="quiz-view-review">
        <AppHeading :level="reviewHeadingLevel" :text="reviewTitle" :size="cardHeadingSize" />
        <div
          v-for="question in incorrectQuestions"
          :key="question.id"
          class="quiz-view-review-item"
        >
          <AppText :text="question.prompt" :tone="accentTone" />
          <AppText :text="question.explanation" />
        </div>
      </div>
      <NoticeBox v-else :title="perfectTitle" :message="perfectMessage" :tone="successTone" />
      <div class="quiz-view-result-actions">
        <AppButton :label="retryLabel" @click="resetQuiz" />
        <RouteAction :label="learnLabel" :route-name="learnRoute" :variant="secondaryVariant" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type ComputedRef, type Ref } from "vue";
import AppButton from "@/components/atoms/AppButton.vue";
import AppHeading, { type HeadingLevel } from "@/components/atoms/AppHeading.vue";
import AppRadioOption from "@/components/atoms/AppRadioOption.vue";
import AppText from "@/components/atoms/AppText.vue";
import NoticeBox from "@/components/molecules/NoticeBox.vue";
import RouteAction from "@/components/molecules/RouteAction.vue";
import PageIntro from "@/components/organisms/PageIntro.vue";
import { QUIZ_QUESTIONS } from "@/config/content";
import { LEARN_ROUTE_NAME } from "@/config/routes";
import { translateMessage } from "@/i18n";
import { calculateQuizScore, evaluateQuizAnswer, findIncorrectQuestions } from "@/services/quiz";
import type { QuizAnswerState, QuizQuestion, RouteName } from "@/types/app";

const QUESTION_COUNT_MESSAGE_KEY: string = "quiz.questionCount";
const PROGRESS_MESSAGE_KEY: string = "quiz.progress";
const CORRECT_MESSAGE_KEY: string = "quiz.correct";
const INCORRECT_MESSAGE_KEY: string = "quiz.incorrect";
const SHOW_RESULT_MESSAGE_KEY: string = "quiz.showResult";
const NEXT_MESSAGE_KEY: string = "quiz.next";
const PERFECT_RESULT_MESSAGE_KEY: string = "quiz.perfectResult";
const REVIEW_RESULT_MESSAGE_KEY: string = "quiz.reviewResult";
const SCORE_MESSAGE_KEY: string = "quiz.score";
const EYEBROW_MESSAGE_KEY: string = "quiz.eyebrow";
const TITLE_MESSAGE_KEY: string = "quiz.title";
const DESCRIPTION_MESSAGE_KEY: string = "quiz.description";
const OPTION_GROUP_MESSAGE_KEY: string = "quiz.optionGroup";
const ANSWER_LABEL_MESSAGE_KEY: string = "quiz.answer";
const RESULT_TITLE_MESSAGE_KEY: string = "quiz.resultTitle";
const REVIEW_TITLE_MESSAGE_KEY: string = "quiz.reviewTitle";
const PERFECT_TITLE_MESSAGE_KEY: string = "quiz.perfectTitle";
const PERFECT_MESSAGE_KEY: string = "quiz.perfectMessage";
const RETRY_LABEL_MESSAGE_KEY: string = "quiz.retry";
const LEARN_LABEL_MESSAGE_KEY: string = "quiz.learn";
const questions: readonly QuizQuestion[] = QUIZ_QUESTIONS;
const firstQuestion: QuizQuestion | undefined = questions[0];

// 設定不備で問題が空の場合は画面処理を続けず、未定義値の参照を防ぐ。
if (!firstQuestion) {
  throw new Error("QUIZ_QUESTIONS must contain at least one question.");
}
const currentQuestionIndex: Ref<number> = ref(0);
const selectedOptionId: Ref<string> = ref("");
const answers: Ref<QuizAnswerState[]> = ref([]);
const hasAnswered: Ref<boolean> = ref(false);
const currentAnswer: Ref<QuizAnswerState | null> = ref(null);
/**
 * 現在位置の問題を返し、完了後は表示崩れを防ぐため先頭問題を保持する。
 * @returns 現在の問題、または設定済みの先頭問題。
 */
const currentQuestion: ComputedRef<QuizQuestion> = computed((): QuizQuestion => {
  const selectedQuestion: QuizQuestion = questions[currentQuestionIndex.value] ?? firstQuestion;
  return selectedQuestion;
});
/**
 * 問題位置が総問題数へ到達したか判定する。
 * @returns 全問題への回答が終わった場合はtrue。
 */
const isComplete: ComputedRef<boolean> = computed((): boolean => {
  const hasCompletedAllQuestions: boolean = currentQuestionIndex.value >= questions.length;
  return hasCompletedAllQuestions;
});
/**
 * 現在までの回答から正解数を集計する。
 * @returns 回答済み問題の正解数。
 */
const score: ComputedRef<number> = computed((): number => {
  const correctAnswerCount: number = calculateQuizScore(answers.value);
  return correctAnswerCount;
});
/**
 * 回答一覧から振り返り対象となる誤答問題を抽出する。
 * @returns 誤答した問題の一覧。
 */
const incorrectQuestions: ComputedRef<readonly QuizQuestion[]> = computed(
  (): readonly QuizQuestion[] => {
    const questionsToReview: readonly QuizQuestion[] = findIncorrectQuestions(
      questions,
      answers.value,
    );
    return questionsToReview;
  },
);
/**
 * 現在位置と総問題数を利用者向け進捗文言へ変換する。
 * @returns 現在の問題番号を含む翻訳済み文言。
 */
const questionCountLabel: ComputedRef<string> = computed((): string => {
  const label: string = translateMessage(QUESTION_COUNT_MESSAGE_KEY, {
    current: currentQuestionIndex.value + 1,
    total: questions.length,
  });
  return label;
});
/**
 * 進捗バーの意味を読み上げる文言を生成する。
 * @returns 現在位置と総問題数を含むARIAラベル。
 */
const progressLabel: ComputedRef<string> = computed((): string => {
  const label: string = translateMessage(PROGRESS_MESSAGE_KEY, {
    current: currentQuestionIndex.value + 1,
    total: questions.length,
  });
  return label;
});
/**
 * CSPに反するインラインstyleを使わず進捗幅を選ぶためのクラスを生成する。
 * @returns 現在の問題位置に対応するCSSクラス名。
 */
const progressClass: ComputedRef<string> = computed((): string => {
  const className: string = `quiz-view-progress-bar-${currentQuestionIndex.value + 1}`;
  return className;
});
/**
 * 現在の回答結果に対応するフィードバック見出しを取得する。
 * @returns 正解または不正解を示す翻訳済み文言。
 */
const feedbackTitle: ComputedRef<string> = computed((): string => {
  const messageKey: string = currentAnswer.value?.isCorrect
    ? CORRECT_MESSAGE_KEY
    : INCORRECT_MESSAGE_KEY;
  const label: string = translateMessage(messageKey);
  return label;
});
/**
 * 現在の回答結果に対応する通知色を選択する。
 * @returns 正解時はsuccess、不正解時はwarning。
 */
const feedbackTone: ComputedRef<"success" | "warning"> = computed((): "success" | "warning" => {
  const tone: "success" | "warning" = currentAnswer.value?.isCorrect ? "success" : "warning";
  return tone;
});
/**
 * 残り問題の有無に応じて次操作のラベルを取得する。
 * @returns 次問題または結果表示を示す翻訳済み文言。
 */
const nextLabel: ComputedRef<string> = computed((): string => {
  const isLastQuestion: boolean = currentQuestionIndex.value === questions.length - 1;
  const messageKey: string = isLastQuestion ? SHOW_RESULT_MESSAGE_KEY : NEXT_MESSAGE_KEY;
  const label: string = translateMessage(messageKey);
  return label;
});
/**
 * 最終得点に応じて結果画面の案内文を取得する。
 * @returns 全問正解または振り返りを案内する翻訳済み文言。
 */
const resultMessage: ComputedRef<string> = computed((): string => {
  const hasPerfectScore: boolean = score.value === questions.length;
  const messageKey: string = hasPerfectScore
    ? PERFECT_RESULT_MESSAGE_KEY
    : REVIEW_RESULT_MESSAGE_KEY;
  const message: string = translateMessage(messageKey);
  return message;
});
/**
 * 得点と総問題数を一つの翻訳済み表示文言へ整形する。
 * @returns 得点と総問題数を含む文言。
 */
const scoreLabel: ComputedRef<string> = computed((): string => {
  const label: string = translateMessage(SCORE_MESSAGE_KEY, {
    score: score.value,
    total: questions.length,
  });
  return label;
});
const eyebrow: string = translateMessage(EYEBROW_MESSAGE_KEY);
const title: string = translateMessage(TITLE_MESSAGE_KEY);
const description: string = translateMessage(DESCRIPTION_MESSAGE_KEY);
const optionGroupLabel: string = translateMessage(OPTION_GROUP_MESSAGE_KEY);
const answerLabel: string = translateMessage(ANSWER_LABEL_MESSAGE_KEY);
const resultTitle: string = translateMessage(RESULT_TITLE_MESSAGE_KEY);
const reviewTitle: string = translateMessage(REVIEW_TITLE_MESSAGE_KEY);
const perfectTitle: string = translateMessage(PERFECT_TITLE_MESSAGE_KEY);
const perfectMessage: string = translateMessage(PERFECT_MESSAGE_KEY);
const retryLabel: string = translateMessage(RETRY_LABEL_MESSAGE_KEY);
const learnLabel: string = translateMessage(LEARN_LABEL_MESSAGE_KEY);
const learnRoute: RouteName = LEARN_ROUTE_NAME;
const questionHeadingLevel: HeadingLevel = 2;
const resultHeadingLevel: HeadingLevel = 2;
const reviewHeadingLevel: HeadingLevel = 3;
const cardHeadingSize: "card" = "card";
const leadSize: "lead" = "lead";
const accentTone: "accent" = "accent";
const successTone: "success" = "success";
const secondaryVariant: "secondary" = "secondary";

/**
 * ラジオatomから通知された選択肢IDを画面内状態へ反映する。
 * @param optionId 利用者が選択したクイズ選択肢ID。
 * @returns 戻り値はなく、現在問題の選択状態だけを更新する。
 */
function updateSelectedOption(optionId: string): void {
  selectedOptionId.value = optionId;
}

/**
 * 回答を純粋関数で判定し、画面内の一時配列へ追加する。
 * @returns 戻り値はなく、永続化しない状態だけを更新する。
 */
function submitAnswer(): void {
  // 未選択状態での回答確定を防ぎ、問題に存在するIDだけを判定サービスへ渡す。
  if (!selectedOptionId.value) {
    return;
  }
  const answerState: QuizAnswerState = evaluateQuizAnswer(
    currentQuestion.value,
    selectedOptionId.value,
  );
  answers.value.push(answerState);
  currentAnswer.value = answerState;
  hasAnswered.value = true;
}
/**
 * 次の問題へ進み、問題ごとの選択状態を初期化する。
 * @returns 戻り値はなく、画面内状態だけを更新する。
 */
function goToNextQuestion(): void {
  currentQuestionIndex.value += 1;
  selectedOptionId.value = "";
  currentAnswer.value = null;
  hasAnswered.value = false;
}
/**
 * クイズを最初から再開できるよう全一時状態を破棄する。
 * @returns 戻り値はなく、画面内状態だけを初期化する。
 */
function resetQuiz(): void {
  currentQuestionIndex.value = 0;
  selectedOptionId.value = "";
  answers.value = [];
  currentAnswer.value = null;
  hasAnswered.value = false;
}
</script>

<style scoped>
.quiz-view {
  display: grid;
  gap: var(--space-page-section);
  margin: 0 auto;
  max-width: var(--content-standard);
}
.quiz-view-question-card,
.quiz-view-result {
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-large);
  box-shadow: var(--shadow-card);
  display: grid;
  gap: 22px;
  padding: 30px;
}
.quiz-view-progress {
  background: var(--color-surface-soft);
  border-radius: var(--radius-pill);
  height: 8px;
  overflow: hidden;
}
.quiz-view-progress-bar {
  background: var(--color-primary);
  border-radius: var(--radius-pill);
  height: 100%;
  transition: width var(--motion-medium);
}
.quiz-view-progress-bar-1 {
  width: 20%;
}
.quiz-view-progress-bar-2 {
  width: 40%;
}
.quiz-view-progress-bar-3 {
  width: 60%;
}
.quiz-view-progress-bar-4 {
  width: 80%;
}
.quiz-view-progress-bar-5 {
  width: 100%;
}
.quiz-view-options {
  display: grid;
  gap: 10px;
}
.quiz-view-feedback,
.quiz-view-review {
  display: grid;
  gap: 14px;
}
.quiz-view-score {
  color: var(--color-primary-dark);
  font-family: var(--font-display);
  font-size: clamp(48px, 10vw, 80px);
  font-weight: 900;
}
.quiz-view-review-item {
  border-left: 4px solid var(--color-warning);
  display: grid;
  gap: 5px;
  padding: 8px 14px;
}
.quiz-view-result-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
@media (prefers-reduced-motion: reduce) {
  .quiz-view-progress-bar {
    transition: none;
  }
}
@media (max-width: 560px) {
  .quiz-view-question-card,
  .quiz-view-result {
    padding: 22px 18px;
  }
}
</style>
