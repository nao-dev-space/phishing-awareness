import type { Component } from "vue";

export type RouteName =
  | "home"
  | "experience-mail"
  | "experience-login"
  | "experience-checkpoint"
  | "experience-reveal"
  | "experience-review"
  | "learn"
  | "quiz"
  | "resources"
  | "about"
  | "disclaimer"
  | "privacy"
  | "not-found";

/** Vue Routerへ登録する画面ルートの定義を表す。 */
export interface RouteDefinition {
  readonly name: RouteName;
  readonly path: string;
  readonly titleMessageKey: string;
  readonly component: Component;
}

/** コンポーネントへ依存しないアプリ固有のルート設定を表す。 */
export interface RouteConfiguration {
  readonly name: RouteName;
  readonly path: string;
  readonly titleMessageKey: string;
}

/** ナビゲーションに表示するリンク項目を表す。 */
export interface NavigationItem {
  readonly label: string;
  readonly routeName: RouteName;
}

/** 疑似ログイン画面に表示する固定の架空認証情報を表す。 */
export interface TrainingCredentialPreview {
  readonly email: string;
  readonly passwordMask: string;
}

export type MailChoiceId = "follow-link" | "inspect" | "official";

/** 疑似メール画面で利用者が選択できる行動を表す。 */
export interface MailChoice {
  readonly id: MailChoiceId;
  readonly label: string;
  readonly isSafe: boolean;
  readonly explanation: string;
}

/** 疑似メールに含まれる不審点と安全な対応を表す。 */
export interface SuspiciousPoint {
  readonly id: number;
  readonly location: string;
  readonly risk: string;
  readonly safeAction: string;
}

/** 学習画面に表示するフィッシング対策のトピックを表す。 */
export interface LearningTopic {
  readonly title: string;
  readonly summary: string;
  readonly action: string;
}

/** 見出しと本文で構成する汎用コンテンツを表す。 */
export interface TitledContent {
  readonly body: string;
  readonly title: string;
}

export type InformationCard = TitledContent;
export type PsychologyPoint = TitledContent;
export type PolicyItem = TitledContent;

/** クイズ問題で選択できる回答候補を表す。 */
export interface QuizOption {
  readonly id: string;
  readonly label: string;
}

/** 選択肢と正解を含むクイズの一問を表す。 */
export interface QuizQuestion {
  readonly id: string;
  readonly prompt: string;
  readonly options: readonly QuizOption[];
  readonly correctOptionId: string;
  readonly explanation: string;
}

/** 利用者が確定したクイズ回答と正誤状態を表す。 */
export interface QuizAnswerState {
  readonly questionId: string;
  readonly selectedOptionId: string;
  readonly isCorrect: boolean;
}

/** 学習用に案内する外部情報源を表す。 */
export interface ExternalResource {
  readonly name: string;
  readonly description: string;
  readonly url: string;
}
