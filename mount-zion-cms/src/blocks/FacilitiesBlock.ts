import type { Block } from 'payload'

export const FacilitiesBlock: Block = {
  slug: 'facilities',
  labels: {
    singular: 'Facilities & Gallery Tabs',
    plural: 'Facilities & Gallery Sections',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge / Tagline',
      defaultValue: 'FACILITIES AND INFRASTRUCTURE',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'Where Learning, Discovery & Growth Come Together',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
    },
    {
      name: 'tabs',
      type: 'array',
      label: 'Facility Categories & Photos',
      minRows: 1,
      fields: [
        {
          name: 'tabName',
          type: 'text',
          label: 'Category Name (e.g. ALL, SCIENCE LAB, LIBRARY, PLAYGROUND)',
          required: true,
        },
        {
          name: 'images',
          type: 'array',
          label: 'Category Images',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'caption',
              type: 'text',
              label: 'Caption / Facility Title',
            },
          ],
        },
      ],
    },
  ],
}
