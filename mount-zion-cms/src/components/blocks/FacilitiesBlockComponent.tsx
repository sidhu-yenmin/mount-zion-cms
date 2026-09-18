'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

export interface FacilitiesTabItem {
  tabName: string
  images?:
    | {
        image: number | Media | string
        caption?: string | null
        id?: string | null
      }[]
    | null
  id?: string | null
}

export interface FacilitiesProps {
  blockType?: string
  badge?: string | null
  heading?: string | null
  description?: string | null
  tabs?: FacilitiesTabItem[] | null
}

const fallbackTabs = [
  'Classrooms',
  'Self defence',
  'Swimming',
  'Dance & Music',
  'Sports',
  'Arts',
  'Fitness',
]

export const FacilitiesBlockComponent: React.FC<Partial<FacilitiesProps>> = ({
  badge = 'CAMPUS EXPERIENCE & BEYOND ACADEMICS',
  heading = 'Where Learning, Discovery & Growth Come Together',
  description = 'At our school, every corner of the campus is designed to inspire learning and personal growth. From state-of-the-art classrooms and creative studios to sports facilities and collaborative spaces, students enjoy an environment that nurtures academic excellence alongside creativity, leadership, teamwork, and well-being.',
  tabs,
}) => {
  // Use CMS tabs or fallback list
  const tabNames =
    tabs && tabs.length > 0
      ? tabs.map((t) => t.tabName)
      : fallbackTabs

  const [activeTab, setActiveTab] = useState<string>(tabNames[0] || 'Classrooms')

  // Find active tab data from CMS if available
  const activeCmsTab = tabs?.find((t) => t.tabName === activeTab)

  // Resolve 2 display images for active tab
  let img1Src = '/images/facilities2.png' // modern staircase hallway (540x308)
  let img2Src = '/images/facilities1.png' // students thumbs up (541x308)

  if (activeCmsTab?.images && activeCmsTab.images.length > 0) {
    const firstImg = activeCmsTab.images[0]?.image
    if (typeof firstImg === 'object' && firstImg?.url) {
      img1Src = firstImg.url
    } else if (typeof firstImg === 'string' && firstImg) {
      img1Src = firstImg
    }

    if (activeCmsTab.images.length > 1) {
      const secondImg = activeCmsTab.images[1]?.image
      if (typeof secondImg === 'object' && secondImg?.url) {
        img2Src = secondImg.url
      } else if (typeof secondImg === 'string' && secondImg) {
        img2Src = secondImg
      }
    }
  }

  // Format heading into 3 lines matching screenshot
  const renderHeading = () => {
    if (heading?.includes('\n')) {
      return heading.split('\n').map((line, idx) => (
        <span key={idx} className="block">
          {line}
        </span>
      ))
    }

    if (heading?.includes('Discovery & Growth')) {
      return (
        <>
          <span className="block">Where Learning,</span>
          <span className="block">Discovery &amp; Growth</span>
          <span className="block">Come Together</span>
        </>
      )
    }

    return heading
  }

  return (
    <section className="relative w-full bg-[#f4f6f8] py-14 sm:py-20 lg:py-24 overflow-hidden">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Header Grid: Left Headline & Tag, Right Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-8 sm:mb-10">
          {/* Left Column: Category Tag + 3-Line Heading */}
          <div className="lg:col-span-7">
            {/* Tagline with Horizontal Green Bar */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#03594E] font-bold text-[16px] sm:text-[18px] uppercase tracking-normal select-none">
                {badge}
              </span>
              <span className="inline-block w-[38px] h-[2px] bg-[#03594E] shrink-0" />
            </div>

            {/* Main Headline */}
            <h2 className="text-[#000000] font-bold text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.16] lg:leading-[52px] tracking-tight select-none">
              {renderHeading()}
            </h2>
          </div>

          {/* Right Column: Narrative Description */}
          <div className="lg:col-span-5 lg:pt-4">
            <p className="text-[#000000] text-[16px] sm:text-[18px] leading-[26px] font-normal">
              {description}
            </p>
          </div>
        </div>

        {/* 2. Interactive Facilities Tabs Filter Bar */}
        <div className="flex items-center flex-wrap gap-2.5 sm:gap-3 mb-8 sm:mb-10 select-none">
          {tabNames.map((name) => {
            const isActive = activeTab === name
            return (
              <button
                key={name}
                type="button"
                onClick={() => setActiveTab(name)}
                className={`min-h-[42px] px-6 sm:px-[30px] py-2 rounded-[12px] text-[15px] sm:text-[18px] font-normal transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#03594E] text-[#FFFFFF] shadow-md'
                    : 'bg-[#03594E]/[0.05] hover:bg-[#03594E]/10 text-[#000000] active:scale-95'
                }`}
              >
                {name}
              </button>
            )
          })}
        </div>

        {/* 3. Facilities 2-Images Row (540 x 308 & 541 x 308, Radius: 30px) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Facilities Image 1 (Left - 540 x 308) */}
          <div className="relative w-full h-[260px] sm:h-[308px] rounded-[30px] overflow-hidden shadow-lg border border-slate-200/60 group">
            <Image
              src={img1Src}
              alt="Campus facility area"
              fill
              priority
              unoptimized
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 540px"
            />
          </div>

          {/* Facilities Image 2 (Right - 541 x 308) */}
          <div className="relative w-full h-[260px] sm:h-[308px] rounded-[30px] overflow-hidden shadow-lg border border-slate-200/60 group">
            <Image
              src={img2Src}
              alt="Students enjoying school facilities"
              fill
              priority
              unoptimized
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 541px"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
