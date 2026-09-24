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

    // 3. Menu Groups
    const menuGroups = await payload.find({
      collection: 'menu-groups',
      draft: true,
      limit: 100,
    })
    console.log(`\n📂 [MENU GROUPS Collection] - Total: ${menuGroups.totalDocs}`)
    menuGroups.docs.forEach((mg, idx) => {
      console.log(`  ${idx + 1}. Title: "${mg.title}" | Slug: "${mg.slug}" | Menus count: ${(mg as any).menus?.length || 0}`)
    })

    // 4. Globals
    const header = await payload.findGlobal({ slug: 'header', draft: true })
    const footer = await payload.findGlobal({ slug: 'footer', draft: true })
    const theme = await payload.findGlobal({ slug: 'theme', draft: true })

    console.log(`\n🌐 [GLOBALS]`)
    console.log(`  - Header: Phone "${header?.topBar?.phone || ''}" | Status: ${(header as any)._status || 'published'}`)
    console.log(`  - Footer: Contact "${footer?.contactInfo?.phone || ''}" | Status: ${(footer as any)._status || 'published'}`)
    console.log(`  - Theme: Primary Color "${(theme as any)?.primaryColor || ''}" | Heading Font: "${(theme as any)?.headingFont || ''}"`)

    console.log('\n======================================')
    process.exit(0)
  } catch (err) {
    console.error('Error checking DB:', err)
    process.exit(1)
  }
}

run()
