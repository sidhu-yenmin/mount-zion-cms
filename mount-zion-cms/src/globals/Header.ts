import type { GlobalConfig } from 'payload'
import { createButtonField } from '../fields/buttonField'
import { colorField } from '../fields/colorField'

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
              name: 'menuGroup',
              type: 'relationship',
              relationTo: 'menu-groups',
              label: 'Main Navigation Menu Group',
              admin: {
                description: 'Select the Menu Group to display in the header navbar (defaults to "Header" group if empty).',
              },
            },
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
                colorField({
                  name: 'backgroundColor',
                  label: 'Top Bar Background Color',
                  defaultValue: '#EAB308',
                }),
                colorField({
                  name: 'textColor',
                  label: 'Top Bar Text Color',
                  defaultValue: '#0F172A',
                }),
              ],
            },
            /* ctaButton is currently managed directly inside the Hero Banner block overlay on pages:
            createButtonField({
              name: 'ctaButton',
              label: 'Header Action Button',
              defaultText: 'Apply Now',
              defaultUrl: '/admissions',
              defaultLinkType: 'page',
            }),
            */
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
            colorField({
              name: 'navBackgroundColor',
              label: 'Main Navigation Bar Background Color (For Solid Header)',
              defaultValue: '#022C22',
            }),
          ],
        },
      ],
    },
  ],
}
