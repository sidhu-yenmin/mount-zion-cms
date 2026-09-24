import type { GlobalConfig } from 'payload'
import { createButtonField } from '../fields/buttonField'
import { colorField } from '../fields/colorField'

export const Footer: GlobalConfig = {
  slug: 'footer',
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
              label: 'Footer Menu Group',
              admin: {
                description: 'Select the Menu Group to display in the footer (defaults to "Footer" group if empty). Menus inside this group will render as footer columns.',
              },
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
                      defaultValue: '+9173737 51513',
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
                      defaultValue: 'cbse@mountzionschools.com',
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
                      defaultValue: 'Pilivalam, Lembalakkudi,\nPudukottai - 622507',
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
              name: 'socialLinks',
              type: 'array',
              label: 'Social Media Links',
              defaultValue: [
                { platform: 'facebook', url: 'https://facebook.com' },
                { platform: 'instagram', url: 'https://instagram.com' },
                { platform: 'youtube', url: 'https://youtube.com' },
                { platform: 'twitter', url: 'https://x.com' },
                { platform: 'linkedin', url: 'https://linkedin.com' },
              ],
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
                          label: 'CTA Banner Background Color',
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
              label: 'Footer Logo',
            },
            colorField({
              name: 'backgroundColor',
              label: 'Main Footer Background Color',
              defaultValue: '#03594E',
            }),
          ],
        },
      ],
    },
  ],
}
