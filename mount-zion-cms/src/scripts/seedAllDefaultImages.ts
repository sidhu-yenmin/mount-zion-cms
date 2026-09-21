import 'dotenv/config'
import path from 'path'
import fs from 'fs'
import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    console.log('🚀 Starting Default CMS Images & Content Seeding...')

    const publicImagesDir = path.resolve(process.cwd(), 'public/images')

    // Helper to upload media or get existing media by alt
    async function getOrUploadMedia(filename: string, altText: string): Promise<number | string | null> {
      const filePath = path.join(publicImagesDir, filename)
      if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`)
        return null
      }

      // Check if media already exists
      const existing = await payload.find({
        collection: 'media',
        where: {
          alt: { equals: altText },
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`✓ Media already exists: ${altText} (ID: ${existing.docs[0].id})`)
        return existing.docs[0].id
      }

      // Create new media
      try {
        const created = await payload.create({
          collection: 'media',
          data: {
            alt: altText,
          },
          filePath,
        })
        console.log(`+ Uploaded media: ${filename} -> ID: ${created.id}`)
        return created.id
      } catch (e) {
        console.error(`Error uploading ${filename}:`, e)
        return null
      }
    }

    // 1. Upload All Default Media Assets
    console.log('\n--- 1. Uploading Assets to Media Collection ---')
    const mediaMap: Record<string, any> = {}

    const assetList: { file: string; alt: string; key: string }[] = [
      { file: 'why-mount-zion-student.png', alt: 'Why Mount Zion Student', key: 'aboutStudent' },
      { file: 'why-mount-zion-classroom.png', alt: 'Why Mount Zion Classroom', key: 'aboutClassroom' },
      { file: 'sun.png', alt: 'Sunburst Badge Icon', key: 'sunIcon' },
      { file: 'graduate.png', alt: 'Graduation Cap Stat Icon', key: 'gradIcon' },
      { file: 'idea.png', alt: 'Experience Idea Stat Icon', key: 'ideaIcon' },
      { file: 'hero-student.png', alt: 'Hero Student Banner', key: 'heroStudent' },
      { file: 'academics-img1.png', alt: 'Academic Program Class 1', key: 'progImg1' },
      { file: 'academics-img2.png', alt: 'Academic Program Class 2', key: 'progImg2' },
      { file: 'academics-bg-pattern.png', alt: 'Academic Blackboard Pattern', key: 'progBgPattern' },
      { file: 'academics-bg-color.png', alt: 'Academics Green Texture', key: 'academicsBgColor' },
      { file: 'facilities1.png', alt: 'Campus Classroom Facility', key: 'facility1' },
      { file: 'facilities2.png', alt: 'Campus Sports & Staircase Facility', key: 'facility2' },
      { file: 'topper-student1.png', alt: 'Topper Student Kishorekumar', key: 'topper1' },
      { file: 'topper-student2.png', alt: 'Topper Student Yogalakshmi', key: 'topper2' },
      { file: 'gallery1.png', alt: 'Campus Life Gallery 1', key: 'gallery1' },
      { file: 'gallery2.png', alt: 'Campus Life Gallery 2', key: 'gallery2' },
      { file: 'gallery3.png', alt: 'Campus Life Gallery 3', key: 'gallery3' },
      { file: 'gallery4.png', alt: 'Campus Life Gallery 4', key: 'gallery4' },
      { file: 'gallery-cta-image.png', alt: 'Campus CTA Student Cutout', key: 'galleryCtaStudent' },
      { file: 'testimonial1.png', alt: 'Parent Reviewer 1', key: 'testimonial1' },
      { file: 'testimonial2.png', alt: 'Parent Reviewer 2', key: 'testimonial2' },
      { file: 'testimonial3.png', alt: 'Parent Reviewer 3', key: 'testimonial3' },
      { file: 'news.png', alt: 'Academic News Thumbnail', key: 'newsImg' },
      { file: 'Logo 1.png', alt: 'Mount Zion School Logo', key: 'logo' },
      { file: 'bottom-cta-banner.png', alt: 'Bottom CTA Chalkboard Banner', key: 'ctaBg' },
      { file: 'phone-icon.png', alt: 'Phone Icon', key: 'phoneIcon' },
      { file: 'mail-icon.png', alt: 'Mail Icon', key: 'mailIcon' },
      { file: 'location.png', alt: 'Location Pin Icon', key: 'locIcon' },
      { file: 'facebook.png', alt: 'Facebook Icon', key: 'fbIcon' },
      { file: 'youtube.png', alt: 'YouTube Icon', key: 'ytIcon' },
      { file: 'x.png', alt: 'Twitter X Icon', key: 'xIcon' },
      { file: 'linkedin.png', alt: 'LinkedIn Icon', key: 'liIcon' },
      { file: 'instagram.png', alt: 'Instagram Icon', key: 'igIcon' },
    ]

    for (const item of assetList) {
      mediaMap[item.key] = await getOrUploadMedia(item.file, item.alt)
    }

    // 2. Pre-Populate Home Page Layout Blocks
    console.log('\n--- 2. Updating Home Page with Default Blocks and Selected Media ---')
    const pagesResult = await payload.find({
      collection: 'pages',
      where: {
        slug: { equals: 'home' },
      },
      limit: 1,
    })

    const homeBlocks: any[] = [
      // Block 1: Hero
      {
        blockType: 'hero',
        hideSection: false,
        badge: 'MOUNTZION',
        heading: 'Nurturing Minds. Building Character. Inspiring Future Leaders.',
        backgroundColor: '#022C22',
        backgroundImage: mediaMap['heroStudent'],
        primaryButtonText: 'Explore',
        primaryButtonUrl: '/about',
        secondaryButtonText: 'Admission',
        secondaryButtonUrl: '/admissions',
        stats: [
          { icon: 'book', value: '30+', label: 'Academic\nExperience' },
          { icon: 'students', value: '3,000+', label: 'Happy\nStudents' },
          { icon: 'teacher', value: '250+', label: 'Experienced\nTeachers' },
          { icon: 'trophy', value: '100%', label: 'Pass Rate In\nBoard Exams' },
        ],
      },
      // Block 2: About Us
      {
        blockType: 'aboutUs',
        hideSection: false,
        badge: 'WHY MOUNT ZION',
        heading: 'Explore Our World-Class Academic Programs',
        backgroundColor: '#FFFFFF',
        description:
          'Mount Zion School dedicated to providing quality learning, research, and innovation. It offers a wide range of undergraduate, graduate, and postgraduate programs designed to prepare students for professional success.',
        buttonText: 'Know More',
        buttonUrl: '#academics',
        imageOne: mediaMap['aboutStudent'],
        imageTwo: mediaMap['aboutClassroom'],
        floatingBadgeIcon: mediaMap['sunIcon'],
        floatingBadgeLine1: 'UNLOCKING POTENTIALS',
        floatingBadgeLine2: 'HIGHER EDUCATION',
        stat1Value: '9K',
        stat1Label: 'Students',
        stat1Icon: mediaMap['gradIcon'],
        stat2Value: '10',
        stat2Label: 'Experience',
        stat2Icon: mediaMap['ideaIcon'],
      },
      // Block 3: Programs
      {
        blockType: 'programs',
        hideSection: false,
        badge: 'OUR ACADEMIC PROGRAM',
        heading: 'Explore Our World-Class Academic Programs',
        backgroundColor: '#03594E',
        backgroundImage: mediaMap['academicsBgColor'],
        imageOne: mediaMap['progImg1'],
        imageTwo: mediaMap['progImg2'],
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
      // Block 4: Facilities & Gallery Tabs
      {
        blockType: 'facilities',
        hideSection: false,
        badge: 'CAMPUS EXPERIENCE & BEYOND ACADEMICS',
        heading: 'Where Learning, Discovery & Growth Come Together',
        backgroundColor: '#F4F6F8',
        description:
          'At our school, every corner of the campus is designed to inspire learning and personal growth. From state-of-the-art classrooms and creative studios to sports facilities and collaborative spaces, students enjoy an environment that nurtures academic excellence alongside creativity, leadership, teamwork, and well-being.',
        tabs: [
          {
            tabName: 'Classrooms',
            images: [
              { image: mediaMap['facility1'], caption: 'Modern Digital Classroom' },
              { image: mediaMap['facility2'], caption: 'Interactive Learning Studio' },
            ],
          },
          {
            tabName: 'Self defence',
            images: [
              { image: mediaMap['facility2'], caption: 'Martial Arts & Karate Academy' },
              { image: mediaMap['facility1'], caption: 'Indoor Training Dojo' },
            ],
          },
          {
            tabName: 'Swimming',
            images: [
              { image: mediaMap['facility1'], caption: 'Semi-Olympic Swimming Pool' },
              { image: mediaMap['facility2'], caption: 'Aquatics Coaching Zone' },
            ],
          },
          {
            tabName: 'Dance & Music',
            images: [
              { image: mediaMap['facility2'], caption: 'Acoustic Music Studio' },
              { image: mediaMap['facility1'], caption: 'Performing Arts Auditorium' },
            ],
          },
          {
            tabName: 'Sports',
            images: [
              { image: mediaMap['facility1'], caption: 'Cricket & Football Turf' },
              { image: mediaMap['facility2'], caption: 'Basketball & Tennis Courts' },
            ],
          },
          {
            tabName: 'Arts',
            images: [
              { image: mediaMap['facility2'], caption: 'Creative Fine Arts Workshop' },
              { image: mediaMap['facility1'], caption: 'Sculpture & Pottery Studio' },
            ],
          },
          {
            tabName: 'Fitness',
            images: [
              { image: mediaMap['facility1'], caption: 'Student Wellness & Fitness Gym' },
              { image: mediaMap['facility2'], caption: 'Yoga & Meditation Pavilion' },
            ],
          },
        ],
      },
      // Block 5: Toppers
      {
        blockType: 'toppers',
        hideSection: false,
        badge: 'STUDENT SUCCESS',
        heading: 'Building Bright Minds for Tomorrow',
        backgroundColor: '#044438',
        backgroundImage: mediaMap['academicsBgColor'],
        academicYears: [
          {
            year: '2026',
            rankHolders: [
              {
                studentName: 'Kishorekumar',
                rank: 'HSC Topper',
                score: '485/500',
                standard: 'IN GRADE 10',
                photo: mediaMap['topper1'],
              },
              {
                studentName: 'Yogalakshmi',
                rank: 'HSC Topper',
                score: '483/500',
                standard: 'IN GRADE 10',
                photo: mediaMap['topper2'],
              },
            ],
          },
          {
            year: '2025',
            rankHolders: [
              {
                studentName: 'Aadhavan',
                rank: 'CBSE Topper',
                score: '492/500',
                standard: 'IN GRADE 10',
                photo: mediaMap['topper1'],
              },
              {
                studentName: 'Sneha',
                rank: 'School 2nd',
                score: '488/500',
                standard: 'IN GRADE 10',
                photo: mediaMap['topper2'],
              },
            ],
          },
          {
            year: '2024',
            rankHolders: [
              {
                studentName: 'Rahul',
                rank: '1st Rank',
                score: '490/500',
                standard: 'IN GRADE 10',
                photo: mediaMap['topper1'],
              },
            ],
          },
          {
            year: '2023',
            rankHolders: [
              {
                studentName: 'Divya',
                rank: '1st Rank',
                score: '494/500',
                standard: 'IN GRADE 10',
                photo: mediaMap['topper2'],
              },
            ],
          },
        ],
      },
      // Block 6: Campus Life & Gallery
      {
        blockType: 'campusLife',
        hideSection: false,
        badge: 'OUR GALLERY',
        heading: 'Empowering Future Leaders Around the World',
        backgroundColor: '#FFFFFF',
        viewMoreText: 'View More',
        viewMoreLink: '/gallery',
        galleryImages: [
          { image: mediaMap['facility2'], caption: 'School Architecture Staircase' },
          { image: mediaMap['facility1'], caption: 'Students Collaborating in Classroom' },
          { image: mediaMap['gallery1'], caption: 'Student Reading in Library' },
          { image: mediaMap['gallery2'], caption: 'Students in Uniform in Hallway' },
          { image: mediaMap['gallery3'], caption: 'Student Writing with Pencil' },
          { image: mediaMap['gallery4'], caption: 'Modern Classroom Layout' },
        ],
        ctaBar: {
          showCtaBar: true,
          tagline: 'Looking for the Right School?',
          heading: "Start Your Child's Journey with Us",
          studentImage: mediaMap['galleryCtaStudent'],
          buttonText: 'Apply Now',
          buttonUrl: '/admissions',
        },
      },
      // Block 7: Testimonials
      {
        blockType: 'testimonials',
        hideSection: false,
        badge: 'TESTIMONIALS',
        heading: 'Building Bright Minds for Tomorrow',
        backgroundColor: '#F4F6F8',
        testimonials: [
          {
            cardStyle: 'green',
            rating: 5,
            quote:
              'Preparing students for board examinations, higher education, and future careers through academic excellence, career guidance, innovation, and life skills.',
            authorName: 'M.S. Dhoni',
            authorRole: 'Parent of Grade 10 Student',
            authorPhoto: mediaMap['testimonial3'],
          },
          {
            cardStyle: 'yellow',
            rating: 5,
            quote:
              'Preparing students for board examinations, higher education, and future careers through academic excellence, career guidance, innovation, and life skills.',
            authorName: 'Priya Sundar',
            authorRole: 'Parent of Grade 8 Student',
            authorPhoto: mediaMap['testimonial2'],
          },
          {
            cardStyle: 'green',
            rating: 5,
            quote:
              'Preparing students for board examinations, higher education, and future careers through academic excellence, career guidance, innovation, and life skills.',
            authorName: 'Rajesh Kumar',
            authorRole: 'Parent of Grade 12 Student',
            authorPhoto: mediaMap['testimonial1'],
          },
        ],
      },
      // Block 8: News & Events
      {
        blockType: 'newsEvents',
        hideSection: false,
        badge: 'OUR EVENTS & NEWS',
        heading: 'Explore Our World-Class Academic Programs',
        backgroundColor: '#FFFFFF',
        exploreMoreText: 'Explore More',
        viewAllUrl: '/news',
        items: [
          {
            date: '13 Mar 2026',
            title: 'Explore Our World-Class\nAcademic Programs',
            image: mediaMap['newsImg'],
            link: '#',
          },
          {
            date: '17 Apr 2026',
            title: 'Discover the New Academic Programs',
            image: mediaMap['newsImg'],
            link: '#',
          },
          {
            date: '09 Jun 2026',
            title: 'New Academic Fees Structures',
            image: mediaMap['newsImg'],
            link: '#',
          },
        ],
      },
    ]

    if (pagesResult.docs.length > 0) {
      await payload.update({
        collection: 'pages',
        id: pagesResult.docs[0].id,
        data: {
          title: 'Home',
          slug: 'home',
          headerVariant: 'transparent',
          backgroundColor: '#FFFFFF',
          layout: homeBlocks,
        },
      })
      console.log(`✓ Home Page updated with all default media assets and blocks!`)
    } else {
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Home',
          slug: 'home',
          headerVariant: 'transparent',
          backgroundColor: '#FFFFFF',
          layout: homeBlocks,
        },
      })
      console.log(`+ Home Page created with all default media assets and blocks!`)
    }

    // 3. Pre-Populate Footer Global
    console.log('\n--- 3. Updating Footer Global ---')
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        logo: mediaMap['logo'],
        backgroundColor: '#03594E',
        description: 'Inspiring Minds. Shaping Futures.\nNurturing Excellence. Building Leaders.',
        ctaBanner: {
          showCtaBanner: true,
          tagline: 'Start your journey',
          heading: 'Towards a brighter future.',
          description:
            'Give your child the right foundation to learn, grow, and achieve their dreams in a nurturing and inspiring environment.',
          buttonText: 'Get Started',
          buttonUrl: '/admissions',
          backgroundImage: mediaMap['ctaBg'],
          backgroundColor: '#03594E',
        },
        contactInfo: {
          phone: '+9173737 51513',
          phoneIcon: mediaMap['phoneIcon'],
          email: 'cbse@mountzionschools.com',
          emailIcon: mediaMap['mailIcon'],
          address: 'Pilivalam, Lembalakkudi,\nPudukottai - 622507',
          addressIcon: mediaMap['locIcon'],
        },
        quickLinks: [
          { label: 'Home', url: '/' },
          { label: 'About', url: '#about' },
          { label: 'Academic', url: '#academic' },
          { label: 'Admission', url: '#admission' },
          { label: 'Resources', url: '#resources' },
          { label: 'Student Portal', url: '#portal' },
          { label: 'Campus Life', url: '#campus-life' },
          { label: 'Achievements', url: '#achievements' },
          { label: 'Gallery', url: '/gallery' },
          { label: 'News & Events', url: '/news' },
          { label: 'Contact Us', url: '#contact' },
        ],
        socialLinks: [
          { platform: 'facebook', url: 'https://facebook.com', icon: mediaMap['fbIcon'] },
          { platform: 'youtube', url: 'https://youtube.com', icon: mediaMap['ytIcon'] },
          { platform: 'twitter', url: 'https://x.com', icon: mediaMap['xIcon'] },
          { platform: 'linkedin', url: 'https://linkedin.com', icon: mediaMap['liIcon'] },
          { platform: 'instagram', url: 'https://instagram.com', icon: mediaMap['igIcon'] },
        ],
        copyright: '© 2026 Mount Zion International School. All Rights Reserved.',
      } as any,
    })
    console.log('✓ Footer Global updated with Logo, CTA Banner, Contact Icons!')

    // 4. Pre-Populate Header Global
    console.log('\n--- 4. Updating Header Global ---')
    await payload.updateGlobal({
      slug: 'header',
      data: {
        logo: mediaMap['logo'],
        navBackgroundColor: '#022C22',
        topBar: {
          showTopBar: true,
          phone: '+91 - 9876543210',
          email: 'info@mountzion.com',
          backgroundColor: '#EAB308',
          textColor: '#0F172A',
        },
        ctaButton: {
          label: 'Apply Now',
          url: '/admissions',
        },
      } as any,
    })
    console.log('✓ Header Global updated!')

    console.log('\n🎉 ALL CMS MEDIA AND DEFAULT BLOCKS SEEDED SUCCESSFULLY!')
    process.exit(0)
  } catch (err) {
    console.error('Error in seeding script:', err)
    process.exit(1)
  }
}

run()
