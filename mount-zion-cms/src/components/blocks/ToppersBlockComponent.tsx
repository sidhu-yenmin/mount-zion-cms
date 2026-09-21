'use client'

import React, { useState } from 'react'
import type { Media } from '@/payload-types'

export interface RankHolder {
  studentName: string
  rank: string
  score: string
  standard?: string | null
  photo?: any
}

export interface AcademicYearData {
  year: string
  rankHolders?: RankHolder[] | null
}

export interface ToppersBlockProps {
  badge?: string | null
  heading?: string | null
  academicYears?: AcademicYearData[] | null
  blockType?: string
  backgroundColor?: string | null
  backgroundImage?: number | Media | string | null
}

/* =========================================================================
   [OPTION A: STATIC MOCK TOPPERS DATA - COMMENTED OUT]
   Uncomment below if you want hardcoded demo toppers & stock student portraits:

const defaultAcademicYears: AcademicYearData[] = [
  {
    year: '2026',
    rankHolders: [
      {
        studentName: 'Kishorekumar',
        rank: 'HSC Topper',
        score: '485/500',
        standard: 'IN GRADE 10',
        photo: '/images/topper-student1.png',
      },
      {
        studentName: 'Yogalakshmi',
        rank: 'HSC Topper',
        score: '483/500',
        standard: 'IN GRADE 10',
        photo: '/images/topper-student2.png',
      },
    ],
  },
  {
    year: '2025',
    rankHolders: [
      {
        studentName: 'Aadhavan',
        rank: 'CBSE Topper',
        score: '492/500',
        standard: 'IN GRADE 10',
        photo: '/images/topper-student1.png',
      },
      {
        studentName: 'Priya Dharshini',
        rank: 'HSC Topper',
        score: '489/500',
        standard: 'IN GRADE 10',
        photo: '/images/topper-student2.png',
      },
    ],
  },
  {
    year: '2024',
    rankHolders: [
      {
        studentName: 'Sanjay Raman',
        rank: 'School Topper',
        score: '488/500',
        standard: 'IN GRADE 10',
        photo: '/images/topper-student1.png',
      },
      {
        studentName: 'Ananya Mohan',
        rank: '2nd Rank',
        score: '484/500',
        standard: 'IN GRADE 10',
        photo: '/images/topper-student2.png',
      },
    ],
  },
  {
    year: '2023',
    rankHolders: [
      {
        studentName: 'Kavin Kumar',
        rank: '1st Rank',
        score: '490/500',
        standard: 'IN GRADE 10',
        photo: '/images/topper-student1.png',
      },
      {
        studentName: 'Meenakshi',
        rank: '2nd Rank',
        score: '486/500',
        standard: 'IN GRADE 10',
        photo: '/images/topper-student2.png',
      },
    ],
  },
]
========================================================================= */

// Placeholder data structure when no CMS years exist
const placeholderAcademicYears: AcademicYearData[] = [
  {
    year: '2026',
    rankHolders: [
      {
        studentName: 'Topper Student Name',
        rank: 'HSC Topper',
        score: '---/500',
        standard: 'IN GRADE 10',
        photo: null,
      },
      {
        studentName: 'Topper Student Name',
        rank: 'School Topper',
        score: '---/500',
        standard: 'IN GRADE 10',
        photo: null,
      },
    ],
  },
  { year: '2025', rankHolders: [] },
  { year: '2024', rankHolders: [] },
  { year: '2023', rankHolders: [] },
]

export const ToppersBlockComponent: React.FC<ToppersBlockProps> = ({
  badge = 'STUDENT SUCCESS',
  heading = 'Building Bright Minds for Tomorrow',
  academicYears,
  backgroundColor = '#044438',
  backgroundImage,
}) => {
  // Use CMS academic years if available, otherwise use neutral placeholder year buttons
  const hasCmsYears = academicYears && academicYears.length > 0
  const yearsList = hasCmsYears
    ? academicYears.map((y) => ({
        year: y.year,
        rankHolders: y.rankHolders || [],
      }))
    : placeholderAcademicYears

  const [activeYear, setActiveYear] = useState<string>(yearsList[0]?.year || '2026')

  const currentYearData =
    yearsList.find((y) => y.year === activeYear) || yearsList[0]

  const rankHolders =
    currentYearData?.rankHolders && currentYearData.rankHolders.length > 0
      ? currentYearData.rankHolders
      : [
          {
            studentName: 'Topper Student Name',
            rank: 'Topper Rank',
            score: '---/500',
            standard: 'IN GRADE 10',
            photo: null,
          },
          {
            studentName: 'Topper Student Name',
            rank: '2nd Rank',
            score: '---/500',
            standard: 'IN GRADE 10',
            photo: null,
          },
        ]

  const formatScore = (score: string) => {
    if (score && score.includes('/')) {
      const [numerator, denominator] = score.split('/')
      return (
        <div className="flex items-baseline font-['Roboto',sans-serif] text-[#F8C62F] leading-none my-2.5">
          <span className="text-[52px] sm:text-[64px] font-medium leading-[40.58px] tracking-normal">
            {numerator?.trim() || ''}
          </span>
          <span className="text-[20px] font-medium leading-[40.58px] ml-0.5">/</span>
          <span className="text-[20px] font-normal leading-[40.58px] ml-0.5">
            {denominator?.trim() || ''}
          </span>
        </div>
      )
    }
    return (
      <div className="font-['Roboto',sans-serif] text-[#F8C62F] text-[52px] sm:text-[64px] font-medium leading-[40.58px] my-2.5">
        {score}
      </div>
    )
  }

  const getPhotoUrl = (photo: any): string | null => {
    if (typeof photo === 'string' && photo.length > 0) return photo
    if (photo && typeof photo === 'object' && photo.url) return photo.url
    return null
  }

  const bgImgUrl = getPhotoUrl(backgroundImage)

  const isHeadingDefault =
    heading === 'Building Bright Minds for Tomorrow' || !heading

  const sectionBgColor = backgroundColor || '#044438'

  return (
    <section
      className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: sectionBgColor,
        backgroundImage: bgImgUrl ? `url(${bgImgUrl})` : "url('/images/academics-bg-color.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-[1240px] mx-auto relative z-10 flex flex-col items-center">
        {/* Badge with horizontal lines */}
        <div className="flex items-center justify-center gap-3.5 mb-2">
          <div className="w-[38px] h-[2px] bg-white opacity-90" />
          <span className="font-['Roboto',sans-serif] font-bold text-[16px] md:text-[18px] leading-[56px] text-white uppercase tracking-wider text-center">
            {badge || 'STUDENT SUCCESS'}
          </span>
          <div className="w-[38px] h-[2px] bg-white opacity-90" />
        </div>

        {/* Heading */}
        <h2 className="font-['Roboto',sans-serif] font-bold text-[32px] sm:text-[40px] md:text-[46px] leading-[38px] sm:leading-[46px] md:leading-[52px] text-white text-center mb-10 md:mb-14 max-w-[700px]">
          {isHeadingDefault ? (
            <>
              Building Bright Minds
              <br className="hidden sm:inline" /> for Tomorrow
            </>
          ) : (
            heading
          )}
        </h2>

        {/* Content Row: Years Navigation on Left, Student Cards on Right */}
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-8 xl:gap-10">
          {/* Years Navigation Buttons */}
          <div className="flex flex-row flex-wrap lg:flex-col items-center lg:items-start justify-center gap-3 w-full lg:w-auto">
            {yearsList.map((item) => {
              const isActive = activeYear === item.year
              return (
                <button
                  key={item.year}
                  type="button"
                  onClick={() => setActiveYear(item.year)}
                  className={`flex items-center justify-between px-[25px] py-[15px] h-[63px] rounded-[20px] cursor-pointer transition-all duration-300 shadow-md ${
                    isActive
                      ? 'w-[197px] bg-[#F8C62F] text-[#0F172A] shadow-amber-500/20'
                      : 'w-[172px] bg-[#FFFFFF] text-[#03594E] hover:bg-slate-50 hover:w-[182px]'
                  }`}
                  aria-pressed={isActive}
                >
                  <span className="font-['Roboto',sans-serif] font-medium text-[18px] leading-[33px]">
                    {item.year}
                  </span>
                  <img
                    src={isActive ? '/images/active-arrow.png' : '/images/inactive-arrow.png'}
                    alt="arrow"
                    className="w-6 h-6 object-contain flex-shrink-0"
                  />
                </button>
              )
            })}
          </div>

          {/* Student Cards Grid */}
          <div className="flex flex-wrap items-center justify-center gap-6 max-w-[900px]">
            {rankHolders.map((student, idx) => {
              const photoUrl = getPhotoUrl(student.photo)

              return (
                <div
                  key={idx}
                  className="w-full sm:w-[420px] h-[291px] rounded-[20px] border border-[#F8C62F] bg-[#03594E] p-6 relative overflow-hidden flex justify-between shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-[#fcd34d]"
                >
                  {/* Left Column Info */}
                  <div className="flex flex-col justify-between z-20 relative h-full w-[170px] flex-shrink-0">
                    <div>
                      {/* Medal Icon */}
                      <img
                        src="/images/star-medal.png"
                        alt="Medal"
                        className="w-[72px] h-[88.11px] object-contain drop-shadow-md mb-2"
                      />

                      {/* Rank Label */}
                      <div className="font-['Roboto',sans-serif] text-[13px] text-white/95 font-medium tracking-wide">
                        {student.rank || 'Topper Rank'}
                      </div>

                      {/* Score */}
                      {formatScore(student.score || '---/500')}

                      {/* Grade / Standard */}
                      <div className="font-['Roboto',sans-serif] font-normal text-[12px] leading-[13.53px] uppercase text-white tracking-wide">
                        {student.standard || 'IN GRADE 10'}
                      </div>
                    </div>

                    {/* Student Name */}
                    <div className="font-['Roboto',sans-serif] font-semibold text-[18px] sm:text-[20px] leading-[23.67px] text-white truncate">
                      {student.studentName || 'Student Name'}
                    </div>
                  </div>

                  {/* Right Column: Student Portrait or Clean Placeholder */}
                  <div className="absolute right-0 top-0 w-[226px] h-[291px] flex items-end justify-end pointer-events-none overflow-hidden rounded-r-[20px]">
                    {photoUrl ? (
                      /* Custom CMS Student Photo */
                      <img
                        src={photoUrl}
                        alt={student.studentName || 'Topper Student'}
                        className="w-full h-full object-cover object-right-bottom select-none"
                      />
                    ) : (
                      /* Placeholder Student Avatar Box */
                      <div className="w-full h-full flex flex-col items-center justify-center bg-[#024a41]/60 border-l border-[#F8C62F]/30 p-4 text-center select-none">
                        <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#F8C62F]/50 flex items-center justify-center mb-2 bg-[#03594E]">
                          <svg
                            className="w-10 h-10 text-[#F8C62F]/60"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                        <span className="text-[12px] font-medium text-[#F8C62F]/80">
                          Photo Placeholder
                        </span>
                        <span className="text-[10px] text-white/50 mt-0.5">
                          Upload in CMS
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
