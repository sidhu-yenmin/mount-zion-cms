import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  try {
    const payload = await getPayload({ config })
    console.log('Seeding Header Global...')
    const result = await payload.updateGlobal({
      slug: 'header',
      data: {
        topBar: {
          showTopBar: true,
          phone: '+91 - 9876543210',
          email: 'info@mountzion.com',
        },
        navItems: [
          {
            label: 'Home',
            link: '/',
            isActive: true,
            showExpandIcon: false,
            hasDropdown: false,
          },
          {
            label: 'Our School',
            link: '#about',
            isActive: false,
            showExpandIcon: true,
            hasDropdown: true,
            subItems: [
              { label: 'About Mount Zion', link: '#about' },
              { label: 'Vision & Mission', link: '#vision' },
              { label: 'Leadership', link: '#leadership' },
            ],
          },
          {
            label: 'Education',
            link: '#education',
            isActive: false,
            showExpandIcon: true,
            hasDropdown: true,
            subItems: [
              { label: 'CBSE Curriculum', link: '#curriculum' },
              { label: 'Primary School', link: '#primary' },
              { label: 'Middle School', link: '#middle' },
              { label: 'Senior Secondary', link: '#senior' },
            ],
          },
          {
            label: 'Student Life',
            link: '#student-life',
            isActive: false,
            showExpandIcon: true,
            hasDropdown: true,
            subItems: [
              { label: 'Sports & Athletics', link: '#sports' },
              { label: 'Arts & Culture', link: '#arts' },
              { label: 'Student Clubs', link: '#clubs' },
            ],
          },
          {
            label: 'Admissions',
            link: '#admissions',
            isActive: false,
            showExpandIcon: false,
            hasDropdown: false,
          },
          {
            label: 'Contact',
            link: '#contact',
            isActive: false,
            showExpandIcon: false,
            hasDropdown: false,
          },
        ],
      } as any,
    })
    console.log('Header Global seeded successfully!')
    process.exit(0)
  } catch (err) {
    console.error('Error seeding header global:', err)
    process.exit(1)
  }
}

run()
