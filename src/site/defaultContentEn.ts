import type { AboutContent, ContactContent, HomeContent, ModulesContent } from './types';

export const DEFAULT_EN_HOME: HomeContent = {
  heroBadge: 'The Future R&D and Sample Platform',
  heroTitleLine1: 'In Textiles,',
  heroTitleHighlight: 'A New Era.',
  heroSubtitle:
    'Say goodbye to messy spreadsheets, lost samples, and endless revisions. With Samplify.tr, turn your production flow into craft.',
  primaryCta: 'Join the waitlist',
  secondaryCta: 'Explore modules',
  featuresHeading: 'Reject the chaos.',
  featuresHeadingAccent: 'Run the process.',
  featuresIntro:
    'Samplify.tr closes the gap between the pattern room and the account manager. From tech pack to approval, it turns the whole flow into a smooth, digital experience.',
  f1Title: 'Flexible modular architecture',
  f1Body:
    "You're not locked into bloated suites. Start with what your sample room needs today; as your R&D processes mature, add modules and grow your ecosystem step by step.",
  f2Title: 'Lightning fast',
  f2Body:
    'Act instantly with real-time data flows. Use ERP/PLM integrations for bidirectional data synchronization.',
  f3Title: 'Bank-grade security',
  f3Body: 'Your designs and data stay safe in the cloud.',
  f4Title: 'Visual reporting',
  f4Body:
    'Data has never been this pleasant to read. Smart dashboards keep you in control.',
  f4LinkLabel: 'View details',
  ctaTitle: 'The future is very close.',
  ctaSubtitle:
    'With Samplify.tr we are setting a new standard in textile sample management. Reserve your spot among the first to try it.',
  ctaButton: 'Request early access',
};

export const DEFAULT_EN_MODULES: ModulesContent = {
  badge: 'In development',
  titleLine1: 'Modular by design.',
  titleLine2: 'Zero chaos.',
  intro:
    'The Samplify.tr ecosystem is built on a flexible foundation that adapts to textile R&D dynamics. Start with the modules you need and expand your ecosystem without limits as we ship new solutions.',
  stTitle: 'Trackify',
  stBody:
    'Do not leave sample planning and production to chance. Plan and visualize every step from fabric intake to PP Sample approval on one platform. Break down walls between workshop, pattern room, and office for full control on the critical path.',
  stFeatures: [
    'Visual Kanban boards',
    'Real-time process planning',
    'Revision timeline',
  ],
  stCardTag: 'v1.0 soon',
  stCardTitle: 'Sample management redefined',
  mfTitle: 'Measurify',
  mfBody:
    'Zero-error policy in pattern and measurement. Dynamic tables, automatic tolerance calculations, and one-click Tech Pack generation.',
  mfFeatures: ['Smart stretch calculation', 'Version comparison', 'PDF Tech Pack export'],
  mfCardTag: 'v1.0 soon',
  mfCardTitle: 'Millimetric precision',
};

export const DEFAULT_EN_ABOUT: AboutContent = {
  titleLine1: 'Textiles’',
  titleLine2: 'Digital Future.',
  visionLabel: 'Our vision',
  visionTitle:
    'We are reinventing traditional textile R&D from the ground up with the power and agility of modern software.',
  whyLabel: 'Why Samplify.tr?',
  whyBody:
    'Because we do not just write code at a desk—we live the shop floor. We know the dust of the workshop, the scramble to land that first-hit sample, and the outsized cost of a single measurement mistake. We pair that hard-won industry experience with agile web technology that cuts through the chaos.',
  ctaTitle: 'Be part of the story',
  ctaBody:
    'Samplify.tr is in development. Join our waitlist to be among the first users of a product that will change the industry.',
  ctaButton: 'Request early access',
};

export const DEFAULT_EN_CONTACT: ContactContent = {
  badge: 'Early access',
  titleLine1: 'Reserve',
  titleHighlight: 'your place.',
  intro:
    'Samplify.tr is entering closed beta. Fill out the form to be among a limited number of first users and launch benefits.',
  email: 'info@samplify.tr',
  location: 'Istanbul, Türkiye',
};
