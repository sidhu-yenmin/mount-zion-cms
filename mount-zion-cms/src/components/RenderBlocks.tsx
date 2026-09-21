import React from 'react'
import type { Page } from '@/payload-types'
import { HeroBlockComponent } from './blocks/HeroBlockComponent'
import { AboutUsBlockComponent } from './blocks/AboutUsBlockComponent'
import { ProgramsBlockComponent } from './blocks/ProgramsBlockComponent'
import { FacilitiesBlockComponent } from './blocks/FacilitiesBlockComponent'
import { ToppersBlockComponent } from './blocks/ToppersBlockComponent'
import { CampusLifeBlockComponent } from './blocks/CampusLifeBlockComponent'
import { TestimonialsBlockComponent } from './blocks/TestimonialsBlockComponent'
import { NewsEventsBlockComponent } from './blocks/NewsEventsBlockComponent'
import { CtaBannerBlockComponent } from './blocks/CtaBannerBlockComponent'

type Blocks = NonNullable<Page['layout']>

const componentsMap: Record<string, React.FC<any>> = {
  hero: HeroBlockComponent,
  aboutUs: AboutUsBlockComponent,
  featureSplit: AboutUsBlockComponent,
  programs: ProgramsBlockComponent,
  facilities: FacilitiesBlockComponent,
  toppers: ToppersBlockComponent,
  campusLife: CampusLifeBlockComponent,
  testimonials: TestimonialsBlockComponent,
  newsEvents: NewsEventsBlockComponent,
  ctaBanner: CtaBannerBlockComponent,
}

export const RenderBlocks: React.FC<{ blocks?: Blocks | null }> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <div>
      {blocks.map((block: any, index) => {
        // Skip rendering if admin toggled hideSection
        if (block?.hideSection === true) {
          return null
        }

        const { blockType } = block
        if (blockType && blockType in componentsMap) {
          const Component = componentsMap[blockType]
          return <Component key={index} {...block} />
        }

        return (
          <div key={index} style={{ padding: '2rem', borderBottom: '1px dashed #ccc' }}>
            <p style={{ color: '#888' }}>Block "{blockType}" ready in CMS (Component will be added when styled).</p>
          </div>
        )
      })}
    </div>
  )
}
