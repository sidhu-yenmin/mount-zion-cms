'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Media } from '@/payload-types'

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
  // Resolve Left Student Image
  const studentImg =
    typeof imageOne === 'object' && imageOne?.url
      ? imageOne.url
      : typeof imageOne === 'string' && imageOne
        ? imageOne
        : '/images/why-mount-zion-student.png'

  // Resolve Classroom Activity Image
  const classroomImg =
    typeof imageTwo === 'object' && imageTwo?.url
      ? imageTwo.url
      : typeof imageTwo === 'string' && imageTwo
        ? imageTwo
        : '/images/why-mount-zion-classroom.png'

  // Resolve Sunburst Badge Icon
  const sunIconImg =
    typeof floatingBadgeIcon === 'object' && floatingBadgeIcon?.url
      ? floatingBadgeIcon.url
      : typeof floatingBadgeIcon === 'string' && floatingBadgeIcon
        ? floatingBadgeIcon
        : '/images/sun.png'

  // Resolve Stat 1 Icon (Graduation)
  const graduateIconImg =
    typeof stat1Icon === 'object' && stat1Icon?.url
      ? stat1Icon.url
      : typeof stat1Icon === 'string' && stat1Icon
        ? stat1Icon
        : '/images/graduate.png'

  // Resolve Stat 2 Icon (Idea)
  const ideaIconImg =
    typeof stat2Icon === 'object' && stat2Icon?.url
      ? stat2Icon.url
      : typeof stat2Icon === 'string' && stat2Icon
        ? stat2Icon
        : '/images/idea.png'

  return (
    <section className="relative w-full bg-white py-14 sm:py-20 lg:py-24 overflow-hidden">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 xl:gap-14">
          {/* 1. Left Student Image (361 x 456 on Desktop) */}
          <div className="shrink-0 w-full max-w-[361px] lg:w-[361px] h-[400px] sm:h-[456px] rounded-[32px] overflow-hidden shadow-xl border border-slate-100 relative group">
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
            {/* Top Text Area */}
            <div className="max-w-3xl">
              {/* Category Tag with Horizontal Line */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#03594E] font-bold text-[16px] sm:text-[18px] uppercase tracking-normal">
                  {badge || 'WHY MOUNT ZION'}
                </span>
                <span className="inline-block w-[38px] h-[2px] bg-[#03594E] shrink-0" />
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
                  className="inline-flex items-center justify-center gap-3 min-h-[52px] sm:min-h-[58px] px-8 sm:px-10 rounded-full border border-[#919191] bg-[#FFFFFF] hover:bg-neutral-50 text-[#353535] font-medium text-[18px] sm:text-[20px] transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
                >
                  <span>{buttonText}</span>
                  <ArrowUpRight className="w-5 h-5 stroke-[2.2] text-[#353535]" />
                </Link>
              </div>
            </div>

            {/* Bottom Row: Classroom Card with Overlapping Banner + Stats Counter */}
            <div className="mt-10 sm:mt-12 flex flex-col md:flex-row items-center md:items-end gap-8 sm:gap-10">
              {/* Classroom Image Card with Overlapping Sunburst Banner */}
              <div className="relative w-full max-w-[423px] shrink-0 group">
                {/* Classroom Photo Container with rounded corners & overflow hidden */}
                <div className="relative w-full h-[260px] sm:h-[320px] rounded-[24px] overflow-hidden shadow-lg border border-slate-100">
                  <Image
                    src={classroomImg}
                    alt="Classroom students with teacher"
                    fill
                    priority
                    unoptimized
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 423px"
                  />
                </div>

                {/* Overlapping Glassmorphic Banner matching target image exactly */}
                <div className="absolute -left-12 sm:-left-28 md:-left-32 lg:-left-[135px] bottom-16 sm:bottom-20 lg:bottom-[82px] w-[290px] sm:w-[314px] h-[86px] sm:h-[92px] rounded-r-[18.16px] rounded-l-none bg-gradient-to-r from-[#dceee8]/92 via-[#dceee8]/82 via-55% to-[#152a24]/75 backdrop-blur-[30px] border-l-[3.5px] border-l-[#F8C62F] shadow-xl flex items-center pl-14 sm:pl-16 pr-4 z-20 pointer-events-none transition-transform duration-300 group-hover:scale-[1.02]">
                  {/* Sunburst Icon Centered on Left Yellow Border (92.48px x 92.48px) */}
                  <div className="absolute -left-[43px] sm:-left-[46px] top-0 bottom-0 my-auto w-[86px] sm:w-[92px] h-[86px] sm:h-[92px] flex items-center justify-center pointer-events-none">
                    <Image
                      src={sunIconImg}
                      alt="Sunburst icon"
                      width={92}
                      height={92}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Banner Text */}
                  <div className="flex flex-col justify-center select-none">
                    <span className="text-[#03594E] font-semibold italic text-[16px] sm:text-[18px] lg:text-[20.82px] leading-[1.2] lg:leading-[28px] tracking-tight whitespace-nowrap">
                      {floatingBadgeLine1 || 'UNLOCKING POTENTIALS'}
                    </span>
                    <span className="text-[#03594E] font-semibold italic text-[16px] sm:text-[18px] lg:text-[20.82px] leading-[1.2] lg:leading-[28px] tracking-tight whitespace-nowrap mt-0.5">
                      {floatingBadgeLine2 || 'HIGHER EDUCATION'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vertical Stats Counter Column */}
              <div className="flex flex-row md:flex-col justify-around md:justify-center items-start gap-8 sm:gap-10 shrink-0 w-full md:w-auto pb-2">
                {/* Stat 1: Students */}
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-[60px] h-[60px] sm:w-[89px] sm:h-[89px] shrink-0 flex items-center justify-center">
                    <Image
                      src={graduateIconImg}
                      alt="Students enrolled"
                      width={89}
                      height={89}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-baseline leading-none select-none">
                      <span className="text-[#0F172A] font-bold italic text-[36px] sm:text-[46px] font-['Inter',sans-serif]">
                        {stat1Value || '9K'}
                      </span>
                      <span className="text-[#F8C62F] font-medium text-[40px] sm:text-[50px] font-['Inter',sans-serif] ml-1 leading-none">
                        +
                      </span>
                    </div>
                    <div className="text-[#0F172A] font-bold text-[18px] sm:text-[24px] mt-1 select-none">
                      {stat1Label || 'Students'}
                    </div>
                  </div>
                </div>

                {/* Stat 2: Experience */}
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-[56px] h-[56px] sm:w-[83px] sm:h-[83px] shrink-0 flex items-center justify-center">
                    <Image
                      src={ideaIconImg}
                      alt="Years of Experience"
                      width={83}
                      height={83}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-baseline leading-none select-none">
                      <span className="text-[#0F172A] font-bold italic text-[36px] sm:text-[46px] font-['Inter',sans-serif]">
                        {stat2Value || '10'}
                      </span>
                      <span className="text-[#F8C62F] font-medium text-[40px] sm:text-[50px] font-['Inter',sans-serif] ml-1 leading-none">
                        +
                      </span>
                    </div>
                    <div className="text-[#0F172A] font-bold text-[18px] sm:text-[24px] mt-1 select-none">
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
