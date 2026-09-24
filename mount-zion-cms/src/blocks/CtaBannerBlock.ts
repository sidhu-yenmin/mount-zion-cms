import type { Block } from 'payload'
import { createButtonField } from '../fields/buttonField'
import { colorField } from '../fields/colorField'

export const CtaBannerBlock: Block = {
  slug: 'ctaBanner',
  labels: {
    singular: 'Bottom CTA Banner',
    plural: 'Bottom CTA Banners',
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
              name: 'tagline',
              type: 'text',
              label: 'Tagline',
              defaultValue: 'Start your journey',
            },
            {
              name: 'heading',
              type: 'text',
              label: 'Heading',
              defaultValue: 'Towards a brighter future.',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              defaultValue:
                'Give your child the right foundation to learn, grow, and achieve their dreams in a nurturing and inspiring environment.',
            },
            createButtonField({
              name: 'button',
              label: 'Banner Action Button',
              defaultText: 'Get Started',
              defaultUrl: '/admissions',
              defaultLinkType: 'page',
            }),
          ],
        },
        {
          label: 'Design & Media',
          fields: [
            colorField({
              name: 'backgroundColor',
              label: 'Banner Background Color',
              defaultValue: '#03594E',
            }),
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Background Banner Image (Chalkboard graphic)',
            },
          ],
        },
      ],
    },
  ],
}
