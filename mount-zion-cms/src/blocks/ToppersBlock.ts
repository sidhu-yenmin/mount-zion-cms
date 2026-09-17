import type { Block } from 'payload'

export const ToppersBlock: Block = {
  slug: 'toppers',
  labels: {
    singular: 'Toppers & Achievements Section',
    plural: 'Toppers & Achievements Sections',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge / Tagline',
      defaultValue: 'STUDENT SUCCESS',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'Building Bright Minds for Tomorrow',
      required: true,
    },
    {
      name: 'academicYears',
      type: 'array',
      label: 'Academic Years & Rank Holders',
      minRows: 1,
      fields: [
        {
          name: 'year',
          type: 'text',
          label: 'Academic Year (e.g. 2024, 2023, 2022)',
          required: true,
        },
        {
          name: 'rankHolders',
          type: 'array',
          label: 'Rank Holders / Toppers',
          fields: [
            {
              name: 'studentName',
              type: 'text',
              label: 'Student Name',
              required: true,
            },
            {
              name: 'rank',
              type: 'text',
              label: 'Rank / Position (e.g. 1st Rank, 2nd Rank)',
              required: true,
            },
            {
              name: 'score',
              type: 'text',
              label: 'Score / Marks (e.g. 485/500)',
              required: true,
            },
            {
              name: 'standard',
              type: 'text',
              label: 'Class / Grade (e.g. 10th Standard / CBSE)',
            },
            {
              name: 'photo',
              type: 'upload',
              relationTo: 'media',
              label: 'Student Photo',
            },
          ],
        },
      ],
    },
  ],
}
