import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface WranglerAssetsConfiguration {
  readonly directory: string;
  readonly not_found_handling: string;
}

interface WranglerConfiguration {
  readonly name: string;
  readonly compatibility_date: string;
  readonly workers_dev: boolean;
  readonly preview_urls: boolean;
  readonly assets: WranglerAssetsConfiguration;
}

const wranglerFilePath: string = resolve("wrangler.jsonc");

/**
 * 外部ファイルから読み込んだ値が文字列キーを持つオブジェクトか確認する。
 * @param candidate 構造が未検証のJSON値。
 * @returns nullや配列ではないオブジェクトの場合はtrue。
 */
function isUnknownRecord(candidate: unknown): candidate is Record<string, unknown> {
  const isRecord: boolean =
    typeof candidate === "object" && candidate !== null && !Array.isArray(candidate);
  return isRecord;
}

/**
 * 外部のwrangler設定がテストで参照する契約を満たすか検証する。
 * @param candidate JSON.parse直後の未検証値。
 * @returns 必須の公開設定と静的アセット設定が正しい型の場合はtrue。
 */
function isWranglerConfiguration(candidate: unknown): candidate is WranglerConfiguration {
  // トップレベルを先に検証し、プリミティブ値からプロパティを読むことを防ぐ。
  if (!isUnknownRecord(candidate)) {
    return false;
  }
  const assets: unknown = candidate.assets;

  // assetsの構造を検証し、ディレクトリやSPA設定の欠測を不正な設定として扱う。
  if (!isUnknownRecord(assets)) {
    return false;
  }
  const hasValidConfiguration: boolean =
    typeof candidate.name === "string" &&
    typeof candidate.compatibility_date === "string" &&
    typeof candidate.workers_dev === "boolean" &&
    typeof candidate.preview_urls === "boolean" &&
    typeof assets.directory === "string" &&
    typeof assets.not_found_handling === "string";
  return hasValidConfiguration;
}

describe("Cloudflare Workersの公開設定", (): void => {
  it("ビルド成果物をSPAとして公開する", (): void => {
    const wranglerSource: string = readFileSync(wranglerFilePath, "utf8");
    const parsedConfiguration: unknown = JSON.parse(wranglerSource);

    // 設定値を利用する前に実行時検証し、型アサーションによる誤判定を防ぐ。
    if (!isWranglerConfiguration(parsedConfiguration)) {
      throw new Error("wrangler.jsonc does not match the expected configuration.");
    }
    const configuration: WranglerConfiguration = parsedConfiguration;

    expect(configuration.name).toBe("phishing-awareness");
    expect(configuration.workers_dev).toBe(true);
    expect(configuration.preview_urls).toBe(false);
    expect(configuration.assets.directory).toBe("./dist");
    expect(configuration.assets.not_found_handling).toBe("single-page-application");
  });
});
