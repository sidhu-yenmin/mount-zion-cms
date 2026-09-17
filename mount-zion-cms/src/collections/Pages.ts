import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/HeroBlock'
import { ProgramsBlock } from '../blocks/ProgramsBlock'
import { FeatureSplitBlock } from '../blocks/FeatureSplitBlock'
import { FacilitiesBlock } from '../blocks/FacilitiesBlock'
import { ToppersBlock } from '../blocks/ToppersBlock'
import { CampusLifeBlock } from '../blocks/CampusLifeBlock'
import { TestimonialsBlock } from '../blocks/TestimonialsBlock'
import { NewsEventsBlock } from '../blocks/NewsEventsBlock'
import { CtaBannerBlock } from '../blocks/CtaBannerBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
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
      name: 'layout',
      type: 'blocks',
      label: 'Page Content Blocks',
      blocks: [
        HeroBlock,
        ProgramsBlock,
        FeatureSplitBlock,
        FacilitiesBlock,
        ToppersBlock,
        CampusLifeBlock,
        TestimonialsBlock,
        NewsEventsBlock,
        CtaBannerBlock,
      ],
    },
  ],
}
