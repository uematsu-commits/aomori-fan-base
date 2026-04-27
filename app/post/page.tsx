import PostForm from "@/components/PostForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PostPage() {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      {/* Back Link */}
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          color: "var(--muted)",
          textDecoration: "none",
          fontSize: 14,
          marginBottom: 20,
          fontWeight: 600,
        }}
      >
        <ArrowLeft size={16} />
        タイムラインに戻る
      </Link>

      <div
        style={{
          background: "var(--surface)",
          borderRadius: 20,
          border: "1px solid var(--border)",
          padding: "28px",
          boxShadow: "0 4px 16px rgba(45,106,79,0.08)",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "var(--primary)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            ✏️ 新しい投稿
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>
            青森の魅力・日常・グルメ・祭りなど、なんでもシェアしよう！
          </p>
        </div>

        {/* User Info (Mock) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 20,
            padding: "12px",
            background: "var(--surface-2)",
            borderRadius: 12,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            😊
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>ゲストユーザー</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>
              ※ログインすると名前・アイコンが表示されます
            </div>
          </div>
          <Link
            href="/login"
            style={{
              marginLeft: "auto",
              fontSize: 13,
              color: "var(--primary)",
              textDecoration: "none",
              fontWeight: 600,
              border: "1px solid var(--primary)",
              padding: "4px 12px",
              borderRadius: 16,
            }}
          >
            ログイン
          </Link>
        </div>

        <PostForm />
      </div>
    </div>
  );
}
