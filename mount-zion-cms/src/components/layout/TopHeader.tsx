'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { HeaderData } from '@/types/cms'

interface TopHeaderProps {
  data?: HeaderData & { showTopBar?: boolean }
}

export function TopHeader({ data }: TopHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({})
  const pathname = usePathname()

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Toggle accordion submenu for mobile nav
  const toggleSubmenu = (menuKey: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }))
  }

  // If topbar is explicitly hidden in CMS, do not render
  if (data?.showTopBar === false) {
    return null
  }

  /* =========================================================================
     [OPTION A: STATIC FALLBACK HEADER DATA - COMMENTED OUT]
     const fallbackPhone = '+91 - 9876543210'
     const fallbackEmail = 'info@mountzion.com'
  ========================================================================= */

  const phone = data?.phone || ''
  const email = data?.email || ''
  const navItems = data?.navItems || []

  // If everything is empty and no nav items, return null
  if (!phone && !email && navItems.length === 0) {
    return null
  }

  const topBgColor = data?.backgroundColor || '#EAB308'
  const topTextColor = data?.textColor || '#0F172A'

  return (
    <header
      className="w-full relative z-50 font-['Inter',sans-serif] shadow-xs"
      style={{ backgroundColor: topBgColor, color: topTextColor }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[53px]">
        {/* Left Side: Contact Information */}
        <div className="flex items-center gap-6 sm:gap-8 shrink-0">
          {phone && (
            <a
              href={`tel:${phone.replace(/[\s-]+/g, '')}`}
              className="flex items-center gap-2 hover:opacity-85 transition-opacity whitespace-nowrap text-[#373737]"
            >
              <Image
                src="/images/phone-icon.png"
                alt="Phone"
                width={17}
                height={17}
                className="w-[16.5px] h-[16.5px] object-contain shrink-0"
              />
              <span className="font-['Inter'] font-normal text-[16.67px] leading-none tracking-normal capitalize text-[#373737]">
                {phone}
              </span>
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="hidden md:flex items-center gap-2 hover:opacity-85 transition-opacity whitespace-nowrap text-[#373737]"
            >
              <Image
                src="/images/mail-icon.png"
                alt="Mail"
                width={17}
                height={12}
                className="w-[16.67px] h-[11.67px] object-contain shrink-0"
              />
              <span className="font-['Inter'] font-normal text-[16.67px] leading-none tracking-normal text-[#373737]">
                {email}
              </span>
            </a>
          )}
        </div>

        {/* Desktop Navigation Links */}
        {navItems.length > 0 && (
          <nav className="hidden lg:flex items-center">
            {navItems.map((item, idx) => {
              const isItemActive = Boolean(item.isActive || (item.url !== '#' && pathname === item.url))
              const hasSubmenu = Boolean(item.children && item.children.length > 0)
              const showVectorIcon = Boolean(item.showExpandIcon ?? hasSubmenu)

              if (hasSubmenu) {
                return (
                  <div
                    key={`${item.label}-${idx}`}
                    className="relative group h-[42px] px-[20px] py-[10px] inline-flex items-center justify-center gap-[10px] cursor-pointer select-none"
                  >
                    <Link
                      href={item.url}
                      className={`font-['Inter'] text-[18px] leading-none tracking-normal text-[#0F172A] hover:opacity-80 transition-opacity ${
                        isItemActive ? 'font-bold' : 'font-normal'
                      }`}
                    >
                      {item.label}
                    </Link>

                    {showVectorIcon && (
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[10px] h-[6px] shrink-0 transition-transform duration-200 group-hover:rotate-180"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 1.25L5 5.25L9 1.25"
                          stroke="#0F172A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}

                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-white text-slate-800 shadow-xl rounded-xl py-2 px-2 min-w-[200px] border border-slate-100 z-50 animate-in fade-in-50 duration-150">
                      {item.children?.map((sub, sIdx) => (
                        <Link
                          key={`${sub.label}-${sIdx}`}
                          href={sub.url}
                          className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#0F172A] hover:bg-amber-50 rounded-lg transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <div
                  key={`${item.label}-${idx}`}
                  className="h-[42px] px-[20px] py-[10px] inline-flex items-center justify-center gap-[10px]"
                >
                  <Link
                    href={item.url}
                    className={`font-['Inter'] text-[18px] leading-none tracking-normal text-[#0F172A] hover:opacity-80 transition-opacity ${
                      isItemActive ? 'font-bold' : 'font-normal'
                    }`}
                  >
                    {item.label}
                  </Link>

                  {showVectorIcon && (
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[10px] h-[6px] shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 1.25L5 5.25L9 1.25"
                        stroke="#0F172A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              )
            })}
          </nav>
        )}

        {/* Mobile Hamburger Button */}
        {navItems.length > 0 && (
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-1.5 rounded-md hover:bg-black/10 transition-colors text-[#0F172A]"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Mobile Slide-Over Drawer Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Slide-Over Drawer Panel (Slides from Right) */}
      <aside
        className={`fixed top-0 right-0 bottom-0 h-full w-[290px] sm:w-[320px] max-w-[85vw] bg-[#EAB308] z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out font-['Inter'] lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile Navigation Menu"
      >
        {/* Drawer Header with Title & Close Button */}
        <div className="flex items-center justify-between px-5 h-[53px] border-b border-black/10 shrink-0">
          <span className="font-semibold text-[17px] text-[#0F172A]">Menu</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-full hover:bg-black/10 transition-colors text-[#0F172A]"
            aria-label="Close navigation menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Nav Items List (Scrollable, Submenus Collapsed by Default) */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-1">
          {navItems.map((item, idx) => {
            const isItemActive = Boolean(item.isActive || (item.url !== '#' && pathname === item.url))
            const hasSubmenu = Boolean(item.children && item.children.length > 0)
            const menuKey = `menu-${item.label}-${idx}`
            const isExpanded = Boolean(expandedMenus[menuKey])

            return (
              <div key={`mobile-${item.label}-${idx}`} className="border-b border-black/10 last:border-b-0 pb-1">
                <div className="flex items-center justify-between py-2">
                  {hasSubmenu ? (
                    <button
                      type="button"
                      onClick={() => toggleSubmenu(menuKey)}
                      className={`flex-1 text-left text-[17px] text-[#0F172A] flex items-center justify-between group cursor-pointer ${
                        isItemActive ? 'font-bold' : 'font-medium'
                      }`}
                      aria-expanded={isExpanded}
                    >
                      <span>{item.label}</span>
                      <div
                        className={`p-1 rounded-sm text-[#0F172A] transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : 'rotate-0'
                        }`}
                      >
                        <svg
                          width="12"
                          height="7"
                          viewBox="0 0 10 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-2"
                        >
                          <path
                            d="M1 1.25L5 5.25L9 1.25"
                            stroke="#0F172A"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>
                  ) : (
                    <Link
                      href={item.url}
                      className={`flex-1 text-[17px] text-[#0F172A] py-0.5 ${
                        isItemActive ? 'font-bold' : 'font-medium'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>

                {/* Collapsible Submenu Accordion */}
                {hasSubmenu && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-96 opacity-100 pb-2' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-4 space-y-2 mt-1 border-l-2 border-black/20">
                      {item.children?.map((sub, sIdx) => (
                        <Link
                          key={`mob-sub-${sub.label}-${sIdx}`}
                          href={sub.url}
                          className="block py-1 text-[15px] font-normal text-[#0F172A]/90 hover:text-[#0F172A] transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Drawer Footer Contact Info */}
        {(phone || email) && (
          <div className="p-5 border-t border-black/10 bg-black/[0.03] shrink-0 space-y-2.5 text-sm text-[#373737]">
            {phone && (
              <a
                href={`tel:${phone.replace(/[\s-]+/g, '')}`}
                className="flex items-center gap-2.5 hover:text-[#0F172A] transition-colors"
              >
                <Image
                  src="/images/phone-icon.png"
                  alt="Phone"
                  width={15}
                  height={15}
                  className="w-[15px] h-[15px] object-contain shrink-0"
                />
                <span className="font-medium">{phone}</span>
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2.5 hover:text-[#0F172A] transition-colors"
              >
                <Image
                  src="/images/mail-icon.png"
                  alt="Mail"
                  width={15}
                  height={11}
                  className="w-[15px] h-[11px] object-contain shrink-0"
                />
                <span className="font-medium">{email}</span>
              </a>
            )}
          </div>
        )}
      </aside>
    </header>
  )
}
