import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    console.log('🚀 Creating and Publishing About Us and Academics Pages...')

    // Helper to get media by alt
    async function getMediaId(altText: string) {
      const res = await payload.find({
        collection: 'media',
        where: { alt: { equals: altText } },
        limit: 1,
      })
      return res.docs[0]?.id || null
    }

    const studentImgId = await getMediaId('Why Mount Zion Student')
    const classroomImgId = await getMediaId('Why Mount Zion Classroom')
    const sunIconId = await getMediaId('Sunburst Badge Icon')
    const gradIconId = await getMediaId('Graduation Cap Stat Icon')
    const ideaIconId = await getMediaId('Experience Idea Stat Icon')

    const progImg1Id = await getMediaId('Academic Program Class 1')
    const progImg2Id = await getMediaId('Academic Program Class 2')
    const academicsBgColorId = await getMediaId('Academics Green Texture')

    const facility1Id = await getMediaId('Campus Classroom Facility')
    const facility2Id = await getMediaId('Campus Sports & Staircase Facility')

    // 1. Create/Update About Us Page
    const existingAbout = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'about-us' } },
      draft: true,
      limit: 1,
    })

    const aboutUsBlocks: any[] = [
      {
        blockType: 'aboutUs',
        hideSection: false,
        badge: 'ABOUT MOUNT ZION',
        heading: 'Inspiring Minds. Shaping Futures. Building Leaders.',
        backgroundColor: '#FFFFFF',
        description:
          'Mount Zion International School is dedicated to nurturing future global leaders through world-class holistic education, modern facilities, character building, and innovation.',
        buttonText: 'Explore Academics',
        buttonUrl: '/academics',
        imageOne: studentImgId,
        imageTwo: classroomImgId,
        floatingBadgeIcon: sunIconId,
        floatingBadgeLine1: 'UNLOCKING POTENTIALS',
        floatingBadgeLine2: 'HIGHER EDUCATION',
        stat1Value: '3000+',
        stat1Label: 'Students',
        stat1Icon: gradIconId,
        stat2Value: '30+',
        stat2Label: 'Years Exp',
        stat2Icon: ideaIconId,
      },
      {
        blockType: 'facilities',
        hideSection: false,
        badge: 'OUR INFRASTRUCTURE',
        heading: 'State-of-the-art Campus Facilities',
        backgroundColor: '#F4F6F8',
        description:
          'From interactive digital classrooms and science laboratories to Olympic-grade sports amenities, our campus provides an unparalleled learning environment.',
        tabs: [
          {
            tabName: 'Classrooms',
            images: [
              { image: facility1Id, caption: 'Digital Classrooms' },
              { image: facility2Id, caption: 'Learning Commons' },
            ],
          },
          {
            tabName: 'Sports',
            images: [
              { image: facility2Id, caption: 'Football Turf' },
              { image: facility1Id, caption: 'Indoor Stadium' },
            ],
          },
        ],
      },
    ]

    if (existingAbout.docs.length > 0) {
      await payload.update({
        collection: 'pages',
        id: existingAbout.docs[0].id,
        data: {
          title: 'About Us',
          slug: 'about-us',
          headerVariant: 'solid-green',
          backgroundColor: '#FFFFFF',
          layout: aboutUsBlocks,
          _status: 'published',
        } as any,
        draft: false,
      })
      console.log('✓ About Us page updated & published!')
    } else {
      await payload.create({
        collection: 'pages',
        data: {
          title: 'About Us',
          slug: 'about-us',
          headerVariant: 'solid-green',
          backgroundColor: '#FFFFFF',
          layout: aboutUsBlocks,
          _status: 'published',
        } as any,
        draft: false,
      })
      console.log('+ About Us page created & published!')
    }

    // 2. Create/Update Academics Page
    const existingAcademics = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'academics' } },
      draft: true,
      limit: 1,
    })

    const academicsBlocks: any[] = [
      {
        blockType: 'programs',
        hideSection: false,
        badge: 'ACADEMIC EXCELLENCE',
        heading: 'Comprehensive Curriculum & Academic Streams',
        backgroundColor: '#03594E',
        backgroundImage: academicsBgColorId,
        imageOne: progImg1Id,
        imageTwo: progImg2Id,
        floatingBadgeText1: 'Learning • Innovation',
        floatingBadgeText2: 'Achievement',
        programsList: [
          {
            title: 'Pre-Primary School',
            classes: 'CLASSES: NURSERY, LKG, UKG',
            ageCriteria: 'AGE CRITERIA: 2.5 - 5.5 YEARS',
            focus: 'Early foundational literacy, numeracy, and social-emotional growth through play and exploration.',
          },
          {
            title: 'Primary School',
            classes: 'CLASSES: GRADE 1 - 5',
            ageCriteria: 'AGE CRITERIA: 5.5 - 10.5 YEARS',
            focus: 'Core academics, critical thinking, linguistic proficiency, and creative expression.',
          },
          {
            title: 'Middle School',
            classes: 'CLASSES: GRADE 6 - 8',
            ageCriteria: 'AGE CRITERIA: 10.5 - 13.5 YEARS',
            focus: 'Comprehensive CBSE curriculum with scientific inquiry, mathematics, and digital literacy.',
          },
          {
            title: 'Senior Secondary',
            classes: 'CLASSES: GRADE 9 - 12',
            ageCriteria: 'AGE CRITERIA: 13.5 - 17.5 YEARS',
            focus: 'Rigorous board preparation, career pathway mentoring, competitive exam coaching, and leadership.',
          },
        ],
      },
    ]

    if (existingAcademics.docs.length > 0) {
      await payload.update({
        collection: 'pages',
        id: existingAcademics.docs[0].id,
        data: {
          title: 'Academics',
          slug: 'academics',
          headerVariant: 'solid-green',
          backgroundColor: '#FFFFFF',
          layout: academicsBlocks,
          _status: 'published',
        } as any,
        draft: false,
      })
      console.log('✓ Academics page updated & published!')
    } else {
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Academics',
          slug: 'academics',
          headerVariant: 'solid-green',
          backgroundColor: '#FFFFFF',
          layout: academicsBlocks,
          _status: 'published',
        } as any,
        draft: false,
      })
      console.log('+ Academics page created & published!')
    }

    console.log('\n🎉 ALL 3 PAGES (Home, About Us, Academics) ARE CREATED & PUBLISHED!')
    process.exit(0)
  } catch (err) {
    console.error('Error creating pages:', err)
    process.exit(1)
  }
}

run()
