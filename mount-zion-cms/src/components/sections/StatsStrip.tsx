import React from 'react'
import Image from 'next/image'

export function StatsStrip() {
  return (
    <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6">
      <div className="relative w-full flex justify-center">
        <Image
          src="/images/metrics.png"
          alt="Mount Zion Metrics: 30+ Academic Experience, 3000+ Students Enrolled, 50+ Dedicated Educators, 10+ Awards & Achievements"
          width={1120}
          height={152}
          priority
          unoptimized
          className="w-full h-auto max-w-[1120px] object-contain drop-shadow-2xl select-none"
        />
      </div>
    </div>
  )
}
