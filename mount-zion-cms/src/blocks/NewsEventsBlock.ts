import type { Block } from 'payload'

export const NewsEventsBlock: Block = {
  slug: 'newsEvents',
  labels: {
    singular: 'News & Academic Events Listing',
    plural: 'News & Academic Events Listings',
  },
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
    {
      name: 'exploreMoreText',
      type: 'text',
      label: 'Explore More Button Label',
      defaultValue: 'Explore More',
    },
    {
      name: 'viewAllUrl',
      type: 'text',
      label: 'View All URL',
      defaultValue: '/news',
    },
    {
      name: 'items',
      type: 'array',
      label: 'News / Event Items',
      defaultValue: [
        {
          date: '13 Mar 2026',
          title: 'Explore Our World-Class\nAcademic Programs',
          link: '#',
        },
        {
          date: '17 Apr 2026',
          title: 'Discover the New Academic Programs',
          link: '#',
        },
        {
          date: '09 Jun 2026',
          title: 'New Academic Fees Structures',
          link: '#',
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
          name: 'link',
          type: 'text',
          label: 'Target URL',
          defaultValue: '#',
        },
      ],
    },
  ],
}
