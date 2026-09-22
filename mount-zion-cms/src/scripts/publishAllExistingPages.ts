import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    console.log('🔍 Checking all existing pages in DB...')

    // Query with draft: true to fetch all documents regardless of status
    const allPages = await payload.find({
      collection: 'pages',
      draft: true,
      limit: 100,
      depth: 0,
    })

    console.log(`Found ${allPages.totalDocs} pages in total:`)
    allPages.docs.forEach((doc) => {
      console.log(` - [ID: ${doc.id}] Title: "${doc.title}", Slug: "${doc.slug}", Status: "${(doc as any)._status}"`)
    })

    // Publish all pages that are not published
    for (const doc of allPages.docs) {
      console.log(`Publishing page: "${doc.title}" (slug: ${doc.slug})...`)
      await payload.update({
        collection: 'pages',
        id: doc.id,
        data: {
          _status: 'published',
        } as any,
        draft: false,
      })
      console.log(`✓ Published: "${doc.title}"`)
    }

    console.log('\n🎉 ALL PAGES ARE NOW PUBLISHED AND VISIBLE IN CMS!')
    process.exit(0)
  } catch (err) {
    console.error('Error in publish script:', err)
    process.exit(1)
  }
}

run()
