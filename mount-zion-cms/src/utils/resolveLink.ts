/**
 * Resolves a CMS link object (or legacy string URL) to a valid URL string.
 * Supports:
 * - CMS Page relationship (extracts page slug: 'home' -> '/', 'about-us' -> '/about-us')
 * - Custom URL or Anchor (#about, https://...)
 * - Fallback string URLs
 */
export function resolveLinkUrl(
  linkObj:
    | {
        linkType?: string | null
        page?: any
        customUrl?: string | null
        url?: string | null
      }
    | string
    | undefined
    | null,
  fallback: string = '/'
): string {
  if (!linkObj) return fallback

  // If already a plain string URL (legacy or direct)
  if (typeof linkObj === 'string') {
    return linkObj.trim() || fallback
  }

  // If linkType is page relationship
  if (linkObj.linkType === 'page' && linkObj.page) {
    const pageObj = typeof linkObj.page === 'object' ? linkObj.page : null
    const slug = pageObj?.slug || ''
    if (slug === 'home' || slug === '') return '/'
    return `/${slug}`
  }

  // If custom URL / anchor
  if (linkObj.customUrl && typeof linkObj.customUrl === 'string') {
    return linkObj.customUrl.trim() || fallback
  }

  if (linkObj.url && typeof linkObj.url === 'string') {
    return linkObj.url.trim() || fallback
  }

  return fallback
}
