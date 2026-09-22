import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    console.log('🎨 Seeding and Publishing Theme Settings Global...')

    // Find existing logo in media collection
    const mediaDocs = await payload.find({
      collection: 'media',
      limit: 100,
    })

    let logoId: number | string | undefined = undefined
    const logoMedia = mediaDocs.docs.find(
      (m: any) =>
        m.filename?.toLowerCase().includes('logo') ||
        m.alt?.toLowerCase().includes('logo')
    )
    if (logoMedia) {
      logoId = logoMedia.id
    }

    // Initialize & publish theme global
    await payload.updateGlobal({
      slug: 'theme',
      data: {
        siteName: 'Mount Zion International School',
        tagline: 'Inspiring Minds. Shaping Futures.',
        logo: logoId || null,
        footerLogo: logoId || null,
        headingFont: 'Plus Jakarta Sans',
        bodyFont: 'Plus Jakarta Sans',
        baseFontSize: '16px',
        headingWeight: '700',
        primaryColor: '#03594E',
        accentColor: '#EAB308',
        backgroundColor: '#F8FAFC',
        textColor: '#0F172A',
        headerNavBackground: '#022C22',
        footerBackground: '#03594E',
        _status: 'published',
      } as any,
      draft: false,
    })

    console.log('🎉 Theme Settings Global successfully seeded and published!')
    process.exit(0)
  } catch (err) {
    console.error('Error seeding theme settings:', err)
    process.exit(1)
  }
}

run()
