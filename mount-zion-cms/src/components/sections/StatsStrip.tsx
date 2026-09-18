import React from 'react'
import Image from 'next/image'
import { BookOpen, Users, GraduationCap, Trophy, LucideIcon } from 'lucide-react'

interface StatItem {
  icon?: string | null
  value: string
  label: string
  id?: string | null
}

interface StatsStripProps {
  stats?: StatItem[] | null
}

const iconMap: Record<string, LucideIcon> = {
  book: BookOpen,
  students: Users,
  teacher: GraduationCap,
  trophy: Trophy,
}

export function StatsStrip({ stats }: StatsStripProps) {
  // If dynamic stats array is provided from CMS, render dynamic counter cards
  if (stats && stats.length > 0) {
    return (
      <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6">
        <div className="w-full bg-[#0a3a30]/95 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl px-6 sm:px-10 py-6 sm:py-8 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center">
          {stats.map((stat, idx) => {
            const IconComponent = (stat.icon && iconMap[stat.icon]) || BookOpen
            return (
              <div key={stat.id || idx} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-[#f5a623]">
                  <IconComponent className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-300 font-medium leading-snug">
                    {stat.label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Fallback to exact Figma metrics image
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
