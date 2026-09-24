import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    console.log('🚀 Publishing Globals (Header, Footer, Menu)...')

    // 1. Publish Header
    await payload.updateGlobal({
      slug: 'header',
      data: {
        _status: 'published',
      } as any,
      draft: false,
    })
    console.log('✓ Header global published!')

    // 2. Publish Footer
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        _status: 'published',
      } as any,
      draft: false,
    })
    console.log('✓ Footer global published!')

    // 3. Publish Theme
    await payload.updateGlobal({
      slug: 'theme',
      data: {
        _status: 'published',
      } as any,
      draft: false,
    })
    console.log('✓ Theme global published!')

    console.log('\n🎉 ALL GLOBALS ARE PUBLISHED!')
    process.exit(0)
  } catch (err) {
    console.error('Error publishing globals:', err)
    process.exit(1)
  }
}

run()
