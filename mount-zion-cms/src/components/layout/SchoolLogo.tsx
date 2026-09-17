import React from 'react'
import Image from 'next/image'

export function SchoolLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <Image
        src="/images/school-logo.png"
        alt="Mount Zion International School - CBSE"
        width={299}
        height={83}
        priority
        unoptimized
        className="h-14 sm:h-16 w-auto object-contain drop-shadow-sm"
      />
    </div>
  )
}
