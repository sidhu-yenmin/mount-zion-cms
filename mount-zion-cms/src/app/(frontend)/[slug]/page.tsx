import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { LivePreviewPage } from '@/components/LivePreviewPage'
import type { Page } from '@/payload-types'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface PageProps {
  params: Promise<{
    slug: string
  }>
  searchParams?: Promise<{
    preview?: string
  }>
}

export default async function DynamicPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const isPreview = resolvedSearchParams?.preview === 'true'

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const whereClause: any = isPreview
    ? { slug: { equals: slug } }
    : {
        and: [
          { slug: { equals: slug } },
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

  const page = pagesResult.docs?.[0] as Page | undefined

  if (!page) {
    return notFound()
  }

  return <LivePreviewPage initialPage={page} />
}
