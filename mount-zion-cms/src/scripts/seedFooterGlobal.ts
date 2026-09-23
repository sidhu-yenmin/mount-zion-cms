import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  try {
    const payload = await getPayload({ config })
    console.log('Seeding Footer Global with CTA Banner...')
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        ctaBanner: {
          showCtaBanner: true,
          tagline: 'Start your journey',
          heading: 'Towards a brighter future.',
          description:
            'Give your child the right foundation to learn, grow, and achieve their dreams in a nurturing and inspiring environment.',
          button: {
            text: 'Get Started',
            linkType: 'custom',
            customUrl: '/admissions',
          },
        },
        description: 'Inspiring Minds. Shaping Futures.\nNurturing Excellence. Building Leaders.',
        contactInfo: {
          address: 'Pilivalam, Lembalakkudi,\nPudukottai - 622507',
          phone: '+9173737 51513',
          email: 'cbse@mountzionschools.com',
        },
        copyright: '© 2026 Mount Zion International School. All Rights Reserved.',
      },
    })
    console.log('Footer Global seeded successfully!')
    process.exit(0)
  } catch (err) {
    console.error('Error seeding footer global:', err)
    process.exit(1)
  }
}

run()
