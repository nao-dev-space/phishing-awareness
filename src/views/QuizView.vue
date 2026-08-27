<template>
  <div class="quiz-view">
    <PageIntro
      :eyebrow="t(MESSAGE_KEYS.eyebrow)"
      :title="t(MESSAGE_KEYS.title)"
      :description="t(MESSAGE_KEYS.description)"
    />
    <div v-if="!isComplete" class="quiz-view-question-card">
      <progress
        class="quiz-view-progress"
        :value="currentQuestionIndex + 1"
        :max="questions.length"
        :aria-label="progressLabel"
      ></progress>
      <AppText :text="questionCountLabel" :tone="TEXT_TONES.ACCENT" />
      <AppHeading
        :level="HEADING_LEVELS.TWO"
        :text="currentQuestion.prompt"
        :size="HEADING_SIZES.CARD"
      />
      <div class="quiz-view-options" role="radiogroup" :aria-label="t(MESSAGE_KEYS.optionGroup)">
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
        :label="t(MESSAGE_KEYS.answerLabel)"
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
      <AppHeading :level="HEADING_LEVELS.TWO" :text="t(MESSAGE_KEYS.resultTitle)" />
      <AppText :text="resultMessage" :size="TEXT_SIZES.LEAD" />
      <div v-if="incorrectQuestions.length" class="quiz-view-review">
        <AppHeading
          :level="HEADING_LEVELS.THREE"
          :text="t(MESSAGE_KEYS.reviewTitle)"
          :size="HEADING_SIZES.CARD"
        />
        <div
          v-for="question in incorrectQuestions"
          :key="question.id"
          class="quiz-view-review-item"
        >
          <AppText :text="question.prompt" :tone="TEXT_TONES.ACCENT" />
          <AppText :text="question.explanation" />
        </div>
      </div>
      <NoticeBox
        v-else
        :title="t(MESSAGE_KEYS.perfectTitle)"
        :message="t(MESSAGE_KEYS.perfectMessage)"
        :tone="NOTICE_TONES.SUCCESS"
      />
      <div class="quiz-view-result-actions">
        <AppButton :label="t(MESSAGE_KEYS.retryLabel)" @click="resetQuiz" />
        <RouteAction
          :label="t(MESSAGE_KEYS.learnLabel)"
          :route-name="LEARN_ROUTE_NAME"
          :variant="ROUTE_ACTION_VARIANTS.SECONDARY"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Ref } from "vue";
import { useI18n, type Composer } from "vue-i18n";
import AppButton from "@/components/atoms/AppButton.vue";
import AppHeading from "@/components/atoms/AppHeading.vue";
import AppRadioOption from "@/components/atoms/AppRadioOption.vue";
import AppText from "@/components/atoms/AppText.vue";
import NoticeBox from "@/components/molecules/NoticeBox.vue";
import RouteAction from "@/components/molecules/RouteAction.vue";
import PageIntro from "@/components/organisms/PageIntro.vue";
import { useContent } from "@/composables/useContent";
import { LEARN_ROUTE_NAME } from "@/config/routes";
import {
  HEADING_LEVELS,
  HEADING_SIZES,
  NOTICE_TONES,
  QUIZ_FEEDBACK_TONES,
  ROUTE_ACTION_VARIANTS,
  TEXT_SIZES,
  TEXT_TONES,
} from "@/config/ui";
import type { QuizFeedbackTone } from "@/config/ui";
import { calculateQuizScore, evaluateQuizAnswer, findIncorrectQuestions } from "@/services/quiz";
import type { QuizAnswerState, QuizQuestion } from "@/types/app";

/** クイズ画面に表示する各文言の翻訳キーを表す。 */
interface QuizMessageKeys {
  readonly answerLabel: string;
  readonly correct: string;
  readonly description: string;
  readonly eyebrow: string;
  readonly incorrect: string;
  readonly learnLabel: string;
  readonly next: string;
  readonly optionGroup: string;
  readonly perfectMessage: string;
  readonly perfectResult: string;
  readonly perfectTitle: string;
  readonly progress: string;
  readonly questionCount: string;
  readonly resultTitle: string;
  readonly retryLabel: string;
  readonly reviewResult: string;
  readonly reviewTitle: string;
  readonly score: string;
  readonly showResult: string;
  readonly title: string;
}

const MESSAGE_KEYS: QuizMessageKeys = {
  answerLabel: "quiz.answer",
  correct: "quiz.correct",
  description: "quiz.description",
  eyebrow: "quiz.eyebrow",
  incorrect: "quiz.incorrect",
  learnLabel: "quiz.learn",
  next: "quiz.next",
  optionGroup: "quiz.optionGroup",
  perfectMessage: "quiz.perfectMessage",
  perfectResult: "quiz.perfectResult",
  perfectTitle: "quiz.perfectTitle",
  progress: "quiz.progress",
  questionCount: "quiz.questionCount",
  resultTitle: "quiz.resultTitle",
  retryLabel: "quiz.retry",
  reviewResult: "quiz.reviewResult",
  reviewTitle: "quiz.reviewTitle",
  score: "quiz.score",
  showResult: "quiz.showResult",
  title: "quiz.title",
};
const { t }: Composer = useI18n();
const content = useContent();
const questions = computed((): readonly QuizQuestion[] => content.value.quizQuestions);
const currentQuestionIndex: Ref<number> = ref(0);
const selectedOptionId: Ref<string> = ref("");
const answers: Ref<QuizAnswerState[]> = ref([]);
const currentAnswer: Ref<QuizAnswerState | null> = ref(null);
const hasAnswered = computed((): boolean => currentAnswer.value !== null);
/** 現在位置の問題を返し、完了後は表示崩れを防ぐため先頭問題を保持する。 */
const currentQuestion = computed((): QuizQuestion => {
  const firstQuestion: QuizQuestion | undefined = questions.value[0];
  if (!firstQuestion) {
    throw new Error("QUIZ_QUESTIONS must contain at least one question.");
  }
  const selectedQuestion: QuizQuestion =
    questions.value[currentQuestionIndex.value] ?? firstQuestion;
  return selectedQuestion;
});
/** 問題位置が総問題数へ到達したか判定する。 */
const isComplete = computed((): boolean => {
  const hasCompletedAllQuestions: boolean = currentQuestionIndex.value >= questions.value.length;
  return hasCompletedAllQuestions;
});
/** 現在までの回答から正解数を集計する。 */
const score = computed((): number => {
  const correctAnswerCount: number = calculateQuizScore(answers.value);
  return correctAnswerCount;
});
/** 回答一覧から振り返り対象となる誤答問題を抽出する。 */
const incorrectQuestions = computed((): readonly QuizQuestion[] => {
  const questionsToReview: readonly QuizQuestion[] = findIncorrectQuestions(
    questions.value,
    answers.value,
  );
  return questionsToReview;
});
/** 現在位置と総問題数を利用者向け進捗文言へ変換する。 */
const questionCountLabel = computed((): string => {
  const label: string = t(MESSAGE_KEYS.questionCount, {
    current: currentQuestionIndex.value + 1,
    total: questions.value.length,
  });
  return label;
});
/** 進捗バーの意味を読み上げる文言を生成する。 */
const progressLabel = computed((): string => {
  const label: string = t(MESSAGE_KEYS.progress, {
    current: currentQuestionIndex.value + 1,
    total: questions.value.length,
  });
  return label;
});
/** 現在の回答結果に対応するフィードバック見出しを取得する。 */
const feedbackTitle = computed((): string => {
  const messageKey: string = currentAnswer.value?.isCorrect
    ? MESSAGE_KEYS.correct
    : MESSAGE_KEYS.incorrect;
  const label: string = t(messageKey);
  return label;
});
/** 現在の回答結果に対応する通知色を選択する。 */
const feedbackTone = computed((): QuizFeedbackTone => {
  const tone: QuizFeedbackTone = currentAnswer.value?.isCorrect
    ? QUIZ_FEEDBACK_TONES.SUCCESS
    : QUIZ_FEEDBACK_TONES.WARNING;
  return tone;
});
/** 残り問題の有無に応じて次操作のラベルを取得する。 */
const nextLabel = computed((): string => {
  const isLastQuestion: boolean = currentQuestionIndex.value === questions.value.length - 1;
  const messageKey: string = isLastQuestion ? MESSAGE_KEYS.showResult : MESSAGE_KEYS.next;
  const label: string = t(messageKey);
  return label;
});
/** 最終得点に応じて結果画面の案内文を取得する。 */
const resultMessage = computed((): string => {
  const hasPerfectScore: boolean = score.value === questions.value.length;
  const messageKey: string = hasPerfectScore
    ? MESSAGE_KEYS.perfectResult
    : MESSAGE_KEYS.reviewResult;
  const message: string = t(messageKey);
  return message;
});
/** 得点と総問題数を一つの翻訳済み表示文言へ整形する。 */
const scoreLabel = computed((): string => {
  const label: string = t(MESSAGE_KEYS.score, {
    score: score.value,
    total: questions.value.length,
  });
  return label;
});
/** ラジオ選択肢から通知されたIDを画面内状態へ反映する。 */
function updateSelectedOption(optionId: string): void {
  selectedOptionId.value = optionId;
}

/** 回答を判定し、画面内の一時配列へ追加する。 */
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
}
/** 次の問題へ進み、問題ごとの選択状態を初期化する。 */
function goToNextQuestion(): void {
  currentQuestionIndex.value += 1;
  selectedOptionId.value = "";
  currentAnswer.value = null;
}
/** クイズを最初から再開できるよう全一時状態を破棄する。 */
function resetQuiz(): void {
  currentQuestionIndex.value = 0;
  selectedOptionId.value = "";
  answers.value = [];
  currentAnswer.value = null;
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
  box-shadow: var(--shadow-card-prominent);
  display: grid;
  gap: var(--space-6);
  padding: var(--space-8);
}
.quiz-view-progress {
  appearance: none;
  background: var(--color-surface-soft);
  border: 0;
  border-radius: var(--radius-pill);
  height: 8px;
  overflow: hidden;
  width: 100%;
}
.quiz-view-progress::-webkit-progress-bar {
  background: var(--color-surface-soft);
}
.quiz-view-progress::-webkit-progress-value {
  background: var(--color-primary);
  border-radius: var(--radius-pill);
  transition: width var(--motion-medium);
}
.quiz-view-progress::-moz-progress-bar {
  background: var(--color-primary);
  border-radius: var(--radius-pill);
  transition: width var(--motion-medium);
}
.quiz-view-options {
  display: grid;
  gap: var(--space-3);
}
.quiz-view-feedback,
.quiz-view-review {
  display: grid;
  gap: var(--space-4);
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
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
}
.quiz-view-result-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
@media (prefers-reduced-motion: reduce) {
  .quiz-view-progress::-webkit-progress-value,
  .quiz-view-progress::-moz-progress-bar {
    transition: none;
  }
}
@media (max-width: 560px) {
  .quiz-view-question-card,
  .quiz-view-result {
    padding: var(--space-6) var(--space-4);
  }
}
</style>
