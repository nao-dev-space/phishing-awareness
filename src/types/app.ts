import type { Component } from "vue";

export type RouteName =
  | "home"
  | "experience-mail"
  | "experience-login"
  | "experience-reveal"
  | "experience-review"
  | "learn"
  | "quiz"
  | "resources"
  | "about"
  | "disclaimer"
  | "privacy"
  | "not-found";

export interface RouteDefinition {
  readonly name: RouteName;
  readonly path: string;
  readonly title: string;
  readonly component: Component;
}

export interface NavigationItem {
  readonly label: string;
  readonly routeName: RouteName;
}

export interface TrainingAccount {
  readonly email: string;
  readonly password: string;
}

export type MailChoiceId = "follow-link" | "inspect" | "official";

export interface MailChoice {
  readonly id: MailChoiceId;
  readonly label: string;
  readonly isSafe: boolean;
  readonly explanation: string;
}

export interface SuspiciousPoint {
  readonly id: number;
  readonly location: string;
  readonly risk: string;
  readonly safeAction: string;
}

export interface LearningTopic {
  readonly title: string;
  readonly summary: string;
  readonly action: string;
}

export interface QuizOption {
  readonly id: string;
  readonly label: string;
}

export interface QuizQuestion {
  readonly id: string;
  readonly prompt: string;
  readonly options: readonly QuizOption[];
  readonly correctOptionId: string;
  readonly explanation: string;
}

export interface QuizAnswerState {
  readonly questionId: string;
  readonly selectedOptionId: string;
  readonly isCorrect: boolean;
}

export interface ExternalResource {
  readonly name: string;
  readonly description: string;
  readonly url: string;
}
