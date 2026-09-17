import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
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
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'School Logo',
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Menu Links',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Menu Label',
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          label: 'URL / Path (e.g. /about or #)',
        },
        {
          name: 'hasDropdown',
          type: 'checkbox',
          label: 'Has Submenu Dropdown?',
          defaultValue: false,
        },
        {
          name: 'subItems',
          type: 'array',
          label: 'Dropdown Items',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.hasDropdown),
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              required: true,
            },
          ],
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
}
