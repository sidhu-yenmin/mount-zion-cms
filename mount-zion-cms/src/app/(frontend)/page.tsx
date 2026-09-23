import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { RenderBlocks } from '@/components/RenderBlocks'
import type { Page } from '@/payload-types'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let layout: Page['layout'] = []

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Fetch ONLY published Home page (ignore drafts)
    const pagesResult = await payload.find({
      collection: 'pages',
      where: {
        and: [
          {
            slug: {
              equals: 'home',
            },
          },
          {
            _status: {
              equals: 'published',
            },
          },
        ],
      },
      draft: false,
      limit: 1,
      depth: 2,
    })

    const homePage = pagesResult.docs?.[0] as Page | undefined

    if (homePage?.layout && homePage.layout.length > 0) {
      layout = homePage.layout
    }

    const pageBgColor = (homePage as any)?.backgroundColor || '#f8fafc'
    const bgMedia = (homePage as any)?.backgroundImage
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
        {/* Dynamic Layout Blocks rendered directly from CMS Home Page */}
        <RenderBlocks blocks={layout} />
      </div>
    )
  } catch (error) {
    console.warn('Could not fetch home page from CMS:', error)
  }

  return (
    <div className="w-full bg-[#f8fafc]">
      <RenderBlocks blocks={layout} />
    </div>
  )
}
