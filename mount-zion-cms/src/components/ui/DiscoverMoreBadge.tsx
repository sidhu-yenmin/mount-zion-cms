'use client'

import React from 'react'
import Image from 'next/image'

export function DiscoverMoreBadge({ onClick }: { onClick?: () => void }) {
  return (
    <div className="animate-hero-fade-up" style={{ animationDelay: '750ms' }}>
      <button
        onClick={onClick}
        type="button"
        aria-label="Discover More Video"
        className="group relative w-36 h-36 sm:w-40 sm:h-40 lg:w-44 lg:h-44 flex items-center justify-center cursor-pointer select-none animate-hero-float transition-transform duration-300 hover:scale-108 active:scale-95"
      >
        {/* Outer ambient golden glow halo on hover */}
        <div className="absolute inset-4 rounded-full bg-amber-400/25 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Gentle center pulse wave */}
        <div className="absolute w-[48px] h-[48px] sm:w-[54px] sm:h-[54px] rounded-full bg-[#f5a623]/25 animate-ping pointer-events-none opacity-40 group-hover:opacity-75" />

        {/* Center dark circular disc with subtle outline matching Figma */}
        <div className="absolute w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-full bg-[#132722]/85 border border-white/25 shadow-lg backdrop-blur-xs group-hover:bg-[#132722] group-hover:border-amber-400/50 group-hover:scale-105 transition-all duration-300 pointer-events-none z-20 flex items-center justify-center" />

        {/* Exact Figma Exported discover-more.png with curved text & play button */}
        <Image
          src="/images/discover-more.png"
          alt="Discover More"
          width={293}
          height={293}
          priority
          unoptimized
          className="relative z-10 w-full h-full object-contain drop-shadow-md group-hover:rotate-6 transition-transform duration-500"
        />
      </button>
    </div>
  )
}
