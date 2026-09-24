'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { activeTheme, activePresetKey } from '@/theme/themeConfig'

export interface CustomLogoProps {
  logoUrl?: string | null
  brandName?: string
  tagline?: string
  variant?: 'admin' | 'header' | 'footer' | 'icon'
  className?: string
  style?: React.CSSProperties
  showText?: boolean
}

/**
 * Reusable Custom Logo Component
 * Usable across:
 * - Admin Panel (Logo & Collapsed Icon)
 * - Frontend Header, Footer, and Mobile Drawer
 */
export const CustomLogo: React.FC<CustomLogoProps> = ({
  logoUrl,
  brandName = activeTheme.name,
  tagline,
  variant = 'admin',
  className = '',
  style,
  showText = true,
}) => {
  const [imageError, setImageError] = useState(false)

  // Determine default image source (only school uses default school image)
  const defaultSrc = activePresetKey === 'school' ? '/images/Logo 1.png' : null
  const src = logoUrl || defaultSrc

  // Render Preset Emblem Icon (Used as fallback or in 'icon' variant)
  const renderEmblem = (size = 32) => {
    if (activePresetKey === 'sneat') {
      // Sneat curved ribbon S icon with vivid purple-blue gradient
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0 }}
        >
          <path
            d="M22 6C22 6 14 6 10.5 9.5C7 13 7.5 16.5 12 16.5H20C24.5 16.5 25 20 21.5 23.5C18 27 10 27 10 27"
            stroke="url(#sneat-logo-grad)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="sneat-logo-grad" x1="6" y1="5" x2="26" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#787bff" />
              <stop offset="0.6" stopColor="#696cff" />
              <stop offset="1" stopColor="#5558e6" />
            </linearGradient>
          </defs>
        </svg>
      )
    }

    if (activePresetKey === 'restaurant') {
      // Restaurant Fork & Knife / Chef badge
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'var(--brand-accent, #F59E0B)', flexShrink: 0 }}
        >
          <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
          <path d="M15 2v18" />
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
          <path d="M7 2v20" />
        </svg>
      )
    }

    if (activePresetKey === 'shop') {
      // Shopping bag badge
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'var(--brand-accent, #06B6D4)', flexShrink: 0 }}
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      )
    }

    // Mount Zion School Crest & Shield (Default / school)
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <rect width="32" height="32" rx="8" fill="url(#mz-crest-grad)" />
        {/* Shield Outline */}
        <path
          d="M16 5.5L8 8.8V15C8 19.8 11.4 24.2 16 25.5C20.6 24.2 24 19.8 24 15V8.8L16 5.5Z"
          stroke="#EAB308"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Graduation Cap */}
        <path
          d="M16 10.5L10.5 13.2L16 15.9L21.5 13.2L16 10.5Z"
          fill="#EAB308"
        />
        <path
          d="M12.5 14.5V17.5C12.5 18.9 14 20 16 20C18 20 19.5 18.9 19.5 17.5V14.5"
          stroke="#EAB308"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M21.5 13.2V17.8"
          stroke="#EAB308"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="mz-crest-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#03594E" />
            <stop offset="1" stopColor="#01362f" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  // 1. Icon Only Variant (Top Header Breadcrumb & Collapsed Admin Sidebar)
  if (variant === 'icon') {
    return (
      <div
        className={`custom-logo-icon ${className}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          minWidth: '32px',
          minHeight: '32px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #03594E 0%, #013831 100%)',
          border: '1.5px solid rgba(234, 179, 8, 0.45)',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
          boxSizing: 'border-box',
          flexShrink: 0,
          overflow: 'hidden',
          ...style,
        }}
        title="Mount Zion International School"
      >
        <img
          src="/images/Logo 1.png"
          alt="Mount Zion"
          style={{
            height: '24px',
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>
    )
  }

  // 2. Admin Header / Login Variant
  if (variant === 'admin') {
    return (
      <div
        className={`custom-logo-admin ${className}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '4px 0',
          textDecoration: 'none',
          ...style,
        }}
      >
        <div
          className="sneat-school-logo-badge"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #03594E 0%, #013831 100%)',
            padding: '4px',
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            boxShadow: '0 3px 10px rgba(3, 89, 78, 0.35)',
            border: '1.5px solid rgba(234, 179, 8, 0.45)',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          <img
            src="/images/Logo 1.png"
            alt="Mount Zion International School"
            style={{
              height: '30px',
              width: 'auto',
              maxHeight: '32px',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        {showText && (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span
              style={{
                fontSize: '17px',
                fontWeight: 750,
                color: 'var(--brand-text, #0f172a)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                fontFamily: 'var(--brand-font)',
              }}
            >
              Mount Zion
            </span>
            <span
              style={{
                fontSize: '10.5px',
                fontWeight: 700,
                color: 'var(--brand-primary, #03594E)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginTop: '3px',
              }}
            >
              Admin Panel
            </span>
          </div>
        )}
      </div>
    )
  }

  // 3. Frontend Header & Footer Variants
  return (
    <div className={`custom-logo ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', ...style }}>
      {!imageError && src ? (
        <Image
          src={src}
          alt={brandName}
          width={220}
          height={60}
          priority
          unoptimized
          onError={() => setImageError(true)}
          className="h-12 md:h-14 w-auto object-contain"
        />
      ) : (
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 shadow-md">
            {renderEmblem(28)}
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">{brandName}</h1>
            {tagline && <p className="text-xs text-amber-400 font-medium">{tagline}</p>}
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomLogo
