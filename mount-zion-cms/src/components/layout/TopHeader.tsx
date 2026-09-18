'use client'

import React, { useState } from 'react'
import { Phone, Mail, ChevronDown, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { HeaderData } from '@/types/cms'

interface TopHeaderProps {
  data?: HeaderData & { showTopBar?: boolean }
}

export function TopHeader({ data }: TopHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // If topbar is hidden in CMS, do not render
  if (data?.showTopBar === false) {
    return null
  }

  const phone = data?.phone || ''
  const email = data?.email || ''
  const navItems = data?.navItems || []

  // If everything is empty and no nav items, return null
  if (!phone && !email && navItems.length === 0) {
    return null
  }

  return (
    <header className="bg-[#f5a623] text-[#1c1917] relative z-40 text-[13px] font-medium transition-colors shadow-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between h-[52px]">
        {/* Left Side: Contact Info */}
        <div className="flex items-center gap-6">
          {phone && (
            <a
              href={`tel:${phone.replace(/[\s-]+/g, '')}`}
              className="flex items-center gap-2 hover:opacity-85 transition-opacity whitespace-nowrap text-[#1a1a1a]"
            >
              <Phone className="w-4 h-4 stroke-[2.2]" />
              <span className="tracking-tight text-[13.5px]">{phone}</span>
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="hidden sm:flex items-center gap-2 hover:opacity-85 transition-opacity whitespace-nowrap text-[#1a1a1a]"
            >
              <Mail className="w-4 h-4 stroke-[2.2]" />
              <span className="tracking-tight text-[13.5px]">{email}</span>
            </a>
          )}
        </div>

        {/* Desktop Navigation Links */}
        {navItems.length > 0 && (
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[13.5px]">
            {navItems.map((item) => {
              const hasDropdown = item.children && item.children.length > 0

              if (hasDropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative group cursor-pointer flex items-center gap-1 hover:text-black transition-colors py-2"
                  >
                    <span className="font-semibold text-neutral-900">{item.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-200 group-hover:rotate-180" />
                    <div className="absolute top-full left-0 mt-0 hidden group-hover:block bg-white text-neutral-800 shadow-xl rounded-xl py-2 px-3 min-w-[180px] border border-neutral-100 z-50">
                      {item.children?.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.url}
                          className="block px-3 py-2 hover:bg-amber-50 rounded-md text-xs font-medium text-neutral-800 hover:text-black"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={item.label}
                  href={item.url}
                  className={`${
                    item.isActive
                      ? 'font-bold text-[#111827]'
                      : 'font-semibold text-neutral-900 hover:text-black'
                  } transition-colors py-2`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        )}

        {/* Mobile Hamburger Button */}
        {navItems.length > 0 && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-md hover:bg-black/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && navItems.length > 0 && (
        <div className="md:hidden bg-[#f5a623] border-t border-black/10 px-6 py-4 space-y-3 font-medium text-sm">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.url}
                className={`block py-1 ${item.isActive ? 'font-bold text-black' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="pl-4 space-y-1 mt-1 border-l-2 border-black/15">
                  {item.children.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.url}
                      className="block py-0.5 text-xs text-neutral-800 hover:text-black"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {(phone || email) && (
            <div className="pt-2 border-t border-black/10 flex flex-col gap-1 text-xs">
              {phone && (
                <span className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" /> {phone}
                </span>
              )}
              {email && (
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> {email}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  )
}
