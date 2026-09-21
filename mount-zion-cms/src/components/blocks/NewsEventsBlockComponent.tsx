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
    fallback: string,
  ): string => {
    if (!media) return fallback
    if (typeof media === 'string' && media.trim()) return media
    if (typeof media === 'object' && media?.url) return media.url
    return fallback
  }

  const displayItems = items && items.length > 0 ? items : defaultItems

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

        {/* 2. Top Divider Line (1120px, 1px solid #B2B2B2) */}
        <div className="w-full border-t border-[#B2B2B2]" />

        {/* 3. News & Events Rows List */}
        <div className="w-full flex flex-col">
          {displayItems.map((item, idx) => {
            const isActive = activeRow === idx
            const imageSrc = resolveMediaUrl(item.image, '/images/news.png')

            return (
              <div
                key={idx}
                onClick={() => setActiveRow(idx)}
                className={`group w-full border-b border-[#B2B2B2] transition-all duration-300 cursor-pointer ${
                  isActive ? 'py-[24px] sm:py-[28px]' : 'py-[18px] sm:py-[22px]'
                }`}
              >
                <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
                  {/* Left: Date */}
                  <div className="w-full md:w-[170px] shrink-0">
                    <p className="font-['Roboto',sans-serif] font-medium text-[18px] leading-[140%] text-black">
                      {item.date}
                    </p>
                  </div>

                  {/* Middle Left: Title */}
                  <div className="w-full md:w-[340px] shrink-0">
                    <h3
                      className={`font-['Roboto',sans-serif] font-bold text-[22px] sm:text-[24px] leading-[135%] whitespace-pre-line transition-colors duration-200 ${
                        isActive ? 'text-[#03594E]' : 'text-black group-hover:text-[#03594E]'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Middle: Preview Image (Displayed based on click on active row) */}
                  <div className="flex-1 w-full flex justify-center items-center">
                    {isActive && (
                      <div className="relative w-full max-w-[320px] sm:max-w-[343px] h-[140px] sm:h-[160px] rounded-[20px] overflow-hidden shadow-sm transition-all duration-300 ease-out">
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

                  {/* Right: Arrow Button (38 x 38px) */}
                  <div className="shrink-0 flex justify-end items-center self-end md:self-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveRow(idx)
                      }}
                      aria-label={`Select ${item.title}`}
                      className={`w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-[#03594E] text-white shadow-sm'
                          : 'border border-[#03594E] bg-transparent text-[#03594E] hover:bg-[#03594E] hover:text-white'
                      }`}
                    >
                      <svg
                        className="w-[14px] h-[14px]"
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
                    </button>
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
