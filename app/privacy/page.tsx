import Link from "next/link";

export const metadata = {
  title: "プライバシーポリシー | Aomori Fan Base",
};

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. 事業者情報",
      content: `本サービス「Aomori Fan Base（あおもりファンベース）」（以下「本サービス」）は、個人が運営するウェブサービスです。`,
    },
    {
      title: "2. 収集する個人情報",
      content: `本サービスでは、以下の個人情報を収集します。\n\n・メールアドレス（会員登録時）\n・ニックネーム（会員登録時）\n・居住地情報（県内・県外・その他）\n・投稿コンテンツ（テキスト・画像）\n・アクセスログ（IPアドレス、ブラウザ情報等）`,
    },
    {
      title: "3. 個人情報の利用目的",
      content: `収集した個人情報は、以下の目的に限り利用します。\n\n・本サービスの提供・維持・改善\n・ユーザー認証およびアカウント管理\n・お問い合わせへの対応\n・不正利用の防止\n・サービスに関する重要なお知らせの送信`,
    },
    {
      title: "4. 個人情報の第三者提供",
      content: `以下の場合を除き、収集した個人情報を第三者に提供しません。\n\n・ユーザー本人の同意がある場合\n・法令に基づく開示請求があった場合\n・人の生命・身体・財産の保護のために必要な場合`,
    },
    {
      title: "5. 個人情報の管理",
      content: `収集した個人情報は、Supabase（米国）のサービスを利用して管理します。データはセキュリティが確保されたデータベースに保存され、不正アクセス・紛失・漏洩を防ぐための適切な措置を講じています。`,
    },
    {
      title: "6. Cookieの使用",
      content: `本サービスでは、ログイン状態の維持のためにCookie（セッションCookie）を使用します。ブラウザの設定によりCookieを無効にすることができますが、その場合、一部の機能が利用できなくなる場合があります。`,
    },
    {
      title: "7. 個人情報の開示・訂正・削除",
      content: `ユーザーご本人は、ご自身の個人情報について開示・訂正・削除を請求できます。アカウントの削除はサービス内の設定から行うことができます。それ以外のご要望については、下記お問い合わせ先よりご連絡ください。`,
    },
    {
      title: "8. 未成年者のご利用",
      content: `本サービスは13歳以上を対象としています。13歳未満の方のご利用はお断りしております。`,
    },
    {
      title: "9. プライバシーポリシーの変更",
      content: `本プライバシーポリシーは、法令の改正やサービス内容の変更に伴い、予告なく変更する場合があります。変更後のポリシーは本ページに掲載した時点で効力を生じます。`,
    },
    {
      title: "10. お問い合わせ",
      content: `個人情報の取り扱いに関するお問い合わせは、サービス内のお問い合わせフォームよりご連絡ください。`,
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
          🔒 プライバシーポリシー
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 36, borderBottom: "1px solid var(--border)", paddingBottom: 20 }}>
          制定日：2026年4月29日　最終改定：2026年4月29日
        </p>

        <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--foreground)", marginBottom: 32 }}>
          Aomori Fan Base（以下「当サービス」）は、ユーザーの個人情報保護を重要な責務と考え、個人情報の保護に関する法律（個人情報保護法）および関連法令を遵守し、以下のプライバシーポリシーを定めます。
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
