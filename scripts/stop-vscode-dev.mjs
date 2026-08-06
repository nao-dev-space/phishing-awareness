import { execFileSync } from "node:child_process";
import { readFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const PID_FILE = fileURLToPath(new URL("../.vscode/.vite.pid", import.meta.url));
const WINDOWS_PLATFORM = "win32";

/**
 * 起動スクリプトが記録したViteプロセスだけを終了する。
 * @returns {Promise<void>} 終了処理とPIDファイル削除の完了時に解決するPromise。
 */
async function stopDevelopmentServer() {
  let pidText;
  try {
    pidText = await readFile(PID_FILE, "utf8");
  } catch {
    return;
  }

  const processId = Number.parseInt(pidText, 10);
  if (!Number.isInteger(processId) || processId <= 0) {
    await rm(PID_FILE, { force: true });
    return;
  }

  try {
    if (process.platform === WINDOWS_PLATFORM) {
      execFileSync("taskkill.exe", ["/PID", String(processId), "/T", "/F"], {
        stdio: "ignore",
        windowsHide: true,
      });
    } else {
      process.kill(-processId, "SIGTERM");
    }
  } catch {
    // すでに終了済みの場合も、残ったPIDファイルを削除して次回起動を妨げない。
  }

  await rm(PID_FILE, { force: true });
}

await stopDevelopmentServer();
