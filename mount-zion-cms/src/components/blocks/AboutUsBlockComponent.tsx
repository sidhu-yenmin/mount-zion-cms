'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Media } from '@/payload-types'

function AnimatedStatValue({ value }: { value: string | null | undefined }) {
  const [displayValue, setDisplayValue] = useState<string>('0')
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  const raw = (value || '0').trim()
  const match = raw.match(/^([0-9.,]+)(.*)$/)
  const targetNum = match ? parseFloat(match[1].replace(/,/g, '')) : 0
  const suffix = match ? match[2] : ''

  useEffect(() => {
    if (!ref.current || hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true)
          const duration = 1600
          const startTime = performance.now()

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3)
            const currentNum = Math.round(targetNum * easeOut)

            setDisplayValue(`${currentNum}${suffix}`)

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setDisplayValue(raw)
            }
          }

          requestAnimationFrame(animate)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [targetNum, suffix, raw, hasAnimated])

  return <span ref={ref}>{hasAnimated ? displayValue : '0'}</span>
}

export interface AboutUsProps {
  blockType?: string
  badge?: string | null
  heading?: string | null
  description?: string | null
  buttonText?: string | null
  buttonUrl?: string | null
  imageOne?: number | Media | string | null
  imageTwo?: number | Media | string | null
  floatingBadgeIcon?: number | Media | string | null
  floatingBadgeLine1?: string | null
  floatingBadgeLine2?: string | null
  stat1Value?: string | null
  stat1Label?: string | null
  stat1Icon?: number | Media | string | null
  stat2Value?: string | null
  stat2Label?: string | null
  stat2Icon?: number | Media | string | null
}

export const AboutUsBlockComponent: React.FC<Partial<AboutUsProps>> = ({
  badge = 'WHY MOUNT ZION',
  heading = 'Explore Our World-Class Academic Programs',
  description = 'Mount Zion School dedicated to providing quality learning, research, and innovation. It offers a wide range of undergraduate, graduate, and postgraduate programs designed to prepare students for professional success.',
  buttonText = 'Know More',
  buttonUrl = '#academics',
  imageOne,
  imageTwo,
  floatingBadgeIcon,
  floatingBadgeLine1 = 'UNLOCKING POTENTIALS',
  floatingBadgeLine2 = 'HIGHER EDUCATION',
  stat1Value = '9K',
  stat1Label = 'Students',
  stat1Icon,
  stat2Value = '10',
  stat2Label = 'Experience',
  stat2Icon,
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

  // Resolve Left Student Image (Strict CMS - null if not uploaded)
  const studentImg = resolveMediaUrl(imageOne)

  // Resolve Classroom Activity Image (Strict CMS - null if not uploaded)
  const classroomImg = resolveMediaUrl(imageTwo)

  // Resolve Sunburst Badge Icon (Strict CMS - null if not uploaded)
  const sunIconImg = resolveMediaUrl(floatingBadgeIcon)

  // Resolve Stat 1 Icon (Graduation - Strict CMS - null if not uploaded)
  const graduateIconImg = resolveMediaUrl(stat1Icon)

  // Resolve Stat 2 Icon (Idea / Experience - Strict CMS - null if not uploaded)
  const ideaIconImg = resolveMediaUrl(stat2Icon)

  // Scroll-triggered viewport slide-in / slide-out presentation
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
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-14 sm:py-20 lg:py-24 overflow-hidden"
    >
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 xl:gap-14">
          {/* 1. Left Student Image (Slides in from Left) */}
          <div
            className={`shrink-0 w-full max-w-[361px] lg:w-[361px] h-[400px] sm:h-[456px] rounded-[32px] overflow-hidden shadow-xl border border-slate-100 relative group transition-all duration-700 ease-out ${
              isInView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-14'
            }`}
          >
            <Image
              src={studentImg}
              alt="Mount Zion International School student studying"
              fill
              priority
              unoptimized
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 361px"
            />
          </div>

          {/* 2. Right Content Column */}
          <div className="flex-1 w-full flex flex-col justify-between">
            {/* Top Text Area (Slides in from Right) */}
            <div
              className={`max-w-3xl transition-all duration-700 ease-out delay-150 ${
                isInView
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-14'
              }`}
            >
              {/* Category Tag with Horizontal Line */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#03594E] font-bold text-[16px] sm:text-[18px] uppercase tracking-normal">
                  {badge || 'WHY MOUNT ZION'}
                </span>
                <span className="inline-block w-[38px] h-[2px] bg-[#03594E] shrink-0 transition-all duration-300 hover:w-[54px]" />
              </div>

              {/* Main Heading */}
              <h2 className="text-[#0F172A] font-bold text-[30px] sm:text-[38px] lg:text-[46px] leading-[1.16] lg:leading-[52px] tracking-tight mb-4 select-none">
                {heading}
              </h2>

              {/* Description Paragraph */}
              <p className="text-[#000000] text-[16px] sm:text-[18px] leading-[26px] max-w-2xl mb-7 font-normal">
                {description}
              </p>

              {/* Know More Button */}
              <div>
                <Link
                  href={buttonUrl || '#academics'}
                  className="group inline-flex items-center justify-center gap-2.5 sm:gap-3 min-h-[48px] sm:min-h-[58px] px-7 sm:px-10 rounded-full border border-[#919191] bg-[#FFFFFF] hover:bg-neutral-50 hover:border-[#03594E] text-[#353535] hover:text-[#03594E] font-medium text-[16px] sm:text-[20px] transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>{buttonText}</span>
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2] text-[#353535] group-hover:text-[#03594E] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* Bottom Row: Classroom Card with Overlapping Banner + Stats Counter */}
            <div className="mt-10 sm:mt-12 flex flex-col md:flex-row items-center md:items-end gap-8 sm:gap-10">
              {/* Classroom Image Card with Overlapping Sunburst Banner (Slides in from Bottom) */}
              <div
                className={`relative w-full max-w-[423px] shrink-0 group transition-all duration-700 ease-out delay-300 ${
                  isInView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-14'
                }`}
              >
                {/* Classroom Photo Container with rounded corners & overflow hidden */}
                <div className="relative w-full h-[260px] sm:h-[320px] rounded-[24px] overflow-hidden shadow-lg border border-slate-100 bg-slate-100">
                  {classroomImg ? (
                    <Image
                      src={classroomImg}
                      alt="Classroom students with teacher"
                      fill
                      priority
                      unoptimized
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 423px"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-slate-400 select-none">
                      <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div className="text-center">
                        <p className="text-xs font-semibold text-slate-500">No Image Uploaded</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Upload Image 2 in CMS</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Overlapping Glassmorphic Banner with gentle floating levitation */}
                <div className="absolute left-6 sm:-left-28 md:-left-32 lg:-left-[135px] bottom-6 sm:bottom-20 lg:bottom-[82px] w-[270px] sm:w-[314px] h-[80px] sm:h-[92px] rounded-r-[18.16px] rounded-l-none bg-gradient-to-r from-[#dceee8]/92 via-[#dceee8]/82 via-55% to-[#152a24]/75 backdrop-blur-[30px] border-l-[3.5px] border-l-[#F8C62F] shadow-xl flex items-center pl-12 sm:pl-16 pr-4 z-20 pointer-events-none transition-transform duration-300 group-hover:scale-[1.02] animate-banner-float">
                  {/* Sunburst Icon Centered on Left Yellow Border (92.48px x 92.48px) with continuous slow rotation */}
                  <div className="absolute -left-[38px] sm:-left-[46px] top-0 bottom-0 my-auto w-[76px] sm:w-[92px] h-[76px] sm:h-[92px] flex items-center justify-center pointer-events-none">
                    <div className="w-full h-full animate-sun-spin origin-center flex items-center justify-center">
                      <Image
                        src={sunIconImg}
                        alt="Sunburst icon"
                        width={92}
                        height={92}
                        unoptimized
                        className="w-full h-full object-contain drop-shadow-md"
                      />
                    </div>
                  </div>

                  {/* Banner Text */}
                  <div className="flex flex-col justify-center select-none">
                    <span className="text-[#03594E] font-semibold italic text-[15px] sm:text-[18px] lg:text-[20.82px] leading-[1.2] lg:leading-[28px] tracking-tight whitespace-nowrap">
                      {floatingBadgeLine1 || 'UNLOCKING POTENTIALS'}
                    </span>
                    <span className="text-[#03594E] font-semibold italic text-[15px] sm:text-[18px] lg:text-[20.82px] leading-[1.2] lg:leading-[28px] tracking-tight whitespace-nowrap mt-0.5">
                      {floatingBadgeLine2 || 'HIGHER EDUCATION'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vertical Stats Counter Column (Slides in from Bottom Right) */}
              <div
                className={`flex flex-row md:flex-col justify-between sm:justify-around md:justify-center items-center md:items-start gap-4 sm:gap-8 md:gap-10 shrink-0 w-full md:w-auto pb-2 px-2 sm:px-4 md:px-0 transition-all duration-700 ease-out delay-450 ${
                  isInView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-14'
                }`}
              >
                {/* Stat 1: Students */}
                <div className="group flex items-center gap-2.5 sm:gap-4 md:gap-5 min-w-0 cursor-default">
                  <div className="w-[46px] h-[46px] sm:w-[56px] sm:h-[56px] md:w-[89px] md:h-[89px] shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <Image
                      src={graduateIconImg}
                      alt="Students enrolled"
                      width={89}
                      height={89}
                      unoptimized
                      className="w-full h-full object-contain drop-shadow-sm"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline leading-none select-none">
                      <span className="text-[#0F172A] font-bold italic text-[28px] sm:text-[36px] md:text-[46px] font-['Inter',sans-serif]">
                        <AnimatedStatValue value={stat1Value || '9K'} />
                      </span>
                      <span className="text-[#F8C62F] font-medium text-[32px] sm:text-[40px] md:text-[50px] font-['Inter',sans-serif] ml-1 leading-none">
                        +
                      </span>
                    </div>
                    <div className="text-[#0F172A] font-bold text-[14px] sm:text-[18px] md:text-[24px] mt-0.5 sm:mt-1 select-none whitespace-nowrap">
                      {stat1Label || 'Students'}
                    </div>
                  </div>
                </div>

                {/* Stat 2: Experience */}
                <div className="group flex items-center gap-2.5 sm:gap-4 md:gap-5 min-w-0 cursor-default">
                  <div className="w-[42px] h-[42px] sm:w-[52px] sm:h-[52px] md:w-[83px] md:h-[83px] shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Image
                      src={ideaIconImg}
                      alt="Years of Experience"
                      width={83}
                      height={83}
                      unoptimized
                      className="w-full h-full object-contain drop-shadow-sm"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline leading-none select-none">
                      <span className="text-[#0F172A] font-bold italic text-[28px] sm:text-[36px] md:text-[46px] font-['Inter',sans-serif]">
                        <AnimatedStatValue value={stat2Value || '10'} />
                      </span>
                      <span className="text-[#F8C62F] font-medium text-[32px] sm:text-[40px] md:text-[50px] font-['Inter',sans-serif] ml-1 leading-none">
                        +
                      </span>
                    </div>
                    <div className="text-[#0F172A] font-bold text-[14px] sm:text-[18px] md:text-[24px] mt-0.5 sm:mt-1 select-none whitespace-nowrap">
                      {stat2Label || 'Experience'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

