/**
 * Payload CMS Data Contracts & Types
 * 
 * These interfaces match Payload CMS collections, globals, and block definitions.
 * When the backend schema is defined by your friend, the CMS documents can map 
 * 1:1 into these types with zero UI refactoring.
 */

export interface NavDropdownItem {
  label: string
  url: string
}

export interface NavItem {
  id?: string
  label: string
  url: string
  isActive?: boolean
  showExpandIcon?: boolean
  hasDropdown?: boolean
  children?: NavDropdownItem[]
}

export interface HeaderData {
  phone: string
  email: string
  navItems: NavItem[]
}

export interface StatItem {
  id?: string
  number: string
  label: string
  icon?: string
}

export interface StatsStripData {
  useImageFallback?: boolean
  imageSrc?: string
  stats?: StatItem[]
}

export interface HeroData {
  tag: string
  headingLine1: string
  headingLine2: string
  headingLine3: string
  primaryCtaText: string
  primaryCtaLink: string
  secondaryCtaText: string
  secondaryCtaLink: string
  backgroundImage: string
  discoverMoreText?: string
  videoUrl?: string
  logoUrl?: string
  statsData?: StatsStripData
}

export interface SiteSettingsData {
  schoolName: string
  schoolSubtitle: string
  logoUrl: string
  contactPhone: string
  contactEmail: string
  applyNowUrl: string
}
