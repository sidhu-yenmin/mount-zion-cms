'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'
import { SchoolLogo } from '../layout/SchoolLogo'
import { DiscoverMoreBadge } from '../ui/DiscoverMoreBadge'
import { StatsStrip } from './StatsStrip'

export function HeroSection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  return (
    <section className="relative w-full bg-white">
      {/* Hero Visual Area */}
      <div className="relative min-h-[680px] sm:min-h-[740px] lg:min-h-[800px] w-full flex flex-col justify-between overflow-hidden bg-[#0c2e26]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-student.png"
            alt="Mount Zion International School student in classroom"
            fill
            priority
            unoptimized
            className="object-cover object-center sm:object-[66%_center] lg:object-[60%_center]"
            sizes="100vw"
          />

          {/* Gradients & Vignette Overlays matching Figma */}
          {/* Left dark gradient for punchy text visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#041914]/95 via-[#06241d]/75 via-45% to-transparent sm:w-[82%] lg:w-[68%]" />

          {/* Top subtle gradient */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/55 to-transparent pointer-events-none" />

          {/* Bottom subtle vignette */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#041914]/80 to-transparent pointer-events-none" />

          {/* Radial warm glow behind Discover More button */}
          <div className="absolute top-1/3 right-1/4 w-[420px] h-[420px] bg-amber-400/15 rounded-full blur-[100px] pointer-events-none" />
        </div>

        {/* Overlay Navbar (School Logo + Figma Apply Now Button) */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 flex items-center justify-between">
          {/* Logo & School Name */}
          <Link href="/" className="hover:opacity-95 transition-opacity">
            <SchoolLogo />
          </Link>

          {/* Figma Exported Apply Now Pill Image */}
          <Link
            href="#apply"
            className="cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 drop-shadow-md"
            title="Apply Now"
          >
            <Image
              src="/images/apply-now.png"
              alt="Apply Now"
              width={197}
              height={58}
              priority
              unoptimized
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Center Hero Content (Figma Exported Hero Text Image) */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content: Hero Text Image */}
            <div className="lg:col-span-8 max-w-3xl">
              <div className="relative inline-block w-full max-w-[740px]">
                {/* 100% Exact Figma Hero Text PNG */}
                <Image
                  src="/images/hero-text.png"
                  alt="MOUNTZION Nurturing Minds. Building Character. Inspiring Future Leaders."
                  width={741}
                  height={322}
                  priority
                  unoptimized
                  className="w-full h-auto object-contain drop-shadow-xl select-none"
                />

                {/* Interactive Click Hotspots for Explore & Admission */}
                <div className="absolute bottom-0 left-0 flex items-center gap-4 h-14 w-full">
                  <Link
                    href="#explore"
                    className="w-36 h-full cursor-pointer rounded-full"
                    title="Explore"
                  />
                  <Link
                    href="#admission"
                    className="w-40 h-full cursor-pointer rounded-full"
                    title="Admission"
                  />
                </div>
              </div>
            </div>

            {/* Right Interactive Discover More Badge Column */}
            <div className="hidden lg:flex lg:col-span-4 justify-center xl:justify-end xl:pr-12">
              <DiscoverMoreBadge onClick={() => setVideoModalOpen(true)} />
            </div>
          </div>
        </div>

        {/* Bottom padding inside hero to accommodate the stats bar overlap */}
        <div className="h-20 sm:h-24" />
      </div>

      {/* Floating Stats Strip */}
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
