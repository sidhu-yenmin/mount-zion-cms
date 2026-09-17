'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function TopHeader() {
  return (
    <header className="bg-[#eab308] w-full relative z-40 transition-colors shadow-xs select-none">
      <div className="max-w-[1440px] mx-auto relative h-[53px] flex items-center justify-center">
        {/* Figma Exported Header Image */}
        <Image
          src="/images/header.png"
          alt="Mount Zion International School - Header Navigation"
          width={1440}
          height={53}
          priority
          unoptimized
          className="w-full h-[53px] object-cover sm:object-contain object-center"
        />

        {/* Clickable Overlay Hotspots (Optional links while preserving 100% Figma image appearance) */}
        <div className="absolute inset-0 max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-8 pointer-events-auto">
          {/* Left contact links */}
          <div className="flex items-center gap-6 h-full">
            <a
              href="tel:+919876543210"
              className="w-36 h-full cursor-pointer opacity-0"
              title="Call +91 - 9876543210"
            >
              Phone
            </a>
            <a
              href="mailto:info@mountzion.com"
              className="w-44 h-full cursor-pointer opacity-0 hidden sm:block"
              title="Email info@mountzion.com"
            >
              Email
            </a>
          </div>

          {/* Right nav links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 h-full">
            <Link href="/" className="w-16 h-full cursor-pointer opacity-0" title="Home">Home</Link>
            <Link href="#about" className="w-24 h-full cursor-pointer opacity-0" title="Our School">Our School</Link>
            <Link href="#education" className="w-24 h-full cursor-pointer opacity-0" title="Education">Education</Link>
            <Link href="#student-life" className="w-28 h-full cursor-pointer opacity-0" title="Student Life">Student Life</Link>
            <Link href="#admissions" className="w-24 h-full cursor-pointer opacity-0" title="Admissions">Admissions</Link>
            <Link href="#contact" className="w-20 h-full cursor-pointer opacity-0" title="Contact">Contact</Link>
          </div>
        </div>
      </div>
    </header>
  )
}
