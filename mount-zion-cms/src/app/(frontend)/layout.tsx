import React from 'react'
import './styles.css'
import { TopHeader } from '@/components/layout/TopHeader'

export const metadata = {
  title: 'Mount Zion International School - CBSE',
  description:
    'Nurturing Minds. Building Character. Inspiring Future Leaders. Admissions Open 2026-2027.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 text-neutral-900 antialiased min-h-screen flex flex-col">
        <TopHeader />
        <main className="flex-1 w-full">{children}</main>
      </body>
    </html>
  )
}
