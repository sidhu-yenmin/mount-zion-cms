import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    console.log('📊 ====== DATABASE STATUS REPORT ======')

    // 1. Pages
    const pages = await payload.find({
      collection: 'pages',
      draft: true,
      limit: 100,
    })
    console.log(`\n📄 [PAGES Collection] - Total: ${pages.totalDocs}`)
    pages.docs.forEach((p, idx) => {
      console.log(`  ${idx + 1}. Title: "${p.title}" | Slug: "${p.slug}" | Status: "${(p as any)._status}" | Blocks: ${p.layout?.length || 0}`)
    })

    // 2. Media
    const media = await payload.find({
      collection: 'media',
      limit: 100,
    })
    console.log(`\n🖼️ [MEDIA Collection] - Total: ${media.totalDocs} uploaded files`)

    // 3. Globals
    const menu = await payload.findGlobal({ slug: 'menu', draft: true })
    const header = await payload.findGlobal({ slug: 'header', draft: true })
    const footer = await payload.findGlobal({ slug: 'footer', draft: true })

    console.log(`\n🌐 [GLOBALS]`)
    console.log(`  - Menu: ${(menu as any)?.menuItems?.length || 0} navigation items | Status: ${(menu as any)._status || 'published'}`)
    console.log(`  - Header: Phone "${header?.topBar?.phone || ''}" | Status: ${(header as any)._status || 'published'}`)
    console.log(`  - Footer: Contact "${footer?.contactInfo?.phone || ''}" | ${(footer?.quickLinks || []).length} Quick Links | ${(footer?.socialLinks || []).length} Social Links | Status: ${(footer as any)._status || 'published'}`)

    console.log('\n======================================')
    process.exit(0)
  } catch (err) {
    console.error('Error checking DB:', err)
    process.exit(1)
  }
}

run()
