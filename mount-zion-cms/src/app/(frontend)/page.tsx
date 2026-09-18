import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { HeroSection } from '@/components/sections/HeroSection'
import { WhyMountZionSection } from '@/components/sections/WhyMountZionSection'
import type { Page } from '@/payload-types'
import { HeroData } from '@/types/cms'
// import { mockHeroData } from '@/data/mockData'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // 1. Fetch Header for Logo
  const header = (await payload.findGlobal({
    slug: 'header',
    depth: 2,
  })) as any

  const logoUrl =
    typeof header?.logo === 'object' && header?.logo?.url ? header.logo.url : undefined

  // 2. Fetch Home Page
  const pagesResult = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    depth: 2,
  })

  const homePage = pagesResult.docs?.[0] as Page | undefined

  // If page not found in CMS, trigger 404 (No fallback)
  if (!homePage) {
    return notFound()
  }

  const heroBlock = homePage.layout?.find((b) => b.blockType === 'hero') as any

  if (!heroBlock) {
    return notFound()
  }

  // Split heading into 3 lines
  const rawHeading = (heroBlock.heading || '').trim()
  let lines = rawHeading.includes('\n')
    ? rawHeading.split('\n')
    : rawHeading.split('. ').map((s: string, idx: number, arr: string[]) => (idx < arr.length - 1 ? s + '.' : s))

  if (lines.length < 3) {
    lines = [lines[0] || 'Nurturing Minds.', lines[1] || 'Building Character.', lines[2] || 'Inspiring Future Leaders.']
  }

  const bgImage =
    typeof heroBlock.backgroundImage === 'object' && heroBlock.backgroundImage?.url
      ? heroBlock.backgroundImage.url
      : '/images/hero-student.png'

  const heroData: HeroData = {
    tag: heroBlock.badge || 'MOUNTZION',
    headingLine1: lines[0],
    headingLine2: lines[1],
    headingLine3: lines[2],
    primaryCtaText: heroBlock.primaryButtonText || 'Explore',
    primaryCtaLink: heroBlock.primaryButtonUrl || '#explore',
    secondaryCtaText: heroBlock.secondaryButtonText || 'Admission',
    secondaryCtaLink: heroBlock.secondaryButtonUrl || '#admission',
    backgroundImage: bgImage,
    videoUrl: heroBlock.videoUrl || '',
    logoUrl: logoUrl,
  }

  return (
    <div className="w-full min-h-screen bg-[#f8fafc]">
      {/* 1. Hero Section with Floating Stats (Dynamic CMS Data + Pure HTML/Tailwind) */}
      <HeroSection data={heroData} />

      {/* 2. Why Mount Zion Section */}
      <WhyMountZionSection />
    </div>
  )
}
