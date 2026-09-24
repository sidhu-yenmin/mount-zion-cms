'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { resolveLinkUrl } from '@/utils/resolveLink'
import type { Media } from '@/payload-types'

export interface ProgramsProps {
  blockType?: string
  badge?: string | null
  heading?: string | null
  description?: string | null
  buttonText?: string | null
  buttonUrl?: string | null
  button?: any
  imageOne?: number | Media | string | null
  mainImage?: number | Media | string | null
  imageTwo?: number | Media | string | null
  secondaryImage?: number | Media | string | null
  backgroundImage?: number | Media | string | null
  bannerText?: string | null
  backgroundColor?: string | null
}

export const ProgramsBlockComponent: React.FC<Partial<ProgramsProps>> = ({
  badge = 'ACADEMIC EXCELLENCE',
  heading = "Shaping Bright Minds for Tomorrow's World",
  description = 'Through a balanced blend of academics, technology, creativity, and values, we inspire students to think independently, solve real-world challenges, and achieve excellence in every stage of their educational journey.',
  buttonText = 'Explore Academics',
  buttonUrl = '#academics',
  imageOne,
  mainImage,
  imageTwo,
  secondaryImage,
  backgroundImage,
  bannerText = 'Learning • Innovation • Achievement',
  backgroundColor = '#044438',
}) => {
  // Scroll-triggered viewport presentation (triggers only after arriving to the screen)
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
        threshold: 0.22,
        rootMargin: '0px 0px -80px 0px',
      }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const resolveMediaUrl = (
    media: any,
  ): string | null => {
    if (!media) return null
    if (typeof media === 'string' && media.trim()) return media
    if (typeof media === 'object' && media?.url) return media.url
    return null
  }

  // Resolve Image 1 (Classroom 591x298)
  const resolvedImg1 = imageOne || mainImage
  const img1Src = resolveMediaUrl(resolvedImg1) || '/images/academics-img1.png'

  // Resolve Image 2 (Tree planting 475x528)
  const resolvedImg2 = imageTwo || secondaryImage
  const img2Src = resolveMediaUrl(resolvedImg2) || '/images/academics-img2.png'

  // Resolve Background Image from CMS
  const bgImgUrl = resolveMediaUrl(backgroundImage)

  const sectionBgColor = backgroundColor || '#044438'

  return (
    <section
      ref={sectionRef}
      id="programs"
      className="relative w-full bg-[#044438] bg-cover bg-center overflow-hidden py-16 sm:py-20 lg:py-24 scroll-mt-16"
      style={bgImgUrl ? { backgroundImage: `url('${bgImgUrl}')` } : { backgroundImage: "url('/images/academics-bg-color.png')" }}
    >
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Header Section (Slides Down into View after arriving) */}
        <div
          className={`text-center max-w-4xl mx-auto mb-12 sm:mb-16 transition-all duration-1000 ease-out ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'
          }`}
        >
          {/* Horizontal lines + Badge */}
          <div className="flex items-center justify-center gap-3.5 mb-4">
            <span
              className={`inline-block w-[38px] h-[2px] bg-white shrink-0 origin-right transition-transform duration-700 delay-200 ${
                isInView ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
            <span className="text-white font-bold text-[16px] sm:text-[18px] uppercase tracking-normal select-none">
              {badge}
            </span>
            <span
              className={`inline-block w-[38px] h-[2px] bg-white shrink-0 origin-left transition-transform duration-700 delay-200 ${
                isInView ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </div>

          {/* Main Heading */}
          <h2 className="text-white font-bold text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.18] lg:leading-[54px] tracking-tight select-none">
            {heading?.includes('\n') ? (
              heading.split('\n').map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))
            ) : (
              heading
            )}
          </h2>
        </div>

        {/* 2. Content Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          {/* Left Column (Image 1 + Description + CTA Button) - Slides DOWN from TOP */}
          <div
            className={`lg:col-span-7 flex flex-col justify-between transition-all duration-1000 ease-out delay-150 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-24'
            }`}
          >
            {/* Academics Image 1 (591 x 298px on desktop, rounded 30px) */}
            <div className="relative w-full max-w-[591px] h-[240px] sm:h-[280px] lg:h-[298px] rounded-[30px] overflow-hidden shadow-2xl border border-white/10 bg-black/20 group">
              {img1Src ? (
                <Image
                  src={img1Src}
                  alt="Academics Program"
                  fill
                  priority
                  unoptimized
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 591px"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-white/50 select-none">
                  <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-white/70">No Image Uploaded</p>
                    <p className="text-[11px] text-white/40 mt-0.5">Upload Image 1 in CMS</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description Paragraph */}
            <p className="text-white text-[16px] sm:text-[18px] leading-[26px] max-w-[560px] font-normal mt-6 sm:mt-8 mb-8 sm:mb-10">
              {description}
            </p>

            {/* Explore Academics Button */}
            <div>
              <Link
                href={buttonUrl || '#academics'}
                className="group inline-flex items-center justify-center gap-3 min-h-[54px] sm:min-h-[58px] px-8 sm:px-10 rounded-full border border-[#919191] bg-white hover:bg-neutral-100 text-[#353535] font-medium text-[17px] sm:text-[18px] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 cursor-pointer select-none"
              >
                <span>{buttonText}</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.2] text-[#353535] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Right Column (Image 2 + Overlapping Sunburst Blurry Banner) - Slides UP from BOTTOM */}
          <div
            className={`lg:col-span-5 flex justify-center lg:justify-end transition-all duration-1000 ease-out delay-150 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
            }`}
          >
            <div className="relative w-full max-w-[475px] group">
              {/* Academics Image 2 (475 x 528px on desktop, rounded 30px) */}
              <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[528px] rounded-[30px] overflow-hidden shadow-2xl border border-white/10 bg-black/20">
                {img2Src ? (
                  <Image
                    src={img2Src}
                    alt="Academics Activity"
                    fill
                    priority
                    unoptimized
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 475px"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-white/50 select-none">
                    <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div className="text-center">
                      <p className="text-xs font-semibold text-white/70">No Image Uploaded</p>
                      <p className="text-[11px] text-white/40 mt-0.5">Upload Image 2 in CMS</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Overlapping Blurry Banner with continuous floating levitation */}
              <div className="absolute left-6 sm:-left-20 md:-left-24 lg:-left-[140px] bottom-6 sm:bottom-10 w-[260px] sm:w-[375px] max-w-[calc(100vw-3rem)] h-[58px] sm:h-[70px] rounded-r-[18.16px] rounded-l-none bg-gradient-to-r from-white/[0.14] via-white/[0.10] to-white/[0.04] backdrop-blur-[7px] border-l-[3.5px] border-l-[#F8C62F] shadow-2xl flex items-center pl-10 sm:pl-16 pr-3 sm:pr-4 z-20 pointer-events-none transition-transform duration-300 group-hover:scale-[1.02] animate-banner-float">
                {/* Sunburst Icon Centered on Left Yellow Border with continuous smooth rotation */}
                <div className="absolute -left-[30px] sm:-left-[46px] top-0 bottom-0 my-auto w-[60px] sm:w-[92px] h-[60px] sm:h-[92px] flex items-center justify-center pointer-events-none">
                  <div className="w-full h-full animate-sun-spin origin-center flex items-center justify-center">
                    <Image
                      src="/images/sun.png"
                      alt="Sunburst icon"
                      width={92}
                      height={92}
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </div>
                </div>

                {/* Banner Text */}
                <span className="text-white font-semibold italic text-[12px] sm:text-[17px] lg:text-[20.82px] leading-tight lg:leading-[30.07px] tracking-tight whitespace-nowrap select-none">
                  {bannerText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

