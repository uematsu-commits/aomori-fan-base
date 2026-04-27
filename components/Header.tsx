"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusSquare, User, LogIn } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "ホーム", icon: Home },
    { href: "/post", label: "投稿する", icon: PlusSquare },
    { href: "/login", label: "ログイン", icon: LogIn },
  ];

  return (
    <header style={{ background: "var(--primary)", color: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 24 }}>🍎</span>
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 18, lineHeight: 1 }}>
                Aomori Fan Base
              </div>
              <div style={{ color: "#a8d5be", fontSize: 11 }}>あおもりファンベース</div>
            </div>
          </Link>

          {/* Navigation */}
          <nav style={{ display: "flex", gap: 4 }}>
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "6px 12px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: pathname === href ? 700 : 400,
                  color: pathname === href ? "#fff" : "#a8d5be",
                  background: pathname === href ? "rgba(255,255,255,0.15)" : "transparent",
                  transition: "all 0.15s",
                }}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
