"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"

// ─── Brand ───────────────────────────────────────────────
const LOGO = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FlowOS-JtznK6RZZIiu5LvIS7iMeGfWun0D73.png"
const IG_URL = "https://www.instagram.com/wissamdarsouni"
const CAL_LINK = "wissam-darsouni/audit-flowos"          // cal.com/<CAL_LINK>
const VSL_YT_ID = "ehqlCsgYZ58"                          // vidéo de fin de quiz (swap ici)

// ─── Dark theme — matches the FlowOS skill-store DA ──────
const BG = "#000000"
const TEXT = "#FFFFFF"           // primary text / headings
const TEXT_MUTED = "#8E8E93"     // body / captions (steel)
const OXBLOOD = "#7B2D26"        // accent FILL (CTA, progress, selected) — carousel DA
const PEACH = "#E89B91"          // accent TEXT on dark (highlight words) — carousel DA
const CARD_BG = "rgba(28,28,30,0.56)"
const CARD_BORDER = "rgba(58,58,60,0.7)"
const CARD_SHADOW = "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)"
const PANEL_BG = "rgba(0,0,0,0.72)"        // top/bottom fixed bars
const INPUT_BORDER = "rgba(255,255,255,0.22)"

// ─── Questions ───────────────────────────────────────────
type Option = string
type Step = {
  id: string
  type: "text" | "email" | "textarea" | "select"
  label: string
  hint?: string
  placeholder?: string
  prefix?: string
  required?: boolean
  options?: Option[]
}

const STEPS: Step[] = [
  {
    id: "prenom",
    type: "text",
    label: "Comment tu t'appelles ?",
    placeholder: "Ton prénom",
    required: true,
  },
  {
    id: "email",
    type: "email",
    label: "Ton meilleur email ?",
    hint: "C'est là que je t'envoie ton plan.",
    placeholder: "toi@email.com",
    required: true,
  },
  {
    id: "instagram",
    type: "text",
    label: "Ton compte Instagram ?",
    hint: "Pour t'envoyer ton plan directement en DM.",
    placeholder: "ton_compte",
    prefix: "@",
    required: true,
  },
  {
    id: "activite",
    type: "select",
    label: "Tu fais quoi, aujourd'hui ?",
    required: true,
    options: [
      "Coach",
      "Consultant / Freelance",
      "Fondateur d'agence",
      "Infopreneur / Créateur",
      "Autre",
    ],
  },
  {
    id: "offre",
    type: "textarea",
    label: "C'est quoi ton offre principale ?",
    hint: "Décris en 1-2 phrases ce que tu vends et à qui. Ça me sert à comprendre tes process et personnaliser ton plan.",
    placeholder: "Ex : j'accompagne des coachs à structurer leur offre…",
    required: true,
  },
  {
    id: "ca",
    type: "select",
    label: "Ton chiffre d'affaires mensuel actuel ?",
    required: true,
    options: [
      "Moins de 2 000€",
      "2 000€ – 5 000€",
      "5 000€ – 10 000€",
      "10 000€ – 25 000€",
      "25 000€ et +",
    ],
  },
  {
    id: "goulot",
    type: "select",
    label: "C'est quoi ton plus gros frein pour scaler ?",
    required: true,
    options: [
      "Je suis noyé dans l'opérationnel",
      "Je perds des leads dans mes DMs / mon suivi",
      "Je dépends de freelances pour tout ce qui est tech",
      "Aucun système ne tourne sans moi",
      "Mon expertise vit dans ma tête",
      "Autre",
    ],
  },
  {
    id: "dejaEssaye",
    type: "textarea",
    label: "Qu'est-ce que t'as déjà essayé pour le régler ?",
    hint: "Plus tu es précis, plus ton plan sera personnalisé.",
    placeholder: "Écris ta réponse ici…",
    required: false,
  },
]

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

// ─── Persistent banners ──────────────────────────────────
function TopBanner() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex flex-col items-center gap-2 px-4 pt-4 pb-3 backdrop-blur-xl"
      style={{ background: PANEL_BG, borderBottom: `1px solid ${CARD_BORDER}` }}>
      <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="flex items-center">
        <Image src={LOGO} alt="FlowOS" width={88} height={30} className="h-6 w-auto object-contain" priority />
      </a>
      <p className="text-center text-[13px] sm:text-sm font-semibold leading-snug max-w-xl" style={{ color: TEXT }}>
        Reçois ton <span style={{ color: PEACH }}>Plan d'implémentation IA personnalisé</span> — gratuit, en moins de 60 secondes.
      </p>
    </header>
  )
}

function BottomBar() {
  return (
    <footer className="fixed bottom-0 inset-x-0 z-50 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2.5 backdrop-blur-xl text-[11px] sm:text-xs font-medium"
      style={{ background: PANEL_BG, borderTop: `1px solid ${CARD_BORDER}`, color: TEXT_MUTED }}>
      <span>⭐ Ton plan perso en moins de 60 secondes</span>
      <span className="hidden sm:inline">⭐ Construit sur-mesure pour ton business</span>
    </footer>
  )
}

// ─── Primary button ──────────────────────────────────────
function Cta({ children, onClick, disabled, type = "button" }: {
  children: React.ReactNode; onClick?: () => void; disabled?: boolean; type?: "button" | "submit"
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="px-8 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-40 disabled:translate-y-0 disabled:cursor-not-allowed"
      style={{ background: OXBLOOD, boxShadow: "0 4px 24px rgba(123,45,38,0.45)" }}
    >
      {children}
    </button>
  )
}

// ─── AI OS visual (A/B variant A) ────────────────────────
// Wissam's hero visual (public/ai-os-visual.html, self-contained, transparent
// bg, native 2560×1440). Rendered live in an iframe so the real browser loads
// the exact fonts — faithful to the original design, crisp at any size.
// The iframe is kept at native size and scaled to the container width (the HTML
// already scales its own stage to 1:1 at 2560×1440), so the full composition
// always shows, responsively. Decorative (no pointer events).
const VISUAL_W = 2560
const VISUAL_H = 1440
function AiOsVisual() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const update = () => setScale(el.clientWidth / VISUAL_W)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={wrapRef} className="w-full rounded-3xl overflow-hidden relative"
      style={{ aspectRatio: `${VISUAL_W} / ${VISUAL_H}` }}>
      {scale > 0 && (
        <iframe
          src="/ai-os-visual.html"
          title="Aperçu d'un AI OS FlowOS"
          scrolling="no"
          style={{
            position: "absolute", top: 0, left: 0,
            width: VISUAL_W, height: VISUAL_H,
            transform: `scale(${scale})`, transformOrigin: "top left",
            border: 0, background: "transparent", pointerEvents: "none",
          }}
        />
      )}
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────
// ─── Cal.com inline embed ────────────────────────────────
// Loads the official embed script once and mounts the booking calendar inline,
// dark-themed to match the page. Prefills name/email from the quiz answers.
declare global { interface Window { Cal?: any } }
function CalEmbed({ name, email }: { name?: string; email?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.Cal) {
      // Official cal.com snippet (minified), guarded so it only runs once.
      ;(function (C: any, A: string, L: string) {
        const p = function (a: any, ar: any) { a.q.push(ar) }
        const d = C.document
        C.Cal = C.Cal || function () {
          const cal = C.Cal; const ar = arguments
          if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true }
          if (ar[0] === L) {
            const api: any = function () { p(api, arguments) }; const namespace = ar[1]; api.q = api.q || []
            if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]) } else p(cal, ar)
            return
          }
          p(cal, ar)
        }
      })(window, "https://app.cal.com/embed/embed.js", "init")
      window.Cal("init", { origin: "https://cal.com" })
    }
    el.innerHTML = ""
    window.Cal("inline", {
      elementOrSelector: el,
      calLink: CAL_LINK,
      layout: "month_view",
      config: { layout: "month_view", theme: "dark", name: name ?? "", email: email ?? "" },
    })
    window.Cal("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view",
      cssVarsPerTheme: { dark: { "cal-brand": OXBLOOD } } })
  }, [name, email])
  return <div ref={ref} className="w-full" style={{ minHeight: 560, overflow: "auto" }} />
}

export default function Page() {
  // -1 = intro, 0..n = questions, n = done handled via `done`
  const [stage, setStage] = useState<number>(-1)
  const [done, setDone] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [error, setError] = useState<string | null>(null)
  // false until the mount effect has read the URL — so dev shortcuts (?done=1,
  // ?skip=1) mount their target section directly instead of exiting the intro.
  const [booted, setBooted] = useState(false)
  const sessionId = useRef<string>("")
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)

  // Stable session id (survives refresh) so partial answers map to one person.
  // Dev shortcut: `?skip=1` jumps straight to the last question (verify redirect).
  useEffect(() => {
    const SID_KEY = "flowos_lead_session"
    let sid = localStorage.getItem(SID_KEY)
    if (!sid) {
      sid = (crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`)
      localStorage.setItem(SID_KEY, sid)
    }
    sessionId.current = sid
    const qs = new URLSearchParams(window.location.search)
    if (qs.get("skip") === "1") setStage(STEPS.length - 1)
    // Dev shortcut: `?done=1` jumps straight to the final page (no quiz).
    if (qs.get("done") === "1") {
      setAnswers({ prenom: qs.get("prenom") ?? "Wissam", email: qs.get("email") ?? "test@flow-os.ai", instagram: "wissamdarsouni" })
      setDone(true)
    }
    setBooted(true)
  }, [])

  useEffect(() => {
    // focus the field when a new text question shows
    if (stage >= 0 && !done) inputRef.current?.focus()
  }, [stage, done])

  // Fire-and-forget partial capture to /api/lead → n8n.
  const capture = useCallback((data: Record<string, string>, completed: boolean, reachedStep: number) => {
    // Always include every question field (empty until answered) so the webhook
    // payload is constant whatever step the visitor stops at — stable n8n mapping.
    const allFields = Object.fromEntries(STEPS.map((s) => [s.id, data[s.id] ?? ""]))
    const body = JSON.stringify({
      sessionId: sessionId.current,
      variant: "A",
      completed,
      reachedStep,
      ...allFields,
    })
    try {
      const blob = new Blob([body], { type: "application/json" })
      if (navigator.sendBeacon && navigator.sendBeacon("/api/lead", blob)) return
    } catch {/* fall through to fetch */}
    fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {})
  }, [])

  const step = stage >= 0 ? STEPS[stage] : null

  const setValue = (v: string) => {
    if (!step) return
    setAnswers((a) => ({ ...a, [step.id]: v }))
    if (error) setError(null)
  }

  const advance = (nextAnswers: Record<string, string>) => {
    const reached = stage + 1
    // Capture every step (so abandons are saved with whatever they filled).
    capture(nextAnswers, reached >= STEPS.length, reached)
    if (reached >= STEPS.length) {
      setDone(true)
    } else {
      setStage(reached)
    }
  }

  const handleNext = () => {
    if (!step) return
    const val = (answers[step.id] ?? "").trim()
    if (step.required && !val) {
      setError("Cette réponse est obligatoire.")
      return
    }
    if (step.type === "email" && val && !isValidEmail(val)) {
      setError("Hmm, cet email ne semble pas valide.")
      return
    }
    advance({ ...answers, [step.id]: val })
  }

  const handleSelect = (option: string) => {
    if (!step) return
    const next = { ...answers, [step.id]: option }
    setAnswers(next)
    setError(null)
    // small delay for the selected state to register visually
    setTimeout(() => advance(next), 180)
  }

  const progress = stage < 0 ? 0 : ((stage + (done ? 1 : 0)) / STEPS.length) * 100

  return (
    <main className="relative min-h-screen overflow-x-hidden font-sans" style={{ background: BG, color: TEXT }}>
      {/* Atmospherics — soft orbs only (dot grid removed) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute" style={{
          top: "-15%", left: "20%", width: 700, height: 700,
          background: "radial-gradient(circle, rgba(162,170,173,0.13) 0%, transparent 60%)", filter: "blur(40px)",
        }} />
        <div className="absolute" style={{
          bottom: "-25%", right: "-5%", width: 600, height: 600,
          background: "radial-gradient(circle, rgba(142,142,147,0.10) 0%, transparent 60%)", filter: "blur(50px)",
        }} />
      </div>

      <TopBanner />
      <BottomBar />

      {/* progress bar */}
      {stage >= 0 && (
        <div className="fixed top-[68px] sm:top-[72px] inset-x-0 z-40 h-[3px]" style={{ background: "rgba(255,255,255,0.08)" }}>
          <motion.div className="h-full" style={{ background: PEACH }}
            animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
        </div>
      )}

      <div className="relative z-10 min-h-screen flex items-center justify-center px-5 pt-28 pb-24">
        <AnimatePresence mode="wait">
          {/* ───── INTRO ───── */}
          {booted && stage === -1 && !done && (
            <motion.section key="intro"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center text-center gap-7 max-w-2xl w-full">
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.06] tracking-tight text-balance" style={{ color: TEXT }}>
                Je te montre comment <span style={{ color: PEACH }}>j'installerais l'IA</span> dans ton business.
              </h1>
              <p className="text-base sm:text-lg max-w-lg leading-relaxed" style={{ color: TEXT_MUTED }}>
                Réponds à 8 questions rapides. Je regarde ta situation et je t'envoie un <strong style={{ color: TEXT }}>plan d'implémentation IA personnalisé</strong> — comment je systémiserais TON business si j'étais à ta place. Gratuit.
              </p>

              <div className="w-full max-w-2xl mt-2">
                <AiOsVisual />
              </div>

              <Cta onClick={() => setStage(0)}>Recevoir mon plan →</Cta>
              <p className="text-xs" style={{ color: TEXT_MUTED }}>Moins de 60 secondes · 100% gratuit</p>
            </motion.section>
          )}

          {/* ───── QUESTION ───── */}
          {step && !done && (
            <motion.section key={step.id}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6 max-w-xl w-full">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: PEACH }}>
                  Question {stage + 1} / {STEPS.length}
                </span>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl leading-snug" style={{ color: TEXT }}>
                  {step.label}
                </h2>
                {step.hint && <p className="text-sm" style={{ color: TEXT_MUTED }}>{step.hint}</p>}
              </div>

              {/* text / email */}
              {(step.type === "text" || step.type === "email") && (
                <div className="flex items-center border-b-2 pb-1" style={{ borderColor: error ? "#E5736B" : INPUT_BORDER }}>
                  {step.prefix && <span className="text-xl sm:text-2xl mr-1" style={{ color: TEXT_MUTED }}>{step.prefix}</span>}
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type={step.type === "email" ? "email" : "text"}
                    inputMode={step.type === "email" ? "email" : "text"}
                    autoComplete={step.type === "email" ? "email" : "off"}
                    value={answers[step.id] ?? ""}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleNext() } }}
                    placeholder={step.placeholder}
                    className="w-full bg-transparent text-xl sm:text-2xl outline-none placeholder:opacity-40"
                    style={{ color: TEXT }}
                  />
                </div>
              )}

              {/* textarea */}
              {step.type === "textarea" && (
                <textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  value={answers[step.id] ?? ""}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); handleNext() } }}
                  placeholder={step.placeholder}
                  rows={3}
                  className="w-full bg-transparent text-lg outline-none border-b-2 pb-2 resize-none placeholder:opacity-40"
                  style={{ color: TEXT, borderColor: INPUT_BORDER }}
                />
              )}

              {/* select */}
              {step.type === "select" && (
                <div className="flex flex-col gap-2.5">
                  {step.options!.map((opt) => {
                    const selected = answers[step.id] === opt
                    return (
                      <button key={opt} onClick={() => handleSelect(opt)}
                        className="text-left px-5 py-3.5 rounded-2xl text-[15px] font-medium transition-all duration-150 hover:-translate-y-0.5"
                        style={{
                          background: selected ? OXBLOOD : CARD_BG,
                          color: selected ? "#fff" : TEXT,
                          border: `1px solid ${selected ? OXBLOOD : CARD_BORDER}`,
                          boxShadow: CARD_SHADOW,
                        }}>
                        {opt}
                      </button>
                    )
                  })}
                </div>
              )}

              {error && <p className="text-sm" style={{ color: "#E5736B" }}>{error}</p>}

              {/* OK / back — selects auto-advance, others need the button */}
              {step.type !== "select" && (
                <div className="flex items-center gap-4 mt-1">
                  <Cta onClick={handleNext}>OK</Cta>
                  {step.type !== "textarea" && (
                    <span className="text-xs hidden sm:inline" style={{ color: TEXT_MUTED }}>
                      ou appuie sur <kbd className="font-semibold">Entrée ↵</kbd>
                    </span>
                  )}
                </div>
              )}

              {stage > 0 && (
                <button onClick={() => { setError(null); setStage(stage - 1) }}
                  className="text-xs self-start mt-1 hover:underline" style={{ color: TEXT_MUTED }}>
                  ← Précédent
                </button>
              )}
            </motion.section>
          )}

          {/* ───── DONE ───── */}
          {done && (
            <motion.section key="done"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center gap-8 max-w-4xl w-full">
              {/* Confirmation */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: "rgba(123,45,38,0.25)", border: "1px solid rgba(232,155,145,0.35)", color: PEACH }}>
                  <span style={{ width: 7, height: 7, borderRadius: 99, background: PEACH, display: "inline-block" }} />
                  Réponses bien reçues
                </div>
                <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight text-balance" style={{ color: TEXT }}>
                  C'est noté{answers.prenom ? `, ${answers.prenom}` : ""} !
                </h2>
                <p className="text-base sm:text-lg leading-relaxed max-w-xl" style={{ color: TEXT_MUTED }}>
                  Je regarde ta situation et je te recontacte avec ton <strong style={{ color: TEXT }}>plan d'implémentation IA personnalisé</strong>
                  {answers.instagram ? <> en DM sur <span style={{ color: PEACH }}>@{answers.instagram.replace(/^@/, "")}</span></> : null} sous 24–48h.
                </p>
              </div>

              {/* VSL */}
              <div className="w-full flex flex-col items-center gap-3">
                <p className="text-sm" style={{ color: TEXT_MUTED }}>
                  En attendant, 2 minutes pour comprendre <span style={{ color: TEXT }}>ce que je vais te construire</span> 👇
                </p>
                <div className="w-full rounded-2xl overflow-hidden relative"
                  style={{ aspectRatio: "16 / 9", border: `1px solid ${CARD_BORDER}`, boxShadow: CARD_SHADOW, background: "#000" }}>
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${VSL_YT_ID}?rel=0&modestbranding=1&color=white`}
                    title="Vidéo FlowOS"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                  />
                </div>
              </div>

              {/* Booking */}
              <div id="booking" className="w-full flex flex-col items-center gap-5 rounded-3xl p-5 sm:p-8"
                style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, boxShadow: CARD_SHADOW }}>
                <div className="flex flex-col items-center gap-2.5">
                  <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: PEACH }}>Tu veux aller plus vite ?</p>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl leading-tight text-balance" style={{ color: TEXT }}>
                    Réserve directement un créneau avec moi.
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed max-w-lg" style={{ color: TEXT_MUTED }}>
                    On regarde ton business ensemble, je te dis concrètement ce que j'installerais, et on met ça en place plus rapidement.
                  </p>
                </div>
                <div className="w-full rounded-2xl overflow-hidden" style={{ border: `1px solid ${CARD_BORDER}`, background: "rgba(0,0,0,0.35)" }}>
                  <CalEmbed name={answers.prenom} email={answers.email} />
                </div>
                <a href={`https://cal.com/${CAL_LINK}?name=${encodeURIComponent(answers.prenom ?? "")}&email=${encodeURIComponent(answers.email ?? "")}`}
                  target="_blank" rel="noopener noreferrer" className="text-xs underline underline-offset-4" style={{ color: TEXT_MUTED }}>
                  Le calendrier ne s'affiche pas ? Ouvrir dans un nouvel onglet →
                </a>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
