"use client";

import { Category } from "@/lib/mockData";

const CATEGORIES: { value: Category | "すべて"; emoji: string; label: string }[] = [
  { value: "すべて", emoji: "🗾", label: "すべて" },
  { value: "風景", emoji: "🏔️", label: "風景" },
  { value: "グルメ", emoji: "🍜", label: "グルメ" },
  { value: "祭り", emoji: "🏮", label: "祭り" },
  { value: "つぶやき", emoji: "💬", label: "つぶやき" },
];

type Props = {
  selected: Category | "すべて";
  onChange: (cat: Category | "すべて") => void;
};

export default function CategoryFilter({ selected, onChange }: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        padding: "12px 0",
      }}
    >
      {CATEGORIES.map(({ value, emoji, label }) => {
        const isActive = selected === value;
        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "8px 16px",
              borderRadius: 24,
              border: isActive ? "2px solid var(--primary)" : "2px solid var(--border)",
              background: isActive ? "var(--primary)" : "var(--surface)",
              color: isActive ? "#fff" : "var(--muted)",
              fontWeight: isActive ? 700 : 400,
              fontSize: 14,
              cursor: "pointer",
              transition: "all 0.15s",
              boxShadow: isActive ? "0 2px 8px rgba(45,106,79,0.25)" : "none",
            }}
          >
            <span>{emoji}</span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
