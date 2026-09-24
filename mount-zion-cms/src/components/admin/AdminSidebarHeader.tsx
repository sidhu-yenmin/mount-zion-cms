'use client'

import React from 'react'

export const AdminSidebarHeader: React.FC = () => {
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('sneat-sidebar-collapsed')
      if (saved === 'true') {
        document.body.classList.add('sneat-sidebar-collapsed')
        const aside = document.querySelector('aside.nav')
        if (aside) {
          aside.classList.add('nav--collapsed')
        }
      }
    } catch {
      // ignore
    }
  }, [])

  const toggleNav = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const aside = document.querySelector('aside.nav') as HTMLElement
    if (aside) {
      aside.removeAttribute('inert')
      ;(aside as any).inert = false
    }

    const isCollapsed = document.body.classList.toggle('sneat-sidebar-collapsed')
    if (aside) {
      aside.classList.toggle('nav--collapsed', isCollapsed)
    }

    try {
      localStorage.setItem('sneat-sidebar-collapsed', isCollapsed ? 'true' : 'false')
    } catch {
      // ignore
    }
  }

  return (
    <div className="sneat-sidebar-brand-header">
      <a href="/admin" className="sneat-brand-link">
        <div className="sneat-school-logo-badge">
          <img
            src="/images/Logo 1.png"
            alt="Mount Zion International School"
            className="sneat-school-logo-img"
          />
        </div>
        <div className="sneat-brand-text">
          <span className="sneat-brand-title">Mount Zion</span>
          <span className="sneat-brand-subtitle">Admin Panel</span>
        </div>
      </a>
      <button
        type="button"
        className="sneat-collapse-toggle"
        title="Toggle Sidebar"
        onClick={toggleNav}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
    </div>
  )
}

export default AdminSidebarHeader
