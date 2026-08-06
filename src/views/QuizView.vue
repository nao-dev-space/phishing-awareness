<template>
  <div class="quiz-view">
    <PageIntro :eyebrow="eyebrow" :title="title" :description="description" />
    <div v-if="!isComplete" class="quiz-view-question-card">
      <div class="quiz-view-progress" :aria-label="progressLabel">
        <div class="quiz-view-progress-bar" :style="progressStyle"></div>
      </div>
      <AppText :text="questionCountLabel" :tone="accentTone" />
      <AppHeading
        :level="questionHeadingLevel"
        :text="currentQuestion.prompt"
        :size="cardHeadingSize"
      />
      <div class="quiz-view-options" role="radiogroup" :aria-label="optionGroupLabel">
        <label v-for="option in currentQuestion.options" :key="option.id" class="quiz-view-option">
          <input
            v-model="selectedOptionId"
            class="quiz-view-radio"
            type="radio"
            :name="currentQuestion.id"
            :value="option.id"
            :disabled="hasAnswered"
          />
          <AppText :text="option.label" />
        </label>
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
      <div class="quiz-view-score">{{ score }} / {{ questions.length }}</div>
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
import AppText from "@/components/atoms/AppText.vue";
import NoticeBox from "@/components/molecules/NoticeBox.vue";
import RouteAction from "@/components/molecules/RouteAction.vue";
import PageIntro from "@/components/organisms/PageIntro.vue";
import { QUIZ_QUESTIONS } from "@/config/content";
import { messageGroup } from "@/i18n";
import { calculateQuizScore, evaluateQuizAnswer, findIncorrectQuestions } from "@/services/quiz";
import type { QuizAnswerState, QuizQuestion, RouteName } from "@/types/app";

const questions: readonly QuizQuestion[] = QUIZ_QUESTIONS;
const messages = messageGroup("quiz");
const currentQuestionIndex: Ref<number> = ref(0);
const selectedOptionId: Ref<string> = ref("");
const answers: Ref<QuizAnswerState[]> = ref([]);
const hasAnswered: Ref<boolean> = ref(false);
const currentAnswer: Ref<QuizAnswerState | null> = ref(null);
const currentQuestion: ComputedRef<QuizQuestion> = computed(
  (): QuizQuestion => questions[currentQuestionIndex.value] ?? questions[0]!,
);
const isComplete: ComputedRef<boolean> = computed(
  (): boolean => currentQuestionIndex.value >= questions.length,
);
const score: ComputedRef<number> = computed((): number => calculateQuizScore(answers.value));
const incorrectQuestions: ComputedRef<readonly QuizQuestion[]> = computed(
  (): readonly QuizQuestion[] => findIncorrectQuestions(questions, answers.value),
);
const questionCountLabel: ComputedRef<string> = computed((): string =>
  messages.questionCount
    .replace("{current}", String(currentQuestionIndex.value + 1))
    .replace("{total}", String(questions.length)),
);
const progressLabel: ComputedRef<string> = computed((): string =>
  messages.progress
    .replace("{current}", String(currentQuestionIndex.value + 1))
    .replace("{total}", String(questions.length)),
);
const progressStyle: ComputedRef<Readonly<Record<string, string>>> = computed(
  (): Readonly<Record<string, string>> => ({
    width: `${((currentQuestionIndex.value + 1) / questions.length) * 100}%`,
  }),
);
const feedbackTitle: ComputedRef<string> = computed((): string =>
  currentAnswer.value?.isCorrect ? messages.correct : messages.incorrect,
);
const feedbackTone: ComputedRef<"success" | "warning"> = computed((): "success" | "warning" =>
  currentAnswer.value?.isCorrect ? "success" : "warning",
);
const nextLabel: ComputedRef<string> = computed((): string =>
  currentQuestionIndex.value === questions.length - 1 ? messages.showResult : messages.next,
);
const resultMessage: ComputedRef<string> = computed((): string =>
  score.value === questions.length ? messages.perfectResult : messages.reviewResult,
);
const eyebrow: string = messages.eyebrow;
const title: string = messages.title;
const description: string = messages.description;
const optionGroupLabel: string = messages.optionGroup;
const answerLabel: string = messages.answer;
const resultTitle: string = messages.resultTitle;
const reviewTitle: string = messages.reviewTitle;
const perfectTitle: string = messages.perfectTitle;
const perfectMessage: string = messages.perfectMessage;
const retryLabel: string = messages.retry;
const learnLabel: string = messages.learn;
const learnRoute: RouteName = "learn";
const questionHeadingLevel: HeadingLevel = 2;
const resultHeadingLevel: HeadingLevel = 2;
const reviewHeadingLevel: HeadingLevel = 3;
const cardHeadingSize: "card" = "card";
const leadSize: "lead" = "lead";
const accentTone: "accent" = "accent";
const successTone: "success" = "success";
const secondaryVariant: "secondary" = "secondary";

/** 回答を純粋関数で判定し、画面内の一時配列へ追加する。@returns 戻り値はなく、永続化しない状態だけを更新する。 */
function submitAnswer(): void {
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
/** 次の問題へ進み、問題ごとの選択状態を初期化する。@returns 戻り値はなく、画面内状態だけを更新する。 */
function goToNextQuestion(): void {
  currentQuestionIndex.value += 1;
  selectedOptionId.value = "";
  currentAnswer.value = null;
  hasAnswered.value = false;
}
/** クイズを最初から再開できるよう全一時状態を破棄する。@returns 戻り値はなく、画面内状態だけを初期化する。 */
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
  gap: 30px;
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
.quiz-view-options {
  display: grid;
  gap: 10px;
}
.quiz-view-option {
  align-items: center;
  background: var(--color-surface-soft);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-medium);
  cursor: pointer;
  display: grid;
  gap: 12px;
  grid-template-columns: auto 1fr;
  padding: 15px;
}
.quiz-view-option:has(.quiz-view-radio:checked) {
  background: var(--color-primary-soft);
  border-color: var(--color-primary);
}
.quiz-view-radio {
  height: 20px;
  width: 20px;
}
.quiz-view-radio:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
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
