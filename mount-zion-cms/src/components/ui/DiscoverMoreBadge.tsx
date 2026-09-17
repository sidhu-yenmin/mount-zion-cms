'use client'

import React from 'react'
import Image from 'next/image'

export function DiscoverMoreBadge({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Discover More Video"
      className="group relative w-36 h-36 sm:w-40 sm:h-40 lg:w-44 lg:h-44 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 select-none"
    >
      {/* Center dark circular disc with subtle outline matching Figma */}
      <div className="absolute w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-full bg-[#132722]/80 border border-white/25 shadow-lg backdrop-blur-xs group-hover:bg-[#132722]/95 group-hover:border-white/40 transition-all pointer-events-none" />

      {/* Exact Figma Exported discover-more.png */}
      <Image
        src="/images/discover-more.png"
        alt="Discover More"
        width={293}
        height={293}
        priority
        unoptimized
        className="relative z-10 w-full h-full object-contain drop-shadow-md"
      />
    </button>
  )
}
