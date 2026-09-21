import React from 'react'
import Image from 'next/image'

export function SchoolLogo({ logoUrl, className = '' }: { logoUrl?: string; className?: string }) {
  const src = logoUrl || '/images/school-logo.png'

  return (
    <div className={`flex items-center select-none ${className}`}>
      <Image
        src={src}
        alt="Mount Zion International School - CBSE"
        width={299}
        height={83}
        priority
        unoptimized
        className="h-8 sm:h-11 md:h-14 lg:h-16 w-auto max-w-[170px] sm:max-w-none object-contain drop-shadow-sm"
      />
    </div>
  )
}
