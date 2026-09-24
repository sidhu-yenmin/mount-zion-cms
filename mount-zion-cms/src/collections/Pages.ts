import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/HeroBlock'
import { ProgramsBlock } from '../blocks/ProgramsBlock'
import { AboutUsBlock } from '../blocks/AboutUsBlock'
import { FacilitiesBlock } from '../blocks/FacilitiesBlock'
import { ToppersBlock } from '../blocks/ToppersBlock'
import { CampusLifeBlock } from '../blocks/CampusLifeBlock'
import { TestimonialsBlock } from '../blocks/TestimonialsBlock'
import { NewsEventsBlock } from '../blocks/NewsEventsBlock'
import { colorField } from '../fields/colorField'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: (doc) => {
      const slug = typeof doc?.slug === 'string' ? doc.slug : ''
      return slug === 'home' ? '/?preview=true' : `/${slug}?preview=true`
    },
    components: {
      edit: {
        PreviewButton: '/components/admin/CustomPreviewButton#CustomPreviewButton',
      },
    },
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
      label: 'Page Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      label: 'URL Slug',
      admin: {
        position: 'sidebar',
        description: 'e.g. "home" for landing page, "about-us", etc.',
      },
    },
    {
      name: 'headerVariant',
      type: 'select',
      label: 'Header Style for this Page',
      defaultValue: 'transparent',
      options: [
        { label: 'Transparent (Over Hero Banner)', value: 'transparent' },
        { label: 'Solid Green Background', value: 'solid-green' },
        { label: 'Solid White Background', value: 'solid-white' },
        { label: 'Hide Header', value: 'hidden' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'menuGroup',
      type: 'relationship',
      relationTo: 'menu-groups',
      label: 'Custom Page Menu Group (Optional)',
      admin: {
        position: 'sidebar',
        description: 'Optionally override default navigation with a specific Menu Group on this page.',
      },
    },
    colorField({
      name: 'backgroundColor',
      label: 'Page Background Color (Hex / CSS)',
      defaultValue: '#FFFFFF',
      admin: {
        position: 'sidebar',
        description: 'e.g. #FFFFFF, #F8FAFC, #03594E',
      },
    }),
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Page Background Image (Optional)',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Content Blocks',
      blocks: [
        HeroBlock,
        AboutUsBlock,
        ProgramsBlock,
        FacilitiesBlock,
        ToppersBlock,
        CampusLifeBlock,
        TestimonialsBlock,
        NewsEventsBlock,
      ],
    },
  ],
}
