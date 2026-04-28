"use client";

import { useState } from "react";
import { Post, Category } from "@/lib/types";
import { User } from "@supabase/supabase-js";
import PostCard from "@/components/PostCard";
import CategoryFilter from "@/components/CategoryFilter";
import Link from "next/link";
import { PlusCircle, Users, TrendingUp } from "lucide-react";

type Props = {
  posts: Post[];
  user: User | null;
  likedPostIds: string[];
};

export default function TimelineClient({ posts, user, likedPostIds }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category | "すべて">("すべて");

  const filtered =
    selectedCategory === "すべて"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>
      {/* Main Timeline */}
      <div>
        {/* Hero Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--primary) 0%, var(--accent-blue) 100%)",
            borderRadius: 20,
            padding: "28px",
            marginBottom: 24,
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", zIndex: 1 }}>
            <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 6, lineHeight: 1.3 }}>
              🍎 あおもりファンベース
            </h1>
            <p style={{ fontSize: 14, opacity: 0.88, lineHeight: 1.6, marginBottom: 16 }}>
              県内外の青森ファンが集まるデジタルの「第2の故郷」。<br />
              写真・グルメ・祭り・方言など青森の魅力をシェアしよう！
            </p>
            <Link
              href="/post"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "#fff",
                color: "var(--primary)",
                padding: "10px 20px",
                borderRadius: 24,
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 14,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <PlusCircle size={16} />
              投稿する
            </Link>
          </div>
          <div style={{ position: "absolute", right: -20, top: -20, fontSize: 120, opacity: 0.08, userSelect: "none", lineHeight: 1 }}>
            🍎
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />

        {/* Posts */}
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 16 }}>
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px 24px",
                background: "var(--surface)",
                borderRadius: 16,
                border: "1px solid var(--border)",
                color: "var(--muted)",
              }}
            >
              <p style={{ fontSize: 40, marginBottom: 12 }}>🗾</p>
              <p style={{ fontSize: 16 }}>
                {posts.length === 0
                  ? "まだ投稿がありません。最初の投稿をしよう！"
                  : "このカテゴリの投稿はまだありません"}
              </p>
              <Link
                href="/post"
                style={{
                  display: "inline-block",
                  marginTop: 16,
                  color: "var(--primary)",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                投稿する →
              </Link>
            </div>
          ) : (
            filtered.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUser={user}
                initialLiked={likedPostIds.includes(post.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Sidebar */}
      <aside style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Stats */}
        <div style={{ background: "var(--surface)", borderRadius: 16, border: "1px solid var(--border)", padding: "20px" }}>
          <h2 style={{ fontWeight: 800, fontSize: 16, marginBottom: 16, color: "var(--primary)" }}>
            📊 コミュニティ統計
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: Users, label: "投稿数", value: `${posts.length}件` },
              { icon: TrendingUp, label: "コメント数", value: `${posts.reduce((a, p) => a + (p.comments?.length ?? 0), 0)}件` },
              { icon: "🗾", label: "カテゴリ", value: "4種類" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: typeof Icon === "string" ? 18 : 14, flexShrink: 0 }}>
                  {typeof Icon === "string" ? Icon : <Icon size={16} color="var(--primary)" />}
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{label}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "var(--foreground)" }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Tags */}
        <div style={{ background: "var(--surface)", borderRadius: 16, border: "1px solid var(--border)", padding: "20px" }}>
          <h2 style={{ fontWeight: 800, fontSize: 16, marginBottom: 16, color: "var(--primary)" }}>
            🔥 話題のトピック
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["弘前城の桜", "ねぶた祭り2026", "青森の日本酒", "津軽弁", "りんご収穫"].map((tag) => (
              <div key={tag} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontSize: 14, color: "var(--primary)", fontWeight: 600 }}>#{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Login/Register CTA or User Info */}
        {user ? (
          <div style={{ background: "var(--surface)", borderRadius: 16, border: "1px solid var(--border)", padding: "20px" }}>
            <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 8 }}>ログイン中</p>
            <p style={{ fontWeight: 700, fontSize: 15, color: "var(--foreground)", marginBottom: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user.email}
            </p>
            <Link href="/post" style={{ display: "block", textAlign: "center", background: "var(--primary)", color: "#fff", padding: "10px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
              ✏️ 新しい投稿
            </Link>
          </div>
        ) : (
          <div style={{ background: "linear-gradient(135deg, var(--primary) 0%, #40916c 100%)", borderRadius: 16, padding: "20px", color: "#fff" }}>
            <h2 style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>🍎 参加しよう！</h2>
            <p style={{ fontSize: 13, opacity: 0.9, marginBottom: 16, lineHeight: 1.6 }}>
              アカウントを作って青森の魅力を発信しよう！
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link href="/register" style={{ display: "block", textAlign: "center", background: "#fff", color: "var(--primary)", padding: "10px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
                新規登録（無料）
              </Link>
              <Link href="/login" style={{ display: "block", textAlign: "center", background: "rgba(255,255,255,0.2)", color: "#fff", padding: "10px", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>
                ログイン
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
