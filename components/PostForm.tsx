"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Send, X } from "lucide-react";
import { Category } from "@/lib/mockData";

const CATEGORIES: { value: Category; emoji: string }[] = [
  { value: "風景", emoji: "🏔️" },
  { value: "グルメ", emoji: "🍜" },
  { value: "祭り", emoji: "🏮" },
  { value: "つぶやき", emoji: "💬" },
];

export default function PostForm() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Category>("つぶやき");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitted(true);
    setTimeout(() => router.push("/"), 1500);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🍎</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--primary)", marginBottom: 8 }}>
          投稿しました！
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 15 }}>
          タイムラインに戻ります...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Category Selection */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", fontWeight: 700, fontSize: 14, color: "var(--muted)", marginBottom: 8 }}>
          カテゴリ
        </label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {CATEGORIES.map(({ value, emoji }) => (
            <button
              key={value}
              type="button"
              onClick={() => setCategory(value)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 18px",
                borderRadius: 24,
                border: category === value ? "2px solid var(--primary)" : "2px solid var(--border)",
                background: category === value ? "var(--primary)" : "var(--surface)",
                color: category === value ? "#fff" : "var(--foreground)",
                fontWeight: category === value ? 700 : 400,
                fontSize: 15,
                cursor: "pointer",
                transition: "all 0.15s",
                boxShadow: category === value ? "0 2px 8px rgba(45,106,79,0.25)" : "none",
              }}
            >
              <span>{emoji}</span>
              <span>{value}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", fontWeight: 700, fontSize: 14, color: "var(--muted)", marginBottom: 8 }}>
          内容
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="青森の魅力をシェアしよう！&#10;例：「今朝の岩木山が最高だった」「弘前の桜が満開！」"
          rows={5}
          required
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: 12,
            border: "2px solid var(--border)",
            background: "var(--surface)",
            color: "var(--foreground)",
            fontSize: 15,
            lineHeight: 1.7,
            outline: "none",
            resize: "vertical",
            fontFamily: "inherit",
            boxSizing: "border-box",
            transition: "border-color 0.15s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
        <div style={{ textAlign: "right", fontSize: 12, color: content.length > 280 ? "#e11d48" : "var(--muted)", marginTop: 4 }}>
          {content.length} / 280文字
        </div>
      </div>

      {/* Image Upload */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ display: "block", fontWeight: 700, fontSize: 14, color: "var(--muted)", marginBottom: 8 }}>
          画像（任意）
        </label>

        {imagePreview ? (
          <div style={{ position: "relative", display: "inline-block" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreview}
              alt="プレビュー"
              style={{ maxWidth: "100%", maxHeight: 300, borderRadius: 12, display: "block" }}
            />
            <button
              type="button"
              onClick={() => setImagePreview(null)}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: 28,
                height: 28,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "32px",
              border: "2px dashed var(--border)",
              borderRadius: 12,
              cursor: "pointer",
              color: "var(--muted)",
              transition: "all 0.15s",
            }}
          >
            <ImagePlus size={32} color="var(--primary-light)" />
            <span style={{ fontSize: 14 }}>クリックして画像を選択</span>
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
          </label>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!content.trim() || content.length > 280}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: 12,
          border: "none",
          background: !content.trim() || content.length > 280 ? "var(--border)" : "var(--primary)",
          color: "#fff",
          fontSize: 16,
          fontWeight: 700,
          cursor: !content.trim() ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "all 0.15s",
          boxShadow: content.trim() ? "0 4px 12px rgba(45,106,79,0.3)" : "none",
        }}
      >
        <Send size={18} />
        投稿する
      </button>
    </form>
  );
}
