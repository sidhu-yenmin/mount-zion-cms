'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Media } from '@/payload-types'

export interface ProgramsProps {
  blockType?: string
  badge?: string | null
  heading?: string | null
  description?: string | null
  buttonText?: string | null
  buttonUrl?: string | null
  imageOne?: number | Media | string | null
  mainImage?: number | Media | string | null
  imageTwo?: number | Media | string | null
  secondaryImage?: number | Media | string | null
  bannerText?: string | null
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
  bannerText = 'Learning • Innovation • Achievement',
}) => {
  // Resolve Image 1 (Classroom 591x298)
  const resolvedImg1 = imageOne || mainImage
  const img1Src =
    typeof resolvedImg1 === 'object' && resolvedImg1?.url
      ? resolvedImg1.url
      : typeof resolvedImg1 === 'string' && resolvedImg1
        ? resolvedImg1
        : '/images/academics-img1.png'

  // Resolve Image 2 (Tree planting 475x528)
  const resolvedImg2 = imageTwo || secondaryImage
  const img2Src =
    typeof resolvedImg2 === 'object' && resolvedImg2?.url
      ? resolvedImg2.url
      : typeof resolvedImg2 === 'string' && resolvedImg2
        ? resolvedImg2
        : '/images/academics-img2.png'

  return (
    <section
      className="relative w-full bg-[#044438] bg-cover bg-center overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{ backgroundImage: "url('/images/academics-bg-color.png')" }}
    >
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          {/* Horizontal lines + Badge */}
          <div className="flex items-center justify-center gap-3.5 mb-4">
            <span className="inline-block w-[38px] h-[2px] bg-white shrink-0" />
            <span className="text-white font-bold text-[16px] sm:text-[18px] uppercase tracking-normal select-none">
              {badge}
            </span>
            <span className="inline-block w-[38px] h-[2px] bg-white shrink-0" />
          </div>

          {/* Main Heading */}
          <h2 className="text-white font-bold text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.18] lg:leading-[54px] tracking-tight select-none">
            {heading?.includes("Tomorrow's World") ? (
              <>
                <span className="block">{heading.replace("Tomorrow's World", '').trim()}</span>
                <span className="block">Tomorrow&apos;s World</span>
              </>
            ) : heading?.includes('\n') ? (
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
          {/* Left Column (Image 1 + Description + CTA Button) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Academics Image 1 (591 x 298px on desktop, rounded 30px) */}
            <div className="relative w-full max-w-[591px] h-[240px] sm:h-[280px] lg:h-[298px] rounded-[30px] overflow-hidden shadow-2xl border border-white/10 group">
              <Image
                src={img1Src}
                alt="Students in classroom learning chemical reactions"
                fill
                priority
                unoptimized
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 591px"
              />
            </div>

            {/* Description Paragraph */}
            <p className="text-white text-[16px] sm:text-[18px] leading-[26px] max-w-[560px] font-normal mt-6 sm:mt-8 mb-8 sm:mb-10">
              {description}
            </p>

            {/* Explore Academics Button */}
            <div>
              <Link
                href={buttonUrl || '#academics'}
                className="inline-flex items-center justify-center gap-3 min-h-[54px] sm:min-h-[58px] px-8 sm:px-10 rounded-full border border-[#919191] bg-white hover:bg-neutral-100 text-[#353535] font-medium text-[17px] sm:text-[18px] transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer select-none"
              >
                <span>{buttonText}</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.2] text-[#353535]" />
              </Link>
            </div>
          </div>

          {/* Right Column (Image 2 + Overlapping Sunburst Blurry Banner) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[475px] group">
              {/* Academics Image 2 (475 x 528px on desktop, rounded 30px) */}
              <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[528px] rounded-[30px] overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src={img2Src}
                  alt="Students planting a tree together outdoors"
                  fill
                  priority
                  unoptimized
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 475px"
                />
              </div>

              {/* Overlapping Blurry Banner (Learning • Innovation • Achievement) */}
              <div className="absolute -left-6 sm:-left-20 md:-left-24 lg:-left-[140px] bottom-6 sm:bottom-10 w-[290px] sm:w-[375px] h-[62px] sm:h-[70px] rounded-r-[18.16px] rounded-l-none bg-gradient-to-r from-white/[0.14] via-white/[0.10] to-white/[0.04] backdrop-blur-[7px] border-l-[3.5px] border-l-[#F8C62F] shadow-2xl flex items-center pl-12 sm:pl-16 pr-4 z-20 pointer-events-none transition-transform duration-300 group-hover:scale-[1.02]">
                {/* Sunburst Icon Centered on Left Yellow Border */}
                <div className="absolute -left-[35px] sm:-left-[46px] top-0 bottom-0 my-auto w-[70px] sm:w-[92px] h-[70px] sm:h-[92px] flex items-center justify-center pointer-events-none">
                  <Image
                    src="/images/sun.png"
                    alt="Sunburst icon"
                    width={92}
                    height={92}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Banner Text */}
                <span className="text-white font-semibold italic text-[14px] sm:text-[17px] lg:text-[20.82px] leading-tight lg:leading-[30.07px] tracking-tight whitespace-nowrap select-none">
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
