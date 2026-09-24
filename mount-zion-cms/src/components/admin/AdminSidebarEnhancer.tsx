'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Sneat Admin Sidebar Enhancer
 * Dynamically decorates Payload's admin sidebar with authentic Sneat aesthetics:
 * - Mount Zion School logo badge (school-logo.png) at the top of the sidebar
 * - Floating circular collapse toggle button (<) on the top-right border
 * - Crisp outline SVG icons for each navigation item (persisted across route changes)
 * - Distinct active vs inactive styling (emerald active pill background, emerald icon, right accent bar)
 * - Notification badge (e.g. "5" on Dashboards)
 * - Sneat right chevron (>) indicators for expandable items
 */
export const AdminSidebarEnhancer: React.FC = () => {
  const pathname = usePathname()

  useEffect(() => {
    const applySneatEnhancements = () => {
      const asideNav = document.querySelector('aside.nav') as HTMLElement
      if (!asideNav) return

      // Strip inert attribute so browser never locks out pointer events
      if (asideNav.hasAttribute('inert')) {
        asideNav.removeAttribute('inert')
      }
      ;(asideNav as any).inert = false
      asideNav.classList.add('sneat-nav')
      asideNav.classList.add('nav--nav-open')

      const templateDefault = document.querySelector('.template-default')
      if (templateDefault && !templateDefault.classList.contains('template-default--nav-open')) {
        templateDefault.classList.add('template-default--nav-open')
      }

      // Check saved collapsed state
      const savedCollapsed = typeof window !== 'undefined' && localStorage.getItem('sneat-sidebar-collapsed') === 'true'
      if (savedCollapsed) {
        document.body.classList.add('sneat-sidebar-collapsed')
        asideNav.classList.add('nav--collapsed')
      }

      // 1. Ensure Mount Zion School Logo Badge Header at TOP of sidebar
      let brandHeader = asideNav.querySelector('.sneat-sidebar-brand-header') as HTMLElement
      if (!brandHeader) {
        brandHeader = document.createElement('div')
        brandHeader.className = 'sneat-sidebar-brand-header'
        brandHeader.innerHTML = `
          <a href="/admin" class="sneat-brand-link">
            <div class="sneat-school-logo-badge">
              <img
                src="/images/Logo 1.png"
                alt="Mount Zion International School"
                class="sneat-school-logo-img"
              />
            </div>
            <div class="sneat-brand-text">
              <span class="sneat-brand-title">Mount Zion</span>
              <span class="sneat-brand-subtitle">Admin Panel</span>
            </div>
          </a>
        `
        asideNav.prepend(brandHeader)
      }

      // 2. Ensure circular collapse toggle button inside brand header
      let toggleBtn = brandHeader.querySelector('.sneat-collapse-toggle') as HTMLElement
      if (!toggleBtn) {
        toggleBtn = document.createElement('button')
        toggleBtn.className = 'sneat-collapse-toggle'
        toggleBtn.setAttribute('type', 'button')
        toggleBtn.setAttribute('title', 'Toggle Sidebar')
        toggleBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        `

        toggleBtn.addEventListener('click', (e) => {
          e.preventDefault()
          e.stopPropagation()

          asideNav.removeAttribute('inert')
          ;(asideNav as any).inert = false

          const isCollapsed = document.body.classList.toggle('sneat-sidebar-collapsed')
          asideNav.classList.toggle('nav--collapsed', isCollapsed)

          document.querySelectorAll('.sneat-collapse-toggle').forEach((btn) => {
            ;(btn as HTMLElement).style.transform = isCollapsed
              ? 'translateY(-50%) rotate(180deg)'
              : 'translateY(-50%) rotate(0deg)'
          })

          try {
            localStorage.setItem('sneat-sidebar-collapsed', isCollapsed ? 'true' : 'false')
          } catch {
            // ignore
          }
        })

        brandHeader.appendChild(toggleBtn)
      }

      // Ensure button rotation matches current state
      const isCurrentlyCollapsed = document.body.classList.contains('sneat-sidebar-collapsed')
      toggleBtn.style.transform = isCurrentlyCollapsed ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%) rotate(0deg)'

      // 3. Enhance Nav Links: Remove any legacy inline SVG icons (now handled cleanly by CSS masks)
      const navLinks = asideNav.querySelectorAll('.nav__link')

      navLinks.forEach((link) => {
        const linkEl = link as HTMLElement
        const id = linkEl.id || ''
        const href = linkEl.getAttribute('href') || ''
        const labelEl = linkEl.querySelector('.nav__link-label') as HTMLElement
        const text = (labelEl?.textContent || linkEl.textContent || '').trim().toLowerCase()

        // Clean up any legacy injected SVG icon elements
        const legacyIcon = linkEl.querySelector('.sneat-link-icon')
        if (legacyIcon) {
          legacyIcon.remove()
        }

        // Active State Detection (Payload 3 uses nav__link-indicator or div without href or URL match)
        const hasIndicator = linkEl.querySelector('.nav__link-indicator') !== null
        const isDivLink = linkEl.tagName.toLowerCase() === 'div'
        const isUrlActive =
          (href && href !== '/admin' && pathname.startsWith(href)) ||
          (href === '/admin' && pathname === '/admin')
        const isActive = hasIndicator || isDivLink || isUrlActive

        if (isActive) {
          linkEl.classList.add('sneat-active')
          linkEl.classList.add('active')
        } else {
          linkEl.classList.remove('sneat-active')
          linkEl.classList.remove('active')
        }

        // Notification badge for Dashboards
        if (!linkEl.querySelector('.sneat-badge') && (text.includes('dashboard') || id.includes('dashboard'))) {
          const badge = document.createElement('span')
          badge.className = 'sneat-badge'
          badge.textContent = '5'
          linkEl.appendChild(badge)
        }

        // Right chevron (>) for expandable collections
        const isCollectionOrGroup =
          id.includes('pages') ||
          id.includes('media') ||
          id.includes('users') ||
          text.includes('dashboard') ||
          text.includes('page') ||
          text.includes('user') ||
          text.includes('media')

        if (isCollectionOrGroup && !linkEl.querySelector('.sneat-link-chevron')) {
          const chevron = document.createElement('span')
          chevron.className = 'sneat-link-chevron'
          chevron.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          `
          linkEl.appendChild(chevron)
        }
      })

      // 4. Style Section Group Headers
      const navGroups = asideNav.querySelectorAll('.nav-group')
      navGroups.forEach((group) => {
        const label = group.querySelector('.nav-group__label')
        if (label && !label.classList.contains('sneat-styled')) {
          label.classList.add('sneat-styled')
        }
      })
    }

    // Run immediately on mount and pathname change
    applySneatEnhancements()

    // Observe subtree mutations and attribute changes (like inert) so client-side React rerenders are enhanced immediately
    const observer = new MutationObserver(() => {
      applySneatEnhancements()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['inert', 'class'],
    })

    return () => {
      observer.disconnect()
    }
  }, [pathname])

  return null
}

export default AdminSidebarEnhancer
