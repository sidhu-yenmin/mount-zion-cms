import React from 'react'
import './styles.css'
import { TopHeader } from '@/components/layout/TopHeader'
import { FooterComponent } from '@/components/layout/FooterComponent'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Header as HeaderType, Footer as FooterType } from '@/payload-types'
import { HeaderData, NavItem } from '@/types/cms'

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

    const defaultNavItems: NavItem[] = [
      { label: 'Home', url: '/', isActive: true, showExpandIcon: false },
      {
        label: 'Our School',
        url: '#about',
        isActive: false,
        showExpandIcon: true,
        hasDropdown: true,
        children: [
          { label: 'About Mount Zion', url: '#about' },
          { label: 'Vision & Mission', url: '#vision' },
          { label: 'Leadership', url: '#leadership' },
        ],
      },
      {
        label: 'Education',
        url: '#education',
        isActive: false,
        showExpandIcon: true,
        hasDropdown: true,
        children: [
          { label: 'CBSE Curriculum', url: '#curriculum' },
          { label: 'Primary School', url: '#primary' },
          { label: 'Middle School', url: '#middle' },
          { label: 'Senior Secondary', url: '#senior' },
        ],
      },
      {
        label: 'Student Life',
        url: '#student-life',
        isActive: false,
        showExpandIcon: true,
        hasDropdown: true,
        children: [
          { label: 'Sports & Athletics', url: '#sports' },
          { label: 'Arts & Culture', url: '#arts' },
          { label: 'Student Clubs', url: '#clubs' },
        ],
      },
      { label: 'Admissions', url: '#admissions', isActive: false, showExpandIcon: false },
      { label: 'Contact', url: '#contact', isActive: false, showExpandIcon: false },
    ]

    if (header) {
      const cmsNavItems =
        header.navItems && header.navItems.length > 0
          ? header.navItems.map((item: any) => ({
              label: item.label,
              url: item.link,
              isActive: Boolean(item.isActive),
              showExpandIcon: Boolean(item.showExpandIcon ?? item.hasDropdown),
              hasDropdown: Boolean(item.hasDropdown),
              children: item.subItems?.map((sub: any) => ({
                label: sub.label,
                url: sub.link,
              })),
            }))
          : defaultNavItems

      headerCmsData = {
        showTopBar: header.topBar?.showTopBar ?? true,
        phone: header.topBar?.phone || '+91 - 9876543210',
        email: header.topBar?.email || 'info@mountzion.com',
        navItems: cmsNavItems,
      }
    } else {
      headerCmsData = {
        showTopBar: true,
        phone: '+91 - 9876543210',
        email: 'info@mountzion.com',
        navItems: defaultNavItems,
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
          href="https://fonts.googleapis.com/css2?family=K2D:wght@800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap"
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
