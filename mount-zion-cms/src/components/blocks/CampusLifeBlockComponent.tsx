'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Media } from '@/payload-types'

export interface CampusLifeProps {
  blockType?: string
  badge?: string | null
  heading?: string | null
  viewMoreLink?: string | null
  galleryImages?: Array<{
    image: number | Media | string
    caption?: string | null
  }> | null
  ctaBar?: {
    showCtaBar?: boolean | null
    tagline?: string | null
    heading?: string | null
    studentImage?: number | Media | string | null
    buttonText?: string | null
    buttonUrl?: string | null
  } | null
}

export const CampusLifeBlockComponent: React.FC<Partial<CampusLifeProps>> = ({
  badge = 'LIFE AT MOUNT ZION',
  heading = 'Empowering Future Leaders Around the World',
  viewMoreLink = '/gallery',
  galleryImages = [],
  ctaBar,
}) => {
  // Default fallback images for bento grid
  const defaultImages = [
    { image: '/images/hero-student.png', caption: 'Science Fair & Innovation' },
    { image: '/images/why-mount-zion-classroom.png', caption: 'Interactive Learning' },
    { image: '/images/hero-student1.jpg', caption: 'Sports & Athletics' },
    { image: '/images/why-mount-zion-student.png', caption: 'Arts & Cultural Events' },
  ]

  const displayImages = galleryImages && galleryImages.length > 0 ? galleryImages : defaultImages

  const showCta = ctaBar?.showCtaBar ?? true
  const ctaTagline = ctaBar?.tagline || 'Ready to join High School?'
  const ctaHeading = ctaBar?.heading || "Start Your Child's Journey with Us"
  const ctaButtonText = ctaBar?.buttonText || 'Apply Now ↗'
  const ctaButtonUrl = ctaBar?.buttonUrl || '/admissions'

  return (
    <section className="relative w-full bg-slate-50 py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[#03594E] font-bold text-[15px] sm:text-[17px] uppercase tracking-normal select-none">
                {badge || 'LIFE AT MOUNT ZION'}
              </span>
              <span className="inline-block w-[36px] h-[2px] bg-[#03594E]" />
            </div>

            <h2 className="text-[#0F172A] font-bold text-[30px] sm:text-[38px] lg:text-[44px] leading-tight select-none">
              {heading}
            </h2>
          </div>

          {viewMoreLink && (
            <div>
              <Link
                href={viewMoreLink}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 font-semibold text-[15px] sm:text-[16px] transition-all duration-200 shadow-xs"
              >
                <span>View Full Gallery</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {displayImages.map((item, idx) => {
            const rawImg = item.image
            const imgSrc =
              typeof rawImg === 'object' && rawImg?.url
                ? rawImg.url
                : typeof rawImg === 'string' && rawImg
                  ? rawImg
                  : '/images/hero-student.png'

            return (
              <div
                key={idx}
                className="group relative h-[260px] sm:h-[300px] rounded-[24px] overflow-hidden shadow-md border border-slate-200/80 bg-white"
              >
                <Image
                  src={imgSrc}
                  alt={item.caption || 'Campus Life photo'}
                  fill
                  unoptimized
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
                {item.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <p className="text-white font-medium text-[15px] sm:text-[16px] drop-shadow-sm">
                      {item.caption}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* High School CTA Bar */}
        {showCta && (
          <div className="relative w-full rounded-[30px] bg-gradient-to-r from-[#03594E] to-[#044438] p-8 sm:p-10 lg:p-12 shadow-xl text-white overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-[#F8C62F] font-bold text-[14px] sm:text-[16px] uppercase tracking-wider block mb-2">
                {ctaTagline}
              </span>
              <h3 className="text-white font-bold text-[24px] sm:text-[32px] leading-tight">
                {ctaHeading}
              </h3>
            </div>

            <div>
              <Link
                href={ctaButtonUrl}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#F8C62F] hover:bg-[#eab308] text-[#0F172A] font-bold text-[16px] sm:text-[18px] transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
              >
                <span>{ctaButtonText}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
