'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CtaBannerBlockComponent } from '@/components/blocks/CtaBannerBlockComponent'
import type { Footer as FooterType, Media } from '@/payload-types'

export interface FooterComponentProps {
  footer?: FooterType | null
}

export const FooterComponent: React.FC<FooterComponentProps> = ({ footer }) => {
  const resolveMediaUrl = (
    media: number | Media | string | null | undefined,
    fallback: string,
  ): string => {
    if (!media) return fallback
    if (typeof media === 'string' && media.trim()) return media
    if (typeof media === 'object' && media?.url) return media.url
    return fallback
  }

  // Always use the crest emblem Logo 1.png if logo is missing or fallback
  let logoUrl = resolveMediaUrl(footer?.logo, '/images/Logo 1.png')
  if (logoUrl.includes('school-logo.png')) {
    logoUrl = '/images/Logo 1.png'
  }

  // Check if description is missing or is the old placeholder string
  const isOldDescription =
    !footer?.description ||
    footer.description.includes('Empowering students for lifelong success')
  const description = isOldDescription
    ? 'Inspiring Minds. Shaping Futures.\nNurturing Excellence. Building Leaders.'
    : footer.description

  const phone = footer?.contactInfo?.phone || '+9173737 51513'
  const email = footer?.contactInfo?.email || 'cbse@mountzionschools.com'
  const address =
    footer?.contactInfo?.address ||
    'Pilivalam, Lembalakkudi,\nPudukottai - 622507'

  const isOldCopyright =
    !footer?.copyright ||
    footer.copyright.includes('All rights reserved') ||
    footer.copyright.includes('Ac 2026')
  const copyright = isOldCopyright
    ? '© 2026 Mount Zion International School. All Rights Reserved.'
    : footer.copyright

  // Quick links matching exact Layout.md specification & Target Left screenshot
  const col1Links = [
    { label: 'Home', url: '/', active: true },
    { label: 'About', url: '#about' },
    { label: 'Academic', url: '#academic' },
    { label: 'Admission', url: '#admission' },
    { label: 'Resources', url: '#resources' },
    { label: 'Student Portal', url: '#portal' },
  ]

  const col2Links = [
    { label: 'Campus Life', url: '#campus-life' },
    { label: 'Achievements', url: '#achievements' },
    { label: 'Gallery', url: '/gallery' },
    { label: 'News & Events', url: '/news' },
    { label: 'Contact Us', url: '#contact' },
  ]

  const socialIcons = [
    { name: 'facebook', icon: '/images/facebook.png', url: 'https://facebook.com' },
    { name: 'youtube', icon: '/images/youtube.png', url: 'https://youtube.com' },
    { name: 'x', icon: '/images/x.png', url: 'https://x.com' },
    { name: 'linkedin', icon: '/images/linkedin.png', url: 'https://linkedin.com' },
    { name: 'instagram', icon: '/images/instagram.png', url: 'https://instagram.com' },
  ]

  const ctaBannerData = (footer as any)?.ctaBanner
  const showCta = ctaBannerData?.showCtaBanner !== false

  return (
    <div className="w-full">
      {showCta && (
        <CtaBannerBlockComponent
          tagline={ctaBannerData?.tagline}
          heading={ctaBannerData?.heading}
          description={ctaBannerData?.description}
          buttonText={ctaBannerData?.buttonText}
          buttonUrl={ctaBannerData?.buttonUrl}
          backgroundImage={ctaBannerData?.backgroundImage}
        />
      )}
      <footer className="w-full bg-[#03594E] text-white pt-[50px] pb-0">
        <div className="w-full max-w-[1120px] mx-auto px-4 xl:px-0">
        {/* Main Footer Layout (Flex justify-between to perfectly space out 3 blocks across 1120px) */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-8 pb-12 lg:pb-14">
          {/* Left Column: School Logo, Brand Name, Tagline & Social Icons */}
          <div className="w-full lg:w-[330px] flex flex-col items-start shrink-0">
            {/* School Brand (Emblem + Mount Zion + International School - CBSE) */}
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative w-[77px] h-[64px] shrink-0">
                <Image
                  src={logoUrl}
                  alt="Mount Zion Emblem"
                  width={77}
                  height={64}
                  unoptimized
                  className="w-[77px] h-[64px] object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-['K2D',sans-serif] font-extrabold text-[34.2px] leading-[1.0] text-white tracking-tight">
                  Mount Zion
                </h3>
                <p className="font-['Inter',sans-serif] font-medium text-[13.31px] leading-[1.4] text-white tracking-normal mt-1">
                  International School - CBSE
                </p>
              </div>
            </Link>

            {/* Tagline (2 clean lines) */}
            <p className="font-['Roboto',sans-serif] font-normal text-[14px] leading-[20px] text-white/90 whitespace-pre-line mt-5">
              {description}
            </p>

            {/* Social Icons (5 white circular icons) */}
            <div className="flex items-center gap-4 mt-6">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="transition-transform duration-200 hover:scale-115 opacity-95 hover:opacity-100"
                >
                  <div className="relative w-[25px] h-[25px]">
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={25}
                      height={25}
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Middle Column: Quick Links (compact 2-column menu) */}
          <div className="w-full lg:w-[250px] flex flex-col items-start shrink-0">
            <h4 className="font-['Roboto',sans-serif] font-bold text-[20px] leading-[18px] text-white mb-6">
              Quick links
            </h4>
            <div className="flex gap-10 w-full">
              {/* Column 1 */}
              <div className="flex flex-col gap-2.5">
                {col1Links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.url}
                    className={`font-['Roboto',sans-serif] text-[14px] leading-[20.59px] transition-colors duration-200 ${
                      link.active
                        ? 'font-medium text-white'
                        : 'font-normal text-white/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-2.5">
                {col2Links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.url}
                    className="font-['Roboto',sans-serif] font-normal text-[14px] leading-[20.59px] text-white/80 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Us, Mail Us, Address */}
          <div className="w-full lg:w-[280px] flex flex-col gap-6 shrink-0">
            {/* Phone */}
            <div className="flex items-start gap-3.5">
              <div className="w-[32px] h-[32px] shrink-0 flex items-center justify-center pt-0.5">
                <Image
                  src="/images/phone.svg"
                  alt="Phone"
                  width={32}
                  height={32}
                  unoptimized
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-['Roboto',sans-serif] font-bold text-[16px] leading-tight text-white mb-1">
                  Contact Us
                </p>
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="font-['Roboto',sans-serif] font-normal text-[14px] leading-[139%] text-white/85 hover:text-white transition-colors"
                >
                  {phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3.5">
              <div className="w-[32px] h-[26px] shrink-0 flex items-center justify-center pt-1">
                <Image
                  src="/images/mail.svg"
                  alt="Email"
                  width={29}
                  height={23}
                  unoptimized
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-['Roboto',sans-serif] font-bold text-[16px] leading-tight text-white mb-1">
                  Mail Us
                </p>
                <a
                  href={`mailto:${email}`}
                  className="font-['Roboto',sans-serif] font-normal text-[14px] leading-[139%] text-white/85 hover:text-white transition-colors"
                >
                  {email}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3.5">
              <div className="w-[32px] h-[32px] shrink-0 flex items-center justify-center pt-0.5">
                <Image
                  src="/images/location.svg"
                  alt="Location"
                  width={24}
                  height={30}
                  unoptimized
                  className="w-[24px] h-[30px] object-contain"
                />
              </div>
              <div>
                <p className="font-['Roboto',sans-serif] font-bold text-[16px] leading-tight text-white mb-1">
                  Address
                </p>
                <p className="font-['Roboto',sans-serif] font-normal text-[14px] leading-[139%] text-white/85 whitespace-pre-line">
                  {address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Divider Line (1121px wide, border-0.25px white) & Copyright Row */}
        <div className="w-full border-t border-white/25 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="font-['Roboto',sans-serif] font-light text-[12px] leading-[16px] text-white/75 text-center sm:text-left">
              {copyright}
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
