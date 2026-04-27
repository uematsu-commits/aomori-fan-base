"use client";

import { useState } from "react";
import { Heart, MessageCircle, MapPin, Send } from "lucide-react";
import { Post } from "@/lib/mockData";

const CATEGORY_COLORS: Record<string, { bg: string; text: string; emoji: string }> = {
  風景: { bg: "#dbeafe", text: "#1e40af", emoji: "🏔️" },
  グルメ: { bg: "#fef3c7", text: "#92400e", emoji: "🍜" },
  祭り: { bg: "#fce7f3", text: "#9d174d", emoji: "🏮" },
  つぶやき: { bg: "#f0fdf4", text: "#166534", emoji: "💬" },
};

function timeAgo(dateStr: string) {
  const now = new Date("2026-04-27T12:00:00");
  const date = new Date(dateStr);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}秒前`;
  if (diff < 3600) return `${Math.floor(diff / 60)}分前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}時間前`;
  return `${Math.floor(diff / 86400)}日前`;
}

export default function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments);

  const cat = CATEGORY_COLORS[post.category];

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    setComments([
      ...comments,
      {
        id: `new-${Date.now()}`,
        user: { id: "me", name: "あなた", avatar: "😊", location: "県外" },
        content: commentText,
        createdAt: new Date().toISOString(),
      },
    ]);
    setCommentText("");
  };

  return (
    <article
      style={{
        background: "var(--surface)",
        borderRadius: 16,
        border: "1px solid var(--border)",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(45,106,79,0.06)",
        transition: "box-shadow 0.2s",
      }}
    >
      {/* Post Image */}
      {post.imageUrl && (
        <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.imageUrl}
            alt="投稿画像"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: cat.bg,
              color: cat.text,
              borderRadius: 20,
              padding: "4px 10px",
              fontSize: 12,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 4,
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            {cat.emoji} {post.category}
          </div>
        </div>
      )}

      <div style={{ padding: "16px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "var(--surface-2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                border: "2px solid var(--border)",
              }}
            >
              {post.user.avatar}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "var(--foreground)" }}>
                {post.user.name}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    fontSize: 11,
                    color: "var(--muted)",
                  }}
                >
                  <MapPin size={10} />
                  {post.user.location}在住
                </span>
                <span style={{ fontSize: 11, color: "var(--muted)" }}>·</span>
                <span style={{ fontSize: 11, color: "var(--muted)" }}>{timeAgo(post.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Category badge (when no image) */}
          {!post.imageUrl && (
            <span
              style={{
                background: cat.bg,
                color: cat.text,
                borderRadius: 20,
                padding: "4px 10px",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {cat.emoji} {post.category}
            </span>
          )}
        </div>

        {/* Content */}
        <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--foreground)", marginBottom: 14 }}>
          {post.content}
        </p>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: 16,
            paddingTop: 12,
            borderTop: "1px solid var(--border)",
          }}
        >
          <button
            onClick={handleLike}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: liked ? "#fff0f3" : "transparent",
              border: "none",
              cursor: "pointer",
              padding: "6px 12px",
              borderRadius: 20,
              color: liked ? "#e11d48" : "var(--muted)",
              fontWeight: liked ? 700 : 400,
              fontSize: 14,
              transition: "all 0.15s",
            }}
          >
            <Heart size={16} fill={liked ? "#e11d48" : "none"} />
            <span>んだんだ {likeCount}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: showComments ? "var(--surface-2)" : "transparent",
              border: "none",
              cursor: "pointer",
              padding: "6px 12px",
              borderRadius: 20,
              color: showComments ? "var(--primary)" : "var(--muted)",
              fontSize: 14,
              transition: "all 0.15s",
            }}
          >
            <MessageCircle size={16} />
            <span>コメント {comments.length}</span>
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div style={{ marginTop: 12 }}>
            {comments.map((c) => (
              <div
                key={c.id}
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 10,
                  padding: "10px 12px",
                  background: "var(--surface-2)",
                  borderRadius: 10,
                }}
              >
                <span style={{ fontSize: 20 }}>{c.user.avatar}</span>
                <div>
                  <span style={{ fontWeight: 700, fontSize: 13, color: "var(--primary)" }}>
                    {c.user.name}
                  </span>
                  <p style={{ fontSize: 13, color: "var(--foreground)", marginTop: 2, lineHeight: 1.6 }}>
                    {c.content}
                  </p>
                </div>
              </div>
            ))}

            {/* Comment Input */}
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleComment()}
                placeholder="コメントを入力..."
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  borderRadius: 20,
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--foreground)",
                  fontSize: 13,
                  outline: "none",
                }}
              />
              <button
                onClick={handleComment}
                style={{
                  background: "var(--primary)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
