'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { resolveLinkUrl } from '@/utils/resolveLink'
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
  button?: any
}

export interface CampusLifeBlockProps {
  blockType?: string
  badge?: string | null
  heading?: string | null
  viewMoreText?: string | null
  viewMoreLink?: string | null
  viewMoreButton?: any
  galleryImages?: GalleryImageItem[] | null
  ctaBar?: CampusLifeCtaBar | null
  backgroundColor?: string | null
  backgroundImage?: number | Media | string | null
}

const defaultGalleryImages = [
  { src: '/images/facilities2.png', alt: 'School Architecture Staircase', category: 'Campus Architecture', ratio: 260 },
  { src: '/images/facilities1.png', alt: 'Students Collaborating in Classroom', category: 'Collaborative Learning', ratio: 558 },
  { src: '/images/gallery1.png', alt: 'Student Reading in Library', category: 'Library & Research', ratio: 260 },
  { src: '/images/gallery2.png', alt: 'Students in Uniform in Hallway', category: 'Student Life', ratio: 364 },
  { src: '/images/gallery3.png', alt: 'Student Writing with Pencil', category: 'Focused Academics', ratio: 350 },
  { src: '/images/gallery4.png', alt: 'Modern Classroom Layout', category: 'Smart Classrooms', ratio: 364 },
]

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
  // 1. Scroll-Triggered Viewport Arrival
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setIsInView(entry.isIntersecting)
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -60px 0px',
      }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

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

  const deckImages = defaultGalleryImages.map((defaultImg, idx) => {
    const cmsItem = galleryImages?.[idx]
    const resolvedUrl = resolveMediaUrl(cmsItem?.image)
    const caption = cmsItem?.caption || defaultImg.alt

    return {
      src: resolvedUrl || defaultImg.src,
      alt: caption,
      category: defaultImg.category,
      ratio: defaultImg.ratio,
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
  const ctaButtonText = ctaBar?.button?.text || ctaBar?.buttonText || 'Apply Now'
  const ctaButtonUrl = resolveLinkUrl(ctaBar?.button || ctaBar?.buttonUrl, '/admissions')

  // Only show student cutout when uploaded in CMS
  const ctaStudentImg = resolveMediaUrl(ctaBar?.studentImage) || '/images/cta-student-girl.png'

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
      ref={sectionRef}
      className="relative w-full bg-[#f4f6f8] pt-[60px] pb-[80px] overflow-hidden"
    >
      <div className="w-full max-w-[1118px] mx-auto px-4 xl:px-0">
        {/* 1. Header Section (Slides Down smoothly on arrival) */}
        <div
          className={`transition-all duration-800 ease-out ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          {/* Badge & Line */}
          <div className="flex items-center gap-[10px] mb-[12px]">
            <span className="font-['Roboto',sans-serif] font-bold text-[18px] leading-[22px] uppercase text-[#03594E]">
              {badge}
            </span>
            <div
              className={`h-[2px] bg-[#03594E] origin-left transition-transform duration-700 delay-150 ${
                isInView ? 'w-[38px] scale-x-100' : 'w-[38px] scale-x-0'
              }`}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[32px]">
            <h2 className="font-['Roboto',sans-serif] font-bold text-[34px] sm:text-[40px] lg:text-[46px] leading-[1.14] sm:leading-[52px] text-black tracking-normal max-w-[620px]">
              {renderHeading()}
            </h2>

            {viewMoreLink && (
              <Link
                href={viewMoreLink}
                className="inline-flex items-center justify-center gap-[10px] w-auto sm:w-[199px] h-[48px] sm:h-[58px] px-6 sm:px-0 rounded-[100px] border border-[#919191] bg-white text-[#353535] font-['Roboto',sans-serif] font-medium text-[16px] sm:text-[20px] transition-all duration-300 hover:border-black hover:bg-slate-50 hover:shadow-md shrink-0 self-start md:self-end group mb-1 md:mb-0 whitespace-nowrap active:scale-95"
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
        </div>

        {/* 2. Gallery Bento Deck (Option 1: Staggered Bento Bloom & Sliding Waves) */}
        <div className="flex flex-col gap-[20px] w-full">
          {/* Row 1: 3 images (260px : 558px : 260px) */}
          <div className="flex flex-col sm:flex-row gap-[20px] w-full">
            {row1.map((item, idx) => {
              // Center card blooms open first (idx === 1), flanks glide inward from sides (idx === 0, 2)
              const isCenter = idx === 1
              const entranceClass = isCenter
                ? `transition-all duration-900 ease-out delay-150 ${
                    isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`
                : idx === 0
                  ? `transition-all duration-900 ease-out delay-300 ${
                      isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                    }`
                  : `transition-all duration-900 ease-out delay-300 ${
                      isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                    }`

              return (
                <div
                  key={`r1-${idx}`}
                  style={{ flex: `${item.ratio} 1 0%` }}
                  className={`relative h-[220px] sm:h-[230px] rounded-[30px] overflow-hidden group shadow-sm bg-slate-200 cursor-pointer ${entranceClass}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    unoptimized
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 558px"
                  />

                  {/* Soft Dark Vignette on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

                  {/* Diagonal Light Shimmer Sheen on Hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-15" />

                  {/* Frosted Category Tag Pill on Hover */}
                  <div className="absolute bottom-4 left-4 z-20 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium text-xs sm:text-sm px-3.5 py-1.5 rounded-full shadow-lg pointer-events-none">
                    {item.category}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Row 2: 3 images (364px : 350px : 364px) - Staggered wave sliding up from bottom */}
          <div className="flex flex-col sm:flex-row gap-[20px] w-full">
            {row2.map((item, idx) => {
              const delays = ['delay-300', 'delay-450', 'delay-600']
              const delayClass = delays[idx] || 'delay-300'

              return (
                <div
                  key={`r2-${idx}`}
                  style={{ flex: `${item.ratio} 1 0%` }}
                  className={`relative h-[220px] sm:h-[230px] rounded-[30px] overflow-hidden group shadow-sm bg-slate-200 cursor-pointer transition-all duration-900 ease-out ${delayClass} ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-14'
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    unoptimized
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 364px"
                  />

                  {/* Soft Dark Vignette on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

                  {/* Diagonal Light Shimmer Sheen on Hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-15" />

                  {/* Frosted Category Tag Pill on Hover */}
                  <div className="absolute bottom-4 left-4 z-20 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium text-xs sm:text-sm px-3.5 py-1.5 rounded-full shadow-lg pointer-events-none">
                    {item.category}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 3. Gallery CTA Admissions Banner (With Pop-Up Student Girl Animation) */}
        {showCta && (
          <div
            className={`relative mt-10 md:mt-[185px] w-full max-w-[1118px] mx-auto transition-all duration-900 ease-out delay-200 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
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

              {/* Text & Button Layout */}
              <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between px-6 py-8 md:py-0 md:pl-[290px] md:pr-[69px] gap-6">
                {/* CTA Headings */}
                <div className="text-center md:text-left">
                  <p className="font-['Roboto',sans-serif] font-medium text-[22px] sm:text-[26px] md:text-[30px] leading-[1.3] md:leading-[140%] text-white">
                    {ctaTagline}
                  </p>
                  <p className="font-['Roboto',sans-serif] font-medium text-[22px] sm:text-[26px] md:text-[30px] leading-[1.3] md:leading-[140%] text-white">
                    {ctaHeading}
                  </p>
                </div>

                {/* Apply Now Button: 199 x 58px, #F8C62F, rounded-full with Sheen & Active Hover */}
                <Link
                  href={ctaButtonUrl}
                  className="relative overflow-hidden inline-flex items-center justify-center gap-[10px] w-auto sm:w-[199px] h-[50px] sm:h-[58px] px-8 sm:px-0 rounded-[100px] bg-[#F8C62F] border border-[#F8C62F] text-black font-['Roboto',sans-serif] font-medium text-[18px] sm:text-[20px] transition-all duration-300 hover:brightness-105 hover:shadow-xl hover:shadow-amber-500/25 hover:-translate-y-0.5 active:scale-95 shrink-0 group whitespace-nowrap"
                >
                  <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none animate-hero-shimmer" />
                  <span className="relative z-10">{ctaButtonText}</span>
                  <Image
                    src="/images/know-more-btn-icon.png"
                    alt="Arrow"
                    width={11}
                    height={12}
                    className="w-[11px] h-[12px] object-contain brightness-0 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </div>

            {/* Floating Student Girl Cutout - Pops up smoothly on scroll arrival, then gently levitates */}
            <div
              className={`hidden md:block absolute bottom-0 left-[54px] w-[215px] h-[294px] pointer-events-none z-20 transition-all duration-1000 ease-out delay-400 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
              }`}
            >
              <div className="w-full h-full animate-banner-float">
                <Image
                  src={ctaStudentImg}
                  alt="Mount Zion Student"
                  width={215}
                  height={294}
                  unoptimized
                  className="w-[215px] h-[294px] object-contain drop-shadow-md"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
