/** ページ固有タイトルとアプリ名を組み合わせ、ブラウザーのタイトルへ反映する。 */
export function updateDocumentTitle(pageTitle: string, applicationName: string): void {
  const documentTitle: string = `${pageTitle} | ${applicationName}`;
  document.title = documentTitle;
}

/** HTMLに用意されたdescription要素へ翻訳済みの説明文を設定する。 */
export function updateDescriptionMetadata(description: string): void {
  const descriptionSelector: string = 'meta[name="description"]';
  const descriptionMeta: Element | null = document.querySelector(descriptionSelector);

  // 想定したmeta要素だけを更新し、不正なDOM型へ型アサーションすることを防ぐ。
  if (descriptionMeta instanceof HTMLMetaElement) {
    descriptionMeta.content = description;
  }
}
