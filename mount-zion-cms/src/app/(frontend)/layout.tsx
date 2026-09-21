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

    let menuData: any = null
    try {
      menuData = await payload.findGlobal({
        slug: 'menu',
        depth: 2,
      })
    } catch {
      // Menu global not initialized yet
    }

    const header = (await payload.findGlobal({
      slug: 'header',
      depth: 2,
    })) as HeaderType

    const resolveItemUrl = (item: any): string => {
      if (item.linkType === 'page' && item.page) {
        const pageSlug = typeof item.page === 'object' ? item.page.slug : ''
        return pageSlug === 'home' ? '/' : `/${pageSlug}`
      }
      return item.customUrl || '/'
    }

    let navItems: any[] = []

    if (menuData?.menuItems && menuData.menuItems.length > 0) {
      navItems = menuData.menuItems.map((item: any) => ({
        label: item.label,
        url: resolveItemUrl(item),
        children: item.submenuItems?.map((sub: any) => ({
          label: sub.label,
          url: resolveItemUrl(sub),
        })),
      }))
    }

    if (header) {
      headerCmsData = {
        showTopBar: header.topBar?.showTopBar ?? true,
        phone: header.topBar?.phone || '',
        email: header.topBar?.email || '',
        backgroundColor: (header.topBar as any)?.backgroundColor || '#EAB308',
        textColor: (header.topBar as any)?.textColor || '#0F172A',
        navItems,
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=K2D:wght@800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-slate-50 text-neutral-900 antialiased min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        {/* Dynamic CMS Header */}
        <TopHeader data={headerCmsData} />
        <main className="flex-1 w-full">{children}</main>
        {/* Dynamic CMS Footer */}
        <FooterComponent footer={footerCmsData} />
      </body>
    </html>
  )
}
