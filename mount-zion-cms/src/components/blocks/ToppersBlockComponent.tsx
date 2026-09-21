'use client'

import React, { useState, useEffect, useRef } from 'react'
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
}

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

export const ToppersBlockComponent: React.FC<ToppersBlockProps> = ({
  badge = 'STUDENT SUCCESS',
  heading = 'Building Bright Minds for Tomorrow',
  academicYears,
}) => {
  const yearsList =
    academicYears && academicYears.length > 0
      ? academicYears.map((y) => ({
          year: y.year,
          rankHolders:
            y.rankHolders && y.rankHolders.length > 0
              ? y.rankHolders
              : (defaultAcademicYears.find((d) => d.year === y.year)?.rankHolders ??
                defaultAcademicYears[0].rankHolders),
        }))
      : defaultAcademicYears

  const [activeYear, setActiveYear] = useState<string>(yearsList[0]?.year || '2026')
  const activeYearRef = useRef<string>(activeYear)
  activeYearRef.current = activeYear

  const containerRef = useRef<HTMLDivElement>(null)
  const isManualClickRef = useRef(false)
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Sync scroll position to active year
  useEffect(() => {
    if (yearsList.length <= 1) return

    const handleScroll = () => {
      if (isManualClickRef.current) return
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight

      if (totalScrollable <= 0) return

      // rect.top <= 0 means top of container has reached top of viewport
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable))

      const numYears = yearsList.length
      const targetIndex = Math.min(
        Math.floor(progress * numYears),
        numYears - 1
      )

      const selectedYear = yearsList[targetIndex]?.year
      if (selectedYear && selectedYear !== activeYearRef.current) {
        activeYearRef.current = selectedYear
        setActiveYear(selectedYear)
      }
    }

    // Reset manual click lock as soon as user touches the wheel, trackpad, touch, or arrow keys
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
  }, [yearsList])

  const handleYearClick = (year: string) => {
    setActiveYear(year)
    activeYearRef.current = year

    const index = yearsList.findIndex((y) => y.year === year)
    if (index !== -1 && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const containerTop = window.scrollY + rect.top
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight

      if (totalScrollable > 0) {
        const numYears = yearsList.length
        const targetProgress = (index + 0.5) / numYears
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

  const currentYearData =
    yearsList.find((y) => y.year === activeYear) ||
    yearsList[0] ||
    defaultAcademicYears[0]

  const rankHolders = currentYearData?.rankHolders || []

  const renderScore = (score: string) => {
    if (score && score.includes('/')) {
      const parts = score.split('/')
      const numerator = parts[0]?.trim() || ''
      const denominator = parts[1]?.trim() || ''
      return (
        <div className="flex items-baseline font-['Roboto',sans-serif] text-[#F8C62F] leading-none my-2.5">
          <span className="text-[52px] sm:text-[64px] font-medium leading-[40.58px] tracking-normal">
            {numerator}
          </span>
          <span className="text-[20px] font-medium leading-[40.58px] ml-0.5">/</span>
          <span className="text-[20px] font-normal leading-[40.58px] ml-0.5">
            {denominator}
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

  const getPhotoUrl = (photo: any, index: number) => {
    if (typeof photo === 'string' && photo.length > 0) return photo
    if (photo && typeof photo === 'object' && photo.url) return photo.url
    return index % 2 === 0 ? '/images/topper-student1.png' : '/images/topper-student2.png'
  }

  const isHeadingDefault =
    heading === 'Building Bright Minds for Tomorrow' || !heading

  const isSticky = yearsList.length > 1
  const containerHeight = isSticky ? `${100 + (yearsList.length - 1) * 70}vh` : 'auto'

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: containerHeight }}
    >
      <section
        className={`w-full overflow-hidden bg-[#044438] ${
          isSticky
            ? 'sticky top-0 min-h-screen flex flex-col justify-center py-10 md:py-16'
            : 'relative py-16 md:py-24'
        } px-4 sm:px-6 lg:px-8`}
        style={{
          backgroundImage: "url('/images/academics-bg-color.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-[1240px] mx-auto relative z-10 flex flex-col items-center w-full">
          {/* Badge with horizontal lines */}
          <div className="flex items-center justify-center gap-3.5 mb-2">
            <div className="w-[38px] h-[2px] bg-white opacity-90" />
            <span className="font-['Roboto',sans-serif] font-bold text-[16px] md:text-[18px] leading-[56px] text-white uppercase tracking-wider text-center">
              {badge || 'STUDENT SUCCESS'}
            </span>
            <div className="w-[38px] h-[2px] bg-white opacity-90" />
          </div>

          {/* Heading */}
          <h2 className="font-['Roboto',sans-serif] font-bold text-[32px] sm:text-[40px] md:text-[46px] leading-[38px] sm:leading-[46px] md:leading-[52px] text-white text-center mb-8 md:mb-12 max-w-[700px]">
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
            <div className="flex flex-row flex-wrap lg:flex-col items-center lg:items-start justify-center gap-3 w-full lg:w-auto shrink-0">
              {yearsList.map((item) => {
                const isActive = activeYear === item.year
                return (
                  <button
                    key={item.year}
                    type="button"
                    onClick={() => handleYearClick(item.year)}
                    className={`flex items-center justify-between px-[25px] py-[15px] h-[63px] rounded-[20px] cursor-pointer transition-all duration-300 shadow-md ${
                      isActive
                        ? 'w-[197px] bg-[#F8C62F] text-[#0F172A] shadow-amber-500/20 scale-[1.02]'
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

              {isSticky && (
                <div className="hidden lg:flex items-center gap-2 text-white/60 text-xs font-['Roboto',sans-serif] mt-2 pl-1 select-none">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F8C62F] animate-pulse" />
                  <span>Scroll to explore years</span>
                </div>
              )}
            </div>

            {/* Student Cards Grid */}
            <div
              key={activeYear}
              className="flex flex-wrap items-center justify-center gap-6 max-w-[900px] animate-in fade-in-50 zoom-in-95 duration-300"
            >
            {rankHolders.map((student, idx) => {
              const photoUrl = getPhotoUrl(student.photo, idx)
              const isCustomPhoto =
                student.photo &&
                typeof student.photo === 'object' &&
                student.photo.url

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
                        {student.rank || 'HSC Topper'}
                      </div>

                      {/* Score */}
                      {renderScore(student.score || '485/500')}

                      {/* Grade / Standard */}
                      <div className="font-['Roboto',sans-serif] font-normal text-[12px] leading-[13.53px] uppercase text-white tracking-wide">
                        {student.standard || 'IN GRADE 10'}
                      </div>
                    </div>

                    {/* Student Name */}
                    <div className="font-['Roboto',sans-serif] font-semibold text-[20px] leading-[23.67px] text-white truncate">
                      {student.studentName}
                    </div>
                  </div>

                  {/* Right Column: Student Portrait with Laurel Frame */}
                  <div className="absolute right-0 top-0 w-[226px] h-[291px] flex items-end justify-end pointer-events-none overflow-hidden rounded-r-[20px]">
                    {/* If custom CMS photo, render golden laurel wreath SVG background behind portrait */}
                    {isCustomPhoto && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <svg
                          viewBox="0 0 160 160"
                          className="w-[140px] h-[140px] opacity-90 text-[#F8C62F]"
                          fill="currentColor"
                        >
                          <circle cx="80" cy="80" r="56" fill="#03594E" />
                          <circle cx="80" cy="80" r="54" fill="#00796B" opacity="0.4" />
                          <path
                            d="M80,24 C64,24 50,38 48,56 C46,74 54,92 68,104 C64,98 62,90 62,82 C62,64 70,48 80,40 Z"
                            fill="#F8C62F"
                          />
                          <path
                            d="M80,24 C96,24 110,38 112,56 C114,74 106,92 92,104 C96,98 98,90 98,82 C98,64 90,48 80,40 Z"
                            fill="#F8C62F"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Student Image */}
                    <img
                      src={photoUrl}
                      alt={student.studentName}
                      className="w-full h-full object-cover object-right-bottom select-none"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      </section>
    </div>
  )
}
