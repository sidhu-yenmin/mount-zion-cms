'use client'

import React from 'react'
import Image from 'next/image'

export function DiscoverMoreBadge({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Discover More"
      className="group relative w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 select-none"
    >
      <Image
        src="/images/discover-more.png"
        alt="Discover More"
        width={293}
        height={293}
        unoptimized
        className="w-full h-full object-contain drop-shadow-md group-hover:brightness-110 transition-all duration-300"
      />
    </button>
  )
}
