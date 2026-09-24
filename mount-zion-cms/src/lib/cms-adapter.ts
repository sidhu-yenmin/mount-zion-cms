import { HeaderData, HeroData, SiteSettingsData } from '@/types/cms'
import { mockHeaderData, mockHeroData, mockSiteSettings } from '@/data/mockData'

/**
 * CMS Data Adapter
 * 
 * Today: Returns structured mock data mirroring Figma.
 * Tomorrow: When Payload collections are defined by your friend,
 * swap the fallback return with `payload.find()` or `payload.findGlobal()`.
 */

export async function getSiteSettings(): Promise<SiteSettingsData> {
  // TODO (Future Payload integration):
  // try {
  //   const payload = await getPayload({ config })
  //   const settings = await payload.findGlobal({ slug: 'site-settings' })
  //   return mapPayloadToSiteSettings(settings)
  // } catch (e) {}

  return mockSiteSettings
}

export async function getHeaderData(): Promise<HeaderData> {
  // TODO (Future Payload integration):
  // try {
  //   const payload = await getPayload({ config })
  //   const header = await payload.findGlobal({ slug: 'header-settings' })
  //   return mapPayloadToHeader(header)
  // } catch (e) {}

  return mockHeaderData
}

export async function getHeroData(): Promise<HeroData> {
  // TODO (Future Payload integration):
  // try {
  //   const payload = await getPayload({ config })
  //   const page = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } } })
  //   return mapPayloadToHero(page.docs[0])
  // } catch (e) {}

  return mockHeroData
}
