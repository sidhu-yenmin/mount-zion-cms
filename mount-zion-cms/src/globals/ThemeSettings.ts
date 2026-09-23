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
                // Modern Web & WordPress
                { label: 'Plus Jakarta Sans (Modern & Clean - Default)', value: 'Plus Jakarta Sans' },
                { label: 'Poppins (Geometric & Modern)', value: 'Poppins' },
                { label: 'Montserrat (Bold & Clean)', value: 'Montserrat' },
                { label: 'Inter (Tech & UI)', value: 'Inter' },
                { label: 'Roboto (Google Standard)', value: 'Roboto' },
                { label: 'Lato (Friendly Corporate)', value: 'Lato' },
                { label: 'Outfit (Modern Geometric)', value: 'Outfit' },
                { label: 'DM Sans (Minimalist)', value: 'DM Sans' },
                { label: 'Oswald (Tall Condensed Display)', value: 'Oswald' },
                { label: 'Bebas Neue (Hero Display)', value: 'Bebas Neue' },
                { label: 'Raleway (Elegant Sans)', value: 'Raleway' },
                { label: 'Nunito (Soft Rounded)', value: 'Nunito' },

                // Google Docs & Office Classics
                { label: 'Arial (Docs Standard Sans)', value: 'Arial' },
                { label: 'Calibri (MS Office Standard)', value: 'Calibri' },
                { label: 'Times New Roman (Formal Academic Docs)', value: 'Times New Roman' },
                { label: 'Georgia (Docs Editorial Serif)', value: 'Georgia' },
                { label: 'Verdana (Legible Screen Sans)', value: 'Verdana' },
                { label: 'Trebuchet MS (Clean Office Sans)', value: 'Trebuchet MS' },
                { label: 'Cambria (Office Serif)', value: 'Cambria' },
                { label: 'Impact (Heavy Bold Header)', value: 'Impact' },

                // Docs Serif & Editorial
                { label: 'EB Garamond (Classic Book & Paper Serif)', value: 'EB Garamond' },
                { label: 'Playfair Display (Royal & Luxury Serif)', value: 'Playfair Display' },
                { label: 'Merriweather (Long-form Reading Serif)', value: 'Merriweather' },
                { label: 'Lora (Docs Magazine Serif)', value: 'Lora' },
                { label: 'Bitter (Docs Contemporary Slab Serif)', value: 'Bitter' },
                { label: 'Spectral (Docs Formal Editorial Serif)', value: 'Spectral' },
                { label: 'Cinzel (Classical Royal Serif)', value: 'Cinzel' },
                { label: 'Cormorant Garamond (Fine-Art Serif)', value: 'Cormorant Garamond' },
                { label: 'PT Serif (Academic Paper Serif)', value: 'PT Serif' },

                // Google Docs Specialty & Reading
                { label: 'Lexend (Google Docs Reading Fluency)', value: 'Lexend' },
                { label: 'Roboto Slab (Docs Slab Serif)', value: 'Roboto Slab' },
                { label: 'Source Sans 3 (Clean Document Sans)', value: 'Source Sans 3' },
                { label: 'Comfortaa (Rounded Modern)', value: 'Comfortaa' },
                { label: 'Caveat (Docs Handwriting Script)', value: 'Caveat' },
                { label: 'Pacifico (Docs Casual Script)', value: 'Pacifico' },
                { label: 'Courier New (Docs Monospace / Typewriter)', value: 'Courier New' },
                { label: 'System Default (Sans-Serif)', value: 'system-ui' },
              ],
            },
            {
              name: 'bodyFont',
              type: 'select',
              label: 'Body Text Font Family',
              defaultValue: 'Plus Jakarta Sans',
              options: [
                // Modern Web & WordPress
                { label: 'Plus Jakarta Sans (Clean & Highly Readable - Default)', value: 'Plus Jakarta Sans' },
                { label: 'Poppins (Geometric & Modern)', value: 'Poppins' },
                { label: 'Inter (Neutral & Standard UI)', value: 'Inter' },
                { label: 'Roboto (Google Standard)', value: 'Roboto' },
                { label: 'Open Sans (Optimized for Web)', value: 'Open Sans' },
                { label: 'Lato (Warm & Friendly)', value: 'Lato' },
                { label: 'DM Sans (Minimalist Sans)', value: 'DM Sans' },
                { label: 'Nunito Sans (Rounded Modern)', value: 'Nunito Sans' },
                { label: 'Outfit (Modern)', value: 'Outfit' },

                // Google Docs & Office Standards
                { label: 'Arial (Docs Standard Sans)', value: 'Arial' },
                { label: 'Calibri (MS Office Standard)', value: 'Calibri' },
                { label: 'Times New Roman (Formal Academic Docs)', value: 'Times New Roman' },
                { label: 'Georgia (Docs Editorial Serif)', value: 'Georgia' },
                { label: 'Verdana (Legible Screen Sans)', value: 'Verdana' },
                { label: 'Trebuchet MS (Office Sans)', value: 'Trebuchet MS' },

                // Docs Reading & Serifs
                { label: 'Lexend (Google Docs High Fluency)', value: 'Lexend' },
                { label: 'Source Sans 3 (Document Sans)', value: 'Source Sans 3' },
                { label: 'EB Garamond (Classic Book Serif)', value: 'EB Garamond' },
                { label: 'Merriweather (Long-form Reading Serif)', value: 'Merriweather' },
                { label: 'Lora (Editorial Serif)', value: 'Lora' },
                { label: 'Bitter (Contemporary Serif)', value: 'Bitter' },
                { label: 'Spectral (Formal Editorial Serif)', value: 'Spectral' },
                { label: 'Courier New (Monospace / Code Docs)', value: 'Courier New' },
                { label: 'System Default (Sans-Serif)', value: 'system-ui' },
              ],
            },
            {
              name: 'baseFontSize',
              type: 'select',
              label: 'Base Font Size',
              defaultValue: '16px',
              options: [
                { label: '12px (Small / Fine Print)', value: '12px' },
                { label: '13px (Sub-Compact)', value: '13px' },
                { label: '14px (Compact / Body Small)', value: '14px' },
                { label: '15px (Medium-Compact)', value: '15px' },
                { label: '16px (Standard / Default)', value: '16px' },
                { label: '17px (Medium / Editorial)', value: '17px' },
                { label: '18px (Large / High Legibility)', value: '18px' },
                { label: '19px (Large+)', value: '19px' },
                { label: '20px (Extra Large / XL)', value: '20px' },
                { label: '22px (2X Large / XXL)', value: '22px' },
                { label: '24px (Lead / Jumbo)', value: '24px' },
              ],
            },
            {
              name: 'headingWeight',
              type: 'select',
              label: 'Default Heading Weight',
              defaultValue: '700',
              options: [
                { label: '100 (Thin / Hairline)', value: '100' },
                { label: '200 (Extra-Light)', value: '200' },
                { label: '300 (Light)', value: '300' },
                { label: '400 (Normal / Regular)', value: '400' },
                { label: '500 (Medium)', value: '500' },
                { label: '600 (Semi-Bold)', value: '600' },
                { label: '700 (Bold - Default)', value: '700' },
                { label: '800 (Extra-Bold)', value: '800' },
                { label: '900 (Black / Heavy)', value: '900' },
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
