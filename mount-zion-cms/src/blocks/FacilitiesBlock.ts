import type { Block } from 'payload'

export const FacilitiesBlock: Block = {
  slug: 'facilities',
  labels: {
    singular: 'Facilities & Gallery Tabs',
    plural: 'Facilities & Gallery Sections',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge / Tagline',
      defaultValue: 'CAMPUS EXPERIENCE & BEYOND ACADEMICS',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'Where Learning, Discovery & Growth Come Together',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
      defaultValue:
        'At our school, every corner of the campus is designed to inspire learning and personal growth. From state-of-the-art classrooms and creative studios to sports facilities and collaborative spaces, students enjoy an environment that nurtures academic excellence alongside creativity, leadership, teamwork, and well-being.',
    },
    {
      name: 'tabs',
      type: 'array',
      label: 'Facility Categories & Photos',
      defaultValue: [
        { tabName: 'Classrooms' },
        { tabName: 'Self defence' },
        { tabName: 'Swimming' },
        { tabName: 'Dance & Music' },
        { tabName: 'Sports' },
        { tabName: 'Arts' },
        { tabName: 'Fitness' },
      ],
      minRows: 1,
      fields: [
        {
          name: 'tabName',
          type: 'text',
          label: 'Category Name (e.g. Classrooms, Swimming, Sports)',
          required: true,
        },
        {
          name: 'images',
          type: 'array',
          label: 'Category Images',
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
              label: 'Caption / Facility Title',
            },
          ],
        },
      ],
    },
  ],
}
