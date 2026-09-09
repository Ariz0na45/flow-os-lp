import { NextResponse } from "next/server"

// Relays each quiz answer (including partial / abandoned submissions) to an n8n
// webhook. The webhook URL stays server-side so it never leaks to the browser
// and we avoid CORS. Configure N8N_WEBHOOK_URL in .env.local and on Vercel.
export async function POST(req: Request) {
  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 })
  }

  const webhook = process.env.N8N_WEBHOOK_URL
  if (!webhook) {
    // No webhook configured yet — don't break the funnel, just log.
    console.warn("[lead] N8N_WEBHOOK_URL not set — dropping lead:", payload)
    return NextResponse.json({ ok: true, forwarded: false })
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(payload as Record<string, unknown>),
        receivedAt: new Date().toISOString(),
      }),
    })
    return NextResponse.json({ ok: res.ok, forwarded: true })
  } catch (err) {
    console.error("[lead] forward to n8n failed:", err)
    // Swallow the error so the funnel keeps working even if n8n is down.
    return NextResponse.json({ ok: true, forwarded: false })
  }
}
