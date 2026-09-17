import type { Block } from 'payload'

export const CampusLifeBlock: Block = {
  slug: 'campusLife',
  labels: {
    singular: 'Campus Life & Gallery Grid',
    plural: 'Campus Life & Gallery Grids',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge / Tagline',
      defaultValue: 'LIFE AT MOUNT ZION',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'Empowering Future Leaders Around the World',
      required: true,
    },
    {
      name: 'viewMoreLink',
      type: 'text',
      label: 'View More URL',
      defaultValue: '/gallery',
    },
    {
      name: 'galleryImages',
      type: 'array',
      label: 'Bento Grid Images (6 Images Recommended)',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Optional Caption / Alt Text',
        },
      ],
    },
    {
      name: 'ctaBar',
      type: 'group',
      label: 'High School CTA Bar (Bottom)',
      fields: [
        {
          name: 'showCtaBar',
          type: 'checkbox',
          label: 'Show CTA Bar below gallery?',
          defaultValue: true,
        },
        {
          name: 'tagline',
          type: 'text',
          label: 'CTA Tagline (e.g. Ready to join High School?)',
          defaultValue: 'Ready to join High School?',
        },
        {
          name: 'heading',
          type: 'text',
          label: 'CTA Heading',
          defaultValue: "Start Your Child's Journey with Us",
        },
        {
          name: 'studentImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Student Graphic / Photo',
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'CTA Button Label',
          defaultValue: 'Apply Now ↗',
        },
        {
          name: 'buttonUrl',
          type: 'text',
          label: 'CTA Button URL',
          defaultValue: '/admissions',
        },
      ],
    },
  ],
}
