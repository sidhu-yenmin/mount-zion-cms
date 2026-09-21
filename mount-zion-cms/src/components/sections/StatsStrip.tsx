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

const defaultStats: StatItem[] = [
  { value: '30+', label: 'Academic Experience', icon: 'book' },
  { value: '3000+', label: 'Students Enrolled', icon: 'students' },
  { value: '50+', label: 'Dedicated Educators', icon: 'teacher' },
  { value: '10+', label: 'Awards & Achievements', icon: 'trophy' },
]

const iconMap: Record<string, LucideIcon> = {
  book: BookOpen,
  students: Users,
  teacher: GraduationCap,
  trophy: Trophy,
}

export function StatsStrip({ stats }: StatsStripProps) {
  const displayStats = stats && stats.length > 0 ? stats : defaultStats

  return (
    <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6">
      <div className="w-full bg-[#0a3a30]/95 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl px-5 sm:px-10 py-5 sm:py-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 items-center">
        {displayStats.map((stat, idx) => {
          const IconComponent = (stat.icon && iconMap[stat.icon]) || BookOpen
          return (
            <div key={stat.id || idx} className="flex items-center gap-2.5 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-[#f5a623]">
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs md:text-sm text-neutral-300 font-medium leading-tight sm:leading-snug mt-0.5">
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
