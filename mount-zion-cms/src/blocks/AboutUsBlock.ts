import type { Block } from 'payload'

export const AboutUsBlock: Block = {
  slug: 'aboutUs',
  labels: {
    singular: 'About Us',
    plural: 'About Us Sections',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge / Tagline',
      defaultValue: 'WHY MOUNT ZION',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'Explore Our World-Class Academic Programs',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description Text',
      defaultValue:
        'Mount Zion School dedicated to providing quality learning, research, and innovation. It offers a wide range of undergraduate, graduate, and postgraduate programs designed to prepare students for professional success.',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Label',
          defaultValue: 'Know More',
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
      label: 'Image 1 - Left Student Photo (361x456)',
    },
    {
      name: 'imageTwo',
      type: 'upload',
      relationTo: 'media',
      label: 'Image 2 - Classroom Activity Photo (423x320)',
    },
    {
      type: 'collapsible',
      label: 'Floating Badge Customization (Sunburst Overlay)',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'floatingBadgeIcon',
          type: 'upload',
          relationTo: 'media',
          label: 'Badge Icon (e.g. Yellow Sunburst Star)',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'floatingBadgeLine1',
              type: 'text',
              label: 'Badge Line 1',
              defaultValue: 'UNLOCKING POTENTIALS',
              admin: { width: '50%' },
            },
            {
              name: 'floatingBadgeLine2',
              type: 'text',
              label: 'Badge Line 2',
              defaultValue: 'HIGHER EDUCATION',
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Counters & Stats with Icons',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'stat1Value',
              type: 'text',
              label: 'Stat 1 Value (e.g. 9K)',
              defaultValue: '9K',
              admin: { width: '33%' },
            },
            {
              name: 'stat1Label',
              type: 'text',
              label: 'Stat 1 Label (e.g. Students)',
              defaultValue: 'Students',
              admin: { width: '33%' },
            },
            {
              name: 'stat1Icon',
              type: 'upload',
              relationTo: 'media',
              label: 'Stat 1 Icon (Graduation Cap)',
              admin: { width: '34%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'stat2Value',
              type: 'text',
              label: 'Stat 2 Value (e.g. 10)',
              defaultValue: '10',
              admin: { width: '33%' },
            },
            {
              name: 'stat2Label',
              type: 'text',
              label: 'Stat 2 Label (e.g. Experience)',
              defaultValue: 'Experience',
              admin: { width: '33%' },
            },
            {
              name: 'stat2Icon',
              type: 'upload',
              relationTo: 'media',
              label: 'Stat 2 Icon (Idea / Bulb)',
              admin: { width: '34%' },
            },
          ],
        },
      ],
    },
  ],
}
