'use client'

import React from 'react'

export const AdminDashboardOverview: React.FC = () => {
  return (
    <div className="school-dashboard-container">
      {/* 1. Executive Mount Zion School Hero Banner */}
      <div className="school-executive-banner">
        <div className="school-banner-left">
          <div className="school-banner-badge">
            <span className="school-live-pulse"></span>
            <span>ACADEMIC SESSION 2026–2027 • CBSE AFFILIATED</span>
          </div>

          <h1 className="school-banner-title">
            Mount Zion <span className="school-banner-gold">International School</span>
          </h1>
          <p className="school-banner-subtitle">
            Central Management Portal for website pages, admissions notices, campus media galleries, and branding settings.
          </p>

          {/* Quick Metrics Bar directly inside the hero banner */}
          <div className="school-banner-metrics">
            <div className="school-banner-metric-item">
              <span className="metric-val">8</span>
              <span className="metric-lbl">Active Pages</span>
            </div>
            <div className="school-banner-metric-divider"></div>
            <div className="school-banner-metric-item">
              <span className="metric-val">142</span>
              <span className="metric-lbl">Media Assets</span>
            </div>
            <div className="school-banner-metric-divider"></div>
            <div className="school-banner-metric-item">
              <span className="metric-val">3</span>
              <span className="metric-lbl">Administrators</span>
            </div>
            <div className="school-banner-metric-divider"></div>
            <div className="school-banner-metric-item">
              <span className="metric-val green">100%</span>
              <span className="metric-lbl">Live &amp; Synced</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="school-banner-actions">
            <a href="/admin/collections/pages/create" className="school-btn-primary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Create New Page
            </a>
            <a href="/admin/collections/media/create" className="school-btn-glass">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              Upload Media
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer" className="school-btn-glass">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              View Live Website
            </a>
          </div>
        </div>

        {/* Right Visual Crest with Golden Framing */}
        <div className="school-banner-right">
          <div className="school-crest-container">
            <div className="school-crest-inner">
              <img
                src="/images/Logo 1.png"
                alt="Mount Zion International School Crest"
                className="school-crest-image"
              />
            </div>
            <span className="school-crest-tag">ADMIN PORTAL</span>
          </div>
        </div>
      </div>

      {/* 2. Advanced School Operations Modules Grid */}
      <div className="school-modules-grid">
        
        {/* Module 1: Academic Website Pages Hub */}
        <div className="school-module-card">
          <div className="school-module-top">
            <div className="school-module-icon-box emerald">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
            </div>
            <span className="school-module-pill emerald">8 Sections Live</span>
          </div>

          <h3 className="school-module-title">Academic &amp; Campus Pages</h3>
          <p className="school-module-subtitle">Landing page structure &amp; content blocks</p>

          {/* Structured Live Section Indicators */}
          <div className="school-section-list">
            <div className="school-section-row">
              <span className="sec-dot green"></span>
              <span className="sec-name">Home &amp; Hero Notice</span>
              <span className="sec-status">Admissions Active</span>
            </div>
            <div className="school-section-row">
              <span className="sec-dot green"></span>
              <span className="sec-name">Academic Programs</span>
              <span className="sec-status">CBSE Curricula</span>
            </div>
            <div className="school-section-row">
              <span className="sec-dot green"></span>
              <span className="sec-name">Campus Facilities</span>
              <span className="sec-status">18 Photo Spots</span>
            </div>
            <div className="school-section-row">
              <span className="sec-dot green"></span>
              <span className="sec-name">Board Exam Toppers</span>
              <span className="sec-status">Honors Updated</span>
            </div>
          </div>

          <div className="school-module-footer">
            <a href="/admin/collections/pages" className="school-module-link">
              Manage All Pages
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </a>
            <a href="/admin/collections/pages/create" className="school-module-add-btn" title="Create Page">
              +
            </a>
          </div>
        </div>

        {/* Module 2: Media & Campus Assets Vault */}
        <div className="school-module-card">
          <div className="school-module-top">
            <div className="school-module-icon-box blue">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <span className="school-module-pill blue">1.4 GB / 5 GB</span>
          </div>

          <h3 className="school-module-title">Campus Media Library</h3>
          <p className="school-module-subtitle">High-res photos, videos &amp; school PDFs</p>

          {/* Visual Storage Bar Breakdown */}
          <div className="school-storage-container">
            <div className="school-storage-bar">
              <div className="storage-seg photos" style={{ width: '65%' }} title="Campus Photos: 65%"></div>
              <div className="storage-seg docs" style={{ width: '22%' }} title="Brochures & PDFs: 22%"></div>
              <div className="storage-seg logos" style={{ width: '13%' }} title="Logos & Brand: 13%"></div>
            </div>
            <div className="school-storage-legend">
              <span className="leg-item"><span className="leg-dot photos"></span>Photos (65%)</span>
              <span className="leg-item"><span className="leg-dot docs"></span>PDFs (22%)</span>
              <span className="leg-item"><span className="leg-dot logos"></span>Brand (13%)</span>
            </div>
          </div>

          {/* Recent Assets Badges */}
          <div className="school-assets-recent">
            <span className="asset-chip">📷 campus-facade.jpg</span>
            <span className="asset-chip">📄 prospectus-2026.pdf</span>
          </div>

          <div className="school-module-footer">
            <a href="/admin/collections/media" className="school-module-link">
              Browse Asset Library
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </a>
            <a href="/admin/collections/media/create" className="school-module-add-btn" title="Upload Media">
              +
            </a>
          </div>
        </div>

        {/* Module 3: Navigation, Menu & Portals */}
        <div className="school-module-card">
          <div className="school-module-top">
            <div className="school-module-icon-box amber">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </div>
            <span className="school-module-pill amber">4 Channels</span>
          </div>

          <h3 className="school-module-title">Navigation &amp; Portals</h3>
          <p className="school-module-subtitle">Header navbar, menu drawer &amp; campus footer</p>

          {/* Interactive Channel Status Items */}
          <div className="school-channel-list">
            <a href="/admin/globals/menu" className="school-channel-item">
              <div className="channel-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
              </div>
              <div className="channel-info">
                <span className="channel-title">Main Nav Menu</span>
                <span className="channel-sub">7 Links • 2 Dropdowns</span>
              </div>
              <span className="channel-arrow">→</span>
            </a>

            <a href="/admin/globals/header" className="school-channel-item">
              <div className="channel-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                </svg>
              </div>
              <div className="channel-info">
                <span className="channel-title">Top Header &amp; Notice</span>
                <span className="channel-sub">Admissions 2026-27 Active</span>
              </div>
              <span className="channel-arrow">→</span>
            </a>

            <a href="/admin/globals/footer" className="school-channel-item">
              <div className="channel-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                  <line x1="3" y1="15" x2="21" y2="15"></line>
                </svg>
              </div>
              <div className="channel-info">
                <span className="channel-title">Footer &amp; Accreditation</span>
                <span className="channel-sub">Campus Address &amp; Socials</span>
              </div>
              <span className="channel-arrow">→</span>
            </a>
          </div>

          <div className="school-module-footer">
            <span className="school-module-meta">Click any channel to edit live</span>
          </div>
        </div>

        {/* Module 4: School Brand & Theme Settings */}
        <div className="school-module-card">
          <div className="school-module-top">
            <div className="school-module-icon-box purple">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </div>
            <span className="school-module-pill purple">Active Theme</span>
          </div>

          <h3 className="school-module-title">Identity &amp; Brand Styling</h3>
          <p className="school-module-subtitle">Official colors, contact helpline &amp; socials</p>

          {/* School Brand Color Swatches */}
          <div className="school-theme-swatches-row">
            <span className="swatch-label">Brand Palette:</span>
            <div className="swatches-group">
              <span className="swatch emerald" title="Mount Zion Green (#03594E)"></span>
              <span className="swatch gold" title="Academic Gold (#EAB308)"></span>
              <span className="swatch white" title="Pure White (#FFFFFF)"></span>
              <span className="swatch dark" title="Charcoal Slate (#0F172A)"></span>
            </div>
          </div>

          {/* School Contact Verification Details */}
          <div className="school-identity-box">
            <div className="identity-row">
              <span className="id-key">Affiliation:</span>
              <span className="id-val">CBSE Curriculum</span>
            </div>
            <div className="identity-row">
              <span className="id-key">Admission Line:</span>
              <span className="id-val">+91 94431 00000</span>
            </div>
            <div className="identity-row">
              <span className="id-key">Campus Location:</span>
              <span className="id-val">Pudukkottai, TN</span>
            </div>
          </div>

          <div className="school-module-footer">
            <a href="/admin/globals/theme-settings" className="school-module-link">
              Configure Theme
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* 3. Operational Quick Action Notice Strip */}
      <div className="school-operations-strip">
        <div className="strip-item">
          <span className="strip-badge-dot alert"></span>
          <div className="strip-text">
            <span className="strip-title">Admissions 2026–2027 Open Banner</span>
            <span className="strip-desc">Top announcement marquee is currently published on the live homepage.</span>
          </div>
          <a href="/admin/globals/header" className="strip-link-btn">Edit Notice</a>
        </div>

        <div className="strip-divider"></div>

        <div className="strip-item">
          <span className="strip-badge-dot success"></span>
          <div className="strip-text">
            <span className="strip-title">Board Exam Toppers Published</span>
            <span className="strip-desc">Academic excellence honors list is active with student scores.</span>
          </div>
          <a href="/admin/collections/pages" className="strip-link-btn">Review Pages</a>
        </div>

        <div className="strip-divider"></div>

        <div className="strip-item">
          <span className="strip-badge-dot info"></span>
          <div className="strip-text">
            <span className="strip-title">Sharp Media Image Engine</span>
            <span className="strip-desc">All uploaded campus imagery is automatically compressed to WebP.</span>
          </div>
          <a href="/admin/collections/media" className="strip-link-btn">Media Library</a>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardOverview
