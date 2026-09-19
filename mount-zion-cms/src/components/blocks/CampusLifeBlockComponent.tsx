'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'

export interface GalleryImageItem {
  image: number | Media | string
  caption?: string | null
  id?: string | null
}

export interface CampusLifeCtaBar {
  showCtaBar?: boolean | null
  tagline?: string | null
  heading?: string | null
  studentImage?: number | Media | string | null
  buttonText?: string | null
  buttonUrl?: string | null
}

export interface CampusLifeBlockProps {
  blockType?: string
  badge?: string | null
  heading?: string | null
  viewMoreText?: string | null
  viewMoreLink?: string | null
  galleryImages?: GalleryImageItem[] | null
  ctaBar?: CampusLifeCtaBar | null
}

const defaultGalleryImages = [
  { src: '/images/facilities2.png', alt: 'School Architecture Staircase', ratio: 260 },
  { src: '/images/facilities1.png', alt: 'Students Collaborating in Classroom', ratio: 558 },
  { src: '/images/gallery1.png', alt: 'Student Reading in Library', ratio: 260 },
  { src: '/images/gallery2.png', alt: 'Students in Uniform in Hallway', ratio: 364 },
  { src: '/images/gallery3.png', alt: 'Student Writing with Pencil', ratio: 350 },
  { src: '/images/gallery4.png', alt: 'Modern Classroom Layout', ratio: 364 },
]

export const CampusLifeBlockComponent: React.FC<Partial<CampusLifeBlockProps>> = ({
  badge = 'OUR GALLERY',
  heading = 'Empowering Future Leaders Around the World',
  viewMoreText = 'View More',
  viewMoreLink = '/gallery',
  galleryImages,
  ctaBar,
}) => {
  // Helper to extract image URL from CMS upload or string
  const resolveMediaUrl = (
    media: number | Media | string | null | undefined,
    fallback: string,
  ): string => {
    if (!media) return fallback
    if (typeof media === 'string' && media.trim()) return media
    if (typeof media === 'object' && media?.url) return media.url
    return fallback
  }

  // Build 6 deck images dynamically from CMS or fallbacks
  const deckImages = defaultGalleryImages.map((defaultImg, idx) => {
    const cmsItem = galleryImages?.[idx]
    const resolvedUrl = cmsItem
      ? resolveMediaUrl(cmsItem.image, defaultImg.src)
      : defaultImg.src
    const caption = cmsItem?.caption || defaultImg.alt

    return {
      src: resolvedUrl,
      alt: caption,
      ratio: defaultImg.ratio,
    }
  })

  // Row 1 (first 3 images: 260 : 558 : 260)
  const row1 = deckImages.slice(0, 3)
  // Row 2 (next 3 images: 364 : 350 : 364)
  const row2 = deckImages.slice(3, 6)

  // CTA Bar values
  const showCta = ctaBar?.showCtaBar !== false
  const ctaTagline = ctaBar?.tagline || 'Looking for the Right School?'
  const ctaHeading = ctaBar?.heading || "Start Your Child's Journey with Us"
  const ctaButtonText = ctaBar?.buttonText || 'Apply Now'
  const ctaButtonUrl = ctaBar?.buttonUrl || '/admissions'
  const ctaStudentImg = resolveMediaUrl(ctaBar?.studentImage, '/images/gallery-cta-image.png')

  // Split heading into 2 lines matching the reference design
  const renderHeading = () => {
    if (!heading) return null

    if (heading.includes('\n')) {
      return heading.split('\n').map((line, idx) => (
        <span key={idx} className="block">
          {line}
        </span>
      ))
    }

    if (heading.includes('Around the World')) {
      return (
        <>
          <span className="block">Empowering Future Leaders</span>
          <span className="block">Around the World</span>
        </>
      )
    }

    return heading
  }

  return (
    <section className="relative w-full bg-[#f4f6f8] pt-[60px] pb-[80px] overflow-hidden">
      <div className="w-full max-w-[1118px] mx-auto px-4 xl:px-0">
        {/* 1. Header Section */}
        <div className="flex items-center gap-[10px] mb-[12px]">
          <span className="font-['Roboto',sans-serif] font-bold text-[18px] leading-[22px] uppercase text-[#03594E]">
            {badge}
          </span>
          <div className="w-[38px] h-[2px] bg-[#03594E]" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[32px]">
          <h2 className="font-['Roboto',sans-serif] font-bold text-[34px] sm:text-[40px] lg:text-[46px] leading-[1.14] sm:leading-[52px] text-black tracking-normal max-w-[620px]">
            {renderHeading()}
          </h2>

          {viewMoreLink && (
            <Link
              href={viewMoreLink}
              className="inline-flex items-center justify-center gap-[10px] w-[199px] h-[58px] rounded-[100px] border border-[#919191] bg-white text-[#353535] font-['Roboto',sans-serif] font-medium text-[20px] transition-all duration-300 hover:border-black hover:bg-slate-50 hover:shadow-md shrink-0 self-start md:self-end group mb-1 md:mb-0"
            >
              <span>{viewMoreText}</span>
              <Image
                src="/images/know-more-btn-icon.png"
                alt="Arrow"
                width={11}
                height={12}
                className="w-[11px] h-[12px] object-contain transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          )}
        </div>

        {/* 2. Gallery Bento Deck (2 Rows: 1118px total width on desktop) */}
        <div className="flex flex-col gap-[20px] w-full">
          {/* Row 1: 3 images (260px : 558px : 260px) */}
          <div className="flex flex-col sm:flex-row gap-[20px] w-full">
            {row1.map((item, idx) => (
              <div
                key={`r1-${idx}`}
                style={{ flex: `${item.ratio} 1 0%` }}
                className="relative h-[220px] sm:h-[230px] rounded-[30px] overflow-hidden group shadow-sm bg-slate-200"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  unoptimized
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 558px"
                />
              </div>
            ))}
          </div>

          {/* Row 2: 3 images (364px : 350px : 364px) */}
          <div className="flex flex-col sm:flex-row gap-[20px] w-full">
            {row2.map((item, idx) => (
              <div
                key={`r2-${idx}`}
                style={{ flex: `${item.ratio} 1 0%` }}
                className="relative h-[220px] sm:h-[230px] rounded-[30px] overflow-hidden group shadow-sm bg-slate-200"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  unoptimized
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 364px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 3. Gallery CTA Banner (Bottom: 1118 x 191px) */}
        {showCta && (
          <div className="relative mt-[185px] w-full max-w-[1118px] mx-auto">
            {/* Banner Background Container (1118 x 191px) */}
            <div className="relative w-full rounded-[30px] overflow-hidden min-h-[191px] h-auto md:h-[191px] bg-[#03594E] flex flex-col md:flex-row items-center justify-between shadow-lg">
              {/* Background solid image */}
              <div className="absolute inset-0 pointer-events-none">
                <Image
                  src="/images/gallery-cta-bg.png"
                  alt=""
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              {/* Background pattern overlay at 12% opacity */}
              <div className="absolute inset-0 pointer-events-none opacity-12">
                <Image
                  src="/images/gallery-cta-bg-pattern.png"
                  alt=""
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              {/* Text & Button Layout Matching Figma Specs:
                  Left student graphic occupies 54px to 269px.
                  Text zone starts at ~290px.
                  Apply button sits at left: 850px (69px from right edge).
              */}
              <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between px-6 py-8 md:py-0 md:pl-[290px] md:pr-[69px] gap-6">
                {/* CTA Headings (Font: Roboto Medium, size 30px, line-height 140%) */}
                <div className="text-center md:text-left">
                  <p className="font-['Roboto',sans-serif] font-medium text-[22px] sm:text-[26px] md:text-[30px] leading-[1.3] md:leading-[140%] text-white">
                    {ctaTagline}
                  </p>
                  <p className="font-['Roboto',sans-serif] font-medium text-[22px] sm:text-[26px] md:text-[30px] leading-[1.3] md:leading-[140%] text-white">
                    {ctaHeading}
                  </p>
                </div>

                {/* Apply Now Button: 199 x 58px, #F8C62F, rounded-full */}
                <Link
                  href={ctaButtonUrl}
                  className="inline-flex items-center justify-center gap-[10px] w-[199px] h-[58px] rounded-[100px] bg-[#F8C62F] border border-[#F8C62F] text-black font-['Roboto',sans-serif] font-medium text-[20px] transition-all duration-300 hover:brightness-105 hover:shadow-lg shrink-0 group"
                >
                  <span>{ctaButtonText}</span>
                  <Image
                    src="/images/know-more-btn-icon.png"
                    alt="Arrow"
                    width={11}
                    height={12}
                    className="w-[11px] h-[12px] object-contain brightness-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </div>

            {/* Floating Student Girl Cutout - 215 x 294px, anchored to bottom-0, left-[54px], pops up 103px above banner */}
            <div className="hidden md:block absolute bottom-0 left-[54px] w-[215px] h-[294px] pointer-events-none z-20">
              <Image
                src={ctaStudentImg}
                alt="Mount Zion Student"
                width={215}
                height={294}
                unoptimized
                className="w-[215px] h-[294px] object-contain drop-shadow-md"
              />
import { ArrowUpRight } from 'lucide-react'
import type { Media } from '@/payload-types'

export interface CampusLifeProps {
  blockType?: string
  badge?: string | null
  heading?: string | null
  viewMoreLink?: string | null
  galleryImages?: Array<{
    image: number | Media | string
    caption?: string | null
  }> | null
  ctaBar?: {
    showCtaBar?: boolean | null
    tagline?: string | null
    heading?: string | null
    studentImage?: number | Media | string | null
    buttonText?: string | null
    buttonUrl?: string | null
  } | null
}

export const CampusLifeBlockComponent: React.FC<Partial<CampusLifeProps>> = ({
  badge = 'LIFE AT MOUNT ZION',
  heading = 'Empowering Future Leaders Around the World',
  viewMoreLink = '/gallery',
  galleryImages = [],
  ctaBar,
}) => {
  // Default fallback images for bento grid
  const defaultImages = [
    { image: '/images/hero-student.png', caption: 'Science Fair & Innovation' },
    { image: '/images/why-mount-zion-classroom.png', caption: 'Interactive Learning' },
    { image: '/images/hero-student1.jpg', caption: 'Sports & Athletics' },
    { image: '/images/why-mount-zion-student.png', caption: 'Arts & Cultural Events' },
  ]

  const displayImages = galleryImages && galleryImages.length > 0 ? galleryImages : defaultImages

  const showCta = ctaBar?.showCtaBar ?? true
  const ctaTagline = ctaBar?.tagline || 'Ready to join High School?'
  const ctaHeading = ctaBar?.heading || "Start Your Child's Journey with Us"
  const ctaButtonText = ctaBar?.buttonText || 'Apply Now ↗'
  const ctaButtonUrl = ctaBar?.buttonUrl || '/admissions'

  return (
    <section className="relative w-full bg-slate-50 py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[#03594E] font-bold text-[15px] sm:text-[17px] uppercase tracking-normal select-none">
                {badge || 'LIFE AT MOUNT ZION'}
              </span>
              <span className="inline-block w-[36px] h-[2px] bg-[#03594E]" />
            </div>

            <h2 className="text-[#0F172A] font-bold text-[30px] sm:text-[38px] lg:text-[44px] leading-tight select-none">
              {heading}
            </h2>
          </div>

          {viewMoreLink && (
            <div>
              <Link
                href={viewMoreLink}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 font-semibold text-[15px] sm:text-[16px] transition-all duration-200 shadow-xs"
              >
                <span>View Full Gallery</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {displayImages.map((item, idx) => {
            const rawImg = item.image
            const imgSrc =
              typeof rawImg === 'object' && rawImg?.url
                ? rawImg.url
                : typeof rawImg === 'string' && rawImg
                  ? rawImg
                  : '/images/hero-student.png'

            return (
              <div
                key={idx}
                className="group relative h-[260px] sm:h-[300px] rounded-[24px] overflow-hidden shadow-md border border-slate-200/80 bg-white"
              >
                <Image
                  src={imgSrc}
                  alt={item.caption || 'Campus Life photo'}
                  fill
                  unoptimized
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
                {item.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <p className="text-white font-medium text-[15px] sm:text-[16px] drop-shadow-sm">
                      {item.caption}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* High School CTA Bar */}
        {showCta && (
          <div className="relative w-full rounded-[30px] bg-gradient-to-r from-[#03594E] to-[#044438] p-8 sm:p-10 lg:p-12 shadow-xl text-white overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-[#F8C62F] font-bold text-[14px] sm:text-[16px] uppercase tracking-wider block mb-2">
                {ctaTagline}
              </span>
              <h3 className="text-white font-bold text-[24px] sm:text-[32px] leading-tight">
                {ctaHeading}
              </h3>
            </div>

            <div>
              <Link
                href={ctaButtonUrl}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#F8C62F] hover:bg-[#eab308] text-[#0F172A] font-bold text-[16px] sm:text-[18px] transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
              >
                <span>{ctaButtonText}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
