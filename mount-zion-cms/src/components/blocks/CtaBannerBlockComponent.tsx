'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { resolveLinkUrl } from '@/utils/resolveLink'
import type { Media } from '@/payload-types'

export interface CtaBannerProps {
  blockType?: string
  tagline?: string | null
  heading?: string | null
  description?: string | null
  buttonText?: string | null
  buttonUrl?: string | null
  button?: any
  backgroundImage?: number | Media | string | null
  backgroundColor?: string | null
}

export const CtaBannerBlockComponent: React.FC<Partial<CtaBannerProps>> = (props) => {
  const {
    tagline = 'Start your journey',
    heading = 'Towards a brighter future.',
    description = 'Give your child the right foundation to learn, grow, and achieve their dreams in a nurturing and inspiring environment.',
    backgroundImage,
    backgroundColor = '#03594E',
    button,
  } = props

  const resolvedButtonText = button?.text || props.buttonText || 'Get Started'
  const resolvedButtonUrl = resolveLinkUrl(button || props.buttonUrl, '/admissions')
  const openInNewTab = Boolean(button?.openInNewTab)
  const resolveMediaUrl = (
    media: any,
  ): string | null => {
    if (!media) return null
    if (typeof media === 'string' && media.trim()) return media
    if (typeof media === 'object') {
      if (media.url) return media.url
      if (media.filename) return `/media/${media.filename}`
    }
    return null
  }

  // [OPTION B: STRICT CMS - Only load background image when uploaded in CMS]
  const bgImgUrl = resolveMediaUrl(backgroundImage)
  const bannerBgColor = backgroundColor || '#03594E'

  return (
    <section id="contact" className="relative w-full overflow-visible pt-16 sm:pt-20 lg:pt-[84px] scroll-mt-16">
      {/* Background Split: Top half matches light page background, bottom half matches banner background color */}
      {/* 84px (top padding) + 186px (half banner) = 270px */}
      <div className="absolute inset-x-0 top-0 h-[250px] sm:h-[266px] lg:h-[270px] bg-[#f4f6f8] pointer-events-none" />
      <div
        className="absolute inset-x-0 top-[250px] sm:top-[266px] lg:top-[270px] bottom-0 pointer-events-none transition-colors duration-300"
        style={{ backgroundColor: bannerBgColor }}
      />

      {/* 1120 x 372px Banner Card */}
      <div className="relative z-10 w-full max-w-[1120px] mx-auto px-4 xl:px-0">
        {/* Card Wrapper with dynamic background color */}
        <div
          className="relative w-full min-h-[360px] lg:h-[372px] rounded-[44px] overflow-hidden shadow-2xl transition-colors duration-300"
          style={{ backgroundColor: bannerBgColor }}
        >
          {/* Custom CMS Background Image & Gradient */}
          {bgImgUrl ? (
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src={bgImgUrl}
                alt="Banner Background"
                fill
                unoptimized
                className="object-cover object-center"
              />
              {/* Linear Gradient Overlay matching Figma spec */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(355.79deg, rgba(0, 0, 0, 0) 33.74%, rgba(0, 0, 0, 0.8) 120.65%)',
                }}
              />
            </div>
          ) : (
            /* Solid Dark Green Placeholder Theme when no background image uploaded */
            <div className="absolute inset-0 bg-[#03594E] pointer-events-none" />
          )}

          {/* Decorative White Dashed Frame Loop Overlay */}
          <div className="absolute -top-[20px] -right-[22px] w-[263px] h-[284px] pointer-events-none z-10 opacity-95">
            <Image
              src="/images/bottom-cta-banner-frame.png"
              alt=""
              width={263}
              height={284}
              priority
              loading="eager"
              unoptimized
              className="w-full h-full object-contain"
            />
          </div>

          {/* Banner Content */}
          <div className="relative z-20 h-full flex flex-col justify-center px-8 sm:px-14 lg:px-[72px] py-10 lg:py-0">
            {/* Left Text Block */}
            <div className="max-w-[680px] text-left">
              <h2 className="text-white text-[32px] sm:text-[42px] lg:text-[48px] xl:text-[50px] leading-[1.18] tracking-normal">
                <span className="font-['Roboto',sans-serif] font-light block">
                  {tagline}
                </span>
                <span className="font-['Roboto',sans-serif] font-bold block whitespace-nowrap">
                  {heading}
                </span>
              </h2>

              {description && (
                <p className="font-['Roboto',sans-serif] font-normal text-[16px] sm:text-[18px] leading-[26px] text-white mt-4 sm:mt-5 max-w-[540px]">
                  {description}
                </p>
              )}
            </div>

            {/* Get Started Button (Figma: width 215px, height 58px, top 216px, left 820px in 1120 frame) */}
            <div className="mt-8 lg:mt-0 lg:absolute lg:right-[85px] lg:top-[216px]">
              <Link
                href={resolvedButtonUrl || '#'}
                onClick={(e) => {
                  if (!resolvedButtonUrl || resolvedButtonUrl === '#') {
                    e.preventDefault()
                  }
                }}
                target={openInNewTab ? '_blank' : undefined}
                rel={openInNewTab ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center justify-center gap-[10px] w-[215px] h-[58px] rounded-[100px] bg-[#F8C62F] border border-[#F8C62F] text-black font-['Roboto',sans-serif] font-medium text-[20px] transition-all duration-300 hover:brightness-105 hover:shadow-xl active:scale-95 group"
              >
                <span>{resolvedButtonText}</span>
                <span className="text-[20px] font-medium leading-none transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
