'use client'

import React from 'react'
import Link from 'next/link'
import type { Media } from '@/payload-types'

export interface CtaBannerProps {
  blockType?: string
  tagline?: string | null
  heading?: string | null
  description?: string | null
  buttonText?: string | null
  buttonUrl?: string | null
  backgroundImage?: number | Media | string | null
}

export const CtaBannerBlockComponent: React.FC<Partial<CtaBannerProps>> = ({
  tagline = 'Start your journey',
  heading = 'Towards a brighter future.',
  description = 'Admissions are now open for the academic year 2026-2027. Apply today to secure a seat.',
  buttonText = 'Get Started ↗',
  buttonUrl = '/admissions',
  backgroundImage,
}) => {
  const bgImgUrl =
    typeof backgroundImage === 'object' && backgroundImage?.url
      ? backgroundImage.url
      : typeof backgroundImage === 'string' && backgroundImage
        ? backgroundImage
        : null

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative w-full rounded-[36px] bg-gradient-to-r from-[#03594E] via-[#044438] to-[#012f27] p-10 sm:p-14 lg:p-20 shadow-2xl text-white overflow-hidden flex flex-col items-center text-center bg-cover bg-center"
          style={
            bgImgUrl
              ? { backgroundImage: `url('${bgImgUrl}')` }
              : { backgroundImage: "url('/images/academics-bg-color.png')" }
          }
        >
          {/* Subtle dark overlay to ensure text contrast */}
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            {tagline && (
              <span className="text-[#F8C62F] font-bold text-[15px] sm:text-[17px] uppercase tracking-wider mb-3">
                {tagline}
              </span>
            )}

            <h2 className="text-white font-bold text-[32px] sm:text-[44px] lg:text-[54px] leading-tight mb-5">
              {heading}
            </h2>

            {description && (
              <p className="text-white/90 text-[16px] sm:text-[19px] leading-relaxed max-w-2xl mb-10">
                {description}
              </p>
            )}

            <div>
              <Link
                href={buttonUrl || '/admissions'}
                className="inline-flex items-center justify-center gap-3 px-10 py-4 sm:py-5 rounded-full bg-[#F8C62F] hover:bg-[#eab308] text-[#0F172A] font-bold text-[17px] sm:text-[19px] transition-all duration-200 shadow-xl hover:shadow-2xl active:scale-95"
              >
                <span>{buttonText}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
