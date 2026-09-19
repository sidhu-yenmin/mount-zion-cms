import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { RenderBlocks } from '@/components/RenderBlocks'
import { WhyMountZionSection } from '@/components/sections/WhyMountZionSection'
import { ProgramsBlockComponent } from '@/components/blocks/ProgramsBlockComponent'
import { FacilitiesBlockComponent } from '@/components/blocks/FacilitiesBlockComponent'
import { ToppersBlockComponent } from '@/components/blocks/ToppersBlockComponent'
import { CampusLifeBlockComponent } from '@/components/blocks/CampusLifeBlockComponent'
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
  let layout = defaultLayout

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Fetch Home Page from Payload CMS
    const pagesResult = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      limit: 1,
      depth: 2,
    })

    const homePage = pagesResult.docs?.[0] as Page | undefined
    if (homePage?.layout && homePage.layout.length > 0) {
      layout = homePage.layout
    }
  } catch (error) {
    console.warn('Could not fetch home page from CMS, using default layout:', error)
  }

  const hasAboutUs = layout?.some((b) => b.blockType === 'aboutUs' || (b as any).blockType === 'featureSplit')
  const hasPrograms = layout?.some((b) => b.blockType === 'programs')
  const hasFacilities = layout?.some((b) => b.blockType === 'facilities')
  const hasToppers = layout?.some((b) => b.blockType === 'toppers')
  const hasCampusLife = layout?.some((b) => b.blockType === 'campusLife')

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
    </div>
  )
}
