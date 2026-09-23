import type { Block } from 'payload'
import { colorField } from '../fields/colorField'

export const ToppersBlock: Block = {
  slug: 'toppers',
  labels: {
    singular: 'Toppers & Achievements Section',
    plural: 'Toppers & Achievements Sections',
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
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
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
              defaultValue: [
                {
                  year: '2026',
                  rankHolders: [
                    {
                      studentName: 'Kishorekumar',
                      rank: 'HSC Topper',
                      score: '485/500',
                      standard: 'IN GRADE 10',
                    },
                    {
                      studentName: 'Yogalakshmi',
                      rank: 'HSC Topper',
                      score: '483/500',
                      standard: 'IN GRADE 10',
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
                    },
                    {
                      studentName: 'Sneha',
                      rank: 'School 2nd',
                      score: '488/500',
                      standard: 'IN GRADE 10',
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
                    },
                  ],
                },
              ],
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
        },
        {
          label: 'Design & Media',
          fields: [
            colorField({
              name: 'backgroundColor',
              label: 'Section Background Color',
              defaultValue: '#044438',
            }),
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Section Background Image (Optional full section background / pattern)',
            },
          ],
        },
      ],
    },
  ],
}
