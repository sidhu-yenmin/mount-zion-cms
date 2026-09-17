import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { HeaderComponent } from '@/components/HeaderComponent'
import { RenderBlocks } from '@/components/RenderBlocks'
import type { Page, Header } from '@/payload-types'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // 1. Fetch Header Global
  let headerData: Header | null = null
  try {
    headerData = await payload.findGlobal({
      slug: 'header',
      depth: 2,
    })
  } catch (e) {
    console.log('Header not found yet')
  }

  // 2. Fetch Page by Slug
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
    <main style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {page.headerVariant !== 'hidden' && <HeaderComponent header={headerData} />}
      <RenderBlocks blocks={page.layout} />
    </main>
  )
}
