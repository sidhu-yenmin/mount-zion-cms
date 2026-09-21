import React from 'react'

interface StatItem {
  icon?: string | null
  value: string
  label: string
  id?: string | null
}

interface StatsStripProps {
  stats?: StatItem[] | null
}

/* =========================================================================
   [OPTION A: STATIC FALLBACK METRICS IMAGE - COMMENTED OUT]
   import Image from 'next/image'
   const fallbackMetricsImg = '/images/metrics.png'
========================================================================= */

// Exact Gold Book Emblem Icon matching Figma specification
function FigmaGoldBookEmblem() {
  return (
    <svg
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-11 h-11 lg:w-[48px] lg:h-[48px] text-[#F5A623] shrink-0"
    >
      {/* Outer cradle U-shape */}
      <path
        d="M10 20V37C10 43 14 46.5 27 46.5C40 46.5 44 43 44 37V20"
        stroke="#F5A623"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Left book lobe */}
      <path
        d="M18 19C18 15 22 13 27 16V38C22 35 18 36 18 38V19Z"
        stroke="#F5A623"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Right book lobe */}
      <path
        d="M36 19C36 15 32 13 27 16V38C32 35 36 36 36 38V19Z"
        stroke="#F5A623"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FormattedStatValue({ value }: { value: string }) {
  const trimmed = (value || '').trim()
  if (trimmed.endsWith('+')) {
    const num = trimmed.slice(0, -1)
    return (
      <div className="font-['Inter',sans-serif] font-black italic text-[26px] sm:text-[32px] lg:text-[36px] leading-none text-white tracking-tight flex items-baseline">
        <span>{num}</span>
        <span className="text-[#F5A623] font-black not-italic ml-1 text-[24px] sm:text-[28px] lg:text-[32px] leading-none">+</span>
      </div>
    )
  }
  return (
    <div className="font-['Inter',sans-serif] font-black italic text-[26px] sm:text-[32px] lg:text-[36px] leading-none text-white tracking-tight">
      {trimmed}
    </div>
  )
}

export function StatsStrip({ stats }: StatsStripProps) {
  // [STRICT CMS DATA BINDING - Only render when configured in CMS]
  if (!stats || stats.length === 0) {
    return null
  }

  return (
    <div className="w-full max-w-[1120px] mx-auto px-4 xl:px-0">
      {/* Exact Figma Translucent Emerald Card: rgba green backdrop-blur with gold border */}
      <div
        className="relative w-full min-h-[130px] lg:h-[152px] rounded-[28px] sm:rounded-[36px] shadow-2xl backdrop-blur-md flex items-center px-4 sm:px-8 lg:px-6 py-5 lg:py-0 border border-[#F5A623]/60"
        style={{
          backgroundColor: 'rgba(8, 72, 60, 0.88)',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Row of Stat Items spread evenly horizontally from CMS */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between">
          {stats.map((stat, idx) => {
            const isNotLast = idx < stats.length - 1

            return (
              <React.Fragment key={stat.id || idx}>
                <div className="flex-1 w-full sm:w-auto flex items-center justify-center gap-3.5 sm:gap-4 px-2 sm:px-4 py-2 sm:py-0">
                  {/* Figma Gold Book Emblem */}
                  <FigmaGoldBookEmblem />

                  {/* Dynamic CMS Number & Description */}
                  <div className="flex flex-col justify-center text-left">
                    <FormattedStatValue value={stat.value} />
                    <span className="font-['Inter',sans-serif] font-medium text-[13px] sm:text-[14px] leading-[17px] text-white/95 mt-1 whitespace-pre-line max-w-[150px]">
                      {stat.label}
                    </span>
                  </div>
                </div>

                {/* Vertical Divider between items */}
                {isNotLast && (
                  <div className="hidden sm:block h-[50px] w-[1px] bg-white/30 shrink-0" />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}
