import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials & Reviews',
    plural: 'Testimonials & Reviews',
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
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color (Hex / CSS)',
      defaultValue: '#F4F6F8',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Section Background Image (Optional full section background / pattern)',
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Parent & Student Reviews',
      defaultValue: [
        {
          cardStyle: 'green',
          rating: 5,
          quote:
            'Preparing students for board examinations, higher education, and future careers through academic excellence, career guidance, innovation, and life skills.',
          authorName: 'M.S. Dhoni',
          authorRole: 'Indian Cricketer',
        },
        {
          cardStyle: 'yellow',
          rating: 5,
          quote:
            'Preparing students for board examinations, higher education, and future careers through academic excellence, career guidance, innovation, and life skills.',
          authorName: 'M.S. Dhoni',
          authorRole: 'Indian Cricketer',
        },
        {
          cardStyle: 'green',
          rating: 5,
          quote:
            'Preparing students for board examinations, higher education, and future careers through academic excellence, career guidance, innovation, and life skills.',
          authorName: 'M.S. Dhoni',
          authorRole: 'Indian Cricketer',
        },
      ],
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
