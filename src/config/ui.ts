export const BUTTON_TYPES = {
  BUTTON: "button",
  SUBMIT: "submit",
} as const;

export type ButtonType = (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES];

export const BUTTON_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  QUIET: "quiet",
  DANGER: "danger",
} as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS];

export const HEADING_LEVELS = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
} as const;

export type HeadingLevel = (typeof HEADING_LEVELS)[keyof typeof HEADING_LEVELS];

export const HEADING_SIZES = {
  HERO: "hero",
  PAGE: "page",
  SECTION: "section",
  CARD: "card",
} as const;

export type HeadingSize = (typeof HEADING_SIZES)[keyof typeof HEADING_SIZES];

export const NOTICE_ROLES = {
  ALERT: "alert",
  STATUS: "status",
} as const;

export type NoticeRole = (typeof NOTICE_ROLES)[keyof typeof NOTICE_ROLES];

export const NOTICE_TONES = {
  INFO: "info",
  WARNING: "warning",
  SUCCESS: "success",
} as const;

export type NoticeTone = (typeof NOTICE_TONES)[keyof typeof NOTICE_TONES];

export const QUIZ_FEEDBACK_TONES = {
  SUCCESS: NOTICE_TONES.SUCCESS,
  WARNING: NOTICE_TONES.WARNING,
} as const;

export type QuizFeedbackTone = (typeof QUIZ_FEEDBACK_TONES)[keyof typeof QUIZ_FEEDBACK_TONES];

export const ROUTE_ACTION_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  QUIET: "quiet",
} as const;

export type RouteActionVariant = (typeof ROUTE_ACTION_VARIANTS)[keyof typeof ROUTE_ACTION_VARIANTS];

export const TEXT_SIZES = {
  SMALL: "small",
  BODY: "body",
  LEAD: "lead",
} as const;

export type TextSize = (typeof TEXT_SIZES)[keyof typeof TEXT_SIZES];

export const TEXT_TAGS = {
  PARAGRAPH: "p",
  SPAN: "span",
} as const;

export type TextTag = (typeof TEXT_TAGS)[keyof typeof TEXT_TAGS];

export const TEXT_TONES = {
  DEFAULT: "default",
  MUTED: "muted",
  ACCENT: "accent",
  WARNING: "warning",
  SUCCESS: "success",
} as const;

export type TextTone = (typeof TEXT_TONES)[keyof typeof TEXT_TONES];
