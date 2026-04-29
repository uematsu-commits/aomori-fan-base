import Link from "next/link";

export const metadata = {
  title: "利用規約 | Aomori Fan Base",
};

export default function TermsPage() {
  const sections = [
    {
      title: "第1条（適用）",
      content: `本利用規約（以下「本規約」）は、Aomori Fan Base（以下「当サービス」）が提供するすべてのサービスの利用条件を定めるものです。ユーザーは本規約に同意した上でサービスをご利用ください。`,
    },
    {
      title: "第2条（利用登録）",
      content: `・登録申請者が本規約に同意することで、利用登録が完了します。\n・13歳未満の方は利用登録できません。\n・虚偽の情報で登録した場合、登録を取り消すことがあります。\n・1人が保有できるアカウントは1つまでとします。`,
    },
    {
      title: "第3条（投稿コンテンツと著作権）",
      content: `・ユーザーが投稿したテキスト・画像等のコンテンツ（以下「投稿コンテンツ」）の著作権は、投稿したユーザー本人に帰属します。\n・ユーザーは当サービスに対し、投稿コンテンツをサービス運営・改善・宣伝のために無償・非独占的に利用する権利を許諾したものとします。\n・他者の著作権・肖像権・プライバシー権等を侵害するコンテンツの投稿を禁止します。\n・投稿コンテンツに起因する第三者との紛争は、投稿者本人が解決する責任を負います。`,
    },
    {
      title: "第4条（禁止事項）",
      content: `以下の行為を禁止します。\n\n・法令または公序良俗に違反する行為\n・他のユーザーへの誹謗中傷・差別的表現・ハラスメント\n・他人の個人情報の無断公開\n・著作権・商標権等の知的財産権を侵害するコンテンツの投稿\n・わいせつ・暴力的・残虐なコンテンツの投稿\n・スパム行為・商業目的の広告投稿（事前許可なし）\n・当サービスのシステムへの不正アクセスや妨害行為\n・複数アカウントの作成・運用\n・当サービスの運営を妨げる行為`,
    },
    {
      title: "第5条（コンテンツの削除）",
      content: `当サービスは、以下の場合に予告なく投稿コンテンツを削除し、アカウントを停止・削除する権利を有します。\n\n・本規約に違反するコンテンツと判断した場合\n・第三者から権利侵害の申告があった場合\n・その他、運営上必要と判断した場合\n\n削除措置に対する異議申し立ては、お問い合わせフォームより行ってください。`,
    },
    {
      title: "第6条（免責事項）",
      content: `・当サービスは、ユーザーが投稿したコンテンツの正確性・合法性・安全性を保証しません。\n・当サービスは、ユーザー間のトラブルについて一切の責任を負いません。\n・システム障害・メンテナンス等によるサービス停止について、損害賠償責任を負いません。\n・当サービスへのリンク先の外部サービスについて、責任を負いません。`,
    },
    {
      title: "第7条（サービスの変更・停止）",
      content: `当サービスは、ユーザーへの事前通知なく、サービスの内容変更・一時停止・終了を行う場合があります。`,
    },
    {
      title: "第8条（準拠法・管轄裁判所）",
      content: `本規約の解釈は日本法に準拠します。本規約に関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。`,
    },
    {
      title: "第9条（規約の変更）",
      content: `当サービスは、必要に応じて本規約を変更することがあります。変更後の規約は本ページに掲載した時点で効力を生じます。重要な変更の場合は、サービス内でお知らせします。`,
    },
  ];

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <Link href="/" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 14 }}>
          ← トップに戻る
        </Link>
      </div>

      <div style={{ background: "var(--surface)", borderRadius: 20, border: "1px solid var(--border)", padding: "40px 36px" }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: "var(--primary)", marginBottom: 8 }}>
          📋 利用規約
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 36, borderBottom: "1px solid var(--border)", paddingBottom: 20 }}>
          制定日：2026年4月29日　最終改定：2026年4月29日
        </p>

        {sections.map(({ title, content }) => (
          <div key={title} style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: "var(--foreground)", marginBottom: 10 }}>
              {title}
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.9, color: "var(--foreground)", whiteSpace: "pre-line" }}>
              {content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
