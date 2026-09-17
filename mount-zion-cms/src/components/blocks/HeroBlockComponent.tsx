import React from 'react'
import Image from 'next/image'
import type { Page } from '@/payload-types'

type HeroProps = Extract<NonNullable<Page['layout']>[number], { blockType: 'hero' }>

export const HeroBlockComponent: React.FC<HeroProps> = ({
  badge,
  heading,
  backgroundImage,
  primaryButtonText,
  primaryButtonUrl,
  secondaryButtonText,
  secondaryButtonUrl,
  videoUrl,
  stats,
}) => {
  const imageUrl =
    typeof backgroundImage === 'object' && backgroundImage?.url
      ? backgroundImage.url
      : null
  const imageAlt =
    typeof backgroundImage === 'object' && backgroundImage?.alt
      ? backgroundImage.alt
      : 'Hero Background'

  return (
    <section className="hero-section" style={{
      position: 'relative',
      minHeight: '85vh',
      backgroundColor: '#052e16',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '4rem 2rem 2rem 2rem',
      overflow: 'hidden',
    }}>
      {/* Background Graphic / Image */}
      {imageUrl && (
        <div style={{
          position: 'absolute',
          right: '5%',
          bottom: '10%',
          width: '450px',
          height: '450px',
          zIndex: 1,
          opacity: 0.9,
        }}>
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      )}

      {/* Hero Content Left */}
      <div style={{ maxWidth: '650px', zIndex: 2, marginTop: 'auto', marginBottom: 'auto' }}>
        {badge && (
          <div style={{
            display: 'inline-block',
            color: '#facc15',
            fontWeight: 700,
            fontSize: '0.875rem',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
            textTransform: 'uppercase',
          }}>
            {badge} ———
          </div>
        )}

        <h1 style={{
          fontSize: '3rem',
          lineHeight: '1.2',
          fontWeight: 800,
          marginBottom: '1.5rem',
          fontFamily: 'sans-serif',
        }}>
          {heading}
        </h1>

        {/* Buttons Row */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {primaryButtonText && (
            <a
              href={primaryButtonUrl || '#'}
              style={{
                backgroundColor: '#f59e0b',
                color: '#000',
                padding: '0.875rem 2rem',
                borderRadius: '9999px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {primaryButtonText} ↗
            </a>
          )}

          {secondaryButtonText && (
            <a
              href={secondaryButtonUrl || '#'}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(255,255,255,0.4)',
                color: '#fff',
                padding: '0.875rem 2rem',
                borderRadius: '9999px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {secondaryButtonText} ↗
            </a>
          )}

          {videoUrl && (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#facc15',
                textDecoration: 'none',
                marginLeft: '1rem',
                fontWeight: 600,
              }}
            >
              ▶ Discover More
            </a>
          )}
        </div>
      </div>

      {/* Bottom Stats Counter Bar */}
      {stats && stats.length > 0 && (
        <div style={{
          zIndex: 2,
          marginTop: '3rem',
          backgroundColor: 'rgba(6, 78, 59, 0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1.5rem',
          padding: '1.5rem 2rem',
          display: 'grid',
          gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`,
          gap: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '2rem' }}>📖</div>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
