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
  const defaultSrc = activePresetKey === 'school' ? '/images/school-logo.png' : null
  const src = logoUrl || defaultSrc

  // Render Preset Emblem Icon (Used as fallback or in 'icon' variant)
  const renderEmblem = (size = 32) => {
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

    // Default: School Crest / Graduation Cap Emblem
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
        style={{ color: 'var(--brand-accent, #EAB308)', flexShrink: 0 }}
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
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
          width: '24px',
          height: '24px',
          minWidth: '24px',
          minHeight: '24px',
          maxWidth: '24px',
          maxHeight: '24px',
          borderRadius: '6px',
          background: 'linear-gradient(135deg, var(--brand-primary, #03594E), var(--brand-surface, #0f171e))',
          border: '1px solid var(--brand-border, #1e2b36)',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.25)',
          boxSizing: 'border-box',
          flexShrink: 0,
          overflow: 'hidden',
          ...style,
        }}
        title={brandName}
      >
        {renderEmblem(14)}
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
          padding: '6px 0',
          textDecoration: 'none',
          ...style,
        }}
      >
        {!imageError && src ? (
          <div style={{ position: 'relative', height: '42px', minWidth: '42px', display: 'flex', alignItems: 'center' }}>
            <Image
              src={src}
              alt={brandName}
              width={160}
              height={42}
              priority
              unoptimized
              onError={() => setImageError(true)}
              style={{ maxHeight: '42px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--brand-primary, #03594E), var(--brand-surface, #0f171e))',
              border: '1px solid var(--brand-border, #1e2b36)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            {renderEmblem(22)}
          </div>
        )}

        {showText && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: 'var(--brand-text, #f1f5f9)',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              {brandName}
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--brand-accent, #EAB308)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginTop: '2px',
              }}
            >
              {tagline || 'Admin Panel'}
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
