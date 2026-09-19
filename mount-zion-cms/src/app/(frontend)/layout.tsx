import React from 'react'
import './styles.css'
import { TopHeader } from '@/components/layout/TopHeader'
import { FooterComponent } from '@/components/layout/FooterComponent'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Header as HeaderType, Footer as FooterType } from '@/payload-types'
import { HeaderData } from '@/types/cms'

export const metadata = {
  title: 'Mount Zion International School - CBSE',
  description:
    'Nurturing Minds. Building Character. Inspiring Future Leaders. Admissions Open 2026-2027.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  let headerCmsData: (HeaderData & { showTopBar?: boolean }) | undefined = undefined
  let footerCmsData: FooterType | null = null

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const header = (await payload.findGlobal({
      slug: 'header',
      depth: 2,
    })) as HeaderType

    if (header) {
      headerCmsData = {
        showTopBar: header.topBar?.showTopBar ?? true,
        phone: header.topBar?.phone || '',
        email: header.topBar?.email || '',
        navItems:
          header.navItems?.map((item) => ({
            label: item.label,
            url: item.link,
            children: item.subItems?.map((sub) => ({
              label: sub.label,
              url: sub.link,
            })),
          })) || [],
      }
    }

    footerCmsData = (await payload.findGlobal({
      slug: 'footer',
      depth: 2,
    })) as FooterType
  } catch (err) {
    console.log('Error fetching header/footer:', err)
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=K2D:wght@800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 text-neutral-900 antialiased min-h-screen flex flex-col">
        {/* Dynamic CMS Header */}
        <TopHeader data={headerCmsData} />
        <main className="flex-1 w-full">{children}</main>
        {/* Dynamic CMS Footer */}
        <FooterComponent footer={footerCmsData} />
      </body>
    </html>
  )
}
