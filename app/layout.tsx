import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

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
            padding: "24px 16px",
            textAlign: "center",
            borderTop: "1px solid var(--border)",
            color: "var(--muted)",
            fontSize: 13,
          }}
        >
          <p>🍎 Aomori Fan Base — 青森をもっと好きになる場所</p>
          <p style={{ marginTop: 4, fontSize: 12 }}>© 2026 Aomori Fan Base. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
