'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

export interface TestimonialItem {
  cardStyle?: 'green' | 'yellow' | null
  rating?: number | null
  quote: string
  authorName: string
  authorRole: string
  authorPhoto?: number | Media | string | null
  id?: string | null
}

export interface TestimonialsProps {
  blockType?: string
  badge?: string | null
  heading?: string | null
  testimonials?: TestimonialItem[] | null
  backgroundColor?: string | null
  backgroundImage?: number | Media | string | null
}

/* =========================================================================
   [OPTION A: STATIC MOCK TESTIMONIALS DATA - COMMENTED OUT]
   Uncomment below if you want hardcoded demo testimonials & stock avatar photos:

const defaultTestimonials: TestimonialItem[] = [
  {
    cardStyle: 'green',
    rating: 5,
    quote:
      'Preparing students for board examinations, higher education, and future careers through academic excellence, career guidance, innovation, and life skills.',
    authorName: 'M.S. Dhoni',
    authorRole: 'Indian Cricketer',
    authorPhoto: '/images/testimonial3.png',
  },
  {
    cardStyle: 'yellow',
    rating: 5,
    quote:
      'Preparing students for board examinations, higher education, and future careers through academic excellence, career guidance, innovation, and life skills.',
    authorName: 'M.S. Dhoni',
    authorRole: 'Indian Cricketer',
    authorPhoto: '/images/testimonial2.png',
  },
  {
    cardStyle: 'green',
    rating: 5,
    quote:
      'Preparing students for board examinations, higher education, and future careers through academic excellence, career guidance, innovation, and life skills.',
    authorName: 'M.S. Dhoni',
    authorRole: 'Indian Cricketer',
    authorPhoto: '/images/testimonial1.png',
  },
  {
    cardStyle: 'yellow',
    rating: 5,
    quote:
      'The comprehensive curriculum and dedicated faculty have provided an inspiring foundation for our children to excel both academically and in extracurricular leadership.',
    authorName: 'R. Ashwin',
    authorRole: 'Parent & Alumni Supporter',
    authorPhoto: '/images/testimonial2.png',
  },
  {
    cardStyle: 'green',
    rating: 5,
    quote:
      'State-of-the-art facilities combined with personalized mentoring foster true intellectual curiosity and moral character in every student.',
    authorName: 'Dr. K. Radhakrishnan',
    authorRole: 'Parent & Educational Advisor',
    authorPhoto: '/images/testimonial3.png',
  },
]
========================================================================= */

// Clean placeholder structure when no CMS reviews exist
const placeholderTestimonials: TestimonialItem[] = [
  {
    cardStyle: 'green',
    rating: 5,
    quote:
      'Preparing students for board examinations, higher education, and future careers through academic excellence, career guidance, innovation, and life skills.',
    authorName: 'Parent / Reviewer Name',
    authorRole: 'Parent of Grade 10 Student',
    authorPhoto: null,
  },
  {
    cardStyle: 'yellow',
    rating: 5,
    quote:
      'Preparing students for board examinations, higher education, and future careers through academic excellence, career guidance, innovation, and life skills.',
    authorName: 'Parent / Reviewer Name',
    authorRole: 'Parent of Grade 8 Student',
    authorPhoto: null,
  },
  {
    cardStyle: 'green',
    rating: 5,
    quote:
      'Preparing students for board examinations, higher education, and future careers through academic excellence, career guidance, innovation, and life skills.',
    authorName: 'Parent / Reviewer Name',
    authorRole: 'Parent of Grade 12 Student',
    authorPhoto: null,
  },
]

export const TestimonialsBlockComponent: React.FC<Partial<TestimonialsProps>> = ({
  badge = 'TESTIMONIALS',
  heading = 'Building Bright Minds for Tomorrow',
  testimonials = [],
  backgroundColor = '#f4f6f8',
  backgroundImage,
}) => {
  const resolveMediaUrl = (
    media: any,
  ): string | null => {
    if (!media) return null
    if (typeof media === 'string' && media.trim()) return media
    if (typeof media === 'object' && media?.url) return media.url
    return null
  }

  // Use CMS testimonials or fallback to default list
  const displayItems: TestimonialItem[] =
    testimonials && testimonials.length > 0 ? testimonials : placeholderTestimonials

  const [activeSlide, setActiveSlide] = useState<number>(0)
  const [isDesktop, setIsDesktop] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchDelta, setTouchDelta] = useState<number>(0)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [viewportWidth, setViewportWidth] = useState<number>(1140)

  // Track responsive viewport (Desktop >= 1024px displays 3 cards side-by-side)
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
      if (containerRef.current) {
        setViewportWidth(containerRef.current.clientWidth)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    let observer: ResizeObserver | null = null
    if (containerRef.current && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width > 0) {
            setViewportWidth(entry.contentRect.width)
          }
        }
      })
      observer.observe(containerRef.current)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      observer?.disconnect()
    }
  }, [])

  // Calculate maximum slide index based on viewport and total items
  const maxSlide = isDesktop
    ? Math.max(0, displayItems.length - 3)
    : Math.max(0, displayItems.length - 1)

  // Clamp activeSlide within bounds whenever maxSlide changes
  useEffect(() => {
    setActiveSlide((prev) => Math.min(prev, maxSlide))
  }, [maxSlide])

  // Autoplay timer with pause-on-hover / drag
  useEffect(() => {
    if (isPaused || maxSlide <= 0) return

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev < maxSlide ? prev + 1 : 0))
    }, 3000)

    return () => clearInterval(timer)
  }, [isPaused, maxSlide])

  // Touch and drag swipe gesture handlers
  const handleTouchStart = (clientX: number) => {
    setTouchStart(clientX)
    setTouchDelta(0)
    setIsDragging(true)
  }

  const handleTouchMove = (clientX: number) => {
    if (touchStart === null) return
    setTouchDelta(clientX - touchStart)
  }

  const handleTouchEnd = () => {
    if (touchStart === null) return
    const threshold = 40
    if (touchDelta < -threshold) {
      // Swiped left -> Next slide
      setActiveSlide((prev) => (prev < maxSlide ? prev + 1 : 0))
    } else if (touchDelta > threshold) {
      // Swiped right -> Previous slide
      setActiveSlide((prev) => (prev > 0 ? prev - 1 : maxSlide))
    }
    setTouchStart(null)
    setTouchDelta(0)
    setIsDragging(false)
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setActiveSlide((prev) => (prev > 0 ? prev - 1 : maxSlide))
    } else if (e.key === 'ArrowRight') {
      setActiveSlide((prev) => (prev < maxSlide ? prev + 1 : 0))
    }
  }

  // Split heading into 2 lines matching design
  const renderHeading = () => {
    if (!heading) return null

    if (heading.includes('\n')) {
      return heading.split('\n').map((line, idx) => (
        <span key={idx} className="block">
          {line}
        </span>
      ))
    }

    if (heading.includes('Building Bright Minds') || heading.includes('for Tomorrow')) {
      return (
        <>
          <span className="block">Building Bright Minds</span>
          <span className="block">for Tomorrow</span>
        </>
      )
    }

    return heading
  }

  // Number of indicator dots (capped at 3 or matching slides)
  const indicatorCount = Math.max(1, maxSlide + 1)

  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#f4f6f8] pt-[70px] pb-[90px] overflow-hidden select-none scroll-mt-16"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Student and Parent Testimonials"
    >
      <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 xl:px-0">
        {/* 1. Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-[54px]">
          {/* Badge with left and right horizontal lines */}
          <div className="flex items-center justify-center gap-[12px] mb-[12px]">
            <div className="w-[38px] h-[2px] bg-[#03594E]" />
            <span className="font-['Roboto',sans-serif] font-bold text-[18px] leading-[22px] uppercase text-[#03594E]">
              {badge}
            </span>
            <div className="w-[38px] h-[2px] bg-[#03594E]" />
          </div>

          {/* Heading */}
          <h2 className="font-['Roboto',sans-serif] font-bold text-[34px] sm:text-[42px] lg:text-[46px] leading-[1.14] sm:leading-[52px] text-[#000000] tracking-normal">
            {renderHeading()}
          </h2>
        </div>

        {/* 2. Interactive Testimonials Carousel Viewport */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden pt-[36px] pb-[10px] cursor-grab active:cursor-grabbing"
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
          {/* Carousel Track */}
          {(() => {
            const gapWidth = 22
            const desktopCardWidth = Math.max(280, (viewportWidth - gapWidth * 2) / 3)
            const slideOffset = isDesktop
              ? activeSlide * (desktopCardWidth + gapWidth)
              : activeSlide * viewportWidth

            return (
              <div
                className="flex transition-transform duration-500 ease-out will-change-transform"
                style={{
                  transform: isDesktop
                    ? `translateX(-${slideOffset}px)`
                    : `translateX(-${activeSlide * 100}%)`,
                }}
              >
                {displayItems.map((item: TestimonialItem, idx: number) => {
                  const isYellow = item.cardStyle === 'yellow'
                  const avatarSrc = resolveMediaUrl(item.authorPhoto) || '/images/testimonial1.png'
                  const ratingCount = Math.min(Math.max(item.rating || 5, 1), 5)

                  return (
                    <div
                      key={idx}
                      className={`flex-shrink-0 ${
                        isDesktop
                          ? ''
                          : 'w-full flex justify-center px-2 sm:px-4'
                      }`}
                      style={{
                        width: isDesktop ? `${desktopCardWidth}px` : undefined,
                        marginRight: isDesktop && idx < displayItems.length - 1 ? `${gapWidth}px` : undefined,
                      }}
                      aria-hidden={isDesktop ? idx < activeSlide || idx >= activeSlide + 3 : idx !== activeSlide}
                    >
                      <div
                        className={`relative w-full min-h-[251.04px] rounded-[22.17px] p-[28px] pt-[40px] shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md ${
                          isYellow ? 'bg-[#F8C62F] text-black' : 'bg-[#03594E] text-white'
                        }`}
                      >
                    {/* Floating Avatar (63.5 x 63.5px, border 2px solid white, top: -31.75px, left: 38.95px) */}
                    <div className="absolute -top-[31.75px] left-[38.95px] w-[63.5px] h-[63.5px] rounded-full overflow-hidden border-2 border-white shadow-md z-10 bg-white">
                      <Image
                        src={avatarSrc}
                        alt={item.authorName}
                        width={64}
                        height={64}
                        unoptimized
                        className="w-full h-full object-cover object-center pointer-events-none"
                      />
                    </div>

                    {/* Card Body */}
                    <div>
                      {/* Star Ratings */}
                      <div className="flex items-center gap-[4px] mb-[14px]">
                        {Array.from({ length: ratingCount }).map((_, starIdx) => (
                          <svg
                            key={starIdx}
                            className={`w-[13.5px] h-[12.86px] ${
                              isYellow ? 'text-[#03594E] fill-[#03594E]' : 'text-[#F8C62F] fill-[#F8C62F]'
                            }`}
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>

                      {/* Quote Paragraph */}
                      <p
                        className={`font-['Roboto',sans-serif] font-normal text-[14.25px] leading-[20.59px] tracking-normal mb-[20px] ${
                          isYellow ? 'text-black' : 'text-white'
                        }`}
                      >
                        {item.quote}
                      </p>
                    </div>

                    {/* Author Info */}
                    <div>
                      <h4
                        className={`font-['Roboto',sans-serif] font-bold text-[15.84px] leading-[22px] tracking-normal ${
                          isYellow ? 'text-black' : 'text-white'
                        }`}
                      >
                        {item.authorName}
                      </h4>
                      <p
                        className={`font-['Roboto',sans-serif] italic font-normal text-[14.25px] leading-[20.59px] tracking-normal mt-[2px] ${
                          isYellow ? 'text-black' : 'text-white'
                        }`}
                      >
                        {item.authorRole}
                      </p>
                    </div>
                  </div>
                </div>
                )
              })}
            </div>
          )
        })()}
      </div>

        {/* 3. Carousel Indicators (Inactive: 18x6px, Active: 47x6px) */}
        {indicatorCount > 1 && (
          <div
            className="flex items-center justify-center gap-[8px] mt-[44px]"
            role="tablist"
            aria-label="Carousel pagination"
          >
            {Array.from({ length: indicatorCount }).map((_, idx) => {
              const isActive = activeSlide === idx
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to testimonial slide ${idx + 1}`}
                  className={`h-[6px] rounded-[15px] transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-[47px] bg-[#03594E]'
                      : 'w-[18px] bg-[#03594E]/20 hover:bg-[#03594E]/40'
                  }`}
                />
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
