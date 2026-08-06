import { messageGroup } from "@/i18n";
import type {
  ExternalResource,
  LearningTopic,
  MailChoice,
  NavigationItem,
  QuizQuestion,
  SuspiciousPoint,
  TrainingAccount,
} from "@/types/app";

const appMessages = messageGroup("app");
const navigationMessages = messageGroup("navigation");
const mailChoiceMessages = messageGroup("mailChoices");
const suspiciousPointMessages = messageGroup("suspiciousPoints");
const learningTopicMessages = messageGroup("learningTopics");
const quizQuestionMessages = messageGroup("quizQuestions");
const resourceMessages = messageGroup("externalResources");

export const APP_NAME: string = appMessages.name;
export const SERVICE_NAME: string = appMessages.serviceName;
export const REAL_CREDENTIAL_WARNING: string = appMessages.credentialWarning;
export const TRAINING_ACCOUNT: TrainingAccount = {
  email: appMessages.trainingEmail,
  password: appMessages.trainingPassword,
};

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { label: navigationMessages.home, routeName: "home" },
  { label: navigationMessages.experience, routeName: "experience-mail" },
  { label: navigationMessages.learn, routeName: "learn" },
  { label: navigationMessages.quiz, routeName: "quiz" },
  { label: navigationMessages.resources, routeName: "resources" },
];

export const MAIL_CHOICES: readonly MailChoice[] = [
  { id: "follow-link", ...mailChoiceMessages[0], isSafe: false },
  { id: "inspect", ...mailChoiceMessages[1], isSafe: true },
  { id: "official", ...mailChoiceMessages[2], isSafe: true },
];

export const SUSPICIOUS_POINTS: readonly SuspiciousPoint[] = suspiciousPointMessages.map(
  (point, index): SuspiciousPoint => ({ id: index + 1, ...point }),
);
export const LEARNING_TOPICS: readonly LearningTopic[] = learningTopicMessages;
export const BASIC_ACTIONS: readonly string[] = messageGroup("basicActions");

const quizDefinitions = [
  { id: "urgency", optionIds: ["link", "pause", "reply"], correctOptionId: "pause" },
  { id: "route", optionIds: ["mail", "bookmark", "short"], correctOptionId: "bookmark" },
  { id: "domain", optionIds: ["color", "domain", "icon"], correctOptionId: "domain" },
  { id: "mfa", optionIds: ["tell", "post", "refuse"], correctOptionId: "refuse" },
  { id: "reuse", optionIds: ["forget", "spread", "slow"], correctOptionId: "spread" },
] as const;

export const QUIZ_QUESTIONS: readonly QuizQuestion[] = quizDefinitions.map(
  (definition, questionIndex): QuizQuestion => {
    const messages = quizQuestionMessages[questionIndex];
    return {
      id: definition.id,
      prompt: messages.prompt,
      options: definition.optionIds.map((id, optionIndex) => ({
        id,
        label: messages.options[optionIndex],
      })),
      correctOptionId: definition.correctOptionId,
      explanation: messages.explanation,
    };
  },
);

const resourceUrls = [
  "https://www.npa.go.jp/bureau/cyber/",
  "https://www.npa.go.jp/bureau/cyber/ichiran.html",
  "https://www.antiphishing.jp/",
  "https://www.caa.go.jp/policies/policy/consumer_policy/caution/caution_033",
  "https://www.kokusen.go.jp/category/consult.html",
] as const;

export const EXTERNAL_RESOURCES: readonly ExternalResource[] = resourceMessages.map(
  (resource, index): ExternalResource => ({ ...resource, url: resourceUrls[index] }),
);
