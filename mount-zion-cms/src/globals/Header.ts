import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'topBar',
              type: 'group',
              label: 'Top Contact Bar',
              fields: [
                {
                  name: 'showTopBar',
                  type: 'checkbox',
                  label: 'Show Top Contact Bar',
                  defaultValue: true,
                },
                {
                  name: 'phone',
                  type: 'text',
                  label: 'Phone Number',
                  defaultValue: '+91 - 9876543210',
                },
                {
                  name: 'email',
                  type: 'text',
                  label: 'Email Address',
                  defaultValue: 'info@mountzion.com',
                },
                {
                  name: 'backgroundColor',
                  type: 'text',
                  label: 'Top Bar Background Color',
                  defaultValue: '#EAB308',
                },
                {
                  name: 'textColor',
                  type: 'text',
                  label: 'Top Bar Text Color',
                  defaultValue: '#0F172A',
                },
              ],
            },
            {
              name: 'ctaButton',
              type: 'group',
              label: 'Header Action Button',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Button Label',
                  defaultValue: 'Apply Now',
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'Button URL',
                  defaultValue: '/admissions',
                },
              ],
            },
          ],
        },
        {
          label: 'Design & Media',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'School Logo',
            },
            {
              name: 'navBackgroundColor',
              type: 'text',
              label: 'Main Navigation Bar Background Color (For Solid Header)',
              defaultValue: '#022C22',
            },
          ],
        },
      ],
    },
  ],
}
