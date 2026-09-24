'use client'

import React, { useState } from 'react'
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
  // Carousel active indicator state (default index 2 matching reference screenshot)
  const [activeSlide, setActiveSlide] = useState<number>(2)

  // Helper to extract image URL from CMS upload or string
  const resolveMediaUrl = (
    media: number | Media | string | null | undefined,
  ): string | null => {
    if (!media) return null
    if (typeof media === 'string' && media.trim()) return media
    if (typeof media === 'object' && media?.url) return media.url
    return null
  }

  const bgImgUrl = resolveMediaUrl(backgroundImage)

  // Use CMS testimonials or fallback to clean placeholders
  const hasCmsTestimonials = testimonials && testimonials.length > 0
  const displayItems = hasCmsTestimonials ? testimonials : placeholderTestimonials

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

  const sectionBgColor = backgroundColor || '#f4f6f8'

  return (
    <section
      id="testimonials"
      className="relative w-full pt-[70px] pb-[90px] overflow-hidden transition-colors duration-300 bg-cover bg-center scroll-mt-16"
      style={{
        backgroundColor: sectionBgColor,
        backgroundImage: bgImgUrl ? `url(${bgImgUrl})` : undefined,
      }}
    >
      <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* 2. Testimonials Cards Row (3 Cards on Desktop) */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-y-14 gap-x-[22px] w-full pt-[32px]">
          {displayItems.slice(0, 3).map((item, idx) => {
            const isYellow = item.cardStyle === 'yellow'
            const avatarSrc = resolveMediaUrl(item.authorPhoto)
            const ratingCount = Math.min(Math.max(item.rating || 5, 1), 5)

            return (
              <div
                key={idx}
                className={`relative w-full max-w-[365.27px] min-h-[251.04px] rounded-[22.17px] p-[28px] pt-[40px] shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md ${
                  isYellow ? 'bg-[#F8C62F] text-black' : 'bg-[#03594E] text-white'
                }`}
              >
                {/* Floating Avatar (63.5 x 63.5px, border 2px solid white, top: -31.75px, left: 38.95px) */}
                <div className="absolute -top-[31.75px] left-[38.95px] w-[63.5px] h-[63.5px] rounded-full overflow-hidden border-2 border-white shadow-md z-10 bg-slate-100 flex items-center justify-center">
                  {avatarSrc ? (
                    <Image
                      src={avatarSrc}
                      alt={item.authorName || 'Review Author'}
                      width={64}
                      height={64}
                      unoptimized
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                      <svg
                        className="w-8 h-8 text-slate-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}
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
                    {item.authorName || 'Author Name'}
                  </h4>
                  <p
                    className={`font-['Roboto',sans-serif] italic font-normal text-[14.25px] leading-[20.59px] tracking-normal mt-[2px] ${
                      isYellow ? 'text-black' : 'text-white'
                    }`}
                  >
                    {item.authorRole || 'Designation'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* 3. Carousel Indicators (Inactive: 18x6px, Active: 47x6px) */}
        <div className="flex items-center justify-center gap-[8px] mt-[44px]">
          {[0, 1, 2].map((idx) => {
            const isActive = activeSlide === idx
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-[6px] rounded-[15px] transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-[47px] bg-[#03594E]'
                    : 'w-[18px] bg-[#03594E]/20 hover:bg-[#03594E]/40'
                }`}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
