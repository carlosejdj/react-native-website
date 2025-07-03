import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'CaktoDigital - Plataforma de Marketing Digital',
  description: 'Plataforma completa de marketing digital para empresas. Google Ads, Facebook Ads, SEO, Analytics e muito mais.',
  keywords: 'marketing digital, google ads, facebook ads, seo, analytics, performance marketing',
  authors: [{ name: 'CaktoDigital Team' }],
  openGraph: {
    title: 'CaktoDigital - Marketing Digital de Performance',
    description: 'Transforme seu negócio com nossa plataforma de marketing digital completa',
    type: 'website',
    locale: 'pt_BR',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}