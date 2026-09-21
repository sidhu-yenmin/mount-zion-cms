'use client'

import React, { useState } from 'react'
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
  const pathname = usePathname()

  // If topbar is explicitly hidden in CMS, do not render
  if (data?.showTopBar === false) {
    return null
  }

  const phone = data?.phone || '+91 - 9876543210'
  const email = data?.email || 'info@mountzion.com'
  const navItems = data?.navItems || []

  // If everything is empty and no nav items, return null
  if (!phone && !email && navItems.length === 0) {
    return null
  }

  return (
    <header className="w-full bg-[#EAB308] text-[#0F172A] relative z-50 font-['Inter',sans-serif] shadow-xs">
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
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-md hover:bg-black/10 transition-colors text-[#0F172A]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && navItems.length > 0 && (
        <div className="lg:hidden bg-[#EAB308] border-t border-black/10 px-6 py-4 space-y-3 font-['Inter']">
          {navItems.map((item, idx) => {
            const isItemActive = Boolean(item.isActive || (item.url !== '#' && pathname === item.url))
            const showVectorIcon = Boolean(item.showExpandIcon ?? (item.children && item.children.length > 0))

            return (
              <div key={`mobile-${item.label}-${idx}`}>
                <div className="flex items-center justify-between py-1.5">
                  <Link
                    href={item.url}
                    className={`text-[17px] text-[#0F172A] ${isItemActive ? 'font-bold' : 'font-normal'}`}
                    onClick={() => setMobileMenuOpen(false)}
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

                {item.children && item.children.length > 0 && (
                  <div className="pl-4 space-y-1.5 mt-1 border-l-2 border-black/15">
                    {item.children.map((sub, sIdx) => (
                      <Link
                        key={`mob-sub-${sub.label}-${sIdx}`}
                        href={sub.url}
                        className="block py-1 text-sm font-medium text-slate-800 hover:text-[#0F172A]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          {(phone || email) && (
            <div className="pt-3 border-t border-black/15 flex flex-col gap-2 text-sm text-[#373737]">
              {phone && (
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/phone-icon.png"
                    alt="Phone"
                    width={15}
                    height={15}
                    className="w-[15px] h-[15px] object-contain"
                  />
                  <span>{phone}</span>
                </div>
              )}
              {email && (
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/mail-icon.png"
                    alt="Mail"
                    width={15}
                    height={11}
                    className="w-[15px] h-[11px] object-contain"
                  />
                  <span>{email}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  )
}
