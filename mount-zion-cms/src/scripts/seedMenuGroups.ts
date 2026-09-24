import 'dotenv/config'
import config from '../payload.config'
import { getPayload } from 'payload'

async function seed() {
  console.log('🌱 Starting Menu Groups seeding...')
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // 1. Check if Header Menu Group already exists
    const existingHeaderGroup = await payload.find({
      collection: 'menu-groups',
      where: {
        slug: {
          equals: 'header',
        },
      },
    })

    if (existingHeaderGroup.totalDocs === 0) {
      console.log('Creating default Header Menu Group...')
      await payload.create({
        collection: 'menu-groups',
        data: {
          title: 'Header Navigation',
          slug: 'header',
          description: 'Main navigation menu items shown in the website top header.',
          menus: [
            {
              title: 'Main Navigation',
              menuKey: 'main-nav',
              items: [
                { label: 'Home', linkType: 'custom', customUrl: '/' },
                { label: 'About', linkType: 'custom', customUrl: '#about' },
                { label: 'Academic', linkType: 'custom', customUrl: '#academic' },
                { label: 'Admission', linkType: 'custom', customUrl: '#admission' },
                { label: 'Resources', linkType: 'custom', customUrl: '#resources' },
                { label: 'Student Portal', linkType: 'custom', customUrl: '#portal' },
              ],
            },
          ],
        },
      })
      console.log('✅ Created Header Menu Group!')
    } else {
      console.log('ℹ️ Header Menu Group already exists.')
    }

    // 2. Check if Footer Menu Group already exists
    const existingFooterGroup = await payload.find({
      collection: 'menu-groups',
      where: {
        slug: {
          equals: 'footer',
        },
      },
    })

    if (existingFooterGroup.totalDocs === 0) {
      console.log('Creating default Footer Menu Group...')
      await payload.create({
        collection: 'menu-groups',
        data: {
          title: 'Footer Links',
          slug: 'footer',
          description: 'Quick links and exploratory menus shown in the footer columns.',
          menus: [
            {
              title: 'Quick Links',
              menuKey: 'col-1',
              items: [
                { label: 'Home', linkType: 'custom', customUrl: '/' },
                { label: 'About', linkType: 'custom', customUrl: '#about' },
                { label: 'Academic', linkType: 'custom', customUrl: '#academic' },
                { label: 'Admission', linkType: 'custom', customUrl: '#admission' },
                { label: 'Resources', linkType: 'custom', customUrl: '#resources' },
                { label: 'Student Portal', linkType: 'custom', customUrl: '#portal' },
              ],
            },
            {
              title: 'Explore',
              menuKey: 'col-2',
              items: [
                { label: 'Campus Life', linkType: 'custom', customUrl: '#campus-life' },
                { label: 'Achievements', linkType: 'custom', customUrl: '#achievements' },
                { label: 'Gallery', linkType: 'custom', customUrl: '/gallery' },
                { label: 'News & Events', linkType: 'custom', customUrl: '/news' },
                { label: 'Contact Us', linkType: 'custom', customUrl: '#contact' },
              ],
            },
          ],
        },
      })
      console.log('✅ Created Footer Menu Group!')
    } else {
      console.log('ℹ️ Footer Menu Group already exists.')
    }

    console.log('🎉 Menu Groups seeding finished successfully!')
  } catch (error) {
    console.error('❌ Seeding error:', error)
  }
  process.exit(0)
}

seed()
