import type { GlobalConfig } from 'payload'

export const Menu: GlobalConfig = {
  slug: 'menu',
  label: 'Menu',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'menuItems',
      type: 'array',
      label: 'Main Navigation Menu',
      labels: {
        singular: 'Menu Item',
        plural: 'Menu Items',
      },
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Menu Label (e.g. Home, About Us, Academics, Facilities)',
        },
        {
          name: 'linkType',
          type: 'radio',
          label: 'Link Type',
          defaultValue: 'page',
          options: [
            { label: 'Link to CMS Page', value: 'page' },
            { label: 'Custom URL / Anchor (e.g. #facilities, https://...)', value: 'custom' },
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
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open in new tab?',
          defaultValue: false,
        },
        {
          name: 'hasSubmenu',
          type: 'checkbox',
          label: 'Has Submenu Dropdown?',
          defaultValue: false,
        },
        {
          name: 'submenuItems',
          type: 'array',
          label: 'Submenu Items',
          labels: {
            singular: 'Submenu Item',
            plural: 'Submenu Items',
          },
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.hasSubmenu),
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Submenu Label',
            },
            {
              name: 'linkType',
              type: 'radio',
              label: 'Link Type',
              defaultValue: 'page',
              options: [
                { label: 'Link to CMS Page', value: 'page' },
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
              label: 'Custom URL',
              defaultValue: '/',
              admin: {
                condition: (_, siblingData) => siblingData?.linkType === 'custom',
              },
            },
            {
              name: 'openInNewTab',
              type: 'checkbox',
              label: 'Open in new tab?',
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}
