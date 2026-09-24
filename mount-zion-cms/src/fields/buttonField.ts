import type { Field } from 'payload'

export interface CreateButtonFieldOptions {
  name: string
  label: string
  defaultText?: string
  defaultUrl?: string
  defaultLinkType?: 'page' | 'custom'
  showOpenInNewTab?: boolean
}

export function createButtonField({
  name,
  label,
  defaultText = 'Learn More',
  defaultUrl = '/',
  defaultLinkType = 'page',
  showOpenInNewTab = true,
}: CreateButtonFieldOptions): Field {
  return {
    name,
    type: 'group',
    label,
    fields: [
      {
        name: 'text',
        type: 'text',
        label: 'Button Label / Text',
        defaultValue: defaultText,
      },
      {
        name: 'linkType',
        type: 'radio',
        label: 'Link Target Type',
        defaultValue: defaultLinkType,
        options: [
          { label: 'Select CMS Page (Auto-links Slug)', value: 'page' },
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
        label: 'Custom URL / Path / Anchor',
        defaultValue: defaultUrl,
        admin: {
          condition: (_, siblingData) => siblingData?.linkType === 'custom',
        },
      },
      ...(showOpenInNewTab
        ? [
            {
              name: 'openInNewTab',
              type: 'checkbox' as const,
              label: 'Open in new tab?',
              defaultValue: false,
            },
          ]
        : []),
    ],
  }
}
