import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { RenderBlocks } from '@/components/RenderBlocks'
import { WhyMountZionSection } from '@/components/sections/WhyMountZionSection'
import { ProgramsBlockComponent } from '@/components/blocks/ProgramsBlockComponent'
import { FacilitiesBlockComponent } from '@/components/blocks/FacilitiesBlockComponent'
import { ToppersBlockComponent } from '@/components/blocks/ToppersBlockComponent'
import { CampusLifeBlockComponent } from '@/components/blocks/CampusLifeBlockComponent'
import { TestimonialsBlockComponent } from '@/components/blocks/TestimonialsBlockComponent'
import { NewsEventsBlockComponent } from '@/components/blocks/NewsEventsBlockComponent'
import type { Page } from '@/payload-types'

export const dynamic = 'force-dynamic'

const defaultLayout: Page['layout'] = [
  {
    blockType: 'hero',
    badge: 'MOUNTZION',
    heading: 'Nurturing Minds. Building Character. Inspiring Future Leaders.',
    backgroundImage: null as any,
    primaryButtonText: 'Explore',
    primaryButtonUrl: '#explore',
    secondaryButtonText: 'Admission',
    secondaryButtonUrl: '#admission',
  },
]

export default async function HomePage() {
  let layout: Page['layout'] = []

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Fetch all pages sorted by ID so Home comes first, followed by other pages
    const pagesResult = await payload.find({
      collection: 'pages',
      sort: 'id',
      limit: 100,
      depth: 2,
    })

    const allPages = (pagesResult.docs || []) as Page[]
    const homePage = allPages.find((p) => p.slug === 'home')
    const otherPages = allPages.filter((p) => p.slug !== 'home')

    const combinedBlocks: NonNullable<Page['layout']> = []

    // 1. Add blocks from Home page
    if (homePage?.layout) {
      combinedBlocks.push(...homePage.layout)
    }

    // 2. Add blocks from other pages created in CMS (e.g. about-us, academics, facilities, etc.)
    for (const p of otherPages) {
      if (p.layout) {
        combinedBlocks.push(...p.layout)
      }
    }

    if (combinedBlocks.length > 0) {
      layout = combinedBlocks
    } else {
      layout = defaultLayout
    }
  } catch (error) {
    console.warn('Could not fetch pages from CMS, using default layout:', error)
    layout = defaultLayout
  }

  const hasAboutUs = layout?.some((b) => b.blockType === 'aboutUs' || (b as any).blockType === 'featureSplit')
  const hasPrograms = layout?.some((b) => b.blockType === 'programs')
  const hasFacilities = layout?.some((b) => b.blockType === 'facilities')
  const hasToppers = layout?.some((b) => b.blockType === 'toppers')
  const hasCampusLife = layout?.some((b) => b.blockType === 'campusLife')
  const hasTestimonials = layout?.some((b) => b.blockType === 'testimonials')
  const hasNewsEvents = layout?.some((b) => b.blockType === 'newsEvents')

  return (
    <div className="w-full min-h-screen bg-[#f8fafc]">
      {/* Dynamic Layout Blocks rendered directly from CMS */}
      <RenderBlocks blocks={layout} />

      {/* Fallback for WhyMountZion / About Us section until added to CMS layout */}
      {!hasAboutUs && <WhyMountZionSection />}

      {/* Fallback for Academic Programs section until added to CMS layout */}
      {!hasPrograms && <ProgramsBlockComponent />}

      {/* Fallback for Facilities section until added to CMS layout */}
      {!hasFacilities && <FacilitiesBlockComponent />}

      {/* Fallback for Toppers & Achievements section until added to CMS layout */}
      {!hasToppers && <ToppersBlockComponent />}

      {/* Fallback for Campus Life & Gallery section until added to CMS layout */}
      {!hasCampusLife && <CampusLifeBlockComponent />}

      {/* Fallback for Testimonials & Reviews section until added to CMS layout */}
      {!hasTestimonials && <TestimonialsBlockComponent />}

      {/* Fallback for News & Academic Events Listing section until added to CMS layout */}
      {!hasNewsEvents && <NewsEventsBlockComponent />}
    </div>
  )
}
