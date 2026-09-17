import React from 'react'
import { HeroSection } from '@/components/sections/HeroSection'
import { WhyMountZionSection } from '@/components/sections/WhyMountZionSection'

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-[#f8fafc]">
      {/* 1. Hero Section with Floating Stats */}
      <HeroSection />

      {/* 2. Why Mount Zion Section */}
      <WhyMountZionSection />

      {/* Subsequent sections will be inserted here as screenshots are provided */}
    </div>
  )
}
