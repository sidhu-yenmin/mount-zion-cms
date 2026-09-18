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
      defaultValue: 'ACADEMIC EXCELLENCE',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: "Shaping Bright Minds for Tomorrow's World",
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description Text',
      defaultValue:
        'Through a balanced blend of academics, technology, creativity, and values, we inspire students to think independently, solve real-world challenges, and achieve excellence in every stage of their educational journey.',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Label',
          defaultValue: 'Explore Academics',
          admin: { width: '50%' },
        },
        {
          name: 'buttonUrl',
          type: 'text',
          label: 'Button URL',
          defaultValue: '#academics',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'imageOne',
      type: 'upload',
      relationTo: 'media',
      label: 'Academics Image 1 (Classroom 591x298px)',
    },
    {
      name: 'imageTwo',
      type: 'upload',
      relationTo: 'media',
      label: 'Academics Image 2 (Tree Planting 475x528px)',
    },
    {
      name: 'bannerText',
      type: 'text',
      label: 'Floating Banner Text',
      defaultValue: 'Learning • Innovation • Achievement',
    },
  ],
}
