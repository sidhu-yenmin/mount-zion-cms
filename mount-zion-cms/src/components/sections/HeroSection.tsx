'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, X } from 'lucide-react'
import { SchoolLogo } from '../layout/SchoolLogo'
import { DiscoverMoreBadge } from '../ui/DiscoverMoreBadge'
import { StatsStrip } from './StatsStrip'
import { HeroData } from '@/types/cms'
import { mockHeroData } from '@/data/mockData'

interface HeroSectionProps {
  data?: HeroData
}

export function HeroSection({ data = mockHeroData }: HeroSectionProps) {
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  const {
    tag = 'MOUNTZION',
    headingLine1 = 'Nurturing Minds.',
    headingLine2 = 'Building Character.',
    headingLine3 = 'Inspiring Future Leaders.',
    primaryCtaText = 'Explore',
    primaryCtaLink = '#explore',
    secondaryCtaText = 'Admission',
    secondaryCtaLink = '#admission',
    backgroundImage = '/images/hero-student.png',
  } = data

  return (
    <section className="relative w-full bg-white">
      {/* Hero Visual Area */}
      <div className="relative min-h-[680px] sm:min-h-[740px] lg:min-h-[800px] w-full flex flex-col justify-between overflow-hidden bg-[#0c2e26]">
        {/* 1. Background Image (Allowed Image Asset) */}
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Mount Zion International School student in classroom"
            fill
            priority
            unoptimized
            className="object-cover object-center sm:object-[66%_center] lg:object-[60%_center]"
            sizes="100vw"
          />

          {/* Gradients & Vignette Overlays */}
          {/* Left dark gradient for punchy text visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#041914]/95 via-[#06241d]/75 via-45% to-transparent sm:w-[82%] lg:w-[68%]" />

          {/* Top subtle gradient */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/55 to-transparent pointer-events-none" />

          {/* Bottom subtle vignette */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#041914]/80 to-transparent pointer-events-none" />

          {/* Radial warm glow behind Discover More button */}
          <div className="absolute top-1/3 right-1/4 w-[420px] h-[420px] bg-amber-400/15 rounded-full blur-[100px] pointer-events-none" />
        </div>

        {/* Overlay Navbar */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 flex items-center justify-between">
          {/* 2. School Logo (Allowed Image Asset) */}
          <Link href="/" className="hover:opacity-95 transition-opacity">
            <SchoolLogo />
          </Link>

          {/* Apply Now Button (Text / Code Only) */}
          <Link
            href="#apply"
            className="inline-flex items-center gap-1.5 bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
          >
            <span>Apply Now</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>

        {/* Center Hero Content (All Pure Text & HTML Buttons) */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-8 max-w-3xl">
              {/* Category Tag */}
              <div className="flex items-center gap-2.5 mb-4 sm:mb-6">
                <span className="text-[#f5a623] font-bold tracking-widest text-xs uppercase">
                  {tag}
                </span>
                <span className="w-10 h-[2px] bg-[#f5a623] inline-block" />
              </div>

              {/* Main Headline (Pure Text) */}
              <h1 className="text-white tracking-tight leading-[1.12] mb-8 select-none">
                <span className="block font-light text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] text-white/95">
                  {headingLine1}
                </span>
                <span className="block font-extrabold text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] text-white mt-1">
                  {headingLine2}
                </span>
                <span className="block font-extrabold text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] text-white mt-1">
                  {headingLine3}
                </span>
              </h1>

              {/* Action Buttons (Pure HTML Buttons) */}
              <div className="flex flex-wrap items-center gap-4">
                {/* Explore Pill Button */}
                <Link
                  href={primaryCtaLink}
                  className="inline-flex items-center gap-2 bg-[#f5a623] hover:bg-[#e29517] text-[#111] font-bold text-sm sm:text-base px-7 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-amber-500/30 active:scale-95"
                >
                  <span>{primaryCtaText}</span>
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                </Link>

                {/* Admission Ghost Pill Button */}
                <Link
                  href={secondaryCtaLink}
                  className="inline-flex items-center gap-2 border border-white/80 hover:border-white text-white hover:bg-white/10 font-semibold text-sm sm:text-base px-7 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all duration-200 backdrop-blur-xs active:scale-95"
                >
                  <span>{secondaryCtaText}</span>
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                </Link>
              </div>
            </div>

            {/* Right Interactive Discover More Badge Column (Pure SVG / Code) */}
            <div className="hidden lg:flex lg:col-span-4 justify-center xl:justify-end xl:pr-12">
              <DiscoverMoreBadge onClick={() => setVideoModalOpen(true)} />
            </div>
          </div>
        </div>

        {/* Bottom padding inside hero to accommodate the stats bar overlap */}
        <div className="h-20 sm:h-24" />
      </div>

      {/* 3. Floating Stats Strip (Allowed Image Asset: metrics.png) */}
      <div className="relative z-30 -mt-14 sm:-mt-16 pb-16 sm:pb-20">
        <StatsStrip />
      </div>

      {/* Video Modal Popup */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-neutral-900 border border-white/15 rounded-2xl overflow-hidden shadow-2xl p-6">
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
              <div className="text-center p-8">
                <div className="w-16 h-16 rounded-full bg-[#f5a623] flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-neutral-950 font-bold text-2xl">▶</span>
                </div>
                <p className="text-white font-medium">Virtual Campus Tour 2026</p>
                <p className="text-white/60 text-xs mt-1">Excellence in education, character & sports</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
