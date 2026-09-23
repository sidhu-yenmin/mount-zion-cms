'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { SchoolLogo } from '../layout/SchoolLogo'
import { DiscoverMoreBadge } from '../ui/DiscoverMoreBadge'
import { StatsStrip } from '../sections/StatsStrip'
import { resolveLinkUrl } from '@/utils/resolveLink'
import type { Page, Media } from '@/payload-types'

export type HeroBlockProps = Omit<
  Extract<NonNullable<Page['layout']>[number], { blockType: 'hero' }>,
  'backgroundImage'
> & {
  backgroundImage?: number | Media | string | null
  carouselImages?: Array<{ image?: number | Media | string | null }> | null
  primaryButtonText?: string | null
  primaryButtonUrl?: string | null
  secondaryButtonText?: string | null
  secondaryButtonUrl?: string | null
  backgroundColor?: string | null
}

const defaultHeroImages = [
  '/images/hero-student.png',
  '/images/hero-student1.jpg',
  '/images/why-mount-zion.png',
  '/images/facilities1.png',
]

export const HeroBlockComponent: React.FC<HeroBlockProps> = (props) => {
  const {
    badge = 'MOUNTZION',
    heading = 'Nurturing Minds. Building Character. Inspiring Future Leaders.',
    backgroundImage,
    carouselImages,
    primaryButton,
    secondaryButton,
    primaryButtonText,
    primaryButtonUrl,
    secondaryButtonText,
    secondaryButtonUrl,
    videoUrl,
    stats,
    backgroundColor,
  } = props

  const resolvedPrimaryText = primaryButton?.text || primaryButtonText || 'Explore'
  const resolvedPrimaryUrl = resolveLinkUrl(primaryButton || primaryButtonUrl, '#explore')
  const resolvedSecondaryText = secondaryButton?.text || secondaryButtonText || 'Admission'
  const resolvedSecondaryUrl = resolveLinkUrl(secondaryButton || secondaryButtonUrl, '#admission')

  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const heroBgColor = backgroundColor || '#0c2e26'

  // 1. Resolve Background Images for the Carousel
  const resolveImgSrc = (img: number | Media | string | null | undefined): string | null => {
    if (!img) return null
    if (typeof img === 'string' && img.trim()) return img
    if (typeof img === 'object' && img?.url) return img.url
    return null
  }

  const primaryBg = resolveImgSrc(backgroundImage)

  const cmsImages = (carouselImages || [])
    .map((item) => resolveImgSrc(item.image))
    .filter((src): src is string => Boolean(src))

  const slideImages =
    cmsImages.length > 0
      ? primaryBg
        ? [primaryBg, ...cmsImages.filter((s) => s !== primaryBg)]
        : cmsImages
      : primaryBg
        ? [primaryBg, ...defaultHeroImages.slice(1)]
        : defaultHeroImages

  // 2. Carousel Interaction State
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchDelta, setTouchDelta] = useState<number>(0)
  const [isDragging, setIsDragging] = useState<boolean>(false)

  // Autoplay timer (5 seconds) with pause-on-hover / drag
  useEffect(() => {
    if (isPaused || slideImages.length <= 1) return

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev < slideImages.length - 1 ? prev + 1 : 0))
    }, 5000)

    return () => clearInterval(timer)
  }, [isPaused, slideImages.length])

  // Touch & mouse drag swipe gesture handlers
  const handleTouchStart = (clientX: number) => {
    if (slideImages.length <= 1) return
    setTouchStart(clientX)
    setTouchDelta(0)
    setIsDragging(true)
  }

  const handleTouchMove = (clientX: number) => {
    if (touchStart === null || slideImages.length <= 1) return
    setTouchDelta(clientX - touchStart)
  }

  const handleTouchEnd = () => {
    if (touchStart === null || slideImages.length <= 1) return
    const threshold = 40
    if (touchDelta < -threshold) {
      // Swiped left -> Next slide
      setActiveSlide((prev) => (prev < slideImages.length - 1 ? prev + 1 : 0))
    } else if (touchDelta > threshold) {
      // Swiped right -> Previous slide
      setActiveSlide((prev) => (prev > 0 ? prev - 1 : slideImages.length - 1))
    }
    setTouchStart(null)
    setTouchDelta(0)
    setIsDragging(false)
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setActiveSlide((prev) => (prev > 0 ? prev - 1 : slideImages.length - 1))
    } else if (e.key === 'ArrowRight') {
      setActiveSlide((prev) => (prev < slideImages.length - 1 ? prev + 1 : 0))
    }
  }

  // 3. Parse Heading into 3 lines for the styled typography
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
    <section
      className="relative w-full bg-white select-none outline-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Hero Banner Carousel"
    >
      {/* Hero Visual Area with Touch/Mouse Swipe Support */}
      <div
        className="relative min-h-[680px] sm:min-h-[740px] lg:min-h-[820px] w-full flex flex-col justify-between overflow-hidden bg-[#0c2e26]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false)
          if (isDragging) handleTouchEnd()
        }}
        onTouchStart={(e) => handleTouchStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleTouchMove(e.touches[0].clientX)}
        onTouchEnd={handleTouchEnd}
        onMouseDown={(e) => handleTouchStart(e.clientX)}
        onMouseMove={(e) => isDragging && handleTouchMove(e.clientX)}
        onMouseUp={handleTouchEnd}
      >
        {/* 1. Cinematic Background Image Carousel with Ken Burns Zoom & Smooth Cross-fade */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {slideImages.map((src, idx) => {
            const isActive = activeSlide === idx
            return (
              <div
                key={`${src}-${idx}`}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                aria-hidden={!isActive}
              >
                <div className={`relative w-full h-full ${isActive ? 'animate-hero-zoom' : ''}`}>
                  <Image
                    src={src}
                    alt={`Mount Zion campus hero banner ${idx + 1}`}
                    fill
                    priority={idx === 0}
                    unoptimized
                    className="object-cover object-center sm:object-[66%_center] lg:object-[60%_center]"
                    sizes="100vw"
                  />
                </div>
              </div>
            )
          })}

          {/* Gradients & Vignette Overlays (Anchored above image slides for pristine contrast) */}
          <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#041914]/95 via-[#06241d]/75 via-45% to-transparent sm:w-[82%] lg:w-[68%]" />
          <div className="absolute inset-x-0 top-0 h-40 z-20 bg-gradient-to-b from-black/55 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-32 z-20 bg-gradient-to-t from-[#041914]/80 to-transparent pointer-events-none" />

          {/* Ambient Breathing Light Orb */}
          <div className="absolute top-1/3 right-1/4 w-[460px] h-[460px] z-20 bg-amber-400/15 rounded-full blur-[110px] pointer-events-none animate-hero-glow" />
        </div>

        {/* 2. Overlay Navbar with Drop-in Animation */}
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

        {/* 3. Center Hero Content */}
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
                {resolvedPrimaryText && (
                  <Link
                    href={resolvedPrimaryUrl || '#explore'}
                    className="group relative overflow-hidden inline-flex items-center justify-center gap-2 bg-[#f5a623] hover:bg-[#e29517] text-[#111] font-bold text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-amber-500/35 hover:-translate-y-0.5 active:scale-95 whitespace-nowrap shrink-0"
                  >
                    {/* Diagonal Light Sheen */}
                    <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none animate-hero-shimmer" />
                    <span className="relative z-10">{resolvedPrimaryText}</span>
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5] relative z-10 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </Link>
                )}

                {resolvedSecondaryText && (
                  <Link
                    href={resolvedSecondaryUrl || '#admission'}
                    className="group inline-flex items-center justify-center gap-2 border border-white/80 hover:border-white text-white hover:bg-white/15 font-semibold text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full transition-all duration-300 backdrop-blur-xs hover:shadow-md hover:-translate-y-0.5 active:scale-95 whitespace-nowrap shrink-0"
                  >
                    <span>{resolvedSecondaryText}</span>
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

        {/* 4. Bottom Hero Banner Carousel Navigation Controls (Centered) */}
        {slideImages.length > 1 && (
          <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-center gap-3 sm:gap-4 mb-4 select-none">
            <div className="flex items-center gap-2 bg-black/45 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 shadow-xl">
              {/* Prev Button */}
              <button
                type="button"
                onClick={() =>
                  setActiveSlide((prev) => (prev > 0 ? prev - 1 : slideImages.length - 1))
                }
                aria-label="Previous hero banner image"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Indicator Pills */}
              <div className="flex items-center gap-1.5 px-1">
                {slideImages.map((_, idx) => {
                  const isActive = activeSlide === idx
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveSlide(idx)}
                      aria-label={`Go to hero slide ${idx + 1}`}
                      className={`h-[6px] rounded-[15px] transition-all duration-500 cursor-pointer ${
                        isActive
                          ? 'w-[28px] sm:w-[36px] bg-[#f5a623] shadow-sm shadow-amber-400/50'
                          : 'w-[10px] sm:w-[12px] bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  )
                })}
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={() =>
                  setActiveSlide((prev) => (prev < slideImages.length - 1 ? prev + 1 : 0))
                }
                aria-label="Next hero banner image"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Slide Counter */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-white/90 bg-black/35 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 select-none">
              <span className="text-[#f5a623]">0{activeSlide + 1}</span>
              <span className="text-white/40">/</span>
              <span>0{slideImages.length}</span>
            </div>
          </div>
        )}

        {/* Bottom spacing for stats overlap */}
        <div className="h-12 sm:h-16" />
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
