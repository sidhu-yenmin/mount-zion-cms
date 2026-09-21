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
          type: 'row',
          fields: [
            {
              name: 'phone',
              type: 'text',
              label: 'Phone Number',
              admin: { width: '60%' },
            },
            {
              name: 'phoneIcon',
              type: 'upload',
              relationTo: 'media',
              label: 'Phone Icon (Optional)',
              admin: { width: '40%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'email',
              type: 'text',
              label: 'Email Address',
              admin: { width: '60%' },
            },
            {
              name: 'emailIcon',
              type: 'upload',
              relationTo: 'media',
              label: 'Email Icon (Optional)',
              admin: { width: '40%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'address',
              type: 'textarea',
              label: 'School Address',
              admin: { width: '60%' },
            },
            {
              name: 'addressIcon',
              type: 'upload',
              relationTo: 'media',
              label: 'Address Icon (Optional)',
              admin: { width: '40%' },
            },
          ],
        },
      ],
    },
    {
      name: 'quickLinks',
      type: 'array',
      label: 'Quick Links',
      fields: [
        {
          name: 'linkType',
          type: 'radio',
          label: 'Link Type',
          defaultValue: 'page',
          options: [
            { label: 'Link to CMS Page', value: 'page' },
            { label: 'Custom URL / Anchor (e.g. #about, https://...)', value: 'custom' },
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
          label: 'Custom URL / Path',
          defaultValue: '/',
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === 'custom',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Custom Link Label (Optional - auto-uses Page Title if left blank)',
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
          label: 'Platform',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Custom / Other', value: 'other' },
          ],
          defaultValue: 'facebook',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Social Icon (Upload custom icon, or leave blank to auto-use standard icon)',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Profile URL',
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
