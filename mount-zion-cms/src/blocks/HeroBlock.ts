import type { Block } from 'payload'
import { createButtonField } from '../fields/buttonField'

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
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
      defaultValue: '#022C22',
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
          label: 'Content',
          fields: [
            createButtonField({
              name: 'headerCtaButton',
              label: 'Top Header Overlay Button (e.g. Apply Now)',
              defaultText: 'Apply Now',
              defaultUrl: '/admissions',
              defaultLinkType: 'page',
            }),
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
            createButtonField({
              name: 'primaryButton',
              label: 'Primary Hero Button (e.g. Explore)',
              defaultText: 'Explore',
              defaultUrl: '/about',
              defaultLinkType: 'page',
            }),
            createButtonField({
              name: 'secondaryButton',
              label: 'Secondary Hero Button (e.g. Admission)',
              defaultText: 'Admission',
              defaultUrl: '/admissions',
              defaultLinkType: 'page',
            }),
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
        },
        {
          label: 'Design & Media',
          fields: [
            {
              name: 'backgroundColor',
              type: 'text',
              label: 'Section Background Color (Hex / CSS)',
              defaultValue: '#022C22',
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Background / Student Banner Image',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
