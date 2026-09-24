import type { CollectionConfig } from 'payload'

export const MenuGroups: CollectionConfig = {
  slug: 'menu-groups',
  labels: {
    singular: 'Menu Group',
    plural: 'Menu Groups',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'Manage menu groups (e.g. Header, Footer, Sidebar, Admissions) containing multiple menus and links.',
    group: 'Globals',
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Group Name / Title',
      admin: {
        description: 'e.g. "Header", "Footer", "Admissions Sidebar", "Student Portal"',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Group Identifier / Slug',
      admin: {
        position: 'sidebar',
        description: 'Unique key e.g. "header", "footer", "admissions", "sidebar"',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description / Purpose (Optional)',
      admin: {
        description: 'Brief note on where this menu group is used.',
      },
    },
    {
      name: 'menus',
      type: 'array',
      label: 'Menus & Link Lists inside this Group',
      labels: {
        singular: 'Menu / Section',
        plural: 'Menus / Sections',
      },
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Menu / Section Title',
          admin: {
            description: 'e.g. "Main Navigation", "Quick Links", "Explore", "Legal"',
          },
        },
        {
          name: 'menuKey',
          type: 'text',
          label: 'Menu Key / Identifier (Optional)',
          admin: {
            description: 'Optional identifier like "col-1", "col-2", "main-nav"',
          },
        },
        {
          name: 'items',
          type: 'array',
          label: 'Menu Items / Links',
          labels: {
            singular: 'Link Item',
            plural: 'Link Items',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Link Label (e.g. Home, About Us, Academics, Facilities)',
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
    },
  ],
}
