import { translateMessage } from "@/i18n";
import type {
  ExternalResource,
  InformationCard,
  LearningTopic,
  MailChoice,
  MailChoiceId,
  NavigationItem,
  PolicyItem,
  PsychologyPoint,
  QuizOption,
  QuizQuestion,
  SuspiciousPoint,
  TrainingAccount,
} from "@/types/app";
import {
  HOME_ROUTE_NAME,
  LEARN_ROUTE_NAME,
  MAIL_ROUTE_NAME,
  QUIZ_ROUTE_NAME,
  RESOURCES_ROUTE_NAME,
} from "@/config/routes";

interface InformationCardMessageKeys {
  readonly body: string;
  readonly title: string;
}

interface LearningTopicMessageKeys {
  readonly action: string;
  readonly summary: string;
  readonly title: string;
}

interface MailChoiceDefinition {
  readonly explanationMessageKey: string;
  readonly id: MailChoiceId;
  readonly isSafe: boolean;
  readonly labelMessageKey: string;
}

interface PolicyItemMessageKeys {
  readonly body: string;
  readonly title: string;
}

interface QuizDefinition {
  readonly correctOptionId: string;
  readonly explanationMessageKey: string;
  readonly id: string;
  readonly optionDefinitions: readonly QuizOptionDefinition[];
  readonly promptMessageKey: string;
}

interface QuizOptionDefinition {
  readonly id: string;
  readonly labelMessageKey: string;
}

interface ResourceDefinition {
  readonly descriptionMessageKey: string;
  readonly nameMessageKey: string;
  readonly url: string;
}

interface SuspiciousPointMessageKeys {
  readonly location: string;
  readonly risk: string;
  readonly safeAction: string;
}

const APP_NAME_MESSAGE_KEY: string = "app.name";
const SERVICE_NAME_MESSAGE_KEY: string = "app.serviceName";
const CREDENTIAL_WARNING_MESSAGE_KEY: string = "app.credentialWarning";
const TRAINING_EMAIL_MESSAGE_KEY: string = "app.trainingEmail";
const TRAINING_PASSWORD_MESSAGE_KEY: string = "app.trainingPassword";
const HOME_NAVIGATION_MESSAGE_KEY: string = "navigation.home";
const EXPERIENCE_NAVIGATION_MESSAGE_KEY: string = "navigation.experience";
const LEARN_NAVIGATION_MESSAGE_KEY: string = "navigation.learn";
const QUIZ_NAVIGATION_MESSAGE_KEY: string = "navigation.quiz";
const RESOURCES_NAVIGATION_MESSAGE_KEY: string = "navigation.resources";
export const FOLLOW_LINK_CHOICE_ID: MailChoiceId = "follow-link";

const HOME_CARD_MESSAGE_KEYS: readonly InformationCardMessageKeys[] = [
  { title: "home.cards.0.title", body: "home.cards.0.body" },
  { title: "home.cards.1.title", body: "home.cards.1.body" },
  { title: "home.cards.2.title", body: "home.cards.2.body" },
];

const MAIL_CHOICE_DEFINITIONS: readonly MailChoiceDefinition[] = [
  {
    id: FOLLOW_LINK_CHOICE_ID,
    labelMessageKey: "mailChoices.0.label",
    explanationMessageKey: "mailChoices.0.explanation",
    isSafe: false,
  },
  {
    id: "inspect",
    labelMessageKey: "mailChoices.1.label",
    explanationMessageKey: "mailChoices.1.explanation",
    isSafe: true,
  },
  {
    id: "official",
    labelMessageKey: "mailChoices.2.label",
    explanationMessageKey: "mailChoices.2.explanation",
    isSafe: true,
  },
];

const SUSPICIOUS_POINT_MESSAGE_KEYS: readonly SuspiciousPointMessageKeys[] = [
  {
    location: "suspiciousPoints.0.location",
    risk: "suspiciousPoints.0.risk",
    safeAction: "suspiciousPoints.0.safeAction",
  },
  {
    location: "suspiciousPoints.1.location",
    risk: "suspiciousPoints.1.risk",
    safeAction: "suspiciousPoints.1.safeAction",
  },
  {
    location: "suspiciousPoints.2.location",
    risk: "suspiciousPoints.2.risk",
    safeAction: "suspiciousPoints.2.safeAction",
  },
  {
    location: "suspiciousPoints.3.location",
    risk: "suspiciousPoints.3.risk",
    safeAction: "suspiciousPoints.3.safeAction",
  },
  {
    location: "suspiciousPoints.4.location",
    risk: "suspiciousPoints.4.risk",
    safeAction: "suspiciousPoints.4.safeAction",
  },
];

const LEARNING_TOPIC_MESSAGE_KEYS: readonly LearningTopicMessageKeys[] = [
  {
    title: "learningTopics.0.title",
    summary: "learningTopics.0.summary",
    action: "learningTopics.0.action",
  },
  {
    title: "learningTopics.1.title",
    summary: "learningTopics.1.summary",
    action: "learningTopics.1.action",
  },
  {
    title: "learningTopics.2.title",
    summary: "learningTopics.2.summary",
    action: "learningTopics.2.action",
  },
  {
    title: "learningTopics.3.title",
    summary: "learningTopics.3.summary",
    action: "learningTopics.3.action",
  },
  {
    title: "learningTopics.4.title",
    summary: "learningTopics.4.summary",
    action: "learningTopics.4.action",
  },
  {
    title: "learningTopics.5.title",
    summary: "learningTopics.5.summary",
    action: "learningTopics.5.action",
  },
  {
    title: "learningTopics.6.title",
    summary: "learningTopics.6.summary",
    action: "learningTopics.6.action",
  },
  {
    title: "learningTopics.7.title",
    summary: "learningTopics.7.summary",
    action: "learningTopics.7.action",
  },
  {
    title: "learningTopics.8.title",
    summary: "learningTopics.8.summary",
    action: "learningTopics.8.action",
  },
  {
    title: "learningTopics.9.title",
    summary: "learningTopics.9.summary",
    action: "learningTopics.9.action",
  },
];

const BASIC_ACTION_MESSAGE_KEYS: readonly string[] = [
  "basicActions.0",
  "basicActions.1",
  "basicActions.2",
  "basicActions.3",
  "basicActions.4",
  "basicActions.5",
  "basicActions.6",
];

const QUIZ_DEFINITIONS: readonly QuizDefinition[] = [
  {
    id: "urgency",
    promptMessageKey: "quizQuestions.0.prompt",
    optionDefinitions: [
      { id: "link", labelMessageKey: "quizQuestions.0.options.0" },
      { id: "pause", labelMessageKey: "quizQuestions.0.options.1" },
      { id: "reply", labelMessageKey: "quizQuestions.0.options.2" },
    ],
    correctOptionId: "pause",
    explanationMessageKey: "quizQuestions.0.explanation",
  },
  {
    id: "route",
    promptMessageKey: "quizQuestions.1.prompt",
    optionDefinitions: [
      { id: "mail", labelMessageKey: "quizQuestions.1.options.0" },
      { id: "bookmark", labelMessageKey: "quizQuestions.1.options.1" },
      { id: "short", labelMessageKey: "quizQuestions.1.options.2" },
    ],
    correctOptionId: "bookmark",
    explanationMessageKey: "quizQuestions.1.explanation",
  },
  {
    id: "domain",
    promptMessageKey: "quizQuestions.2.prompt",
    optionDefinitions: [
      { id: "color", labelMessageKey: "quizQuestions.2.options.0" },
      { id: "domain", labelMessageKey: "quizQuestions.2.options.1" },
      { id: "icon", labelMessageKey: "quizQuestions.2.options.2" },
    ],
    correctOptionId: "domain",
    explanationMessageKey: "quizQuestions.2.explanation",
  },
  {
    id: "mfa",
    promptMessageKey: "quizQuestions.3.prompt",
    optionDefinitions: [
      { id: "tell", labelMessageKey: "quizQuestions.3.options.0" },
      { id: "post", labelMessageKey: "quizQuestions.3.options.1" },
      { id: "refuse", labelMessageKey: "quizQuestions.3.options.2" },
    ],
    correctOptionId: "refuse",
    explanationMessageKey: "quizQuestions.3.explanation",
  },
  {
    id: "reuse",
    promptMessageKey: "quizQuestions.4.prompt",
    optionDefinitions: [
      { id: "forget", labelMessageKey: "quizQuestions.4.options.0" },
      { id: "spread", labelMessageKey: "quizQuestions.4.options.1" },
      { id: "slow", labelMessageKey: "quizQuestions.4.options.2" },
    ],
    correctOptionId: "spread",
    explanationMessageKey: "quizQuestions.4.explanation",
  },
];

const RESOURCE_DEFINITIONS: readonly ResourceDefinition[] = [
  {
    nameMessageKey: "externalResources.0.name",
    descriptionMessageKey: "externalResources.0.description",
    url: "https://www.npa.go.jp/bureau/cyber/",
  },
  {
    nameMessageKey: "externalResources.1.name",
    descriptionMessageKey: "externalResources.1.description",
    url: "https://www.npa.go.jp/bureau/cyber/ichiran.html",
  },
  {
    nameMessageKey: "externalResources.2.name",
    descriptionMessageKey: "externalResources.2.description",
    url: "https://www.antiphishing.jp/",
  },
  {
    nameMessageKey: "externalResources.3.name",
    descriptionMessageKey: "externalResources.3.description",
    url: "https://www.caa.go.jp/policies/policy/consumer_policy/caution/caution_033",
  },
  {
    nameMessageKey: "externalResources.4.name",
    descriptionMessageKey: "externalResources.4.description",
    url: "https://www.kokusen.go.jp/category/consult.html",
  },
];

const REVEAL_POINT_MESSAGE_KEYS: readonly InformationCardMessageKeys[] = [
  { title: "reveal.points.0.title", body: "reveal.points.0.body" },
  { title: "reveal.points.1.title", body: "reveal.points.1.body" },
  { title: "reveal.points.2.title", body: "reveal.points.2.body" },
  { title: "reveal.points.3.title", body: "reveal.points.3.body" },
  { title: "reveal.points.4.title", body: "reveal.points.4.body" },
];

const ABOUT_ITEM_MESSAGE_KEYS: readonly PolicyItemMessageKeys[] = [
  { title: "about.items.0.title", body: "about.items.0.body" },
  { title: "about.items.1.title", body: "about.items.1.body" },
  { title: "about.items.2.title", body: "about.items.2.body" },
];

const DISCLAIMER_ITEM_MESSAGE_KEYS: readonly PolicyItemMessageKeys[] = [
  { title: "disclaimer.items.0.title", body: "disclaimer.items.0.body" },
  { title: "disclaimer.items.1.title", body: "disclaimer.items.1.body" },
  { title: "disclaimer.items.2.title", body: "disclaimer.items.2.body" },
];

const PRIVACY_ITEM_MESSAGE_KEYS: readonly PolicyItemMessageKeys[] = [
  { title: "privacy.items.0.title", body: "privacy.items.0.body" },
  { title: "privacy.items.1.title", body: "privacy.items.1.body" },
  { title: "privacy.items.2.title", body: "privacy.items.2.body" },
  { title: "privacy.items.3.title", body: "privacy.items.3.body" },
];

/**
 * 完全な翻訳キーの組から再利用可能な情報カードを生成する。
 * @param messageKeys カードごとのタイトルと本文に対応する完全な翻訳キー。
 * @returns 翻訳済みのカード一覧。
 */
function createInformationCards(
  messageKeys: readonly InformationCardMessageKeys[],
): readonly InformationCard[] {
  // 定義順を画面の表示順として維持しながら、各フィールドを完全なキーで翻訳する。
  const cards: readonly InformationCard[] = messageKeys.map(
    (keys: InformationCardMessageKeys): InformationCard => {
      const card: InformationCard = {
        title: translateMessage(keys.title),
        body: translateMessage(keys.body),
      };
      return card;
    },
  );
  return cards;
}

/**
 * 完全な翻訳キーの組から方針ページの項目を生成する。
 * @param messageKeys 項目ごとのタイトルと本文に対応する完全な翻訳キー。
 * @returns 翻訳済みの方針項目一覧。
 */
function createPolicyItems(messageKeys: readonly PolicyItemMessageKeys[]): readonly PolicyItem[] {
  // JSON内の並びを維持し、方針ページ間で同じ変換処理を重複させない。
  const items: readonly PolicyItem[] = messageKeys.map(
    (keys: PolicyItemMessageKeys): PolicyItem => {
      const item: PolicyItem = {
        title: translateMessage(keys.title),
        body: translateMessage(keys.body),
      };
      return item;
    },
  );
  return items;
}

/**
 * クイズ定義を、画面と判定サービスが使用する翻訳済み問題へ変換する。
 * @param definition 問題ID、正解ID、各表示文言の完全な翻訳キー。
 * @returns 翻訳済みの選択肢と解説を含む問題。
 */
function createQuizQuestion(definition: QuizDefinition): QuizQuestion {
  // 選択肢IDと表示文言の対応を保ち、正誤判定に翻訳文字列を使わないよう変換する。
  const options: readonly QuizOption[] = definition.optionDefinitions.map(
    (optionDefinition: QuizOptionDefinition): QuizOption => {
      const option: QuizOption = {
        id: optionDefinition.id,
        label: translateMessage(optionDefinition.labelMessageKey),
      };
      return option;
    },
  );
  const question: QuizQuestion = {
    id: definition.id,
    prompt: translateMessage(definition.promptMessageKey),
    options,
    correctOptionId: definition.correctOptionId,
    explanation: translateMessage(definition.explanationMessageKey),
  };
  return question;
}

export const APP_NAME: string = translateMessage(APP_NAME_MESSAGE_KEY);
export const SERVICE_NAME: string = translateMessage(SERVICE_NAME_MESSAGE_KEY);
export const REAL_CREDENTIAL_WARNING: string = translateMessage(CREDENTIAL_WARNING_MESSAGE_KEY);
export const TRAINING_ACCOUNT: TrainingAccount = {
  email: translateMessage(TRAINING_EMAIL_MESSAGE_KEY),
  password: translateMessage(TRAINING_PASSWORD_MESSAGE_KEY),
};

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { label: translateMessage(HOME_NAVIGATION_MESSAGE_KEY), routeName: HOME_ROUTE_NAME },
  { label: translateMessage(EXPERIENCE_NAVIGATION_MESSAGE_KEY), routeName: MAIL_ROUTE_NAME },
  { label: translateMessage(LEARN_NAVIGATION_MESSAGE_KEY), routeName: LEARN_ROUTE_NAME },
  { label: translateMessage(QUIZ_NAVIGATION_MESSAGE_KEY), routeName: QUIZ_ROUTE_NAME },
  { label: translateMessage(RESOURCES_NAVIGATION_MESSAGE_KEY), routeName: RESOURCES_ROUTE_NAME },
];

// 利用者が選ぶ行動の制御IDと翻訳済み表示文言を一対一で対応させる。
export const MAIL_CHOICES: readonly MailChoice[] = MAIL_CHOICE_DEFINITIONS.map(
  (definition: MailChoiceDefinition): MailChoice => {
    const choice: MailChoice = {
      id: definition.id,
      label: translateMessage(definition.labelMessageKey),
      isSafe: definition.isSafe,
      explanation: translateMessage(definition.explanationMessageKey),
    };
    return choice;
  },
);

// 振り返り画面の番号を表示順から生成し、JSON側へ制御値を混在させない。
export const SUSPICIOUS_POINTS: readonly SuspiciousPoint[] = SUSPICIOUS_POINT_MESSAGE_KEYS.map(
  (keys: SuspiciousPointMessageKeys, index: number): SuspiciousPoint => {
    const point: SuspiciousPoint = {
      id: index + 1,
      location: translateMessage(keys.location),
      risk: translateMessage(keys.risk),
      safeAction: translateMessage(keys.safeAction),
    };
    return point;
  },
);

// 学習項目を定義順に翻訳し、画面側へ構造化文言の取得処理を持たせない。
export const LEARNING_TOPICS: readonly LearningTopic[] = LEARNING_TOPIC_MESSAGE_KEYS.map(
  (keys: LearningTopicMessageKeys): LearningTopic => {
    const topic: LearningTopic = {
      title: translateMessage(keys.title),
      summary: translateMessage(keys.summary),
      action: translateMessage(keys.action),
    };
    return topic;
  },
);

// 基本行動を完全な翻訳キーごとに取得し、配列全体を階層オブジェクトとして参照しない。
export const BASIC_ACTIONS: readonly string[] = BASIC_ACTION_MESSAGE_KEYS.map(
  (messageKey: string): string => {
    const action: string = translateMessage(messageKey);
    return action;
  },
);

// 問題IDと正解IDを維持したまま、表示文言だけをロケールJSONから取得する。
export const QUIZ_QUESTIONS: readonly QuizQuestion[] = QUIZ_DEFINITIONS.map(
  (definition: QuizDefinition): QuizQuestion => {
    const question: QuizQuestion = createQuizQuestion(definition);
    return question;
  },
);

// 公的機関のURLを翻訳対象から分離し、表示名と説明だけを翻訳する。
export const EXTERNAL_RESOURCES: readonly ExternalResource[] = RESOURCE_DEFINITIONS.map(
  (definition: ResourceDefinition): ExternalResource => {
    const resource: ExternalResource = {
      name: translateMessage(definition.nameMessageKey),
      description: translateMessage(definition.descriptionMessageKey),
      url: definition.url,
    };
    return resource;
  },
);

export const HOME_CARDS: readonly InformationCard[] =
  createInformationCards(HOME_CARD_MESSAGE_KEYS);
export const REVEAL_POINTS: readonly PsychologyPoint[] =
  createInformationCards(REVEAL_POINT_MESSAGE_KEYS);
export const ABOUT_ITEMS: readonly PolicyItem[] = createPolicyItems(ABOUT_ITEM_MESSAGE_KEYS);
export const DISCLAIMER_ITEMS: readonly PolicyItem[] = createPolicyItems(
  DISCLAIMER_ITEM_MESSAGE_KEYS,
);
export const PRIVACY_ITEMS: readonly PolicyItem[] = createPolicyItems(PRIVACY_ITEM_MESSAGE_KEYS);
