import type { Block } from 'payload'

export const ProgramsBlock: Block = {
  slug: 'programs',
  labels: {
    singular: 'Academic Programs Section',
    plural: 'Academic Programs Sections',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge / Tagline',
      defaultValue: 'WHY MOUNT ZION',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'Explore Our World-Class Academic Programs',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Label',
      defaultValue: 'Explore More',
    },
    {
      name: 'buttonUrl',
      type: 'text',
      label: 'Button URL',
      defaultValue: '/academics',
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Main Student Image (Left)',
    },
    {
      name: 'secondaryImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Classroom Activity Image (Right Bottom)',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Small Highlights / Stats',
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Value (e.g. 9K+, 10+)',
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label (e.g. Total Kids, Experience)',
        },
      ],
    },
  ],
}
