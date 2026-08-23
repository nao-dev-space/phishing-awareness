import { spawn, type ChildProcess } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const DEV_SERVER_URL: string = "http://localhost:5173/";
const EXPECTED_MARKER: string = 'content="is-this-login-real"';
const REQUEST_TIMEOUT_MS: number = 800;
const START_TIMEOUT_MS: number = 12_000;
const POLL_INTERVAL_MS: number = 150;
const WORKSPACE_DIRECTORY: string = fileURLToPath(new URL("../", import.meta.url));
const VITE_EXECUTABLE: string = fileURLToPath(
  new URL("../node_modules/vite/bin/vite.js", import.meta.url),
);
const PID_FILE: string = fileURLToPath(new URL("../.vscode/.vite.pid", import.meta.url));

/**
 * 指定時間だけ待機する。
 * @param durationMs 待機するミリ秒数。
 * @returns 待機完了時に解決するPromise。
 */
function delay(durationMs: number): Promise<void> {
  const waitPromise: Promise<void> = new Promise((resolve: () => void): void => {
    setTimeout(resolve, durationMs);
  });
  return waitPromise;
}

/**
 * 5173番ポートで期待する学習アプリが応答しているか確認する。
 * @returns 対象アプリが正常応答した場合はtrue。
 */
async function isExpectedApplicationReady(): Promise<boolean> {
  // 開発サーバーは未起動の可能性があるため、タイムアウト付きで応答内容を確認する。
  try {
    const response: Response = await fetch(DEV_SERVER_URL, {
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    const responseBody: string = await response.text();
    const isExpectedApplication: boolean = response.ok && responseBody.includes(EXPECTED_MARKER);
    return isExpectedApplication;
  } catch {
    // 接続拒否とタイムアウトは未起動として扱い、VS Codeタスク側へ例外を漏らさない。
    return false;
  }
}

/**
 * 5173番ポートで何らかのHTTPサーバーが応答しているか確認する。
 * @returns HTTP応答を受け取った場合はtrue。
 */
async function isPortAlreadyUsed(): Promise<boolean> {
  // 期待するアプリ以外が同じポートを使用していないか判定するため、HTTP応答の有無だけを確認する。
  try {
    await fetch(DEV_SERVER_URL, {
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    return true;
  } catch {
    // 接続できない場合はポートを利用可能と判断し、Vite起動処理を続行する。
    return false;
  }
}

/**
 * Viteを独立プロセスとして起動し、応答を確認してから正常終了する。
 * @returns Viteの準備完了時に解決するPromise。
 * @throws 別アプリがポートを使用中、またはViteが時間内に起動しない場合にErrorを送出する。
 */
async function startDevelopmentServer(): Promise<void> {
  const isAlreadyReady: boolean = await isExpectedApplicationReady();

  // 対象アプリが起動済みなら重複プロセスを作らず、そのままデバッグ準備完了とする。
  if (isAlreadyReady) {
    return;
  }

  const isPortUnavailable: boolean = await isPortAlreadyUsed();

  // 別アプリを誤ってデバッグ表示することを防ぐため、ポート競合時は明示的に停止する。
  if (isPortUnavailable) {
    throw new Error("ポート5173は別のアプリケーションが使用しています。");
  }

  const viteArguments: readonly string[] = [
    VITE_EXECUTABLE,
    "--host",
    "localhost",
    "--port",
    "5173",
    "--strictPort",
  ];
  const viteProcess: ChildProcess = spawn(process.execPath, viteArguments, {
    cwd: WORKSPACE_DIRECTORY,
    detached: true,
    stdio: "ignore",
    windowsHide: true,
  });
  viteProcess.unref();
  await writeFile(PID_FILE, String(viteProcess.pid), "utf8");

  const startDeadlineMilliseconds: number = Date.now() + START_TIMEOUT_MS;

  // 起動期限までHTTP応答を確認し、ブラウザーが未準備の画面を開くことを防ぐ。
  while (Date.now() < startDeadlineMilliseconds) {
    const isReady: boolean = await isExpectedApplicationReady();

    // 期待するHTMLを確認できた時点で、VS Codeへ準備完了を通知する。
    if (isReady) {
      return;
    }
    await delay(POLL_INTERVAL_MS);
  }

  throw new Error("Vite開発サーバーが時間内に起動しませんでした。");
}

await startDevelopmentServer();
