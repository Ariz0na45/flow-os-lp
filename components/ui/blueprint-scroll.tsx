"use client"

import type { Dictionary } from "@/lib/i18n/dictionaries"

type BlueprintDict = Dictionary["blueprint"]

export function BlueprintScroll({ dict }: { dict: BlueprintDict }) {
  return (
    <section id="methode" className="relative overflow-hidden" style={{ backgroundColor: "var(--page-bg)" }}>
      {/* Section header */}
      <div className="mx-auto max-w-5xl px-4 pt-28 pb-16">
        <span
          className="text-[10px] font-sans font-semibold tracking-widest uppercase mb-4 block"
          style={{ color: "#636366" }}
        >
          {dict.label}
        </span>
        <h2
          className="font-serif font-bold text-4xl sm:text-5xl tracking-tight text-balance mb-4"
          style={{ color: "#1C1C1E" }}
        >
          {dict.headingLine1}
          <br />
          <span style={{ color: "#3A3A3C" }}>{dict.headingLine2}</span>
        </h2>
        <p className="text-base leading-relaxed max-w-lg" style={{ color: "#636366" }}>
          {dict.subline}
        </p>
      </div>

      {/* Cards */}
      <div className="mx-auto max-w-4xl px-4 pb-24 flex flex-col gap-6">
        {dict.phases.map((phase) => (
          <div
            key={phase.num}
            style={{
              backdropFilter: "blur(40px) saturate(200%)",
              WebkitBackdropFilter: "blur(40px) saturate(200%)",
              background: "rgba(255,255,255,0.72)",
              border: "1px solid rgba(255,255,255,0.92)",
              boxShadow: "0 8px 48px rgba(0,0,0,0.10)",
            }}
            className="w-full rounded-3xl p-8 sm:p-10"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-sans font-bold shrink-0"
                  style={{ background: "#1C1C1E", color: "#fff" }}
                >
                  {phase.num}
                </span>
                <p
                  className="font-serif font-bold text-3xl sm:text-4xl leading-none tracking-tight"
                  style={{ color: "#1C1C1E" }}
                >
                  {phase.name}
                </p>
              </div>
              <span
                className="text-[9px] font-sans font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full shrink-0"
                style={{
                  background: "rgba(0,0,0,0.07)",
                  border: "1px solid rgba(0,0,0,0.10)",
                  color: "#3A3A3C",
                }}
              >
                {phase.tag}
              </span>
            </div>

            {/* Description */}
            <p className="text-base leading-relaxed mb-6 max-w-2xl" style={{ color: "#636366" }}>
              {phase.desc}
            </p>

            {/* Items */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
              {phase.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1 h-1 rounded-full shrink-0 mt-2" style={{ background: "#3A3A3C" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "#636366" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Outcome */}
            <div
              className="flex items-center gap-2.5 pt-5 border-t"
              style={{ borderColor: "rgba(0,0,0,0.08)" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span className="text-sm italic" style={{ color: "#3A3A3C" }}>
                {phase.outcome}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-[10px] pb-28 pt-2 text-center" style={{ color: "#636366" }}>
        {dict.footerNote}
      </p>
    </section>
  )
}
