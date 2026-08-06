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

describe("Cloudflare Workersの公開設定", (): void => {
  it("ビルド成果物をSPAとして公開する", (): void => {
    const wranglerSource: string = readFileSync(wranglerFilePath, "utf8");
    const configuration: WranglerConfiguration = JSON.parse(
      wranglerSource,
    ) as WranglerConfiguration;

    expect(configuration.name).toBe("phishing-awareness");
    expect(configuration.workers_dev).toBe(true);
    expect(configuration.preview_urls).toBe(false);
    expect(configuration.assets.directory).toBe("./dist");
    expect(configuration.assets.not_found_handling).toBe("single-page-application");
  });
});
