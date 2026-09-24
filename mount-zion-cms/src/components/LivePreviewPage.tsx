'use client'

import React from 'react'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { RenderBlocks } from './RenderBlocks'
import type { Page } from '@/payload-types'

export const LivePreviewPage: React.FC<{
  initialPage: Page
}> = ({ initialPage }) => {
  const { data: page } = useLivePreview<Page>({
    initialData: initialPage,
    serverURL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
    depth: 2,
  })

  const pageBgColor = (page as any)?.backgroundColor || '#FFFFFF'
  const bgMedia = (page as any)?.backgroundImage
  const pageBgImg =
    typeof bgMedia === 'object' && bgMedia?.url
      ? bgMedia.url
      : typeof bgMedia === 'string' && bgMedia
        ? bgMedia
        : null

  return (
    <div
      className="w-full transition-colors duration-300 bg-cover bg-center"
      style={{
        backgroundColor: pageBgColor,
        backgroundImage: pageBgImg ? `url(${pageBgImg})` : undefined,
      }}
    >
      <RenderBlocks blocks={page?.layout} />
    </div>
  )
}
