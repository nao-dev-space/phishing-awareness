import { readFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const PID_FILE: string = fileURLToPath(new URL("../.vscode/.vite.pid", import.meta.url));
const WINDOWS_PLATFORM: NodeJS.Platform = "win32";
const DECIMAL_RADIX: number = 10;

/**
 * 起動スクリプトが記録したViteプロセスだけを終了する。
 * @returns 終了処理とPIDファイル削除の完了時に解決するPromise。
 */
async function stopDevelopmentServer(): Promise<void> {
  let processIdText: string;

  // 起動スクリプトが保存したPIDだけを読み取り、無関係なプロセスを終了しないよう対象を限定する。
  try {
    processIdText = await readFile(PID_FILE, "utf8");
  } catch {
    // PIDファイルがなければこのデバッグ操作で起動したプロセスはないため、終了処理を省略する。
    return;
  }

  const processId: number = Number.parseInt(processIdText, DECIMAL_RADIX);
  const hasInvalidProcessId: boolean = !Number.isInteger(processId) || processId <= 0;

  // 不正なPIDでOSコマンドを実行せず、壊れた管理ファイルだけを削除する。
  if (hasInvalidProcessId) {
    await rm(PID_FILE, { force: true });
    return;
  }

  // OSごとの安全な終了方法で、記録済みのViteプロセスだけを停止する。
  try {
    // Windowsでは起動時に記録したNodeプロセスを直接終了し、管理者権限が必要なOSコマンドを避ける。
    if (process.platform === WINDOWS_PLATFORM) {
      process.kill(processId, "SIGTERM");
    } else {
      // POSIXでは独立プロセスグループへ通知し、Viteが起動した子プロセスも同時に終了する。
      process.kill(-processId, "SIGTERM");
    }
  } catch {
    // すでに終了済みの場合も、残ったPIDファイルを削除して次回起動を妨げない。
  }

  await rm(PID_FILE, { force: true });
}

await stopDevelopmentServer();
