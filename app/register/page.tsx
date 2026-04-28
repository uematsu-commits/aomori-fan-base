"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, UserPlus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [form, setForm] = useState({ name: "", email: "", password: "", location: "県外" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    width: "100%", padding: "12px 14px 12px 42px", borderRadius: 10,
    border: "2px solid var(--border)", background: "var(--surface)", color: "var(--foreground)",
    fontSize: 15, outline: "none", boxSizing: "border-box" as const, fontFamily: "inherit",
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [key]: e.target.value });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setError("パスワードは6文字以上にしてください");
      return;
    }
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { name: form.name, location: form.location },
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <div style={{ width: "100%", maxWidth: 420, background: "var(--surface)", borderRadius: 20, border: "1px solid var(--border)", padding: "36px 32px", boxShadow: "0 8px 32px rgba(45,106,79,0.10)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>🍎</div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: "var(--primary)" }}>新規登録</h1>
          <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>青森ファンコミュニティに参加しよう！</p>
        </div>

        {error && (
          <div style={{ background: "#fee2e2", color: "#991b1b", padding: "10px 14px", borderRadius: 10, fontSize: 14, marginBottom: 16 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--muted)", marginBottom: 6 }}>ニックネーム</label>
            <div style={{ position: "relative" }}>
              <User size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
              <input type="text" value={form.name} onChange={set("name")} placeholder="津軽りんご太郎" required style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--muted)", marginBottom: 6 }}>メールアドレス</label>
            <div style={{ position: "relative" }}>
              <Mail size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
              <input type="email" value={form.email} onChange={set("email")} placeholder="your@email.com" required style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--muted)", marginBottom: 6 }}>パスワード（6文字以上）</label>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
              <input type="password" value={form.password} onChange={set("password")} placeholder="••••••••" required style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--muted)", marginBottom: 8 }}>現在の居住地</label>
            <div style={{ display: "flex", gap: 8 }}>
              {["県内", "県外", "その他"].map((loc) => (
                <button key={loc} type="button" onClick={() => setForm({ ...form, location: loc })}
                  style={{ flex: 1, padding: "10px", borderRadius: 10, border: form.location === loc ? "2px solid var(--primary)" : "2px solid var(--border)", background: form.location === loc ? "var(--primary)" : "var(--surface)", color: form.location === loc ? "#fff" : "var(--foreground)", fontWeight: form.location === loc ? 700 : 400, fontSize: 14, cursor: "pointer" }}>
                  {loc === "県内" ? "🏠 県内" : loc === "県外" ? "🏙️ 県外" : "🌏 その他"}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading}
            style={{ width: "100%", padding: "13px", borderRadius: 10, border: "none", background: loading ? "var(--border)" : "var(--primary)", color: "#fff", fontSize: 16, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 12px rgba(45,106,79,0.3)", marginTop: 4 }}>
            <UserPlus size={18} />
            {loading ? "登録中..." : "登録する（無料）"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "var(--muted)" }}>
          すでにアカウントをお持ちの方は{" "}
          <Link href="/login" style={{ color: "var(--primary)", fontWeight: 700, textDecoration: "none" }}>ログイン</Link>
        </p>
      </div>
    </div>
  );
}
