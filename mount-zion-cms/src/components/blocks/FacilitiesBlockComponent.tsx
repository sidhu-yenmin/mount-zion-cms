'use client'

import React, { useState, useEffect, useRef } from 'react'
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

const fallbackTabImages: Record<string, [string, string]> = {
  Classrooms: ['/images/facilities2.png', '/images/facilities1.png'],
  'Self defence': ['/images/gallery2.png', '/images/why-mount-zion-student.png'],
  Swimming: ['/images/gallery1.png', '/images/facilities2.png'],
  'Dance & Music': ['/images/gallery3.png', '/images/gallery4.png'],
  Sports: ['/images/gallery2.png', '/images/facilities1.png'],
  Arts: ['/images/gallery4.png', '/images/why-mount-zion-classroom.png'],
  Fitness: ['/images/facilities1.png', '/images/gallery3.png'],
}

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
  const activeTabRef = useRef<string>(activeTab)
  activeTabRef.current = activeTab

  const containerRef = useRef<HTMLDivElement>(null)
  const isManualClickRef = useRef(false)
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Sync scroll position to active tab (matching Student Success)
  useEffect(() => {
    if (tabNames.length <= 1) return

    const handleScroll = () => {
      if (isManualClickRef.current) return
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight

      if (totalScrollable <= 0) return

      // rect.top <= 0 means top of container has reached top of viewport
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable))

      const numTabs = tabNames.length
      const targetIndex = Math.min(
        Math.floor(progress * numTabs),
        numTabs - 1
      )

      const selectedTab = tabNames[targetIndex]
      if (selectedTab && selectedTab !== activeTabRef.current) {
        activeTabRef.current = selectedTab
        setActiveTab(selectedTab)
      }
    }

    const handleUserInteraction = () => {
      isManualClickRef.current = false
      if (manualTimeoutRef.current) {
        clearTimeout(manualTimeoutRef.current)
        manualTimeoutRef.current = null
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    window.addEventListener('wheel', handleUserInteraction, { passive: true })
    window.addEventListener('touchmove', handleUserInteraction, { passive: true })
    window.addEventListener('keydown', handleUserInteraction, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      window.removeEventListener('wheel', handleUserInteraction)
      window.removeEventListener('touchmove', handleUserInteraction)
      window.removeEventListener('keydown', handleUserInteraction)
      if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current)
    }
  }, [tabNames])

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
    activeTabRef.current = tabName

    const index = tabNames.findIndex((t) => t === tabName)
    if (index !== -1 && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const containerTop = window.scrollY + rect.top
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight

      if (totalScrollable > 0) {
        const numTabs = tabNames.length
        const targetProgress = (index + 0.5) / numTabs
        const targetScroll = containerTop + targetProgress * totalScrollable

        isManualClickRef.current = true
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth',
        })

        if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current)
        manualTimeoutRef.current = setTimeout(() => {
          isManualClickRef.current = false
        }, 500)
      }
    }
  }

  // Find active tab data from CMS if available
  const activeCmsTab = tabs?.find((t) => t.tabName === activeTab)

  // Resolve 2 display images for active tab
  const defaultImages = fallbackTabImages[activeTab] || ['/images/facilities2.png', '/images/facilities1.png']
  let img1Src = defaultImages[0]
  let img2Src = defaultImages[1]

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

  const isSticky = tabNames.length > 1
  const containerHeight = isSticky ? `${100 + (tabNames.length - 1) * 70}vh` : 'auto'

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: containerHeight }}
    >
      <section
        className={`w-full bg-[#f4f6f8] overflow-hidden ${
          isSticky
            ? 'sticky top-0 min-h-screen flex flex-col justify-center'
            : 'relative'
        } py-14 sm:py-20 lg:py-24`}
      >
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
                  onClick={() => handleTabClick(name)}
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
    </div>
  )
}
