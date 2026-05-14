"use client"

import { useState, useEffect, use } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { BlueprintScroll } from "@/components/ui/blueprint-scroll"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Backlight } from "@/components/ui/backlight"
import { LangSwitcher } from "@/components/lang-switcher"
import { getDictionary, locales, type Lang, type Dictionary } from "@/lib/i18n/dictionaries"

// ─── Constants ───────────────────────────────────────────
const CARD_BG = "rgba(255,255,255,0.55)"
const CARD_BORDER = "rgba(255,255,255,0.75)"
const CARD_SHADOW = "0 2px 24px rgba(0,0,0,0.06)"

// ─── GlassCard ───────────────────────────────────────────
function GlassCard({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`rounded-3xl overflow-hidden ${className}`}
      style={{
        background: CARD_BG,
        backdropFilter: "blur(40px) saturate(200%)",
        WebkitBackdropFilter: "blur(40px) saturate(200%)",
        border: `1px solid ${CARD_BORDER}`,
        boxShadow: CARD_SHADOW,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ─── Tag chip ─────────────────────────────────────────────
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-[10px] font-sans font-semibold tracking-widest uppercase"
      style={{
        background: "rgba(0,0,0,0.06)",
        border: "1px solid rgba(0,0,0,0.10)",
        color: "var(--graphite)",
        borderRadius: "9999px",
        padding: "3px 10px",
      }}
    >
      {children}
    </span>
  )
}

// ─── Section label ────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-sans font-semibold tracking-widest uppercase" style={{ color: "var(--steel)" }}>
      {children}
    </span>
  )
}

// ─── Orb ─────────────────────────────────────────────────
function Orb({ color = "#FFFFFF", style = {} }: { color?: string; style?: React.CSSProperties }) {
  return (
    <div
      className="absolute pointer-events-none rounded-full"
      style={{
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        filter: "blur(80px)",
        opacity: 0.55,
        ...style,
      }}
    />
  )
}

// ─── OfferCard ────────────────────────────────────────────
function OfferCard({ item, wide }: { item: Dictionary["offer"]["items"][number]; wide: boolean }) {
  return (
    <GlassCard className={`p-7 flex flex-col gap-4 ${wide ? "md:col-span-2" : "md:col-span-1"}`}>
      <div className="flex flex-col gap-1.5">
        <span className="font-serif font-bold text-base" style={{ color: "var(--charcoal)" }}>{item.name}</span>
        <Label>{item.subtitle}</Label>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "var(--steel)" }}>{item.description}</p>
      {item.highlight && (
        <p
          className="text-xs italic leading-relaxed pt-3 border-t"
          style={{ borderColor: "rgba(0,0,0,0.07)", color: "var(--graphite)" }}
        >
          {item.highlight}
        </p>
      )}
      {item.examples && (
        <ul className="flex flex-col gap-2 pt-2">
          {item.examples.map((ex) => (
            <li key={ex} className="flex items-start gap-2.5">
              <span className="w-1 h-1 rounded-full shrink-0 mt-1.5" style={{ background: "var(--graphite)" }} />
              <span className="text-xs leading-relaxed" style={{ color: "var(--steel)" }}>{ex}</span>
            </li>
          ))}
        </ul>
      )}
    </GlassCard>
  )
}

// ─── Nav ─────────────────────────────────────────────────
function Nav({ dict, lang }: { dict: Dictionary["nav"]; lang: Lang }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4">
      <nav
        className="flex items-center justify-between gap-4 px-5 py-2.5 w-full max-w-2xl rounded-full transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.60)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.85)",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.10)" : "0 2px 12px rgba(0,0,0,0.05)",
        }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center shrink-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FlowOS-JtznK6RZZIiu5LvIS7iMeGfWun0D73.png"
            alt="Flow OS"
            width={80}
            height={28}
            className="h-6 w-auto object-contain"
            priority
          />
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-5">
          {dict.links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-[11px] font-sans transition-colors"
              style={{ color: "var(--steel)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--charcoal)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--steel)")}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <LangSwitcher currentLang={lang} />
          {/* CTA */}
          <a
            href="https://www.instagram.com/wissamdarsouni"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-4 py-1.5 rounded-full text-[11px] font-sans font-semibold text-white transition-all duration-200"
            style={{ background: "var(--charcoal)" }}
          >
            {dict.cta}
          </a>
        </div>
      </nav>
    </header>
  )
}

// ─── Main Page ───────────────────────────────────────────
export default function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = use(params)
  if (!locales.includes(lang)) notFound()
  const dict = getDictionary(lang)

  const { hero, pourquoi, resultats, icp, offer, faq, garantie, finalCta } = dict

  return (
    <>
      <Nav dict={dict.nav} lang={lang} />
      <main className="min-h-screen overflow-x-hidden font-sans" style={{ backgroundColor: "var(--page-bg)" }}>

        {/* ───── HERO ───────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center px-4 pt-28 pb-12">
          <Orb color="#FFFFFF" style={{ width: 700, height: 700, top: "-15%", left: "-10%" }} />
          <Orb color="#C8C8C8" style={{ width: 500, height: 500, bottom: "-10%", right: "-8%" }} />

          <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-4xl w-full mx-auto">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.60)", border: "1px solid rgba(255,255,255,0.80)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--graphite)" }} />
              <span className="text-[10px] font-sans font-semibold tracking-widest uppercase" style={{ color: "var(--steel)" }}>
                {hero.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] leading-[1.04] tracking-tight text-balance" style={{ color: "var(--charcoal)" }}>
              {hero.headline.map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  <span style={{ color: i === hero.headline.length - 1 ? "var(--graphite)" : "var(--charcoal)" }}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            {/* Subline */}
            <p className="text-base sm:text-lg max-w-xl leading-relaxed" style={{ color: "var(--steel)" }}>
              {hero.subline}
            </p>

            {/* Stats bento */}
            <div className="grid grid-cols-3 gap-3 mt-6 w-full max-w-md">
              {hero.stats.map((s) => (
                <GlassCard key={s.value} className="flex flex-col items-center gap-1 py-5 px-2">
                  <span className="font-serif font-bold text-xl sm:text-2xl" style={{ color: "var(--charcoal)" }}>{s.value}</span>
                  <span className="text-[9px] font-sans text-center leading-tight" style={{ color: "var(--steel)" }}>{s.label}</span>
                </GlassCard>
              ))}
            </div>

            {/* Video */}
            <Backlight className="mt-10 w-full max-w-5xl" blur={25}>
              <iframe
                className="w-full aspect-video rounded-3xl"
                src="https://www.youtube.com/embed/ehqlCsgYZ58?rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&color=white"
                title="FlowOS"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Backlight>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-10">
              <a
                href="#methode"
                className="px-8 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "var(--charcoal)", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
              >
                {hero.ctaPrimary}
              </a>
            </div>
          </div>
        </section>

        {/* ───── POURQUOI ───────────────────────────────────── */}
        <section id="pourquoi" className="relative py-14 px-4 overflow-hidden">
          <Orb color="#FFFFFF" style={{ width: 600, height: 600, top: 0, right: "-15%" }} />

          <div className="mx-auto max-w-5xl relative z-10">
            <div className="flex flex-col gap-4 mb-16">
              <Label>{pourquoi.label}</Label>
              <h2 className="font-serif font-bold text-4xl sm:text-5xl tracking-tight text-balance" style={{ color: "var(--charcoal)" }}>
                {pourquoi.headingLine1}
                <br />
                <span style={{ color: "var(--graphite)" }}>{pourquoi.headingLine2}</span>
              </h2>
              <p className="text-lg sm:text-xl font-serif font-medium leading-snug max-w-2xl" style={{ color: "var(--graphite)" }}>
                {pourquoi.subline}
              </p>
            </div>

            {/* 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {pourquoi.cards.map((d) => (
                <GlassCard key={d.num} className="p-7 flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.08)" }}
                    >
                      {d.num === "01" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--graphite)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" /><path d="M21 3v4h-4" />
                        </svg>
                      )}
                      {d.num === "02" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--graphite)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      )}
                      {d.num === "03" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--graphite)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      )}
                    </div>
                    <span className="font-serif font-bold text-5xl" style={{ color: "rgba(0,0,0,0.05)" }}>{d.num}</span>
                  </div>
                  <h3 className="font-serif font-semibold text-base" style={{ color: "var(--charcoal)" }}>{d.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--steel)" }}>{d.desc}</p>
                </GlassCard>
              ))}
            </div>

          </div>
        </section>

        {/* ───── BLUEPRINT OS ───────────────────────────────── */}
        <BlueprintScroll dict={dict.blueprint} />

        {/* ───── TRANSFORMATIONS ────────────────────────────── */}
        <section id="resultats" className="relative py-14 px-4 overflow-hidden">
          <Orb color="#C8C8C8" style={{ width: 500, height: 500, bottom: 0, left: "-8%" }} />

          <div className="mx-auto max-w-5xl relative z-10">
            <div className="flex flex-col gap-4 mb-16">
              <Label>{resultats.label}</Label>
              <h2 className="font-serif font-bold text-4xl sm:text-5xl tracking-tight text-balance" style={{ color: "var(--charcoal)" }}>
                {resultats.headingLine1}
                <br />
                <span style={{ color: "var(--graphite)" }}>{resultats.headingLine2}</span>
              </h2>
              <p className="text-base leading-relaxed max-w-lg" style={{ color: "var(--steel)" }}>
                {resultats.subline}
              </p>
            </div>

            {/* Before / After */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* AVANT */}
              <GlassCard
                className="p-8 flex flex-col gap-6"
                style={{ background: "rgba(255,235,235,0.55)", border: "1px solid rgba(255,200,200,0.60)" }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-red-500">
                    {resultats.beforeLabel}
                  </span>
                </div>
                <ul className="flex flex-col gap-5">
                  {resultats.before.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 w-4 h-4 rounded-full shrink-0 flex items-center justify-center"
                        style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.20)" }}
                      >
                        <svg width="7" height="7" viewBox="0 0 8 8" fill="none">
                          <path d="M6 2L2 6M2 2l4 4" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-serif font-semibold text-sm mb-0.5" style={{ color: "var(--charcoal)" }}>{item.label}</p>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--steel)" }}>{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              {/* APRÈS */}
              <GlassCard
                className="p-8 flex flex-col gap-6"
                style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.85)" }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: "var(--graphite)" }} />
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--graphite)" }}>
                    {resultats.afterLabel}
                  </span>
                </div>
                <ul className="flex flex-col gap-5">
                  {resultats.after.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 w-4 h-4 rounded-full shrink-0 flex items-center justify-center"
                        style={{ background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.12)" }}
                      >
                        <svg width="7" height="7" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4l2 2 3-3.5" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-serif font-semibold text-sm mb-0.5" style={{ color: "var(--charcoal)" }}>{item.label}</p>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--steel)" }}>{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>

            {/* ROI proof */}
            <GlassCard className="p-8 sm:p-10">
              <Label>{resultats.roiLabel}</Label>
              <p className="font-serif font-bold text-2xl sm:text-3xl leading-snug mt-5" style={{ color: "var(--charcoal)" }}>
                {resultats.roiLine1}
              </p>
              <p className="font-serif font-bold text-2xl sm:text-3xl mt-1 mb-5" style={{ color: "var(--graphite)" }}>
                {resultats.roiLine2}
              </p>
              <p className="text-sm leading-relaxed max-w-xl" style={{ color: "var(--steel)" }}>
                {resultats.roiText}
              </p>
            </GlassCard>
          </div>
        </section>

        {/* ───── ICP ────────────────────────────────────────── */}
        <section className="relative py-14 px-4 overflow-hidden">
          <Orb color="#FFFFFF" style={{ width: 600, height: 600, top: "10%", left: "50%", transform: "translateX(-50%)" }} />

          <div className="mx-auto max-w-5xl relative z-10">
            <div className="flex flex-col gap-4 mb-16">
              <Label>{icp.label}</Label>
              <h2 className="font-serif font-bold text-4xl sm:text-5xl tracking-tight text-balance" style={{ color: "var(--charcoal)" }}>
                {icp.headingLine1}
                <br />
                <span style={{ color: "var(--graphite)" }}>{icp.headingLine2}</span>
              </h2>
              <p className="text-base leading-relaxed max-w-lg" style={{ color: "var(--steel)" }}>
                {icp.subline}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GlassCard className="p-8">
                <Label>{icp.forLabel}</Label>
                <div className="flex flex-col gap-4 mt-6">
                  {icp.forYou.map((d) => (
                    <div key={d} className="flex items-start gap-3">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] mt-0.5"
                        style={{ background: "rgba(0,0,0,0.85)", color: "#fff" }}
                      >
                        ✓
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: "var(--charcoal)" }}>{d}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-8">
                <Label>{icp.notForLabel}</Label>
                <div className="flex flex-col gap-4 mt-6">
                  {icp.notFor.map((d) => (
                    <div key={d} className="flex items-start gap-3">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[9px] mt-0.5"
                        style={{ background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.09)", color: "rgba(0,0,0,0.25)" }}
                      >
                        ✕
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: "var(--steel)" }}>{d}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* ───── OFFER STACK ────────────────────────────────── */}
        <section id="offre" className="relative py-14 px-4 overflow-hidden">
          <Orb color="#C8C8C8" style={{ width: 800, height: 800, top: "-20%", right: "-20%" }} />

          <div className="mx-auto max-w-5xl relative z-10">
            <div className="flex flex-col gap-4 mb-16">
              <Label>{offer.label}</Label>
              <h2 className="font-serif font-bold text-4xl sm:text-5xl tracking-tight text-balance" style={{ color: "var(--charcoal)" }}>
                {offer.headingLine1}{" "}
                <span style={{ color: "var(--graphite)" }}>{offer.headingLine2}</span>
              </h2>
              <p className="text-base leading-relaxed max-w-lg" style={{ color: "var(--steel)" }}>
                {offer.subline}
              </p>
            </div>

            {/* Alternating bento */}
            <div className="flex flex-col gap-4 mb-10">
              {[
                [offer.items[0], offer.items[1]],
                [offer.items[2], offer.items[3]],
                [offer.items[4], offer.items[5]],
              ].map((row, rowIdx) => (
                <div key={rowIdx} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {row.map((item, colIdx) => {
                    const isWide = rowIdx % 2 === 0 ? colIdx === 0 : colIdx === 1
                    return <OfferCard key={item.name} item={item} wide={isWide} />
                  })}
                </div>
              ))}
            </div>

            <a
              href="https://www.instagram.com/wissamdarsouni"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center py-4 rounded-full text-sm font-sans font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "var(--charcoal)", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
            >
              {offer.ctaButton}
            </a>
          </div>
        </section>

        {/* ───── FAQ ────────────────────────────────────────── */}
        <section className="relative py-14 px-4 overflow-hidden">
          <div className="mx-auto max-w-3xl relative z-10">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl tracking-tight mb-10" style={{ color: "var(--charcoal)" }}>
              FAQ
            </h2>

            <Accordion type="single" collapsible className="flex flex-col gap-3">
              {faq.items.map((item, i) => (
                <GlassCard key={item.q}>
                  <AccordionItem value={`faq-${i}`} className="border-b-0 px-6 sm:px-7">
                    <AccordionTrigger className="font-serif font-semibold text-sm py-5 hover:no-underline" style={{ color: "var(--charcoal)" }}>
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed pb-5" style={{ color: "var(--steel)" }}>
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                </GlassCard>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ───── GARANTIE ───────────────────────────────────── */}
        <section id="garantie" className="relative py-14 px-4 overflow-hidden">
          <Orb color="#FFFFFF" style={{ width: 700, height: 700, top: 0, left: "50%", transform: "translateX(-50%)" }} />

          <div className="mx-auto max-w-3xl relative z-10">
            <div className="text-center mb-12">
              <Label>{garantie.label}</Label>
            </div>

            <GlassCard className="p-10 sm:p-14 flex flex-col items-center text-center gap-8">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.09)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--graphite)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>

              <h2 className="font-serif font-bold text-3xl sm:text-4xl tracking-tight text-balance" style={{ color: "var(--charcoal)" }}>
                {garantie.heading}
              </h2>

              <blockquote className="font-serif text-lg sm:text-xl leading-relaxed italic max-w-2xl" style={{ color: "var(--graphite)" }}>
                &ldquo;{garantie.quote}&rdquo;
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                {garantie.points.map((p) => (
                  <div
                    key={p.title}
                    className="rounded-2xl p-5 flex flex-col gap-2 text-left"
                    style={{ background: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.70)" }}
                  >
                    <span className="font-serif font-semibold text-sm" style={{ color: "var(--charcoal)" }}>{p.title}</span>
                    <span className="text-xs leading-relaxed" style={{ color: "var(--steel)" }}>{p.desc}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ───── FINAL CTA ──────────────────────────────────── */}
        <section className="relative py-18 px-4 overflow-hidden">
          <Orb color="#FFFFFF" style={{ width: 800, height: 800, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

          <div className="mx-auto max-w-2xl relative z-10 text-center flex flex-col items-center gap-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FlowOS-JtznK6RZZIiu5LvIS7iMeGfWun0D73.png"
              alt="Flow OS"
              width={120}
              height={42}
              className="h-9 w-auto object-contain"
            />

            <h2 className="font-serif font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-balance" style={{ color: "var(--charcoal)" }}>
              {finalCta.headingLine1}
              <br />
              <span style={{ color: "var(--graphite)" }}>{finalCta.headingLine2}</span>
            </h2>

            <p className="text-lg leading-relaxed max-w-sm" style={{ color: "var(--steel)" }}>
              {finalCta.subline}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="https://www.instagram.com/wissamdarsouni"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 rounded-full text-sm font-sans font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "var(--charcoal)", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
              >
                {finalCta.ctaPrimary}
              </a>
              <a
                href="https://www.instagram.com/wissamdarsouni"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 rounded-full text-sm font-sans font-medium transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.80)",
                  color: "var(--graphite)",
                }}
              >
                {finalCta.ctaSecondary}
              </a>
            </div>

            <p className="text-xs mt-4" style={{ color: "var(--steel)" }}>
              {finalCta.footnote}
            </p>
          </div>
        </section>

      </main>
    </>
  )
}
