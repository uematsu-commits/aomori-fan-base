"use client";

import { useState } from "react";
import { Heart, MessageCircle, MapPin, Send, Flag } from "lucide-react";
import { Post } from "@/lib/types";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const CATEGORY_COLORS: Record<string, { bg: string; text: string; emoji: string }> = {
  風景: { bg: "#dbeafe", text: "#1e40af", emoji: "🏔️" },
  グルメ: { bg: "#fef3c7", text: "#92400e", emoji: "🍜" },
  祭り: { bg: "#fce7f3", text: "#9d174d", emoji: "🏮" },
  つぶやき: { bg: "#f0fdf4", text: "#166534", emoji: "💬" },
};

function timeAgo(dateStr: string) {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}秒前`;
  if (diff < 3600) return `${Math.floor(diff / 60)}分前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}時間前`;
  return `${Math.floor(diff / 86400)}日前`;
}

type Props = {
  post: Post;
  currentUser: User | null;
  initialLiked: boolean;
};

export default function PostCard({ post, currentUser, initialLiked }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const cat = CATEGORY_COLORS[post.category];

  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(post.likes?.[0]?.count ?? 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments ?? []);
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [reportState, setReportState] = useState<"idle" | "confirm" | "done">("idle");

  const handleLike = async () => {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    // 楽観的更新
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);

    if (liked) {
      await supabase.from("likes").delete().match({ post_id: post.id, user_id: currentUser.id });
    } else {
      await supabase.from("likes").insert({ post_id: post.id, user_id: currentUser.id });
    }
  };

  const handleReport = async () => {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    await supabase.from("reports").insert({
      post_id: post.id,
      user_id: currentUser.id,
      reason: "不適切なコンテンツ",
    });
    setReportState("done");
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setSubmittingComment(true);
    const { data, error } = await supabase
      .from("comments")
      .insert({ post_id: post.id, user_id: currentUser.id, content: commentText })
      .select("*, profiles(*)")
      .single();

    if (!error && data) {
      setComments([...comments, data]);
      setCommentText("");
    }
    setSubmittingComment(false);
  };

  return (
    <article
      style={{
        background: "var(--surface)",
        borderRadius: 16,
        border: "1px solid var(--border)",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(45,106,79,0.06)",
      }}
    >
      {/* Post Image */}
      {post.image_url && (
        <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image_url} alt="投稿画像" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", top: 12, left: 12, background: cat.bg, color: cat.text, borderRadius: 20, padding: "4px 10px", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4, boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}>
            {cat.emoji} {post.category}
          </div>
        </div>
      )}

      <div style={{ padding: "16px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, border: "2px solid var(--border)", overflow: "hidden" }}>
              {post.profiles?.avatar_url
                ? <img src={post.profiles.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : "😊"}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "var(--foreground)" }}>
                {post.profiles?.name ?? "匿名ユーザー"}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, color: "var(--muted)" }}>
                  <MapPin size={10} />{post.profiles?.location ?? ""}在住
                </span>
                <span style={{ fontSize: 11, color: "var(--muted)" }}>·</span>
                <span style={{ fontSize: 11, color: "var(--muted)" }}>{timeAgo(post.created_at)}</span>
              </div>
            </div>
          </div>
          {!post.image_url && (
            <span style={{ background: cat.bg, color: cat.text, borderRadius: 20, padding: "4px 10px", fontSize: 12, fontWeight: 700 }}>
              {cat.emoji} {post.category}
            </span>
          )}
        </div>

        {/* Content */}
        <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--foreground)", marginBottom: 14 }}>
          {post.content}
        </p>

        {/* Actions */}
        <div style={{ display: "flex", gap: 16, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
          <button
            onClick={handleLike}
            style={{
              display: "flex", alignItems: "center", gap: 6, border: "none", cursor: "pointer",
              padding: "6px 12px", borderRadius: 20, fontSize: 14, transition: "all 0.15s",
              background: liked ? "#fff0f3" : "transparent",
              color: liked ? "#e11d48" : "var(--muted)",
              fontWeight: liked ? 700 : 400,
            }}
          >
            <Heart size={16} fill={liked ? "#e11d48" : "none"} />
            <span>んだんだ {likeCount}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            style={{
              display: "flex", alignItems: "center", gap: 6, border: "none", cursor: "pointer",
              padding: "6px 12px", borderRadius: 20, fontSize: 14, transition: "all 0.15s",
              background: showComments ? "var(--surface-2)" : "transparent",
              color: showComments ? "var(--primary)" : "var(--muted)",
            }}
          >
            <MessageCircle size={16} />
            <span>コメント {comments.length}</span>
          </button>

          {/* 通報ボタン */}
          <div style={{ marginLeft: "auto" }}>
            {reportState === "done" ? (
              <span style={{ fontSize: 12, color: "var(--muted)", padding: "6px 12px" }}>
                ✅ 通報しました
              </span>
            ) : reportState === "confirm" ? (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>通報しますか？</span>
                <button
                  onClick={handleReport}
                  style={{ fontSize: 12, color: "#e11d48", background: "#fff0f3", border: "none", borderRadius: 12, padding: "4px 10px", cursor: "pointer", fontWeight: 700 }}
                >
                  はい
                </button>
                <button
                  onClick={() => setReportState("idle")}
                  style={{ fontSize: 12, color: "var(--muted)", background: "transparent", border: "none", cursor: "pointer" }}
                >
                  キャンセル
                </button>
              </div>
            ) : (
              <button
                onClick={() => setReportState("confirm")}
                title="この投稿を通報する"
                style={{
                  display: "flex", alignItems: "center", gap: 4, border: "none", cursor: "pointer",
                  padding: "6px 10px", borderRadius: 20, fontSize: 12, background: "transparent",
                  color: "var(--muted)", transition: "all 0.15s",
                }}
              >
                <Flag size={13} />
                通報
              </button>
            )}
          </div>
        </div>

        {/* Comments */}
        {showComments && (
          <div style={{ marginTop: 12 }}>
            {comments.map((c) => (
              <div key={c.id} style={{ display: "flex", gap: 8, marginBottom: 10, padding: "10px 12px", background: "var(--surface-2)", borderRadius: 10 }}>
                <span style={{ fontSize: 20 }}>😊</span>
                <div>
                  <span style={{ fontWeight: 700, fontSize: 13, color: "var(--primary)" }}>
                    {c.profiles?.name ?? "匿名"}
                  </span>
                  <p style={{ fontSize: 13, color: "var(--foreground)", marginTop: 2, lineHeight: 1.6 }}>{c.content}</p>
                </div>
              </div>
            ))}

            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !submittingComment && handleComment()}
                placeholder={currentUser ? "コメントを入力..." : "ログインしてコメントする"}
                disabled={!currentUser}
                style={{ flex: 1, padding: "8px 12px", borderRadius: 20, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--foreground)", fontSize: 13, outline: "none" }}
              />
              <button
                onClick={handleComment}
                disabled={submittingComment || !currentUser}
                style={{ background: "var(--primary)", color: "#fff", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: submittingComment ? 0.6 : 1 }}
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
