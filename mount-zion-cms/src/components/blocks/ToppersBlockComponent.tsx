'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Trophy, Award, Star } from 'lucide-react'
import type { Media } from '@/payload-types'

export interface ToppersProps {
  blockType?: string
  badge?: string | null
  heading?: string | null
  academicYears?: Array<{
    year: string
    rankHolders?: Array<{
      studentName: string
      rank: string
      score: string
      standard?: string | null
      photo?: number | Media | string | null
    }> | null
  }> | null
}

export const ToppersBlockComponent: React.FC<Partial<ToppersProps>> = ({
  badge = 'STUDENT SUCCESS',
  heading = 'Building Bright Minds for Tomorrow',
  academicYears = [],
}) => {
  const [activeYearIdx, setActiveYearIdx] = useState(0)

  // Default fallback rank holders if none configured in CMS
  const defaultYears = [
    {
      year: '2024-2025',
      rankHolders: [
        {
          studentName: 'Aadhavan K.',
          rank: '1st Rank',
          score: '492/500',
          standard: '10th Standard CBSE',
          photo: '/images/hero-student.png',
        },
        {
          studentName: 'Sneha R.',
          rank: '2nd Rank',
          score: '488/500',
          standard: '10th Standard CBSE',
          photo: '/images/why-mount-zion-student.png',
        },
        {
          studentName: 'Karthik M.',
          rank: '3rd Rank',
          score: '485/500',
          standard: '10th Standard CBSE',
          photo: '/images/hero-student1.jpg',
        },
      ],
    },
  ]

  const displayYears = academicYears && academicYears.length > 0 ? academicYears : defaultYears
  const currentYear = displayYears[activeYearIdx] || displayYears[0]

  return (
    <section className="relative w-full bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="inline-block w-[36px] h-[2px] bg-[#03594E]" />
            <span className="text-[#03594E] font-bold text-[15px] sm:text-[17px] uppercase tracking-normal select-none">
              {badge || 'STUDENT SUCCESS'}
            </span>
            <span className="inline-block w-[36px] h-[2px] bg-[#03594E]" />
          </div>

          <h2 className="text-[#0F172A] font-bold text-[30px] sm:text-[38px] lg:text-[44px] leading-tight mb-4 select-none">
            {heading}
          </h2>
        </div>

        {/* Year Filter Tabs */}
        {displayYears.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {displayYears.map((yr, idx) => {
              const isActive = idx === activeYearIdx
              return (
                <button
                  key={idx}
                  onClick={() => setActiveYearIdx(idx)}
                  className={`px-6 py-2.5 rounded-full text-[15px] sm:text-[16px] font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#F8C62F] text-[#0F172A] shadow-md'
                      : 'bg-slate-100 text-neutral-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {yr.year}
                </button>
              )
            })}
          </div>
        )}

        {/* Rank Holders Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentYear?.rankHolders?.map((student, idx) => {
            const rawPhoto = student.photo
            const photoSrc =
              typeof rawPhoto === 'object' && rawPhoto?.url
                ? rawPhoto.url
                : typeof rawPhoto === 'string' && rawPhoto
                  ? rawPhoto
                  : '/images/why-mount-zion-student.png'

            return (
              <div
                key={idx}
                className="group relative bg-slate-50 rounded-[28px] p-6 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
              >
                {/* Photo with Gold Ring */}
                <div className="relative w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden border-4 border-[#F8C62F] shadow-lg mb-5 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={photoSrc}
                    alt={student.studentName}
                    fill
                    unoptimized
                    className="object-cover object-center"
                    sizes="150px"
                  />
                </div>

                {/* Badge Tag */}
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#03594E] text-white text-[13px] sm:text-[14px] font-bold shadow-xs mb-3">
                  <Trophy className="w-4 h-4 text-[#F8C62F]" />
                  <span>{student.rank}</span>
                </div>

                {/* Student Name */}
                <h3 className="text-[#0F172A] font-bold text-[20px] sm:text-[22px] mb-1">
                  {student.studentName}
                </h3>

                {/* Standard / Grade */}
                {student.standard && (
                  <p className="text-neutral-500 text-[14px] sm:text-[15px] mb-3">
                    {student.standard}
                  </p>
                )}

                {/* Score Pill */}
                <div className="mt-auto px-5 py-2 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#F8C62F] fill-[#F8C62F]" />
                  <span className="text-[#03594E] font-bold text-[16px] sm:text-[17px]">
                    {student.score}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
