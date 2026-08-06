import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const headersFilePath: string = resolve("public/_headers");
const redirectsFilePath: string = resolve("public/_redirects");
const quizViewFilePath: string = resolve("src/views/QuizView.vue");

describe("公開時の多層防御", (): void => {
  it("Cloudflare Pagesへ厳格なセキュリティヘッダーを設定する", (): void => {
    const headers: string = readFileSync(headersFilePath, "utf8");

    expect(headers).toContain("default-src 'none'");
    expect(headers).toContain("script-src 'self'");
    expect(headers).toContain("style-src 'self'");
    expect(headers).toContain("connect-src 'none'");
    expect(headers).toContain("form-action 'none'");
    expect(headers).toContain("frame-ancestors 'none'");
    expect(headers).toContain("X-Content-Type-Options: nosniff");
    expect(headers).toContain("Referrer-Policy: no-referrer");
    expect(headers).not.toContain("'unsafe-inline'");
    expect(headers).not.toContain("'unsafe-eval'");
    expect(existsSync(redirectsFilePath)).toBe(false);
  });

  it("クイズ画面でCSPに反するインラインstyleを使用しない", (): void => {
    const quizViewSource: string = readFileSync(quizViewFilePath, "utf8");

    expect(quizViewSource).not.toContain(":style=");
    expect(quizViewSource).toContain("quiz-view-progress-bar-5");
  });
});
