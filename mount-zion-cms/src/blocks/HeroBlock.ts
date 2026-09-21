import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Banner & Stats',
    plural: 'Hero Banners & Stats',
  },
  fields: [
    {
      name: 'hideSection',
      type: 'checkbox',
      label: 'Hide this section on frontend?',
      defaultValue: false,
      admin: {
        description: 'Check to temporarily hide this section from the live page without deleting it',
      },
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Badge / Tagline',
      defaultValue: 'MOUNTZION',
    },
    {
      name: 'heading',
      type: 'textarea',
      label: 'Main Heading',
      defaultValue: 'Nurturing Minds. Building Character. Inspiring Future Leaders.',
      required: true,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Background / Student Image',
      required: true,
    },
    {
      name: 'carouselImages',
      type: 'array',
      label: 'Hero Carousel Background Images',
      admin: {
        description: 'Optional additional background images to display as a rotating carousel in the hero banner',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'primaryButtonText',
          type: 'text',
          label: 'Primary Button Label',
          defaultValue: 'Explore',
          admin: { width: '50%' },
        },
        {
          name: 'primaryButtonUrl',
          type: 'text',
          label: 'Primary Button URL',
          defaultValue: '/about',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'secondaryButtonText',
          type: 'text',
          label: 'Secondary Button Label',
          defaultValue: 'Admission',
          admin: { width: '50%' },
        },
        {
          name: 'secondaryButtonUrl',
          type: 'text',
          label: 'Secondary Button URL',
          defaultValue: '/admissions',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Intro Video URL (For Discover More Button)',
      admin: {
        description: 'Link to YouTube, Vimeo, or video modal',
      },
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Bottom Stats Counter Cards',
      defaultValue: [
        { icon: 'book', value: '30+', label: 'Academic\nExperience' },
        { icon: 'students', value: '3,000+', label: 'Happy\nStudents' },
        { icon: 'teacher', value: '250+', label: 'Experienced\nTeachers' },
        { icon: 'trophy', value: '100%', label: 'Pass Rate In\nBoard Exams' },
      ],
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Book / Academic', value: 'book' },
            { label: 'Students / People', value: 'students' },
            { label: 'Teacher / Educator', value: 'teacher' },
            { label: 'Award / Trophy', value: 'trophy' },
          ],
          defaultValue: 'book',
        },
        {
          name: 'value',
          type: 'text',
          label: 'Stat Value (e.g. 30+, 3,000+)',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Stat Description (e.g. Academic Experience)',
          required: true,
        },
      ],
    },
  ],
}
