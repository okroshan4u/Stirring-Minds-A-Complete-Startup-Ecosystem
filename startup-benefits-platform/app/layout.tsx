import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/features/Navigation'
import  {AuthProvider}  from '@/src/context/AuthContext'

// Font configurations
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'StartupBenefits - Unlock $500,000+ in SaaS Benefits',
  description:
    'Access exclusive deals from top SaaS companies. From AWS credits to design tools, get everything your startup needs to scale faster.',
  keywords: 'startup benefits, saas deals, startup discounts, aws credits, stripe deals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased bg-neutral-50 text-neutral-900">
        <AuthProvider>
          <Navigation />
          <main className="min-h-screen">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
