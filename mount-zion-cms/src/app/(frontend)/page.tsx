import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { RenderBlocks } from '@/components/RenderBlocks'
import type { Page } from '@/payload-types'

import { LivePreviewPage } from '@/components/LivePreviewPage'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface HomePageProps {
  searchParams?: Promise<{
    preview?: string
  }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const isPreview = resolvedSearchParams?.preview === 'true'

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const whereClause: any = isPreview
      ? { slug: { equals: 'home' } }
      : {
          and: [
            { slug: { equals: 'home' } },
            { _status: { equals: 'published' } },
          ],
        }

    const pagesResult = await payload.find({
      collection: 'pages',
      where: whereClause,
      draft: isPreview,
      limit: 1,
      depth: 2,
    })

    const homePage = pagesResult.docs?.[0] as Page | undefined

    if (homePage) {
      return <LivePreviewPage initialPage={homePage} />
    }
  } catch (error) {
    console.warn('Could not fetch home page from CMS:', error)
  }

  return (
    <div className="w-full bg-[#f8fafc]">
      <RenderBlocks blocks={[]} />
    </div>
  )
}
