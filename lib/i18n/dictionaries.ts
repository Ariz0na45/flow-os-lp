import { fr } from "./fr"
import { en } from "./en"

export type { Dictionary } from "./fr"

export type Lang = "fr" | "en"
export const locales: Lang[] = ["fr", "en"]

const dicts = { fr, en }

export function getDictionary(lang: Lang) {
  return dicts[lang]
}
