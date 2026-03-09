"use client"

import Link from "next/link"
import type { Lang } from "@/lib/i18n/dictionaries"

export function LangSwitcher({ currentLang }: { currentLang: Lang }) {
  return (
    <div className="flex items-center gap-1 text-[11px] font-sans font-semibold">
      <Link
        href="/fr"
        style={{ color: currentLang === "fr" ? "var(--charcoal)" : "var(--steel)" }}
        className="transition-colors hover:text-[var(--charcoal)]"
      >
        FR
      </Link>
      <span style={{ color: "var(--steel)" }}>/</span>
      <Link
        href="/en"
        style={{ color: currentLang === "en" ? "var(--charcoal)" : "var(--steel)" }}
        className="transition-colors hover:text-[var(--charcoal)]"
      >
        EN
      </Link>
    </div>
  )
}
