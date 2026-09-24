'use client'

import React from 'react'
import { HeroBlockComponent } from '../blocks/HeroBlockComponent'
import { HeroData } from '@/types/cms'
import { mockHeroData } from '@/data/mockData'

interface HeroSectionProps {
  data?: HeroData
}

export function HeroSection({ data = mockHeroData }: HeroSectionProps) {
  const heading = [data.headingLine1, data.headingLine2, data.headingLine3]
    .filter(Boolean)
    .join('\n')

  return (
    <HeroBlockComponent
      blockType="hero"
      badge={data.tag}
      heading={heading}
      backgroundImage={data.backgroundImage}
      primaryButtonText={data.primaryCtaText}
      primaryButtonUrl={data.primaryCtaLink}
      secondaryButtonText={data.secondaryCtaText}
      secondaryButtonUrl={data.secondaryCtaLink}
      videoUrl={data.videoUrl}
    />
  )
}
