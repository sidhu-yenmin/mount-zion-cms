import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/components/RenderBlocks'
import type { Page } from '@/payload-types'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch Page by Slug
  const pagesResult = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 2,
  })

  const page = pagesResult.docs?.[0] as Page | undefined

  if (!page) {
    return notFound()
  }

  return (
    <main className="w-full min-h-screen bg-white">
      <RenderBlocks blocks={page.layout} />
    </main>
  )
}
