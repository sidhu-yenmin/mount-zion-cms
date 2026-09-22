'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, X } from 'lucide-react'
import { SchoolLogo } from '../layout/SchoolLogo'
import { DiscoverMoreBadge } from '../ui/DiscoverMoreBadge'
import { StatsStrip } from '../sections/StatsStrip'
import type { Page, Media } from '@/payload-types'

export type HeroBlockProps = Omit<
  Extract<NonNullable<Page['layout']>[number], { blockType: 'hero' }>,
  'backgroundImage'
> & {
  backgroundImage?: number | Media | string | null
}

export const HeroBlockComponent: React.FC<HeroBlockProps> = ({
  badge = 'MOUNTZION',
  heading = 'Nurturing Minds. Building Character. Inspiring Future Leaders.',
  backgroundImage,
  primaryButtonText = 'Explore',
  primaryButtonUrl = '#explore',
  secondaryButtonText = 'Admission',
  secondaryButtonUrl = '#admission',
  videoUrl,
  stats,
}) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  // 1. Resolve Background Image (CMS Media object or string path)
  const bgImage =
    typeof backgroundImage === 'object' && backgroundImage?.url
      ? backgroundImage.url
      : typeof backgroundImage === 'string' && backgroundImage
        ? backgroundImage
        : '/images/hero-student.png'

  // 2. Parse Heading into 3 lines for the Figma styled typography
  const rawHeading = (heading || '').trim()
  let lines = rawHeading.includes('\n')
    ? rawHeading.split('\n').map((l) => l.trim()).filter(Boolean)
    : rawHeading.split('. ').map((s: string, idx: number, arr: string[]) => (idx < arr.length - 1 ? s + '.' : s))

  if (lines.length < 3) {
    lines = [
      lines[0] || 'Nurturing Minds.',
      lines[1] || 'Building Character.',
      lines[2] || 'Inspiring Future Leaders.',
    ]
  }

  return (
    <section className="relative w-full bg-white">
      {/* Hero Visual Area */}
      <div className="relative min-h-[680px] sm:min-h-[740px] lg:min-h-[800px] w-full flex flex-col justify-between overflow-hidden bg-[#0c2e26]">
        {/* 1. Background Image with Slow Ambient Ken Burns Effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="relative w-full h-full animate-hero-zoom">
            <Image
              src={bgImage}
              alt="Mount Zion International School student in classroom"
              fill
              priority
              unoptimized
              className="object-cover object-center sm:object-[66%_center] lg:object-[60%_center]"
              sizes="100vw"
            />
          </div>

          {/* Gradients & Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#041914]/95 via-[#06241d]/75 via-45% to-transparent sm:w-[82%] lg:w-[68%]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/55 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#041914]/80 to-transparent pointer-events-none" />
          
          {/* Ambient Breathing Light Orb */}
          <div className="absolute top-1/3 right-1/4 w-[460px] h-[460px] bg-amber-400/15 rounded-full blur-[110px] pointer-events-none animate-hero-glow" />
        </div>

        {/* Overlay Navbar with Drop-in Animation */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-4 sm:pt-8 flex items-center justify-between gap-3 sm:gap-6 animate-hero-fade-down">
          <Link href="/" className="hover:opacity-95 transition-opacity shrink-0">
            <SchoolLogo />
          </Link>

          <Link
            href="#apply"
            className="group relative overflow-hidden inline-flex items-center justify-center gap-1.5 bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
          >
            {/* Subtle sheen sweep across button */}
            <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none animate-hero-shimmer" />
            <span className="relative z-10">Apply Now</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] shrink-0 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Center Hero Content */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-8 max-w-3xl">
              {/* Category Tag with Fade-In */}
              {badge && (
                <div
                  className="flex items-center gap-2.5 mb-4 sm:mb-6 animate-hero-fade-up"
                  style={{ animationDelay: '150ms' }}
                >
                  <span className="text-[#f5a623] font-bold tracking-widest text-xs uppercase">
                    {badge}
                  </span>
                  <span className="w-10 h-[2px] bg-[#f5a623] inline-block transition-all duration-300 hover:w-16" />
                </div>
              )}

              {/* Main Headline with Staggered Line Entrance */}
              <h1 className="text-white tracking-tight leading-[1.12] mb-6 sm:mb-8 select-none">
                <span
                  className="block font-light text-[30px] sm:text-5xl lg:text-[54px] xl:text-[58px] text-white/95 animate-hero-fade-up"
                  style={{ animationDelay: '250ms' }}
                >
                  {lines[0]}
                </span>
                <span
                  className="block font-extrabold text-[30px] sm:text-5xl lg:text-[54px] xl:text-[58px] text-white mt-1 animate-hero-fade-up"
                  style={{ animationDelay: '400ms' }}
                >
                  {lines[1]}
                </span>
                <span
                  className="block font-extrabold text-[30px] sm:text-5xl lg:text-[54px] xl:text-[58px] text-white mt-1 animate-hero-fade-up"
                  style={{ animationDelay: '550ms' }}
                >
                  {lines[2]}
                </span>
              </h1>

              {/* Action Buttons with Shimmer & Hover Elevate */}
              <div
                className="flex flex-wrap items-center gap-3 sm:gap-4 animate-hero-fade-up"
                style={{ animationDelay: '700ms' }}
              >
                {primaryButtonText && (
                  <Link
                    href={primaryButtonUrl || '#explore'}
                    className="group relative overflow-hidden inline-flex items-center justify-center gap-2 bg-[#f5a623] hover:bg-[#e29517] text-[#111] font-bold text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-amber-500/35 hover:-translate-y-0.5 active:scale-95 whitespace-nowrap shrink-0"
                  >
                    {/* Diagonal Light Sheen */}
                    <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none animate-hero-shimmer" />
                    <span className="relative z-10">{primaryButtonText}</span>
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5] relative z-10 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </Link>
                )}

                {secondaryButtonText && (
                  <Link
                    href={secondaryButtonUrl || '#admission'}
                    className="group inline-flex items-center justify-center gap-2 border border-white/80 hover:border-white text-white hover:bg-white/15 font-semibold text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full transition-all duration-300 backdrop-blur-xs hover:shadow-md hover:-translate-y-0.5 active:scale-95 whitespace-nowrap shrink-0"
                  >
                    <span>{secondaryButtonText}</span>
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </Link>
                )}
              </div>
            </div>

            {/* Right Interactive Discover More Badge */}
            <div className="hidden lg:flex lg:col-span-4 justify-center xl:justify-end xl:pr-12">
              <DiscoverMoreBadge onClick={() => setVideoModalOpen(true)} />
            </div>
          </div>
        </div>

        {/* Bottom spacing for stats overlap */}
        <div className="h-20 sm:h-24" />
      </div>

      {/* Floating Stats Strip */}
      <div
        className="relative z-30 -mt-14 sm:-mt-16 pb-16 sm:pb-20 animate-hero-fade-up"
        style={{ animationDelay: '850ms' }}
      >
        <StatsStrip stats={stats} />
      </div>

      {/* Video Modal Popup with Smooth Backdrop and Zoom-in Entrance */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-neutral-900 border border-white/15 rounded-2xl overflow-hidden shadow-2xl p-6 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-white mb-3">Discover Mount Zion</h3>
            <p className="text-neutral-300 text-sm mb-4">
              Take a virtual walkthrough of our state-of-the-art campus, classrooms, and sports arena.
            </p>
            <div className="aspect-video bg-neutral-800 rounded-xl overflow-hidden flex items-center justify-center border border-white/10">
              {videoUrl && (videoUrl.includes('youtube') || videoUrl.includes('youtu.be') || videoUrl.includes('vimeo')) ? (
                <iframe
                  src={videoUrl.replace('watch?v=', 'embed/')}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-[#f5a623] flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <span className="text-neutral-950 font-bold text-2xl">▶</span>
                  </div>
                  <p className="text-white font-medium">Virtual Campus Tour 2026</p>
                  <p className="text-white/60 text-xs mt-1">Excellence in education, character & sports</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
