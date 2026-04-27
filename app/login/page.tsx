"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputStyle = {
    width: "100%",
    padding: "12px 14px 12px 42px",
    borderRadius: 10,
    border: "2px solid var(--border)",
    background: "var(--surface)",
    color: "var(--foreground)",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box" as const,
    fontFamily: "inherit",
    transition: "border-color 0.15s",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "var(--surface)",
          borderRadius: 20,
          border: "1px solid var(--border)",
          padding: "36px 32px",
          boxShadow: "0 8px 32px rgba(45,106,79,0.10)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>🍎</div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: "var(--primary)" }}>
            ログイン
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>
            Aomori Fan Baseへようこそ
          </p>
        </div>

        {/* Google Login */}
        <button
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 10,
            border: "2px solid var(--border)",
            background: "var(--surface)",
            color: "var(--foreground)",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 20,
            transition: "all 0.15s",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Googleでログイン
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span style={{ fontSize: 13, color: "var(--muted)" }}>または</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        {/* Email/Password Form */}
        <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--muted)", marginBottom: 6 }}>
              メールアドレス
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--muted)", marginBottom: 6 }}>
              パスワード
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: 10,
              border: "none",
              background: "var(--primary)",
              color: "#fff",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 4px 12px rgba(45,106,79,0.3)",
              marginTop: 4,
            }}
          >
            <LogIn size={18} />
            ログイン
          </button>
        </form>

        {/* Sign Up Link */}
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "var(--muted)" }}>
          アカウントをお持ちでない方は{" "}
          <Link href="/register" style={{ color: "var(--primary)", fontWeight: 700, textDecoration: "none" }}>
            新規登録
          </Link>
        </p>
      </div>
    </div>
  );
}
