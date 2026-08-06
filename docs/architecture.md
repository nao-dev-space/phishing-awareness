# アーキテクチャと安全設計

## 構成方針

表示文言、状態、純粋ロジック、型、静的な制御値を分離しています。UIはAtomic Designに沿って、atoms、molecules、organisms、templates、viewsへ分類します。画面間で保持すべき入力状態がないため、Piniaや永続ストレージは使用しません。

日本語専用の現在構成でも、画面に表示する文言は`src/i18n/locales/ja.json`へ集約し、Vue I18nから取得します。本文、ボタン、フォームラベル、ARIAラベル、ルートタイトル、学習・クイズなどの構造化文言が対象です。URL、ルート名、問題ID、正解IDなど翻訳しない制御値はTypeScript側で型付けします。

```mermaid
flowchart LR
  User["利用者の操作"] --> View["Viewの一時状態"]
  View --> Logic["Vue非依存の判定関数"]
  Logic --> Display["画面表示"]
  View -. "認証入力は渡さない" .-> Nowhere["通信・保存なし"]
```

## 疑似体験フロー

```mermaid
flowchart TD
  Home["トップ"] --> Mail["疑似メール"]
  Mail -->|"メール内リンク"| Login["疑似ログイン"]
  Mail -->|"安全な行動"| Review["振り返り"]
  Login -->|"疑似ログインまたは安全な行動"| Reveal["種明かし"]
  Reveal --> Review
  Review --> Learn["学習"]
  Review --> Quiz["確認テスト"]
```

各画面は前画面の状態へ依存せず、直接URLから開いても内容を理解できます。入力値や選択内容をURL、クエリ、ハッシュへ含めません。

## 非送信・非保存の根拠

- フォームは`action`属性を持たず、Vueの`@submit.prevent`で既定送信を停止します。
- submitハンドラーは入力refを空文字へ戻し、Vue Routerで種明かしへ移動するだけです。
- ソースに`fetch`、Axios、XMLHttpRequestを使うアプリコードはありません。
- Cookie、localStorage、sessionStorage、IndexedDB、Service Workerへ入力値を書き込むコードはありません。
- Consoleや外部ログ、アクセス解析、エラー監視へ入力値を渡しません。
- Clipboard APIは`TRAINING_ACCOUNT`に定義した固定の体験用文字列だけに使用します。
- クイズ回答は`QuizView`のローカルstateだけで保持し、再読込で消去されます。

## セキュリティ境界

参考情報ページの外部リンクを利用者が明示的に開いた場合だけ、リンク先への通常のブラウザー通信が発生します。すべての外部リンクに`target="_blank"`と`rel="noopener noreferrer"`を付けています。

公開時にはCloudflare Workersが一般的なアクセスログを処理する可能性がありますが、本アプリは独自の分析・監視機能を持ちません。

Cloudflare Workers Static Assetsへ配布する`public/_headers`では、CSPによってスクリプトとスタイルを同一オリジンへ限定し、外部通信、フォーム送信、Worker、iframe埋め込みを禁止します。あわせてMIMEスニッフィング、リファラー送信、不要なブラウザー権限を制限します。CSPで`unsafe-inline`を許可しないため、動的な表示状態はインラインstyleではなく定義済みCSSクラスで表現します。

`wrangler.jsonc`では`dist`を静的アセットの配信対象とし、`not_found_handling`を`single-page-application`に設定します。存在しない静的ファイルへのナビゲーションには`index.html`を返し、その後Vue Routerがルートまたはアプリ内404画面を表示します。一般公開する本番`workers.dev` URLは明示的に有効化し、不要なバージョン別プレビューURLは無効化します。Workerコードやバックエンド処理は追加しません。

## アクセシビリティ

セマンティックなヘッダー、ナビゲーション、メイン、フッター、見出し階層を使用します。スキップリンク、明確なフォーカス表示、色以外の状態説明、ライブ領域、キーボード操作、`prefers-reduced-motion`を用意し、WCAG 2.1 AAを意識しています。
