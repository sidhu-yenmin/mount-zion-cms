'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Calendar } from 'lucide-react'
import type { Media } from '@/payload-types'

export interface NewsEventsProps {
  blockType?: string
  badge?: string | null
  heading?: string | null
  viewAllUrl?: string | null
  items?: Array<{
    date: string
    title: string
    image?: number | Media | string | null
    link?: string | null
  }> | null
}

export const NewsEventsBlockComponent: React.FC<Partial<NewsEventsProps>> = ({
  badge = 'HAPPENINGS & NEWS',
  heading = 'Explore Our World-Class Academic Programs',
  viewAllUrl = '/news',
  items = [],
}) => {
  const defaultItems = [
    {
      date: '10TH JAN',
      title: 'Annual Science & Tech Expo 2026 inaugurated by Chief Guests',
      image: '/images/why-mount-zion-classroom.png',
      link: '#',
    },
    {
      date: '25TH JAN',
      title: 'Inter-School Athletics Meet: Mount Zion students clinch 12 Gold Medals',
      image: '/images/hero-student.png',
      link: '#',
    },
    {
      date: '12TH FEB',
      title: 'Robotics Workshop & AI Innovation Challenge for Grades 6 to 10',
      image: '/images/hero-student1.jpg',
      link: '#',
    },
  ]

  const displayItems = items && items.length > 0 ? items : defaultItems

  return (
    <section className="relative w-full bg-slate-50 py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[#03594E] font-bold text-[15px] sm:text-[17px] uppercase tracking-normal select-none">
                {badge || 'HAPPENINGS & NEWS'}
              </span>
              <span className="inline-block w-[36px] h-[2px] bg-[#03594E]" />
            </div>

            <h2 className="text-[#0F172A] font-bold text-[30px] sm:text-[38px] lg:text-[44px] leading-tight select-none">
              {heading}
            </h2>
          </div>

          {viewAllUrl && (
            <div>
              <Link
                href={viewAllUrl}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 font-semibold text-[15px] sm:text-[16px] transition-all duration-200 shadow-xs"
              >
                <span>View All News</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems.map((news, idx) => {
            const rawImg = news.image
            const imgSrc =
              typeof rawImg === 'object' && rawImg?.url
                ? rawImg.url
                : typeof rawImg === 'string' && rawImg
                  ? rawImg
                  : '/images/why-mount-zion-classroom.png'

            return (
              <div
                key={idx}
                className="group relative bg-white rounded-[28px] overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Thumbnail Image */}
                <div className="relative w-full h-[220px] overflow-hidden bg-slate-100">
                  <Image
                    src={imgSrc}
                    alt={news.title}
                    fill
                    unoptimized
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-[#03594E] text-white text-[13px] font-bold shadow-md flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{news.date}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <h3 className="text-[#0F172A] font-bold text-[18px] sm:text-[20px] leading-snug mb-4 group-hover:text-[#03594E] transition-colors">
                    {news.title}
                  </h3>

                  <Link
                    href={news.link || '#'}
                    className="inline-flex items-center gap-2 text-[#03594E] font-bold text-[15px] sm:text-[16px] hover:underline mt-auto"
                  >
                    <span>Read More</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
