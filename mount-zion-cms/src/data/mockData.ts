import { HeaderData, HeroData, SiteSettingsData, StatsStripData } from '@/types/cms'

export const mockSiteSettings: SiteSettingsData = {
  schoolName: 'Mount Zion',
  schoolSubtitle: 'International School - CBSE',
  logoUrl: '/images/school-logo.png',
  contactPhone: '+91 - 9876543210',
  contactEmail: 'info@mountzion.com',
  applyNowUrl: '#apply',
}

export const mockHeaderData: HeaderData = {
  phone: '+91 - 9876543210',
  email: 'info@mountzion.com',
  navItems: [
    { label: 'Home', url: '/', isActive: true, showExpandIcon: false },
    {
      label: 'Our School',
      url: '#about',
      isActive: false,
      showExpandIcon: true,
      children: [
        { label: 'About Mount Zion', url: '#about' },
        { label: 'Vision & Mission', url: '#vision' },
        { label: 'Leadership', url: '#leadership' },
      ],
    },
    {
      label: 'Education',
      url: '#education',
      isActive: false,
      showExpandIcon: true,
      children: [
        { label: 'CBSE Curriculum', url: '#curriculum' },
        { label: 'Primary School', url: '#primary' },
        { label: 'Middle School', url: '#middle' },
        { label: 'Senior Secondary', url: '#senior' },
      ],
    },
    {
      label: 'Student Life',
      url: '#student-life',
      isActive: false,
      showExpandIcon: true,
      children: [
        { label: 'Sports & Athletics', url: '#sports' },
        { label: 'Arts & Culture', url: '#arts' },
        { label: 'Student Clubs', url: '#clubs' },
      ],
    },
    { label: 'Admissions', url: '#admissions', isActive: false, showExpandIcon: false },
    { label: 'Contact', url: '#contact', isActive: false, showExpandIcon: false },
  ],
}

export const mockStatsData: StatsStripData = {
  // If useImageFallback is true, it uses the static Figma export image.
  // If false or when live CMS stats are loaded, it dynamically renders editable text & numbers!
  useImageFallback: false,
  imageSrc: '/images/metrics.png',
  stats: [
    {
      id: '1',
      number: '30+',
      label: 'Academic Experience',
    },
    {
      id: '2',
      number: '3,000+',
      label: 'Students Enrolled with us',
    },
    {
      id: '3',
      number: '50+',
      label: 'Dedicated Educators',
    },
    {
      id: '4',
      number: '10+',
      label: 'Awards & Achievements',
    },
  ],
}

export const mockHeroData: HeroData = {
  tag: 'MOUNTZION',
  headingLine1: 'Nurturing Minds.',
  headingLine2: 'Building Character.',
  headingLine3: 'Inspiring Future Leaders.',
  primaryCtaText: 'Explore',
  primaryCtaLink: '#explore',
  secondaryCtaText: 'Admission',
  secondaryCtaLink: '#admission',
  backgroundImage: '/images/hero-student.png',
  discoverMoreText: 'Discover More • Discover More •',
  videoUrl: '#tour',
  statsData: mockStatsData,
}
