'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Page } from '@/payload-types'

export type FeatureSplitProps = Extract<NonNullable<Page['layout']>[number], { blockType: 'featureSplit' }>

export const FeatureSplitBlockComponent: React.FC<Partial<FeatureSplitProps>> = ({
  buttonUrl = '#academics',
}) => {
  return (
    <section className="relative w-full bg-[#f8fafc] py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-[1142px] mx-auto px-4 sm:px-6">
        {/* Main Section Container matching Figma 1142x729 */}
        <div className="relative w-full mx-auto flex justify-center">
          <div className="relative w-full max-w-[1142px]">
            {/* Exact Figma Exported Why Mount Zion PNG */}
            <Image
              src="/images/why-mount-zion.png"
              alt="Why Mount Zion: Explore Our World-Class Academic Programs"
              width={1142}
              height={729}
              priority
              unoptimized
              className="w-full h-auto object-contain select-none"
            />

            {/* Clickable Hotspot Link for 'Know More ↗' Button */}
            <Link
              href={buttonUrl || '#academics'}
              className="absolute left-[38.5%] top-[42.2%] w-[15.5%] h-[6.8%] rounded-full cursor-pointer transition-transform hover:scale-105 active:scale-95"
              title="Know More About Academic Programs"
            />

            {/* Glassmorphic Badge: "UNLOCKING POTENTIALS / HIGHER EDUCATION" */}
            <div className="absolute left-[20%] sm:left-[22%] md:left-[24%] lg:left-[22%] bottom-[6%] sm:bottom-[7%] lg:bottom-[8%] flex items-center gap-2.5 bg-white/75 backdrop-blur-md border border-white/60 shadow-lg rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 z-20 pointer-events-none transition-transform duration-300 hover:scale-105">
              <div className="shrink-0 text-[#f5a623]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]"
                >
                  <circle cx="12" cy="12" r="3" stroke="currentColor" />
                  <path d="M12 2V5" stroke="currentColor" strokeLinecap="round" />
                  <path d="M12 19V22" stroke="currentColor" strokeLinecap="round" />
                  <path d="M2 12H5" stroke="currentColor" strokeLinecap="round" />
                  <path d="M19 12H22" stroke="currentColor" strokeLinecap="round" />
                  <path d="M4.93 4.93L7.05 7.05" stroke="currentColor" strokeLinecap="round" />
                  <path d="M16.95 16.95L19.07 19.07" stroke="currentColor" strokeLinecap="round" />
                  <path d="M4.93 19.07L7.05 16.95" stroke="currentColor" strokeLinecap="round" />
                  <path d="M16.95 7.05L19.07 4.93" stroke="currentColor" strokeLinecap="round" />
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="text-[#0c4c41] font-extrabold italic tracking-wider text-[10px] sm:text-[11px] lg:text-[12px] leading-tight">
                  UNLOCKING POTENTIALS
                </span>
                <span className="text-[#0c4c41] font-extrabold italic tracking-wider text-[10px] sm:text-[11px] lg:text-[12px] leading-tight mt-0.5">
                  HIGHER EDUCATION
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
