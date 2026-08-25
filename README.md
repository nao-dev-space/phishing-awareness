# そのログイン、本物ですか？

完全な架空サービス「Cloud Letter」から届く偽メールと偽ログイン画面を安全に疑似体験し、フィッシングを見抜く視点と安全な行動を学ぶ、日本語専用のフロントエンドWebアプリです。

## 開発目的と主な機能

- 疑似メール、疑似ログイン、種明かし、8項目の振り返り
- 10テーマの学習コンテンツと9つの基本行動
- 5問の選択式確認テスト
- 公的機関の相談・参考情報
- About、免責事項、プライバシー方針、404ページ
- PC、タブレット、スマートフォン、キーボード操作への対応

Cloud Letterは完全な架空サービスであり、実在する企業、団体、サービスとは関係ありません。実在サービスの名称、ロゴ、画面構成は使用していません。

## 安全上の設計

- バックエンド、API、データベース、Service Workerを使用しません。
- 疑似ログイン画面には`form`や`input`を使用せず、ボタン操作で固定された架空の認証情報を疑似入力します。
- メールアドレスやパスワードを受け取る処理、外部送信、ログ出力、CookieやWeb Storageへの保存処理はありません。
- 疑似ログイン操作は認証処理を行わず、処理中・正常に見える表示と立ち止まり画面を経て種明かしへ移動します。
- 外部アクセス解析、広告、エラー監視SDKを導入していません。
- Cloudflare Workers Static Assetsでは`public/_headers`から厳格なCSPなどのHTTPセキュリティヘッダーを適用します。

疑似ログイン画面には認証情報を入力できる要素がないため、ブラウザーのパスワードマネージャーが認証情報を保存するきっかけを作りません。

詳細は[アーキテクチャと安全設計](docs/architecture.md)を参照してください。

## 使用技術

Vue 3.5以降、TypeScript、Vite、Vue Router、Vue I18n、Vitest、Vue Test Utils、ESLint、Prettier、Stylelint、`vue-tsc`を使用します。状態は各画面のメモリ内だけで扱うためPiniaは使用しません。日本語専用ですが、画面文言をコードから分離するためVue I18nを使用しています。

画面に表示する本文、ラベル、アクセシビリティ用ラベル、構造化された学習・クイズ文言は`src/i18n/locales/ja.json`で一元管理します。TypeScriptからは完全な翻訳キーパスを指定して取得し、URL、ルート名、正解IDなど翻訳対象でない制御値だけを型付き設定として分離します。

## ディレクトリ構成

```text
src/
  components/  Atomic Designに基づく共通UIとレイアウト
  config/      ルート以外の表示設定と静的データ
  i18n/        Vue I18n設定とJSON形式の日本語表示文言
  router/      ルート定義
  services/    Vue非依存の判定・検証、ブラウザー入出力、エラー変換
  types/       共有型
  views/       ルート画面
tests/         自動テスト
docs/          詳細設計
public/        公開時のHTTPセキュリティヘッダー
```

## 必要環境とセットアップ

Node.js 22以降とnpmを使用します。以下はプロジェクトルートで実行します。

```powershell
npm install
```

依存関係をロックファイルどおりにインストールします。

```powershell
npm run dev
```

開発サーバーを`http://localhost:5173/`で起動します。他のプロセスが同じポートを使用している場合は、誤った画面を開かないようエラーで停止します。

### VS CodeからF5で確認する

1. VS Codeでこのプロジェクトフォルダを開きます。
2. 初回だけ、プロジェクトルートで`npm install`を実行します。
3. `F5`キーを押します。
4. 構成を尋ねられた場合は「アプリをGoogle Chromeで起動」を選択します。

`.vscode/launch.json`が型付きの専用起動スクリプトを実行し、ViteのHTTP応答を確認してからGoogle Chromeで`http://localhost:5173/`を開きます。VS Codeの停止ボタンを押すと、このデバッグ操作で起動したViteも終了します。

WindowsではVS Codeタスクが`npm.cmd`を直接使用するため、PowerShellのスクリプト実行ポリシーを変更する必要はありません。

## 検証

以下はすべてプロジェクトルートで実行します。

```powershell
npm run type-check
npm run lint
npm run lint:styles
npm test
npm run build
```

順に型検査、Vue／TypeScriptの静的解析、CSS検査、自動テスト、本番ビルドを行います。

## Cloudflare Workersへの公開

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Production branch: `main`
- Root directory: 空欄

`wrangler.jsonc`の`assets.directory`で`dist`を配信対象とし、`not_found_handling`を`single-page-application`に設定しています。このため、履歴モードの直接URLでも`index.html`からルート画面を表示できます。`workers_dev`で本番URLを有効化し、`preview_urls`を無効化してバージョン別のプレビューURLを作成しません。`public/_headers`では外部通信、フォーム送信、iframe埋め込み、不要なブラウザー権限を制限します。WranglerはCloudflareのビルド環境が`npx`で実行し、公開アプリの依存関係や成果物には含めません。

## 外部リンクの変更

URLは`src/config/content.ts`の`resourceUrls`、表示名と説明は`src/i18n/locales/ja.json`の`externalResources`を編集します。推測したURLを追加せず、公的機関の公式ページであることを確認し、リンク名にも「公式」と明記してください。

## 今後の改善案

- 当事者によるユーザビリティ／アクセシビリティ評価
- 公的機関の最新注意喚起を手動で定期確認する運用
- 学習コンテンツとクイズ問題の追加
- 必要になった場合の英語ロケール追加
