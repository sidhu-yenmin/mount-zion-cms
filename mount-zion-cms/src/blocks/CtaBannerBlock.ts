import type { Block } from 'payload'

export const CtaBannerBlock: Block = {
  slug: 'ctaBanner',
  labels: {
    singular: 'Bottom CTA Banner',
    plural: 'Bottom CTA Banners',
  },
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
      defaultValue: 'Admissions are now open for the academic year 2026-2027. Apply today to secure a seat.',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Label',
      defaultValue: 'Get Started ↗',
    },
    {
      name: 'buttonUrl',
      type: 'text',
      label: 'Button URL',
      defaultValue: '/admissions',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Banner Image (Chalkboard graphic)',
    },
  ],
}
