'use client'

import React, { useState, useEffect, useRef } from 'react'

interface SearchOption {
  title: string
  category: 'Collection' | 'Global' | 'Action'
  url: string
  hint: string
}

const SEARCH_OPTIONS: SearchOption[] = [
  { title: 'Academic Pages', category: 'Collection', url: '/admin/collections/pages', hint: 'Manage landing & campus pages' },
  { title: 'Campus Media Library', category: 'Collection', url: '/admin/collections/media', hint: 'Photos, videos & PDFs' },
  { title: 'Portal Users & Admins', category: 'Collection', url: '/admin/collections/users', hint: 'CMS staff accounts' },
  { title: 'Main Navigation Menu', category: 'Global', url: '/admin/globals/menu', hint: 'Configure navbar links' },
  { title: 'Header & Admissions Notice', category: 'Global', url: '/admin/globals/header', hint: 'Top banner & admissions' },
  { title: 'Footer & Accreditation', category: 'Global', url: '/admin/globals/footer', hint: 'Address, social links & copyright' },
  { title: 'Site & Brand Settings', category: 'Global', url: '/admin/globals/site-settings', hint: 'School identity & theme' },
]

export const AdminHeaderActions: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [searchQuery, setSearchQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light'
      setTheme(currentTheme as 'light' | 'dark')
    } catch {
      // ignore
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setIsFocused(true)
      } else if (e.key === 'Escape') {
        setIsFocused(false)
        inputRef.current?.blur()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsFocused(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
    try {
      localStorage.setItem('payload-theme', nextTheme)
    } catch {
      // ignore
    }
  }

  const filteredOptions = searchQuery.trim()
    ? SEARCH_OPTIONS.filter((opt) =>
        opt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opt.hint.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SEARCH_OPTIONS

  return (
    <div className="sneat-header-controls">
      {/* Proper, Clean Search Bar */}
      <div
        ref={searchContainerRef}
        className={`sneat-proper-search ${isFocused ? 'focused' : ''}`}
        onClick={() => inputRef.current?.focus()}
      >
        <svg
          className="sneat-search-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search pages, media, settings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="sneat-search-input"
          data-no-clear="true"
          autoComplete="off"
          spellCheck={false}
        />
        <kbd
          className="sneat-search-kbd"
          onClick={(e) => {
            e.stopPropagation()
            inputRef.current?.focus()
            setIsFocused(true)
          }}
        >
          ⌘K
        </kbd>

        {/* Quick Search Suggestions Dropdown */}
        {isFocused && (
          <div className="sneat-search-dropdown">
            <div className="sneat-search-dropdown-header">
              <span>Quick Navigation</span>
              <span className="sneat-search-dropdown-esc">ESC to close</span>
            </div>
            <div className="sneat-search-dropdown-list">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <a
                    key={opt.url}
                    href={opt.url}
                    className="sneat-search-dropdown-item"
                    onMouseDown={(e) => {
                      // Prevent onBlur before click
                      e.preventDefault()
                      window.location.href = opt.url
                    }}
                  >
                    <div className="sneat-search-item-info">
                      <span className="sneat-search-item-title">{opt.title}</span>
                      <span className="sneat-search-item-hint">{opt.hint}</span>
                    </div>
                    <span className={`sneat-search-item-tag ${opt.category.toLowerCase()}`}>
                      {opt.category}
                    </span>
                  </a>
                ))
              ) : (
                <div className="sneat-search-dropdown-empty">
                  No matching section found for &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Header Actions: ONLY Light/Dark Toggle (Account icon rendered by Payload next to this) */}
      <div className="sneat-header-actions-group">
        <button
          type="button"
          onClick={toggleTheme}
          className="sneat-icon-btn theme-toggle"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? (
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

export default AdminHeaderActions
