import type { RouteConfiguration, RouteName } from "@/types/app";

export const HOME_ROUTE_NAME: RouteName = "home";
export const MAIL_ROUTE_NAME: RouteName = "experience-mail";
export const LOGIN_ROUTE_NAME: RouteName = "experience-login";
export const REVEAL_ROUTE_NAME: RouteName = "experience-reveal";
export const REVIEW_ROUTE_NAME: RouteName = "experience-review";
export const LEARN_ROUTE_NAME: RouteName = "learn";
export const QUIZ_ROUTE_NAME: RouteName = "quiz";
export const RESOURCES_ROUTE_NAME: RouteName = "resources";
export const ABOUT_ROUTE_NAME: RouteName = "about";
export const DISCLAIMER_ROUTE_NAME: RouteName = "disclaimer";
export const PRIVACY_ROUTE_NAME: RouteName = "privacy";
export const NOT_FOUND_ROUTE_NAME: RouteName = "not-found";

export const ROUTE_CONFIGURATIONS: readonly RouteConfiguration[] = [
  { name: HOME_ROUTE_NAME, path: "/", titleMessageKey: "routeTitles.home" },
  {
    name: MAIL_ROUTE_NAME,
    path: "/experience/mail",
    titleMessageKey: "routeTitles.mail",
  },
  {
    name: LOGIN_ROUTE_NAME,
    path: "/experience/login",
    titleMessageKey: "routeTitles.login",
  },
  {
    name: REVEAL_ROUTE_NAME,
    path: "/experience/reveal",
    titleMessageKey: "routeTitles.reveal",
  },
  {
    name: REVIEW_ROUTE_NAME,
    path: "/experience/review",
    titleMessageKey: "routeTitles.review",
  },
  { name: LEARN_ROUTE_NAME, path: "/learn", titleMessageKey: "routeTitles.learn" },
  { name: QUIZ_ROUTE_NAME, path: "/quiz", titleMessageKey: "routeTitles.quiz" },
  {
    name: RESOURCES_ROUTE_NAME,
    path: "/resources",
    titleMessageKey: "routeTitles.resources",
  },
  { name: ABOUT_ROUTE_NAME, path: "/about", titleMessageKey: "routeTitles.about" },
  {
    name: DISCLAIMER_ROUTE_NAME,
    path: "/disclaimer",
    titleMessageKey: "routeTitles.disclaimer",
  },
  {
    name: PRIVACY_ROUTE_NAME,
    path: "/privacy",
    titleMessageKey: "routeTitles.privacy",
  },
  {
    name: NOT_FOUND_ROUTE_NAME,
    path: "/:pathMatch(.*)*",
    titleMessageKey: "routeTitles.notFound",
  },
];
