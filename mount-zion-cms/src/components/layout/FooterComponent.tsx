'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CtaBannerBlockComponent } from '@/components/blocks/CtaBannerBlockComponent'
import type { Footer as FooterType, Media } from '@/payload-types'

export interface FooterComponentProps {
  footer?: FooterType | null
}

/* =========================================================================
   [OPTION A: STATIC FALLBACK FOOTER DATA - COMMENTED OUT]
   Uncomment below if you want hardcoded demo footer links and data:

const fallbackCol1Links = [
  { label: 'Home', url: '/', active: true },
  { label: 'About', url: '#about' },
  { label: 'Academic', url: '#academic' },
  { label: 'Admission', url: '#admission' },
  { label: 'Resources', url: '#resources' },
  { label: 'Student Portal', url: '#portal' },
]

const fallbackCol2Links = [
  { label: 'Campus Life', url: '#campus-life' },
  { label: 'Achievements', url: '#achievements' },
  { label: 'Gallery', url: '/gallery' },
  { label: 'News & Events', url: '/news' },
  { label: 'Contact Us', url: '#contact' },
]

const fallbackSocialIcons = [
  { name: 'facebook', icon: '/images/facebook.png', url: 'https://facebook.com' },
  { name: 'youtube', icon: '/images/youtube.png', url: 'https://youtube.com' },
  { name: 'x', icon: '/images/x.png', url: 'https://x.com' },
  { name: 'linkedin', icon: '/images/linkedin.png', url: 'https://linkedin.com' },
  { name: 'instagram', icon: '/images/instagram.png', url: 'https://instagram.com' },
]

const fallbackPhone = '+9173737 51513'
const fallbackEmail = 'cbse@mountzionschools.com'
const fallbackAddress = 'Pilivalam, Lembalakkudi,\nPudukottai - 622507'
const fallbackDescription = 'Inspiring Minds. Shaping Futures.\nNurturing Excellence. Building Leaders.'
const fallbackCopyright = '© 2026 Mount Zion International School. All Rights Reserved.'
const fallbackLogoUrl = '/images/Logo 1.png'
========================================================================= */

const platformIconMap: Record<string, string> = {
  facebook: '/images/facebook.png',
  youtube: '/images/youtube.png',
  twitter: '/images/x.png',
  x: '/images/x.png',
  linkedin: '/images/linkedin.png',
  instagram: '/images/instagram.png',
}

export const FooterComponent: React.FC<FooterComponentProps> = ({ footer }) => {
  const resolveMediaUrl = (
    media: any,
  ): string | null => {
    if (!media) return null
    if (typeof media === 'string' && media.trim()) return media
    if (typeof media === 'object') {
      if (media?.url) return media.url
      if (media?.filename) return `/media/${media.filename}`
    }
    return null
  }

  // [OPTION B: STRICT CMS DATA BINDING]
  const logoUrl = resolveMediaUrl(footer?.logo)
  const description = footer?.description || ''
  const phone = footer?.contactInfo?.phone || ''
  const email = footer?.contactInfo?.email || ''
  const address = footer?.contactInfo?.address || ''
  const copyright = footer?.copyright || ''

  const resolveLinkUrl = (item: any): string => {
    if (item?.linkType === 'page' && item.page) {
      const pageSlug = typeof item.page === 'object' ? item.page.slug : ''
      return pageSlug === 'home' ? '/' : `/${pageSlug}`
    }
    if (item?.customUrl && typeof item.customUrl === 'string' && item.customUrl.trim()) {
      return item.customUrl.trim()
    }
    if (item?.url && typeof item.url === 'string' && item.url.trim()) {
      return item.url.trim()
    }
    return '#'
  }

  const resolveLinkLabel = (item: any): string => {
    if (item?.label && typeof item.label === 'string' && item.label.trim()) {
      return item.label.trim()
    }
    if (item?.linkType === 'page' && item.page && typeof item.page === 'object') {
      return item.page.title || item.page.slug || 'Page'
    }
    return item?.customUrl || 'Link'
  }

  // CMS Quick links (split evenly into 2 columns if provided)
  const cmsQuickLinks = (footer?.quickLinks || []).map((link: any) => ({
    label: resolveLinkLabel(link),
    url: resolveLinkUrl(link),
    openInNewTab: Boolean(link?.openInNewTab),
  }))
  const midPoint = Math.ceil(cmsQuickLinks.length / 2)
  const col1Links = cmsQuickLinks.slice(0, midPoint)
  const col2Links = cmsQuickLinks.slice(midPoint)

  // CMS Social links mapped with uploaded custom icon or auto-fallback platform icon
  const cmsSocialLinks = (footer?.socialLinks || []).map((social: any) => {
    const customIconUrl = resolveMediaUrl(social.icon)
    const standardIconUrl = platformIconMap[social.platform] || '/images/facebook.png'
    return {
      name: social.platform || 'social',
      url: social.url,
      icon: customIconUrl || standardIconUrl,
    }
  })

  const ctaBannerData = (footer as any)?.ctaBanner
  const showCta = ctaBannerData?.showCtaBanner !== false && Boolean(ctaBannerData?.heading)

  const footerBgColor = (footer as any)?.backgroundColor || '#03594E'

  return (
    <div className="w-full">
      {/* 1. Global Bottom CTA Banner */}
      {showCta && (
        <CtaBannerBlockComponent
          tagline={ctaBannerData?.tagline}
          heading={ctaBannerData?.heading}
          description={ctaBannerData?.description}
          button={ctaBannerData?.button}
          buttonText={ctaBannerData?.buttonText}
          buttonUrl={ctaBannerData?.buttonUrl}
          backgroundImage={ctaBannerData?.backgroundImage}
          backgroundColor={ctaBannerData?.backgroundColor}
        />
      )}

      {/* 2. Main Footer */}
      <footer
        className="w-full text-white pt-[50px] pb-0 transition-colors duration-300"
        style={{ backgroundColor: footerBgColor }}
      >
        <div className="w-full max-w-[1120px] mx-auto px-4 xl:px-0">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-8 pb-12 lg:pb-14">
            {/* Left Column: School Logo, Brand Name, Tagline & Social Icons */}
            <div className="w-full lg:w-[330px] flex flex-col items-start shrink-0">
              <Link href="/" className="flex items-center gap-3.5 group">
                {logoUrl && (
                  <div className="relative max-w-[280px] h-[64px] shrink-0">
                    <Image
                      src={logoUrl}
                      alt="Mount Zion International School"
                      width={260}
                      height={64}
                      unoptimized
                      className="h-[64px] w-auto object-contain"
                    />
                  </div>
                )}
                {/* [OPTION A: STATIC FALLBACK SCHOOL NAME TEXT - COMMENTED OUT AS LOGO IMAGE ALREADY CONTAINS SCHOOL NAME]
                <div className="flex flex-col justify-center">
                  <h3 className="font-['K2D',sans-serif] font-extrabold text-[34.2px] leading-[1.0] text-white tracking-tight">
                    Mount Zion
                  </h3>
                  <p className="font-['Inter',sans-serif] font-medium text-[13.31px] leading-[1.4] text-white tracking-normal mt-1">
                    International School - CBSE
                  </p>
                </div>
                */}
              </Link>

              {/* Tagline */}
              {description && (
                <p className="font-['Roboto',sans-serif] font-normal text-[14px] leading-[20px] text-white/90 whitespace-pre-line mt-5">
                  {description}
                </p>
              )}

              {/* Social Icons */}
              {cmsSocialLinks.length > 0 && (
                <div className="flex items-center gap-4 mt-6">
                  {cmsSocialLinks.map((social, idx) => (
                    <a
                      key={`${social.name}-${idx}`}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="transition-transform duration-200 hover:scale-115 opacity-95 hover:opacity-100"
                    >
                      <div className="relative w-[28px] h-[28px]">
                        <Image
                          src={social.icon}
                          alt={social.name}
                          width={28}
                          height={28}
                          unoptimized
                          className="object-contain"
                        />
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Middle Column: Quick Links (from CMS) */}
            {cmsQuickLinks.length > 0 && (
              <div className="w-full lg:w-[250px] flex flex-col items-start shrink-0">
                <h4 className="font-['Roboto',sans-serif] font-bold text-[20px] leading-[18px] text-white mb-6">
                  Quick links
                </h4>
                <div className="flex gap-10 w-full">
                  {/* Column 1 */}
                  <div className="flex flex-col gap-2.5">
                    {col1Links.map((link, idx) => (
                      <Link
                        key={`${link.label}-${idx}`}
                        href={link.url || '#'}
                        onClick={(e) => {
                          if (!link.url || link.url === '#') {
                            e.preventDefault()
                          }
                        }}
                        target={link.openInNewTab ? '_blank' : undefined}
                        rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                        className="font-['Roboto',sans-serif] font-normal text-[14px] leading-[20.59px] text-white/80 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  {/* Column 2 */}
                  {col2Links.length > 0 && (
                    <div className="flex flex-col gap-2.5">
                      {col2Links.map((link, idx) => (
                        <Link
                          key={`${link.label}-${idx}`}
                          href={link.url || '#'}
                          onClick={(e) => {
                            if (!link.url || link.url === '#') {
                              e.preventDefault()
                            }
                          }}
                          target={link.openInNewTab ? '_blank' : undefined}
                          rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                          className="font-['Roboto',sans-serif] font-normal text-[14px] leading-[20.59px] text-white/80 hover:text-white transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Right Column: Contact Us, Mail Us, Address (from CMS) */}
            {(phone || email || address) && (
              <div className="w-full lg:w-[280px] flex flex-col gap-6 shrink-0">
                {/* Phone */}
                {phone && (
                  <div className="flex items-start gap-4">
                    {/* [OPTION A: STATIC FALLBACK PHONE ICON COMMENTED OUT - uncomment || '/images/phone.svg' below if needed] */}
                    {resolveMediaUrl((footer?.contactInfo as any)?.phoneIcon) && (
                      <div className="w-[38px] h-[38px] shrink-0 flex items-center justify-center pt-0.5">
                        <Image
                          src={resolveMediaUrl((footer?.contactInfo as any)?.phoneIcon)!}
                          alt="Phone"
                          width={38}
                          height={38}
                          unoptimized
                          className="w-[36px] h-[36px] object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-['Roboto',sans-serif] font-bold text-[17px] leading-tight text-white mb-1.5">
                        Contact Us
                      </p>
                      <a
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="font-['Roboto',sans-serif] font-normal text-[15px] leading-[139%] text-white/85 hover:text-white transition-colors"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Email */}
                {email && (
                  <div className="flex items-start gap-4">
                    {/* [OPTION A: STATIC FALLBACK EMAIL ICON COMMENTED OUT - uncomment || '/images/mail.svg' below if needed] */}
                    {resolveMediaUrl((footer?.contactInfo as any)?.emailIcon) && (
                      <div className="w-[38px] h-[38px] shrink-0 flex items-center justify-center pt-0.5">
                        <Image
                          src={resolveMediaUrl((footer?.contactInfo as any)?.emailIcon)!}
                          alt="Email"
                          width={38}
                          height={38}
                          unoptimized
                          className="w-[36px] h-[36px] object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-['Roboto',sans-serif] font-bold text-[17px] leading-tight text-white mb-1.5">
                        Mail Us
                      </p>
                      <a
                        href={`mailto:${email}`}
                        className="font-['Roboto',sans-serif] font-normal text-[15px] leading-[139%] text-white/85 hover:text-white transition-colors"
                      >
                        {email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Address */}
                {address && (
                  <div className="flex items-start gap-4">
                    {/* [OPTION A: STATIC FALLBACK ADDRESS ICON COMMENTED OUT - uncomment || '/images/location.svg' below if needed] */}
                    {resolveMediaUrl((footer?.contactInfo as any)?.addressIcon) && (
                      <div className="w-[38px] h-[38px] shrink-0 flex items-center justify-center pt-0.5">
                        <Image
                          src={resolveMediaUrl((footer?.contactInfo as any)?.addressIcon)!}
                          alt="Location"
                          width={38}
                          height={38}
                          unoptimized
                          className="w-[36px] h-[36px] object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-['Roboto',sans-serif] font-bold text-[17px] leading-tight text-white mb-1.5">
                        Address
                      </p>
                      <p className="font-['Roboto',sans-serif] font-normal text-[15px] leading-[139%] text-white/85 whitespace-pre-line">
                        {address}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Horizontal Divider Line & Copyright Row */}
          <div className="w-full border-t border-white/25 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <p className="font-['Roboto',sans-serif] font-light text-[12px] leading-[16px] text-white/75 text-center sm:text-left">
                {copyright || '© 2026 Mount Zion International School. All Rights Reserved.'}
              </p>

              {/* Legal Links */}
              <div className="flex items-center gap-2 font-['Roboto',sans-serif] font-light text-[12px] leading-[16px] text-white/75">
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <span>|</span>
                <Link href="/terms-conditions" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
