/**
 * ページ固有タイトルとアプリ名を組み合わせ、ブラウザーのタイトルへ反映する。
 * @param pageTitle 現在表示しているルートの翻訳済みタイトル。
 * @param applicationName 全ページで共通して表示するアプリ名。
 * @returns 戻り値はなく、ブラウザーのdocument.titleだけを更新する。
 */
export function updateDocumentTitle(pageTitle: string, applicationName: string): void {
  const documentTitle: string = `${pageTitle} | ${applicationName}`;
  document.title = documentTitle;
}

/**
 * HTMLに用意されたdescription要素へ翻訳済みの説明文を設定する。
 * @param description 利用者と検索エンジンへ示すアプリの説明文。
 * @returns 戻り値はなく、対象meta要素がある場合だけcontentを更新する。
 */
export function updateDescriptionMetadata(description: string): void {
  const descriptionSelector: string = 'meta[name="description"]';
  const descriptionMeta: Element | null = document.querySelector(descriptionSelector);

  // 想定したmeta要素だけを更新し、不正なDOM型へ型アサーションすることを防ぐ。
  if (descriptionMeta instanceof HTMLMetaElement) {
    descriptionMeta.content = description;
  }
}
