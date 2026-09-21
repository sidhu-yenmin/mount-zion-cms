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
          name: 'isActive',
          type: 'checkbox',
          label: 'Active Menu Item (Bold #0F172A)',
          defaultValue: false,
        },
        {
          name: 'showExpandIcon',
          type: 'checkbox',
          label: 'Show Expand Vector Icon (v)',
          defaultValue: false,
          admin: {
            description: 'Option to display the (v) expand arrow icon next to this menu item',
          },
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
      defaultValue: [
        { label: 'Home', link: '/', isActive: true, showExpandIcon: false },
        {
          label: 'Our School',
          link: '#about',
          isActive: false,
          showExpandIcon: true,
          hasDropdown: true,
          subItems: [
            { label: 'About Mount Zion', link: '#about' },
            { label: 'Vision & Mission', link: '#vision' },
            { label: 'Leadership', link: '#leadership' },
          ],
        },
        {
          label: 'Education',
          link: '#education',
          isActive: false,
          showExpandIcon: true,
          hasDropdown: true,
          subItems: [
            { label: 'CBSE Curriculum', link: '#curriculum' },
            { label: 'Primary School', link: '#primary' },
            { label: 'Middle School', link: '#middle' },
            { label: 'Senior Secondary', link: '#senior' },
          ],
        },
        {
          label: 'Student Life',
          link: '#student-life',
          isActive: false,
          showExpandIcon: true,
          hasDropdown: true,
          subItems: [
            { label: 'Sports & Athletics', link: '#sports' },
            { label: 'Arts & Culture', link: '#arts' },
            { label: 'Student Clubs', link: '#clubs' },
          ],
        },
        { label: 'Admissions', link: '#admissions', isActive: false, showExpandIcon: false },
        { label: 'Contact', link: '#contact', isActive: false, showExpandIcon: false },
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
