'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'

export interface NewsEventItem {
  date: string
  title: string
  image?: number | Media | string | null
  link?: string | null
  id?: string | null
}

export interface NewsEventsProps {
  blockType?: string
  badge?: string | null
  heading?: string | null
  exploreMoreText?: string | null
  viewAllUrl?: string | null
  items?: NewsEventItem[] | null
}

/* =========================================================================
   [OPTION A: STATIC FALLBACK NEWS & EVENTS DATA - COMMENTED OUT]
   Uncomment below if you want hardcoded demo events & stock news photos:

const defaultItems: NewsEventItem[] = [
  {
    date: '13 Mar 2026',
    title: 'Explore Our World-Class\nAcademic Programs',
    image: '/images/news.png',
    link: '#',
  },
  {
    date: '17 Apr 2026',
    title: 'Discover the New Academic Programs',
    image: '/images/news.png',
    link: '#',
  },
  {
    date: '09 Jun 2026',
    title: 'New Academic Fees Structures',
    image: '/images/news.png',
    link: '#',
  },
]
========================================================================= */

// Clean placeholder structure when no CMS news/events exist
const placeholderItems: NewsEventItem[] = [
  {
    date: 'Date Placeholder',
    title: 'News & Event Title Placeholder',
    image: null,
    link: '#',
  },
  {
    date: 'Date Placeholder',
    title: 'Academic Event Title Placeholder',
    image: null,
    link: '#',
  },
  {
    date: 'Date Placeholder',
    title: 'School Announcement Title Placeholder',
    image: null,
    link: '#',
  },
]

export const NewsEventsBlockComponent: React.FC<Partial<NewsEventsProps>> = ({
  badge = 'OUR EVENTS & NEWS',
  heading = 'Explore Our World-Class Academic Programs',
  exploreMoreText = 'Explore More',
  viewAllUrl = '/news',
  items,
}) => {
  // Track active row placed on click (default to index 0 matching reference design)
  const [activeRow, setActiveRow] = useState<number>(0)

  // Helper to extract image URL from CMS upload or string
  const resolveMediaUrl = (
    media: number | Media | string | null | undefined,
  ): string | null => {
    if (!media) return null
    if (typeof media === 'string' && media.trim()) return media
    if (typeof media === 'object' && media?.url) return media.url
    return null
  }

  const hasCmsItems = items && items.length > 0
  const displayItems = hasCmsItems ? items : placeholderItems

  // Split heading into 2 lines matching screenshot
  const renderHeading = () => {
    if (!heading) return null

    if (heading.includes('\n')) {
      return heading.split('\n').map((line, idx) => (
        <span key={idx} className="block">
          {line}
        </span>
      ))
    }

    if (heading.includes('Academic Programs')) {
      return (
        <>
          <span className="block">Explore Our World-Class</span>
          <span className="block">Academic Programs</span>
        </>
      )
    }

    return heading
  }

  return (
    <section className="relative w-full bg-[#f4f6f8] pt-[50px] pb-[70px] overflow-hidden">
      <div className="w-full max-w-[1120px] mx-auto px-4 xl:px-0">
        {/* 1. Header Section */}
        <div className="flex items-center gap-[10px] mb-[10px]">
          <span className="font-['Roboto',sans-serif] font-bold text-[18px] leading-[22px] uppercase text-[#03594E]">
            {badge}
          </span>
          <div className="w-[38px] h-[2px] bg-[#03594E]" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[28px]">
          <h2 className="font-['Roboto',sans-serif] font-bold text-[34px] sm:text-[40px] lg:text-[46px] leading-[1.14] sm:leading-[52px] text-black tracking-normal max-w-[640px]">
            {renderHeading()}
          </h2>

          {viewAllUrl && (
            <Link
              href={viewAllUrl}
              className="inline-flex items-center justify-center gap-[10px] w-auto sm:w-[233px] h-[48px] sm:h-[58px] px-6 sm:px-0 rounded-[100px] border border-[#919191] bg-white text-[#353535] font-['Roboto',sans-serif] font-medium text-[16px] sm:text-[20px] transition-all duration-300 hover:border-black hover:bg-slate-50 hover:shadow-md shrink-0 self-start md:self-end group mb-1 md:mb-0 whitespace-nowrap"
            >
              <span>{exploreMoreText}</span>
              <Image
                src="/images/know-more-btn-icon.png"
                alt="Arrow"
                width={11}
                height={12}
                className="w-[11px] h-[12px] object-contain transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          )}
        </div>

        {/* 2. Top Divider Line (1120px, 1px solid #B2B2B2, Desktop only) */}
        <div className="hidden md:block w-full border-t border-[#B2B2B2]" />

        {/* 3. News & Events Rows List */}
        <div className="w-full flex flex-col py-2 md:min-h-[460px]">
          {displayItems.map((item, idx) => {
            const isActive = activeRow === idx
            const imageSrc = resolveMediaUrl(item.image)

            const arrowButton = (
              <div
                className={`w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                  isActive
                    ? 'bg-[#03594E] text-white shadow-sm'
                    : 'border border-[#03594E] bg-transparent text-[#03594E] group-hover:bg-[#03594E] group-hover:text-white'
                }`}
              >
                <svg
                  className="w-[13px] h-[13px] sm:w-[14px] sm:h-[14px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            )

            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveRow(idx)}
                onClick={() => setActiveRow(idx)}
                onFocus={() => setActiveRow(idx)}
                tabIndex={0}
                className={`group w-full transition-[background-color,border-color,box-shadow] duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#03594E]/[0.06] border border-[#03594E]/20 shadow-sm rounded-[16px] md:rounded-[20px] p-4 sm:p-5 md:px-6 lg:px-8 md:py-[18px] mb-3 md:mb-1'
                    : 'bg-white/70 md:bg-transparent border border-black/[0.08] md:border md:border-b-[#B2B2B2]/60 md:border-t-transparent md:border-x-transparent rounded-[16px] md:rounded-none hover:bg-white md:hover:bg-[#03594E]/[0.025] p-4 sm:p-5 md:px-6 lg:px-8 md:py-[18px] mb-3 md:mb-1'
                }`}
              >
                {/* Mobile View (< md) */}
                <div className="flex flex-col w-full md:hidden">
                  {/* Top Bar: Date & Arrow */}
                  <div className="flex items-center justify-between w-full">
                    <p className="font-['Roboto',sans-serif] font-medium text-[15px] leading-[140%] text-neutral-600">
                      {item.date}
                    </p>
                    {arrowButton}
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-['Roboto',sans-serif] font-bold text-[19px] sm:text-[21px] leading-[135%] whitespace-pre-line mt-2 transition-colors duration-200 ${
                      isActive ? 'text-[#03594E]' : 'text-black'
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Preview Image (Mobile - Smooth Accordion without fixed height) */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateRows: isActive ? '1fr' : '0fr',
                      opacity: isActive ? 1 : 0,
                      transition:
                        'grid-template-rows 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms ease',
                    }}
                    className="w-full"
                  >
                    <div className="overflow-hidden min-h-0">
                      <div className="relative w-full h-[160px] sm:h-[180px] rounded-[14px] overflow-hidden mt-3 shadow-sm">
                        <Image
                          src={imageSrc}
                          alt={item.title.replace('\n', ' ')}
                          fill
                          unoptimized
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 100vw, 343px"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop View (md+) */}
                <div className="hidden md:flex w-full flex-row items-center justify-between gap-6">
                  {/* Left: Date */}
                  <div className="w-[170px] shrink-0">
                    <p className="font-['Roboto',sans-serif] font-medium text-[18px] leading-[140%] text-black">
                      {item.date}
                    </p>
                  </div>

                  {/* Middle Left: Title (Standardized height to guarantee identical row geometry) */}
                  <div className="w-[340px] shrink-0 min-h-[65px] flex items-center">
                    <h3
                      className={`font-['Roboto',sans-serif] font-bold text-[22px] sm:text-[24px] leading-[135%] whitespace-pre-line transition-colors duration-200 ${
                        isActive ? 'text-[#03594E]' : 'text-black group-hover:text-[#03594E]'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Middle: Preview Image (Active only, zero empty space on inactive) */}
                  <div className="flex-1 w-full flex justify-center items-center">
                    {isActive && (
                      <div className="relative w-full max-w-[343px] h-[140px] lg:h-[150px] rounded-[20px] overflow-hidden shadow-sm animate-in fade-in-50 zoom-in-95 duration-200">
                        <Image
                          src={imageSrc}
                          alt={item.title.replace('\n', ' ')}
                          fill
                          unoptimized
                          className="object-cover object-center"
                          sizes="343px"
                        />
                      </div>
                    )}
                  </div>

                  {/* Right: Arrow Button */}
                  <div className="shrink-0 flex justify-end items-center">
                    {arrowButton}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
