import { getDictionary, locales, type Lang } from "@/lib/i18n/dictionaries"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!locales.includes(lang)) notFound()
  const dict = getDictionary(lang)
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: Lang }>
}) {
  const { lang } = await params
  if (!locales.includes(lang)) notFound()
  return <>{children}</>
}
