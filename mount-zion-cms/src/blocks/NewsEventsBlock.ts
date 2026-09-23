import type { Block } from 'payload'
import { createButtonField } from '../fields/buttonField'

export const NewsEventsBlock: Block = {
  slug: 'newsEvents',
  labels: {
    singular: 'News & Academic Events Listing',
    plural: 'News & Academic Events Listings',
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
              defaultValue: 'OUR EVENTS & NEWS',
            },
            {
              name: 'heading',
              type: 'text',
              label: 'Section Heading',
              defaultValue: 'Explore Our World-Class Academic Programs',
              required: true,
            },
            createButtonField({
              name: 'exploreMoreButton',
              label: 'Explore More Button',
              defaultText: 'Explore More',
              defaultUrl: '/news',
              defaultLinkType: 'page',
            }),
            {
              name: 'items',
              type: 'array',
              label: 'News / Event Items',
              defaultValue: [
                {
                  date: '13 Mar 2026',
                  title: 'Explore Our World-Class\nAcademic Programs',
                  linkType: 'custom',
                  customUrl: '#',
                },
                {
                  date: '17 Apr 2026',
                  title: 'Discover the New Academic Programs',
                  linkType: 'custom',
                  customUrl: '#',
                },
                {
                  date: '09 Jun 2026',
                  title: 'New Academic Fees Structures',
                  linkType: 'custom',
                  customUrl: '#',
                },
              ],
              minRows: 1,
              fields: [
                {
                  name: 'date',
                  type: 'text',
                  label: 'Date (e.g. 10TH JAN, 11TH FEB, 25TH APR)',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'News / Event Title',
                  required: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Optional Thumbnail / Preview Image',
                },
                {
                  name: 'linkType',
                  type: 'radio',
                  label: 'Link Type',
                  defaultValue: 'custom',
                  options: [
                    { label: 'Select CMS Page', value: 'page' },
                    { label: 'Custom URL / Anchor', value: 'custom' },
                  ],
                },
                {
                  name: 'page',
                  type: 'relationship',
                  relationTo: 'pages',
                  label: 'Select CMS Page',
                  admin: {
                    condition: (_, siblingData) => siblingData?.linkType === 'page',
                  },
                },
                {
                  name: 'customUrl',
                  type: 'text',
                  label: 'Target URL',
                  defaultValue: '#',
                  admin: {
                    condition: (_, siblingData) => siblingData?.linkType === 'custom',
                  },
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
              defaultValue: '#FFFFFF',
            },
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
