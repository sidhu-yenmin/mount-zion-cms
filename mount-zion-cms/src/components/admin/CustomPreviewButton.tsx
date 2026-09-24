'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'

export const CustomPreviewButton: React.FC = () => {
  const slugField = useFormFields(([fields]) => fields?.slug)
  const slug = (slugField?.value as string) || ''
  const href = slug === 'home' ? '/?preview=true' : slug ? `/${slug}?preview=true` : '/?preview=true'

  const handleOpenPopup = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const width = Math.min(1366, window.screen.availWidth - 80)
    const height = Math.min(860, window.screen.availHeight - 80)
    const left = Math.max(0, (window.screen.availWidth - width) / 2)
    const top = Math.max(0, (window.screen.availHeight - height) / 2)

    window.open(
      href,
      'MountZionPreviewPopup',
      `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no`
    )
  }

  return (
    <a
      href={href}
      onClick={handleOpenPopup}
      id="custom-preview-button"
      className="btn btn--style-secondary btn--size-small"
      title="Preview Page"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '0 12px',
        height: '35px',
        borderRadius: '4px',
        textDecoration: 'none',
        fontWeight: 500,
        fontSize: '13px',
        border: '1px solid var(--theme-elevation-200, #e2e8f0)',
        backgroundColor: 'var(--theme-elevation-50, #ffffff)',
        color: 'var(--theme-elevation-800, #0f172a)',
        cursor: 'pointer',
        boxSizing: 'border-box',
        verticalAlign: 'middle',
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span>Preview</span>
    </a>
  )
}

export default CustomPreviewButton
