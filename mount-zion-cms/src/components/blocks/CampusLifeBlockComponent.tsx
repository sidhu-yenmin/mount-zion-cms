'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'

export interface GalleryImageItem {
  image: number | Media | string
  caption?: string | null
  id?: string | null
}

export interface CampusLifeCtaBar {
  showCtaBar?: boolean | null
  tagline?: string | null
  heading?: string | null
  studentImage?: number | Media | string | null
  buttonText?: string | null
  buttonUrl?: string | null
}

export interface CampusLifeBlockProps {
  blockType?: string
  badge?: string | null
  heading?: string | null
  viewMoreText?: string | null
  viewMoreLink?: string | null
  galleryImages?: GalleryImageItem[] | null
  ctaBar?: CampusLifeCtaBar | null
  backgroundColor?: string | null
  backgroundImage?: number | Media | string | null
}

/* =========================================================================
   [OPTION A: STATIC FALLBACK GALLERY & STUDENT IMAGES - COMMENTED OUT]
   Uncomment below if you want hardcoded demo gallery photos & student cutout:

const defaultGalleryImages = [
  { src: '/images/facilities2.png', alt: 'School Architecture Staircase', ratio: 260 },
  { src: '/images/facilities1.png', alt: 'Students Collaborating in Classroom', ratio: 558 },
  { src: '/images/gallery1.png', alt: 'Student Reading in Library', ratio: 260 },
  { src: '/images/gallery2.png', alt: 'Students in Uniform in Hallway', ratio: 364 },
  { src: '/images/gallery3.png', alt: 'Student Writing with Pencil', ratio: 350 },
  { src: '/images/gallery4.png', alt: 'Modern Classroom Layout', ratio: 364 },
]
========================================================================= */

const defaultRatios = [260, 558, 260, 364, 350, 364]

export const CampusLifeBlockComponent: React.FC<Partial<CampusLifeBlockProps>> = ({
  badge = 'OUR GALLERY',
  heading = 'Empowering Future Leaders Around the World',
  viewMoreText = 'View More',
  viewMoreLink = '/gallery',
  galleryImages,
  ctaBar,
  backgroundColor = '#f4f6f8',
  backgroundImage,
}) => {
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

  // [OPTION B: STRICT CMS - Only load images when uploaded in CMS]
  const deckImages = defaultRatios.map((ratio, idx) => {
    const cmsItem = galleryImages?.[idx]
    const resolvedUrl = resolveMediaUrl(cmsItem?.image)
    const caption = cmsItem?.caption || `Gallery Photo 0${idx + 1}`

    return {
      src: resolvedUrl,
      alt: caption,
      ratio,
    }
  })

  // Row 1 (first 3 images: 260 : 558 : 260)
  const row1 = deckImages.slice(0, 3)
  // Row 2 (next 3 images: 364 : 350 : 364)
  const row2 = deckImages.slice(3, 6)

  // CTA Bar values
  const showCta = ctaBar?.showCtaBar !== false
  const ctaTagline = ctaBar?.tagline || 'Looking for the Right School?'
  const ctaHeading = ctaBar?.heading || "Start Your Child's Journey with Us"
  const ctaButtonText = ctaBar?.buttonText || 'Apply Now'
  const ctaButtonUrl = ctaBar?.buttonUrl || '/admissions'

  // Only show student cutout when uploaded in CMS
  const ctaStudentImg = resolveMediaUrl(ctaBar?.studentImage)

  // Split heading into 2 lines matching the reference design
  const renderHeading = () => {
    if (!heading) return null

    if (heading.includes('\n')) {
      return heading.split('\n').map((line, idx) => (
        <span key={idx} className="block">
          {line}
        </span>
      ))
    }

    if (heading.includes('Around the World')) {
      return (
        <>
          <span className="block">Empowering Future Leaders</span>
          <span className="block">Around the World</span>
        </>
      )
    }

    return heading
  }

  const sectionBgColor = backgroundColor || '#f4f6f8'

  return (
    <section
      className="relative w-full pt-[60px] pb-[80px] overflow-hidden transition-colors duration-300 bg-cover bg-center"
      style={{
        backgroundColor: sectionBgColor,
        backgroundImage: bgImgUrl ? `url(${bgImgUrl})` : undefined,
      }}
    >
      <div className="w-full max-w-[1118px] mx-auto px-4 xl:px-0">
        {/* 1. Header Section */}
        <div className="flex items-center gap-[10px] mb-[12px]">
          <span className="font-['Roboto',sans-serif] font-bold text-[18px] leading-[22px] uppercase text-[#03594E]">
            {badge}
          </span>
          <div className="w-[38px] h-[2px] bg-[#03594E]" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[32px]">
          <h2 className="font-['Roboto',sans-serif] font-bold text-[34px] sm:text-[40px] lg:text-[46px] leading-[1.14] sm:leading-[52px] text-black tracking-normal max-w-[620px]">
            {renderHeading()}
          </h2>

          {viewMoreLink && (
            <Link
              href={viewMoreLink}
              className="inline-flex items-center justify-center gap-[10px] w-[199px] h-[58px] rounded-[100px] border border-[#919191] bg-white text-[#353535] font-['Roboto',sans-serif] font-medium text-[20px] transition-all duration-300 hover:border-black hover:bg-slate-50 hover:shadow-md shrink-0 self-start md:self-end group mb-1 md:mb-0"
            >
              <span>{viewMoreText}</span>
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

        {/* 2. Gallery Bento Deck (2 Rows: 1118px total width on desktop) */}
        <div className="flex flex-col gap-[20px] w-full">
          {/* Row 1: 3 images (260px : 558px : 260px) */}
          <div className="flex flex-col sm:flex-row gap-[20px] w-full">
            {row1.map((item, idx) => (
              <div
                key={`r1-${idx}`}
                style={{ flex: `${item.ratio} 1 0%` }}
                className="relative h-[220px] sm:h-[230px] rounded-[30px] overflow-hidden group shadow-sm bg-slate-100 border border-slate-200/80"
              >
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    unoptimized
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 558px"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4 text-slate-400 select-none">
                    <svg
                      className="w-8 h-8 text-slate-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-xs font-medium text-slate-400 text-center">
                      {item.alt || 'Upload in CMS'}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Row 2: 3 images (364px : 350px : 364px) */}
          <div className="flex flex-col sm:flex-row gap-[20px] w-full">
            {row2.map((item, idx) => (
              <div
                key={`r2-${idx}`}
                style={{ flex: `${item.ratio} 1 0%` }}
                className="relative h-[220px] sm:h-[230px] rounded-[30px] overflow-hidden group shadow-sm bg-slate-100 border border-slate-200/80"
              >
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    unoptimized
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 364px"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4 text-slate-400 select-none">
                    <svg
                      className="w-8 h-8 text-slate-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-xs font-medium text-slate-400 text-center">
                      {item.alt || 'Upload in CMS'}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Gallery CTA Banner (Bottom: 1118 x 191px) */}
        {showCta && (
          <div className={`relative ${ctaStudentImg ? 'mt-[185px]' : 'mt-[60px]'} w-full max-w-[1118px] mx-auto`}>
            {/* Banner Background Container (1118 x 191px) */}
            <div className="relative w-full rounded-[30px] overflow-hidden min-h-[191px] h-auto md:h-[191px] bg-[#03594E] flex flex-col md:flex-row items-center justify-between shadow-lg">
              {/* Background solid image */}
              <div className="absolute inset-0 pointer-events-none">
                <Image
                  src="/images/gallery-cta-bg.png"
                  alt=""
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              {/* Background pattern overlay at 12% opacity */}
              <div className="absolute inset-0 pointer-events-none opacity-12">
                <Image
                  src="/images/gallery-cta-bg-pattern.png"
                  alt=""
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              {/* Text & Button Layout Matching Figma Specs */}
              <div
                className={`relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between px-6 py-8 md:py-0 ${
                  ctaStudentImg ? 'md:pl-[290px]' : 'md:pl-12'
                } md:pr-[69px] gap-6`}
              >
                {/* CTA Headings (Font: Roboto Medium, size 30px, line-height 140%) */}
                <div className="text-center md:text-left">
                  <p className="font-['Roboto',sans-serif] font-medium text-[22px] sm:text-[26px] md:text-[30px] leading-[1.3] md:leading-[140%] text-white">
                    {ctaTagline}
                  </p>
                  <p className="font-['Roboto',sans-serif] font-medium text-[22px] sm:text-[26px] md:text-[30px] leading-[1.3] md:leading-[140%] text-white">
                    {ctaHeading}
                  </p>
                </div>

                {/* Apply Now Button: 199 x 58px, #F8C62F, rounded-full */}
                <Link
                  href={ctaButtonUrl}
                  className="inline-flex items-center justify-center gap-[10px] w-[199px] h-[58px] rounded-[100px] bg-[#F8C62F] border border-[#F8C62F] text-black font-['Roboto',sans-serif] font-medium text-[20px] transition-all duration-300 hover:brightness-105 hover:shadow-lg shrink-0 group"
                >
                  <span>{ctaButtonText}</span>
                  <Image
                    src="/images/know-more-btn-icon.png"
                    alt="Arrow"
                    width={11}
                    height={12}
                    className="w-[11px] h-[12px] object-contain brightness-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </div>

            {/* Floating Student Girl Cutout - ONLY renders when uploaded in CMS */}
            {ctaStudentImg && (
              <div className="hidden md:block absolute bottom-0 left-[54px] w-[215px] h-[294px] pointer-events-none z-20">
                <Image
                  src={ctaStudentImg}
                  alt="Mount Zion Student"
                  width={215}
                  height={294}
                  unoptimized
                  className="w-[215px] h-[294px] object-contain drop-shadow-md"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
