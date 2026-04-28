"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, PlusSquare, LogIn, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const navItems = [
    { href: "/", label: "ホーム", icon: Home },
    { href: "/post", label: "投稿する", icon: PlusSquare },
  ];

  return (
    <header style={{ background: "var(--primary)", color: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 24 }}>🍎</span>
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 18, lineHeight: 1 }}>Aomori Fan Base</div>
              <div style={{ color: "#a8d5be", fontSize: 11 }}>あおもりファンベース</div>
            </div>
          </Link>

          <nav style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                style={{
                  display: "flex", alignItems: "center", gap: 4, padding: "6px 12px",
                  borderRadius: 8, textDecoration: "none", fontSize: 14,
                  fontWeight: pathname === href ? 700 : 400,
                  color: pathname === href ? "#fff" : "#a8d5be",
                  background: pathname === href ? "rgba(255,255,255,0.15)" : "transparent",
                }}
              >
                <Icon size={16} />
                <span>{label}</span>
              </Link>
            ))}

            {user ? (
              <button
                onClick={handleLogout}
                style={{
                  display: "flex", alignItems: "center", gap: 4, padding: "6px 12px",
                  borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14,
                  color: "#a8d5be", background: "transparent",
                }}
              >
                <LogOut size={16} />
                <span>ログアウト</span>
              </button>
            ) : (
              <Link
                href="/login"
                style={{
                  display: "flex", alignItems: "center", gap: 4, padding: "6px 12px",
                  borderRadius: 8, textDecoration: "none", fontSize: 14,
                  fontWeight: pathname === "/login" ? 700 : 400,
                  color: pathname === "/login" ? "#fff" : "#a8d5be",
                  background: pathname === "/login" ? "rgba(255,255,255,0.15)" : "transparent",
                }}
              >
                <LogIn size={16} />
                <span>ログイン</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
