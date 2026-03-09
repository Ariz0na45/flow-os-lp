import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/components/smooth-scroll'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'FlowOS — Automatise Ton Business d\'Infopreneur en 90 Jours',
  description: 'FlowOS est un accompagnement 1:1 Done-With-You de 90 jours pour infopreneurs francophones qui veulent maîtriser l\'IA et l\'automation sans coder.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${poppins.variable} ${inter.variable} font-sans antialiased bg-black text-white`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
