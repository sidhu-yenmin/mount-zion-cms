import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials & Reviews',
    plural: 'Testimonials & Reviews',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge / Tagline',
      defaultValue: 'TESTIMONIALS',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'Building Bright Minds for Tomorrow',
      required: true,
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Parent & Student Reviews',
      minRows: 1,
      fields: [
        {
          name: 'cardStyle',
          type: 'select',
          options: [
            { label: 'Dark Green Card', value: 'green' },
            { label: 'Yellow Card', value: 'yellow' },
          ],
          defaultValue: 'green',
        },
        {
          name: 'rating',
          type: 'number',
          label: 'Star Rating (1 to 5)',
          defaultValue: 5,
          min: 1,
          max: 5,
        },
        {
          name: 'quote',
          type: 'textarea',
          label: 'Review / Quote',
          required: true,
        },
        {
          name: 'authorName',
          type: 'text',
          label: 'Parent / Student Name',
          required: true,
        },
        {
          name: 'authorRole',
          type: 'text',
          label: 'Designation / Relation (e.g. Parent of Grade 8 Student)',
          required: true,
        },
        {
          name: 'authorPhoto',
          type: 'upload',
          relationTo: 'media',
          label: 'Author Avatar Photo',
        },
      ],
    },
  ],
}
