import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    console.log('🚀 Seeding Page Relationship Links for All Buttons...')

    // 1. Fetch all CMS pages to get their IDs
    const pagesResult = await payload.find({
      collection: 'pages',
      limit: 100,
      draft: true,
    })

    const homePage = pagesResult.docs.find((p: any) => p.slug === 'home')
    const aboutPage = pagesResult.docs.find((p: any) => p.slug === 'about-us' || p.slug === 'about')
    const academicsPage = pagesResult.docs.find((p: any) => p.slug === 'academics')

    const homeId = homePage?.id
    const aboutId = aboutPage?.id || homeId
    const academicsId = academicsPage?.id || homeId

    console.log(`Found Pages -> Home: ${homeId}, About Us: ${aboutId}, Academics: ${academicsId}`)

    // 2. Update Home Page blocks with page relationships
    if (homePage) {
      const updatedLayout = (homePage.layout || []).map((block: any) => {
        if (block.blockType === 'hero') {
          return {
            ...block,
            primaryButton: {
              text: 'Explore',
              linkType: 'page',
              page: aboutId,
              customUrl: '/about',
              openInNewTab: false,
            },
            secondaryButton: {
              text: 'Admission',
              linkType: 'page',
              page: academicsId,
              customUrl: '/admissions',
              openInNewTab: false,
            },
          }
        }
        if (block.blockType === 'aboutUs') {
          return {
            ...block,
            button: {
              text: 'Know More',
              linkType: 'page',
              page: aboutId,
              customUrl: '/about',
              openInNewTab: false,
            },
          }
        }
        if (block.blockType === 'programs') {
          return {
            ...block,
            button: {
              text: 'Explore Academics',
              linkType: 'page',
              page: academicsId,
              customUrl: '/academics',
              openInNewTab: false,
            },
          }
        }
        if (block.blockType === 'campusLife') {
          return {
            ...block,
            viewMoreButton: {
              text: 'View More',
              linkType: 'page',
              page: aboutId,
              customUrl: '/gallery',
              openInNewTab: false,
            },
            ctaBar: {
              ...block.ctaBar,
              button: {
                text: 'Apply Now',
                linkType: 'page',
                page: academicsId,
                customUrl: '/admissions',
                openInNewTab: false,
              },
            },
          }
        }
        if (block.blockType === 'newsEvents') {
          return {
            ...block,
            exploreMoreButton: {
              text: 'Explore More',
              linkType: 'page',
              page: academicsId,
              customUrl: '/news',
              openInNewTab: false,
            },
          }
        }
        if (block.blockType === 'ctaBanner') {
          return {
            ...block,
            button: {
              text: 'Get Started',
              linkType: 'page',
              page: academicsId,
              customUrl: '/admissions',
              openInNewTab: false,
            },
          }
        }
        return block
      })

      await payload.update({
        collection: 'pages',
        id: homePage.id,
        data: {
          layout: updatedLayout,
          _status: 'published',
        } as any,
        draft: false,
      })
      console.log('✓ Home page buttons updated & published!')
    }

    // 3. Update Header Global ctaButton
    await payload.updateGlobal({
      slug: 'header',
      data: {
        ctaButton: {
          text: 'Apply Now',
          linkType: 'page',
          page: academicsId,
          customUrl: '/admissions',
          openInNewTab: false,
        },
        _status: 'published',
      } as any,
      draft: false,
    })
    console.log('✓ Header CTA button updated & published!')

    // 4. Update Footer Global ctaBanner button
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        ctaBanner: {
          button: {
            text: 'Get Started',
            linkType: 'page',
            page: academicsId,
            customUrl: '/admissions',
            openInNewTab: false,
          },
        },
        _status: 'published',
      } as any,
      draft: false,
    })
    console.log('✓ Footer CTA Banner button updated & published!')

    console.log('\n🎉 ALL BUTTONS SUCCESSFULLY LINKED TO CMS PAGES & PUBLISHED!')
    process.exit(0)
  } catch (err) {
    console.error('Error seeding buttons:', err)
    process.exit(1)
  }
}

run()
