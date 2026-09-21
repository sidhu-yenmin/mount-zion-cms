import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'ctaBanner',
      type: 'group',
      label: 'Bottom CTA Banner',
      fields: [
        {
          name: 'showCtaBanner',
          type: 'checkbox',
          label: 'Show Bottom CTA Banner',
          defaultValue: true,
        },
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
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Label',
          defaultValue: 'Get Started',
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
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Footer Logo',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'School Short Bio / Tagline',
      defaultValue: 'Inspiring Minds. Shaping Futures.\nNurturing Excellence. Building Leaders.',
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'address',
          type: 'textarea',
          label: 'School Address',
          defaultValue: 'Pilivalam, Lembalakkudi,\nPudukottai - 622507',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          defaultValue: '+9173737 51513',
        },
        {
          name: 'email',
          type: 'text',
          label: 'Email Address',
          defaultValue: 'cbse@mountzionschools.com',
        },
      ],
    },
    {
      name: 'quickLinks',
      type: 'array',
      label: 'Quick Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright Text',
      defaultValue: '© 2026 Mount Zion International School. All Rights Reserved.',
    },
  ],
}
