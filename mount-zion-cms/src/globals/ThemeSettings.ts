import type { GlobalConfig } from 'payload'

export const ThemeSettings: GlobalConfig = {
  slug: 'theme',
  label: 'Site & Theme Settings',
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
          label: 'Branding & Logos',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              label: 'School / Site Name',
              defaultValue: 'Mount Zion International School',
              required: true,
            },
            {
              name: 'tagline',
              type: 'text',
              label: 'School Tagline / Slogan',
              defaultValue: 'Inspiring Minds. Shaping Futures.',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Primary School Logo (Header & General)',
            },
            {
              name: 'footerLogo',
              type: 'upload',
              relationTo: 'media',
              label: 'Footer Logo (White / Monochrome Variant)',
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
              label: 'Favicon / School Crest Icon',
            },
          ],
        },
        {
          label: 'Typography & Fonts',
          fields: [
            {
              name: 'headingFont',
              type: 'select',
              label: 'Heading Font Family',
              defaultValue: 'Plus Jakarta Sans',
              options: [
                { label: 'Plus Jakarta Sans (Modern & Clean - Default)', value: 'Plus Jakarta Sans' },
                { label: 'Inter (Sleek & Tech)', value: 'Inter' },
                { label: 'Roboto (Neutral & Crisp)', value: 'Roboto' },
                { label: 'Outfit (Friendly & Modern Geometric)', value: 'Outfit' },
                { label: 'K2D (Bold & Dynamic Display)', value: 'K2D' },
                { label: 'Playfair Display (Elegant Serif)', value: 'Playfair Display' },
                { label: 'Merriweather (Classic Editorial Serif)', value: 'Merriweather' },
                { label: 'System Default (Sans-Serif)', value: 'system-ui' },
              ],
            },
            {
              name: 'bodyFont',
              type: 'select',
              label: 'Body Text Font Family',
              defaultValue: 'Plus Jakarta Sans',
              options: [
                { label: 'Plus Jakarta Sans (Clean & Highly Readable - Default)', value: 'Plus Jakarta Sans' },
                { label: 'Inter (Neutral & Standard)', value: 'Inter' },
                { label: 'Roboto (Google Standard)', value: 'Roboto' },
                { label: 'Open Sans (Optimized for Web)', value: 'Open Sans' },
                { label: 'Outfit (Modern)', value: 'Outfit' },
                { label: 'System Default (Sans-Serif)', value: 'system-ui' },
              ],
            },
            {
              name: 'baseFontSize',
              type: 'select',
              label: 'Base Font Size',
              defaultValue: '16px',
              options: [
                { label: '14px (Compact)', value: '14px' },
                { label: '16px (Standard / Default)', value: '16px' },
                { label: '18px (Large & High Legibility)', value: '18px' },
              ],
            },
            {
              name: 'headingWeight',
              type: 'select',
              label: 'Default Heading Weight',
              defaultValue: '700',
              options: [
                { label: '600 (Semi-Bold)', value: '600' },
                { label: '700 (Bold - Default)', value: '700' },
                { label: '800 (Extra-Bold)', value: '800' },
              ],
            },
          ],
        },
        {
          label: 'Global Colors & Background',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'primaryColor',
                  type: 'text',
                  label: 'Primary Brand Color (Hex / CSS)',
                  defaultValue: '#03594E',
                  admin: { width: '50%' },
                },
                {
                  name: 'accentColor',
                  type: 'text',
                  label: 'Secondary / Accent Color (Gold / Yellow)',
                  defaultValue: '#EAB308',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'backgroundColor',
                  type: 'text',
                  label: 'Page Background Color',
                  defaultValue: '#F8FAFC',
                  admin: { width: '50%' },
                },
                {
                  name: 'textColor',
                  type: 'text',
                  label: 'Primary Body Text Color',
                  defaultValue: '#0F172A',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'headerNavBackground',
              type: 'text',
              label: 'Default Header Navbar Background Color',
              defaultValue: '#022C22',
            },
            {
              name: 'footerBackground',
              type: 'text',
              label: 'Default Footer Background Color',
              defaultValue: '#03594E',
            },
          ],
        },
      ],
    },
  ],
}
