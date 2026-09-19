'use client'

import React from 'react'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import type { Media } from '@/payload-types'

export interface TestimonialsProps {
  blockType?: string
  badge?: string | null
  heading?: string | null
  testimonials?: Array<{
    cardStyle?: 'green' | 'yellow' | null
    rating?: number | null
    quote: string
    authorName: string
    authorRole: string
    authorPhoto?: number | Media | string | null
  }> | null
}

export const TestimonialsBlockComponent: React.FC<Partial<TestimonialsProps>> = ({
  badge = 'TESTIMONIALS',
  heading = 'Building Bright Minds for Tomorrow',
  testimonials = [],
}) => {
  // Fallback reviews
  const defaultTestimonials: NonNullable<TestimonialsProps['testimonials']> = [
    {
      cardStyle: 'green',
      rating: 5,
      quote:
        'Mount Zion has provided my daughter with not just strong academics, but the confidence to express herself creatively and take initiative in extracurriculars.',
      authorName: 'Dr. Rajesh Kumar',
      authorRole: 'Parent of Grade 9 Student',
      authorPhoto: '/images/hero-student1.jpg',
    },
    {
      cardStyle: 'yellow',
      rating: 5,
      quote:
        'The teachers genuinely care about every single student. The interactive learning methods make complex subjects easy and fun to grasp.',
      authorName: 'Priya Sundaram',
      authorRole: 'Parent of Grade 6 Student',
      authorPhoto: '/images/why-mount-zion-student.png',
    },
  ]

  const displayTestimonials =
    testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials

  return (
    <section className="relative w-full bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="inline-block w-[36px] h-[2px] bg-[#03594E]" />
            <span className="text-[#03594E] font-bold text-[15px] sm:text-[17px] uppercase tracking-normal select-none">
              {badge || 'TESTIMONIALS'}
            </span>
            <span className="inline-block w-[36px] h-[2px] bg-[#03594E]" />
          </div>

          <h2 className="text-[#0F172A] font-bold text-[30px] sm:text-[38px] lg:text-[44px] leading-tight select-none">
            {heading}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {displayTestimonials.map((item, idx) => {
            const isGreen = item.cardStyle === 'green'
            const rawPhoto = item.authorPhoto
            const photoSrc =
              typeof rawPhoto === 'object' && rawPhoto?.url
                ? rawPhoto.url
                : typeof rawPhoto === 'string' && rawPhoto
                  ? rawPhoto
                  : '/images/why-mount-zion-student.png'

            const ratingCount = item.rating || 5

            return (
              <div
                key={idx}
                className={`relative rounded-[32px] p-8 sm:p-10 shadow-lg flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  isGreen
                    ? 'bg-[#03594E] text-white'
                    : 'bg-[#FEF9C3] text-[#0F172A] border border-amber-200'
                }`}
              >
                <div>
                  {/* Top Quote Icon + Stars */}
                  <div className="flex items-center justify-between mb-6">
                    <Quote
                      className={`w-10 h-10 ${
                        isGreen ? 'text-[#F8C62F]/60' : 'text-[#03594E]/40'
                      }`}
                    />
                    <div className="flex items-center gap-1">
                      {Array.from({ length: ratingCount }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-[#F8C62F] text-[#F8C62F]"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quote Paragraph */}
                  <p
                    className={`text-[17px] sm:text-[19px] leading-relaxed mb-8 italic font-normal ${
                      isGreen ? 'text-white/95' : 'text-neutral-800'
                    }`}
                  >
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-black/10">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                    <Image
                      src={photoSrc}
                      alt={item.authorName}
                      fill
                      unoptimized
                      className="object-cover object-center"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[18px] leading-tight">
                      {item.authorName}
                    </h4>
                    <p
                      className={`text-[14px] mt-0.5 ${
                        isGreen ? 'text-white/75' : 'text-neutral-600'
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
      </div>
    </section>
  )
}
