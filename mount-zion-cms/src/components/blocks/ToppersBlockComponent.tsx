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
      {
        studentName: 'Harish Raghav',
        rank: 'CBSE Topper',
        score: '481/500',
        standard: 'IN GRADE 10',
        photo: '/images/topper-student1.png',
      },
      {
        studentName: 'Divya Bharathi',
        rank: 'School Topper',
        score: '480/500',
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
      {
        studentName: 'Vignesh',
        rank: '3rd Rank',
        score: '485/500',
        standard: 'IN GRADE 10',
        photo: '/images/topper-student1.png',
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

  // 1. Scroll-Based Year Selection (Sticky section pinned while scrolling through years)
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

    // Reset manual click lock as soon as user interacts with wheel, trackpad, touch, or keys
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

  // 2. Student Cards Carousel for the Active Year (Supports 2, 3, 4+ students per year)
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

  const [activeStudentIndex, setActiveStudentIndex] = useState<number>(0)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchDelta, setTouchDelta] = useState<number>(0)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(false)

  // Track responsive screen size
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  // Reset student slide to 0 whenever the selected year changes
  useEffect(() => {
    setActiveStudentIndex(0)
  }, [activeYear])

  // On desktop (>=1024px), 2 cards visible at a time: maxSlide = max(0, rankHolders.length - 2)
  // On mobile/tablet (<1024px), 1 card visible at a time: maxSlide = max(0, rankHolders.length - 1)
  const maxSlide = isDesktop
    ? Math.max(0, rankHolders.length - 2)
    : Math.max(0, rankHolders.length - 1)

  // Clamp active student index
  useEffect(() => {
    setActiveStudentIndex((prev) => Math.min(prev, maxSlide))
  }, [maxSlide])

  // Autoplay for student cards carousel within the active year
  useEffect(() => {
    if (isPaused || maxSlide <= 0) return

    const timer = setInterval(() => {
      setActiveStudentIndex((prev) => (prev < maxSlide ? prev + 1 : 0))
    }, 3500)

    return () => clearInterval(timer)
  }, [isPaused, maxSlide, activeYear])

  // Touch & mouse drag swipe gesture handlers
  const handleTouchStart = (clientX: number) => {
    if (maxSlide <= 0) return
    setTouchStart(clientX)
    setTouchDelta(0)
    setIsDragging(true)
  }

  const handleTouchMove = (clientX: number) => {
    if (touchStart === null || maxSlide <= 0) return
    setTouchDelta(clientX - touchStart)
  }

  const handleTouchEnd = () => {
    if (touchStart === null || maxSlide <= 0) return
    const threshold = 40
    if (touchDelta < -threshold) {
      // Swiped left -> Next student
      setActiveStudentIndex((prev) => (prev < maxSlide ? prev + 1 : 0))
    } else if (touchDelta > threshold) {
      // Swiped right -> Previous student
      setActiveStudentIndex((prev) => (prev > 0 ? prev - 1 : maxSlide))
    }
    setTouchStart(null)
    setTouchDelta(0)
    setIsDragging(false)
  }

  const renderScore = (score: string) => {
    if (score && score.includes('/')) {
      const [numerator, denominator] = score.split('/')
      return (
        <div className="h-[44px] sm:h-[48px] flex items-baseline font-['Roboto',sans-serif] text-[#F8C62F] leading-none my-1 sm:my-1.5">
          <span className="text-[48px] sm:text-[56px] lg:text-[64px] font-medium leading-[38px] sm:leading-[40.58px] tracking-normal">
            {numerator}
          </span>
          <span className="text-[18px] sm:text-[20px] font-medium leading-none ml-1">/</span>
          <span className="text-[18px] sm:text-[20px] font-normal leading-none ml-0.5">
            {denominator}
          </span>
        </div>
      )
    }
    return (
      <div className="h-[44px] sm:h-[48px] flex items-baseline font-['Roboto',sans-serif] text-[#F8C62F] text-[48px] sm:text-[56px] lg:text-[64px] font-medium leading-[38px] sm:leading-[40.58px] my-1 sm:my-1.5">
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
            ? 'sticky top-0 min-h-screen flex flex-col justify-center py-5 sm:py-8 lg:py-16'
            : 'relative py-10 sm:py-16 md:py-24'
        } px-4 sm:px-6 lg:px-8`}
        style={{
          backgroundImage: "url('/images/academics-bg-color.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label="Student Success Toppers Section"
      >
        <div className="max-w-[1240px] mx-auto relative z-10 flex flex-col items-center w-full">
          {/* Badge with horizontal lines */}
          <div className="flex items-center justify-center gap-3 mb-2 lg:mb-2.5">
            <div className="w-[30px] lg:w-[38px] h-[2px] bg-white opacity-90" />
            <span className="font-['Roboto',sans-serif] font-bold text-[13px] sm:text-[15px] lg:text-[18px] leading-tight lg:leading-[56px] text-white uppercase tracking-wider text-center select-none">
              {badge || 'STUDENT SUCCESS'}
            </span>
            <div className="w-[30px] lg:w-[38px] h-[2px] bg-white opacity-90" />
          </div>

          {/* Heading */}
          <h2 className="font-['Roboto',sans-serif] font-bold text-[24px] sm:text-[32px] lg:text-[46px] leading-[30px] sm:leading-[40px] lg:leading-[52px] text-white text-center mb-6 sm:mb-7 lg:mb-12 max-w-[700px] select-none">
            {isHeadingDefault ? (
              <>
                Building Bright Minds
                <br className="hidden sm:inline" /> for Tomorrow
              </>
            ) : (
              heading
            )}
          </h2>

          {/* Content Row: Scroll-driven Years on Left, Students Carousel on Right */}
          <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 sm:gap-7 lg:gap-8 xl:gap-10">
            {/* Years Navigation Buttons: 2x2 on mobile, single column locked to 197px on desktop */}
            <div className="flex flex-row flex-wrap lg:flex-col items-center lg:items-start justify-center gap-3 sm:gap-3.5 lg:gap-3 w-full max-w-[390px] lg:max-w-none lg:w-[197px] shrink-0">
              {yearsList.map((item) => {
                const isActive = activeYear === item.year
                return (
                  <button
                    key={item.year}
                    type="button"
                    onClick={() => handleYearClick(item.year)}
                    className={`flex items-center justify-between px-4.5 sm:px-5 lg:px-[25px] py-2 sm:py-2.5 lg:py-[15px] h-[48px] sm:h-[54px] lg:h-[63px] rounded-[16px] lg:rounded-[20px] cursor-pointer transition-all duration-300 shadow-md ${
                      isActive
                        ? 'w-[calc(50%-6px)] sm:w-[calc(50%-7px)] lg:w-[197px] bg-[#F8C62F] text-[#0F172A] shadow-amber-500/20 scale-[1.02]'
                        : 'w-[calc(50%-6px)] sm:w-[calc(50%-7px)] lg:w-[172px] bg-[#FFFFFF] text-[#03594E] hover:bg-slate-50 hover:lg:w-[182px]'
                    }`}
                    aria-pressed={isActive}
                  >
                    <span className="font-['Roboto',sans-serif] font-medium text-[16px] sm:text-[17px] lg:text-[18px] leading-none lg:leading-[33px]">
                      {item.year}
                    </span>
                    <img
                      src={isActive ? '/images/active-arrow.png' : '/images/inactive-arrow.png'}
                      alt="arrow"
                      className="w-4 h-4 lg:w-6 lg:h-6 object-contain flex-shrink-0"
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

            {/* Student Cards Carousel Area: Fixed 864px on desktop to eliminate layout shifts */}
            <div className="flex flex-col items-center w-full max-w-[420px] lg:max-w-[864px] shrink-0">
              {/* Carousel Viewport */}
              <div
                className={`relative w-full overflow-hidden select-none py-1 ${
                  maxSlide > 0 ? 'cursor-grab active:cursor-grabbing' : ''
                }`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => {
                  setIsPaused(false)
                  if (isDragging) handleTouchEnd()
                }}
                onTouchStart={(e) => handleTouchStart(e.touches[0].clientX)}
                onTouchMove={(e) => handleTouchMove(e.touches[0].clientX)}
                onTouchEnd={handleTouchEnd}
                onMouseDown={(e) => handleTouchStart(e.clientX)}
                onMouseMove={(e) => isDragging && handleTouchMove(e.clientX)}
                onMouseUp={handleTouchEnd}
              >
                {/* Sliding Track with smooth CSS transition */}
                <div
                  key={activeYear}
                  className="flex transition-transform duration-500 ease-out will-change-transform animate-in fade-in duration-300"
                  style={{
                    transform: isDesktop
                      ? `translateX(-${activeStudentIndex * 444}px)`
                      : `translateX(-${activeStudentIndex * 100}%)`,
                    gap: isDesktop ? '24px' : undefined,
                  }}
                >
                  {rankHolders.map((student, idx) => {
                    const photoUrl = getPhotoUrl(student.photo, idx)
                    const isCustomPhoto =
                      student.photo &&
                      typeof student.photo === 'object' &&
                      student.photo.url

                    return (
                      <div
                        key={`${activeYear}-${student.studentName}-${idx}`}
                        className={`${
                          isDesktop
                            ? 'w-[420px] flex-shrink-0'
                            : 'w-full flex-shrink-0 flex justify-center px-1'
                        }`}
                      >
                        <div className="w-full sm:w-[420px] h-[280px] sm:h-[291px] rounded-[20px] bg-[#03594E] p-5 sm:p-6 relative overflow-hidden flex justify-between shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 shrink-0">
                          {/* Crisp uniform gold border overlay */}
                          <div className="absolute inset-0 rounded-[20px] border border-[#F8C62F] pointer-events-none z-30" />

                          {/* Left Column Info */}
                          <div className="flex flex-col justify-between z-20 relative h-full w-[170px] sm:w-[195px] flex-shrink-0">
                            <div>
                              {/* Medal Icon */}
                              <img
                                src="/images/star-medal.png"
                                alt="Medal"
                                className="w-[50px] h-[62px] sm:w-[60px] sm:h-[74px] lg:w-[68px] lg:h-[84px] object-contain drop-shadow-md mb-1.5 sm:mb-2"
                              />

                              {/* Rank Label */}
                              <div className="h-[20px] flex items-center font-['Roboto',sans-serif] text-[13px] sm:text-[14px] text-white font-medium tracking-wide">
                                {student.rank || 'HSC Topper'}
                              </div>

                              {/* Score */}
                              {renderScore(student.score || '485/500')}

                              {/* Grade / Standard */}
                              <div className="h-[18px] flex items-center font-['Roboto',sans-serif] font-normal text-[11px] sm:text-[12px] leading-tight uppercase text-white/90 tracking-wide mt-1">
                                {student.standard || 'IN GRADE 10'}
                              </div>

                              {/* Gold Divider Line */}
                              <div className="w-[72px] sm:w-[76px] h-[2px] bg-[#F8C62F] rounded-full my-2.5 sm:my-3" />

                              {/* Student Name */}
                              <div className="min-h-[44px] sm:min-h-[48px] flex items-center font-['Roboto',sans-serif] font-semibold text-[18px] sm:text-[20px] leading-tight text-white tracking-tight">
                                {student.studentName}
                              </div>
                            </div>
                          </div>

                          {/* Right Column: Student Portrait with Laurel Frame */}
                          <div className="absolute right-0 top-0 bottom-0 w-[215px] sm:w-[226px] h-full flex items-end justify-end pointer-events-none select-none overflow-hidden rounded-r-[20px]">
                            {isCustomPhoto && (
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <svg
                                  viewBox="0 0 160 160"
                                  className="w-[125px] h-[125px] sm:w-[140px] sm:h-[140px] opacity-90 text-[#F8C62F]"
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
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Carousel Navigation Controls & Indicators: Displayed when more students exist than visible */}
              {maxSlide > 0 && (
                <div className="flex items-center justify-center gap-3.5 mt-4">
                  {/* Prev Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setActiveStudentIndex((prev) => (prev > 0 ? prev - 1 : maxSlide))
                    }
                    aria-label="Previous student"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer active:scale-95 shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Indicator Pills */}
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: maxSlide + 1 }).map((_, idx) => {
                      const isActive = activeStudentIndex === idx
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveStudentIndex(idx)}
                          aria-label={`Go to slide ${idx + 1}`}
                          className={`h-[5px] rounded-[15px] transition-all duration-300 cursor-pointer ${
                            isActive
                              ? 'w-[28px] sm:w-[34px] bg-[#F8C62F]'
                              : 'w-[12px] bg-white/30 hover:bg-white/60'
                          }`}
                        />
                      )
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setActiveStudentIndex((prev) => (prev < maxSlide ? prev + 1 : 0))
                    }
                    aria-label="Next student"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer active:scale-95 shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
