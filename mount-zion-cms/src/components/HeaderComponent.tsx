import React from 'react'
import Image from 'next/image'
import { resolveLinkUrl } from '@/utils/resolveLink'
import type { Header as HeaderType } from '@/payload-types'

export const HeaderComponent: React.FC<{ header?: HeaderType | null }> = ({ header }) => {
  if (!header) return null

  console.log('Header logo prop:', header.logo)

  let logoUrl: string | null = null
  let logoAlt = 'Mount Zion School Logo'

  if (typeof header.logo === 'object' && header.logo !== null) {
    logoUrl = header.logo.url || null
    logoAlt = header.logo.alt || logoAlt
  }

  return (
    <header style={{ width: '100%', position: 'sticky', top: 0, zIndex: 50 }}>
      {/* Top Bar */}
      {header.topBar?.showTopBar && (
        <div style={{
          backgroundColor: '#facc15',
          color: '#000',
          padding: '0.4rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.85rem',
          fontWeight: 600,
        }}>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {header.topBar?.phone && <span>📞 {header.topBar.phone}</span>}
            {header.topBar?.email && <span>✉️ {header.topBar.email}</span>}
          </div>
          <div>
            <span>Welcome to Mount Zion International School</span>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav style={{
        backgroundColor: '#022c22',
        color: '#ffffff',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        {/* Logo or School Title */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#fff' }}>
          {logoUrl ? (
            <div style={{ position: 'relative', height: '48px', width: '220px' }}>
              <Image
                src={logoUrl}
                alt={logoAlt}
                fill
                style={{ objectFit: 'contain', objectPosition: 'left' }}
                priority
              />
            </div>
          ) : (
            <div style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '0.05em' }}>
              🏫 MOUNT ZION
            </div>
          )}
        </a>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {(header as any).navItems && (header as any).navItems.length > 0 ? (
            (header as any).navItems.map((item: any, idx: number) => (
              <a
                key={idx}
                href={item.link || item.url || '#'}
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                }}
              >
                {item.label}
              </a>
            ))
          ) : (
            <>
              <a href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>Home</a>
              <a href="/about" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>Our School</a>
              <a href="/academics" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>Education</a>
              <a href="/admissions" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>Admissions</a>
              <a href="/contact" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}>Contact</a>
            </>
          )}

          {(((header as any)?.ctaButton)?.text || ((header as any)?.ctaButton)?.label) && (
            <a
              href={resolveLinkUrl((header as any)?.ctaButton, '#')}
              target={((header as any)?.ctaButton)?.openInNewTab ? '_blank' : undefined}
              rel={((header as any)?.ctaButton)?.openInNewTab ? 'noopener noreferrer' : undefined}
              style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                padding: '0.6rem 1.25rem',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.9rem',
                textDecoration: 'none',
              }}
            >
              {(((header as any)?.ctaButton)?.text || ((header as any)?.ctaButton)?.label)} ↗
            </a>
          )}
        </div>
      </nav>
    </header>
  )
}
