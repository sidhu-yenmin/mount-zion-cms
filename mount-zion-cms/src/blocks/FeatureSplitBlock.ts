import type { Block } from 'payload'

export const FeatureSplitBlock: Block = {
  slug: 'featureSplit',
  labels: {
    singular: 'Feature Split (Green Section)',
    plural: 'Feature Split Sections',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge / Tagline',
      defaultValue: 'EXPERIENCE EXCELLENCE',
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
    },
    {
      name: 'imageOne',
      type: 'upload',
      relationTo: 'media',
      label: 'First Image (e.g. Classroom Students)',
    },
    {
      name: 'imageTwo',
      type: 'upload',
      relationTo: 'media',
      label: 'Second Image (e.g. Tree Planting / Outdoor)',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Label',
      defaultValue: 'Explore Our Campus',
    },
    {
      name: 'buttonUrl',
      type: 'text',
      label: 'Button URL',
      defaultValue: '/campus',
    },
  ],
}
