import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const DEV_SERVER_URL = "http://localhost:5173/";
const EXPECTED_MARKER = 'content="is-this-login-real"';
const REQUEST_TIMEOUT_MS = 800;
const START_TIMEOUT_MS = 12_000;
const POLL_INTERVAL_MS = 150;
const WORKSPACE_DIRECTORY = fileURLToPath(new URL("../", import.meta.url));
const VITE_EXECUTABLE = fileURLToPath(new URL("../node_modules/vite/bin/vite.js", import.meta.url));
const PID_FILE = fileURLToPath(new URL("../.vscode/.vite.pid", import.meta.url));

/**
 * 指定時間だけ待機する。
 * @param {number} durationMs 待機するミリ秒数。
 * @returns {Promise<void>} 待機完了時に解決するPromise。
 */
function delay(durationMs) {
  return new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });
}

/**
 * 5173番ポートで期待する学習アプリが応答しているか確認する。
 * @returns {Promise<boolean>} 対象アプリが正常応答した場合はtrue。
 */
async function isExpectedApplicationReady() {
  try {
    const response = await fetch(DEV_SERVER_URL, {
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    const responseBody = await response.text();
    return response.ok && responseBody.includes(EXPECTED_MARKER);
  } catch {
    return false;
  }
}

/**
 * 5173番ポートで何らかのHTTPサーバーが応答しているか確認する。
 * @returns {Promise<boolean>} HTTP応答を受け取った場合はtrue。
 */
async function isPortAlreadyUsed() {
  try {
    await fetch(DEV_SERVER_URL, {
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Viteを独立プロセスとして起動し、応答を確認してから正常終了する。
 * @returns {Promise<void>} Viteの準備完了時に解決するPromise。
 * @throws {Error} 別アプリがポートを使用中、またはViteが時間内に起動しない場合。
 */
async function startDevelopmentServer() {
  const isAlreadyReady = await isExpectedApplicationReady();
  if (isAlreadyReady) {
    return;
  }

  const isPortUnavailable = await isPortAlreadyUsed();
  if (isPortUnavailable) {
    throw new Error("ポート5173は別のアプリケーションが使用しています。");
  }

  const viteProcess = spawn(
    process.execPath,
    [VITE_EXECUTABLE, "--host", "localhost", "--port", "5173", "--strictPort"],
    {
      cwd: WORKSPACE_DIRECTORY,
      detached: true,
      stdio: "ignore",
      windowsHide: true,
    },
  );
  viteProcess.unref();
  await writeFile(PID_FILE, String(viteProcess.pid), "utf8");

  const startDeadline = Date.now() + START_TIMEOUT_MS;
  while (Date.now() < startDeadline) {
    const isReady = await isExpectedApplicationReady();
    if (isReady) {
      return;
    }
    await delay(POLL_INTERVAL_MS);
  }

  throw new Error("Vite開発サーバーが時間内に起動しませんでした。");
}

await startDevelopmentServer();
