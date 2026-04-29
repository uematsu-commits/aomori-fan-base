import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aomori Fan Base | あおもりファンベース",
  description: "県内外の青森ファンが集い、日常的に青森の魅力を共有・交流できるコミュニティサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
          {children}
        </main>
        <footer
          style={{
            marginTop: 48,
            padding: "28px 16px",
            borderTop: "1px solid var(--border)",
            color: "var(--muted)",
            fontSize: 13,
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <p style={{ marginBottom: 10 }}>🍎 Aomori Fan Base — 青森をもっと好きになる場所</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 12, flexWrap: "wrap" }}>
              <Link href="/terms" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 12 }}>
                利用規約
              </Link>
              <Link href="/privacy" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 12 }}>
                プライバシーポリシー
              </Link>
            </div>
            <p style={{ fontSize: 11, lineHeight: 1.6 }}>
              © 2026 Aomori Fan Base. 投稿コンテンツの著作権は各投稿者に帰属します。
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
