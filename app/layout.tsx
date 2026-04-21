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
  title: 'FlowOS — Installe un AI OS dans Ton Business en 90 Jours',
  description: 'FlowOS est un accompagnement hybride de 90 jours pour fondateurs établis. On installe un AI OS dans ton business — et on te donne les compétences pour le piloter.',
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
