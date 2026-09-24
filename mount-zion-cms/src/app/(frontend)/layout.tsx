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

  let headerCmsData: (HeaderData & { showTopBar?: boolean; logo?: any }) | undefined = undefined
  let footerCmsData: FooterType | null = null
  let footerMenuColumns: any[] = []
  let themeData: any = null

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    try {
      themeData = await payload.findGlobal({
        slug: 'theme',
        depth: 2,
        draft: false,
      })
    } catch {
      // Theme global not initialized yet
    }

    let headerMenuGroup: any = null
    let footerMenuGroup: any = null

    // Fetch Header Global
    const header = (await payload.findGlobal({
      slug: 'header',
      depth: 2,
      draft: false,
    })) as any

    // Resolve Header Menu Group
    try {
      if (header?.menuGroup) {
        if (typeof header.menuGroup === 'object') {
          headerMenuGroup = header.menuGroup
        } else {
          headerMenuGroup = await payload.findByID({
            collection: 'menu-groups',
            id: header.menuGroup,
            depth: 2,
          })
        }
      } else {
        const headerGroupRes = await payload.find({
          collection: 'menu-groups',
          where: { slug: { equals: 'header' } },
          depth: 2,
          limit: 1,
        })
        if (headerGroupRes.docs.length > 0) {
          headerMenuGroup = headerGroupRes.docs[0]
        }
      }
    } catch (e) {
      console.log('Error resolving header menu group:', e)
    }

    const resolveItemUrl = (item: any): string => {
      if (item?.linkType === 'page' && item.page) {
        const pageSlug = typeof item.page === 'object' ? item.page.slug : ''
        return pageSlug === 'home' ? '/' : `/${pageSlug}`
      }
      if (item?.customUrl && typeof item.customUrl === 'string' && item.customUrl.trim()) {
        return item.customUrl.trim()
      }
      if (item?.url && typeof item.url === 'string' && item.url.trim()) {
        return item.url.trim()
      }
      if (item?.link && typeof item.link === 'string' && item.link.trim()) {
        return item.link.trim()
      }
      return '/'
    }

    let navItems: any[] = []

    if (headerMenuGroup?.menus && headerMenuGroup.menus.length > 0) {
      // Pick first menu or combine menu items
      const mainNavMenu =
        headerMenuGroup.menus.find((m: any) => m.menuKey === 'main-nav') ||
        headerMenuGroup.menus[0]

      if (mainNavMenu?.items && mainNavMenu.items.length > 0) {
        navItems = mainNavMenu.items.map((item: any) => ({
          label: item.label,
          url: resolveItemUrl(item),
          children: item.submenuItems?.map((sub: any) => ({
            label: sub.label,
            url: resolveItemUrl(sub),
          })),
        }))
      }
    } else if ((header as any)?.navItems && (header as any).navItems.length > 0) {
      navItems = (header as any).navItems.map((item: any) => ({
        label: item.label,
        url: item.link || item.url || resolveItemUrl(item),
        isActive: item.isActive,
        showExpandIcon: item.showExpandIcon,
        children: (item.subItems || item.children)?.map((sub: any) => ({
          label: sub.label,
          url: sub.link || sub.url || resolveItemUrl(sub),
        })),
      }))
    }

    const resolvedHeaderLogo = header?.logo || themeData?.logo || null

    if (header) {
      headerCmsData = {
        showTopBar: header.topBar?.showTopBar ?? true,
        phone: header.topBar?.phone || '',
        email: header.topBar?.email || '',
        backgroundColor: (header.topBar as any)?.backgroundColor || '#EAB308',
        textColor: (header.topBar as any)?.textColor || '#0F172A',
        navItems,
        logo: resolvedHeaderLogo,
      }
    }

    // Fetch Footer Global
    footerCmsData = (await payload.findGlobal({
      slug: 'footer',
      depth: 2,
      draft: false,
    })) as FooterType

    // Resolve Footer Menu Group
    try {
      if ((footerCmsData as any)?.menuGroup) {
        if (typeof (footerCmsData as any).menuGroup === 'object') {
          footerMenuGroup = (footerCmsData as any).menuGroup
        } else {
          footerMenuGroup = await payload.findByID({
            collection: 'menu-groups',
            id: (footerCmsData as any).menuGroup,
            depth: 2,
          })
        }
      } else {
        const footerGroupRes = await payload.find({
          collection: 'menu-groups',
          where: { slug: { equals: 'footer' } },
          depth: 2,
          limit: 1,
        })
        if (footerGroupRes.docs.length > 0) {
          footerMenuGroup = footerGroupRes.docs[0]
        }
      }
    } catch (e) {
      console.log('Error resolving footer menu group:', e)
    }

    if (footerMenuGroup?.menus && footerMenuGroup.menus.length > 0) {
      footerMenuColumns = footerMenuGroup.menus.map((m: any) => ({
        title: m.title || 'Quick links',
        items:
          m.items?.map((item: any) => ({
            label: item.label,
            url: resolveItemUrl(item),
            openInNewTab: Boolean(item.openInNewTab),
          })) || [],
      }))
    }

    if (footerCmsData && !footerCmsData.logo && themeData?.footerLogo) {
      footerCmsData.logo = themeData.footerLogo
    }
  } catch (err) {
    console.log('Error fetching globals:', err)
  }

  // Dynamic Theme CSS variables
  const headingFont = themeData?.headingFont || 'Plus Jakarta Sans'
  const bodyFont = themeData?.bodyFont || 'Plus Jakarta Sans'
  const baseFontSize = themeData?.baseFontSize || '16px'
  const headingWeight = themeData?.headingWeight || '700'
  const primaryColor = themeData?.primaryColor || '#03594E'
  const accentColor = themeData?.accentColor || '#EAB308'
  const pageBgColor = themeData?.backgroundColor || '#F8FAFC'
  const textColor = themeData?.textColor || '#0F172A'

  // Dynamic Google Font URL generation for whatever font is selected
  const SYSTEM_FONTS = new Set([
    'system-ui',
    'Arial',
    'Helvetica',
    'Calibri',
    'Cambria',
    'Georgia',
    'Times New Roman',
    'Verdana',
    'Trebuchet MS',
    'Impact',
    'Courier New',
    'sans-serif',
    'serif',
    'monospace',
  ])
  const fontsToLoad = new Set<string>()
  if (headingFont && !SYSTEM_FONTS.has(headingFont)) fontsToLoad.add(headingFont)
  if (bodyFont && !SYSTEM_FONTS.has(bodyFont)) fontsToLoad.add(bodyFont)

  const fontParams = Array.from(fontsToLoad)
    .map((f) => `family=${f.replace(/ /g, '+')}:wght@300;400;500;600;700;800;900`)
    .join('&')

  const googleFontsUrl = fontParams
    ? `https://fonts.googleapis.com/css2?${fontParams}&display=swap`
    : null

  const dynamicStyles = `
    :root {
      --font-heading: '${headingFont}', sans-serif;
      --font-body: '${bodyFont}', sans-serif;
      --font-size-base: ${baseFontSize};
      --font-weight-heading: ${headingWeight};
      --color-primary: ${primaryColor};
      --color-accent: ${accentColor};
      --color-page-bg: ${pageBgColor};
      --color-text-main: ${textColor};
    }
  `

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=K2D:wght@700;800&family=Merriweather:wght@400;700&family=Open+Sans:wght@400;600;700&family=Outfit:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        {googleFontsUrl && <link href={googleFontsUrl} rel="stylesheet" />}
        <style dangerouslySetInnerHTML={{ __html: dynamicStyles }} />
      </head>
      <body
        className="antialiased min-h-screen flex flex-col"
        style={{
          backgroundColor: 'var(--color-page-bg, #F8FAFC)',
          color: 'var(--color-text-main, #0F172A)',
        }}
        suppressHydrationWarning
      >
        {/* Dynamic CMS Header */}
        <TopHeader data={headerCmsData} />
        <main className="flex-1 w-full">{children}</main>
        {/* Dynamic CMS Footer */}
        <FooterComponent footer={footerCmsData} footerMenus={footerMenuColumns} />
      </body>
    </html>
  )
}
