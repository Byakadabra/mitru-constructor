import type { Dict } from './es';

/** English copy. */
const en: Dict = {
  lang: 'en',
  locale: 'en_GB',
  langName: 'English',

  meta: {
    title: 'Electrician & Renovations in Reus | MITRU CONSTRUCTOR',
    description:
      'Electrical installations, plumbing, renovations, bathrooms, kitchens, drywall and air conditioning in Reus and nearby. Over 30 years in the trade. Free quotes.',
    ogAlt: 'MITRU CONSTRUCTOR — installations and renovations in Reus',
  },

  nav: {
    skip: 'Skip to content',
    services: 'Services',
    about: 'About us',
    process: 'How we work',
    area: 'Area',
    faq: 'FAQ',
    contact: 'Contact',
    cta: 'Get a quote',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    language: 'Language',
    call: 'Call',
    whatsapp: 'WhatsApp',
    quote: 'Quote',
    home: 'Home',
    mainNav: 'Main navigation',
    quickContact: 'Quick contact',
  },

  whatsappText: 'Hello, I would like a quote from MITRU CONSTRUCTOR.',
  whatsappLabel: 'Message us on WhatsApp',

  hero: {
    eyebrow: 'Electrical · Plumbing · Renovations — Reus and nearby',
    lines: ['Installations and', 'renovations in Reus,', 'done right first time.'],
    sub:
      'Electrical installations, plumbing, full renovations, bathrooms, kitchens, drywall, painting and air conditioning. One team for the whole job, with a free quote.',
    ctaPrimary: 'Get a free quote',
    ctaSecondary: 'See services',
    facts: [
      { strong: '30+ years', text: 'in the building trade' },
      { strong: 'Free', text: 'no-obligation quote' },
      { strong: '≈30 km', text: 'around Reus' },
    ],
    illoLabel: 'Illustration: a house under construction with electrical and plumbing installations',
    tags: { electric: 'Electrical', water: 'Plumbing', wall: 'Drywall', paint: 'Painting' },
  },

  services: {
    kicker: 'Services',
    title: 'Everything your home or business premises needs',
    intro:
      'Electrical installations are our strongest trade, but we handle the whole job, so you don’t have to find and coordinate several tradespeople.',
    featured: 'Main service',
    benefit: 'For you',
    cta: 'Get a quote',
    ctaFor: 'Get a quote for',
    items: {
      electricidad: {
        name: 'Electrical installations',
        desc: 'New installations and full rewiring, consumer units, lighting points and sockets, lighting and fault finding in homes and business premises.',
        benefit: 'A safe, tidy installation designed for everything you plan to plug in.',
      },
      reformas: {
        name: 'Building & renovations',
        desc: 'Full or partial renovations of homes, premises and shops: layout changes, demolition, flooring, wall finishes and final touches.',
        benefit: 'One team coordinates every trade from start to finish.',
      },
      fontaneria: {
        name: 'Plumbing',
        desc: 'Installing and replacing pipes, drains, taps and sanitaryware, electric water heaters and leak repairs.',
        benefit: 'Water where you need it, with no surprises hidden behind the wall.',
      },
      'banos-cocinas': {
        name: 'Bathrooms & kitchens',
        desc: 'Complete bathroom and kitchen renovations: plumbing, electrics, masonry, tiling and finishes in a single job.',
        benefit: 'Every trade in one job and one quote.',
      },
      climatizacion: {
        name: 'Air conditioning & heat pumps',
        desc: 'Air conditioning and heat pump installation, plus air-source (aerothermal) systems for heating and hot water.',
        benefit: 'Year-round comfort with efficient systems.',
      },
      albanileria: {
        name: 'Masonry',
        desc: 'Partition walls, chasing, screeds, rendering, tiling and all kinds of small building works.',
        benefit: 'Solid groundwork, which is what everything else stands on.',
      },
      pladur: {
        name: 'Drywall (Pladur)',
        desc: 'Plasterboard partitions, suspended ceilings, wall linings and bulkheads to reshape or refresh a space.',
        benefit: 'New spaces quickly and with minimal building work.',
      },
      pintura: {
        name: 'Painting',
        desc: 'Interior and exterior painting, with wall preparation, skimming and crack repair before painting.',
        benefit: 'Clean finishes, with preparation that shows over the years.',
      },
      reparaciones: {
        name: 'Repairs & maintenance',
        desc: 'Electrical and plumbing faults, small repairs and maintenance for homes, shops and hotels.',
        benefit: 'Someone you can trust for whatever comes up at home or at work.',
      },
    },
    other: 'Other / several services',
  },

  about: {
    kicker: 'About us',
    title: 'Over 30 years on site, with the same way of working',
    lead:
      'MITRU CONSTRUCTOR has been in the building trade for more than 30 years. We work in Reus and the surrounding area with one simple goal: the job done properly, as quickly as possible and at a price that is fair for both sides.',
    yearsLabel: 'years in the trade',
    values: [
      {
        title: 'Done right first time',
        text: 'We would rather spend a little more time or material than leave a job half done. What we build has to last.',
      },
      {
        title: 'Fast, without cutting corners',
        text: 'We organise each job to finish as soon as possible. If you have a deadline, we can agree to work on public holidays too.',
      },
      {
        title: 'Fair pricing',
        text: 'We look for the most economical solution that works well, for you and for us. No padded line items.',
      },
      {
        title: 'One team for the whole job',
        text: 'Electrics, plumbing, masonry, drywall and painting: no juggling tradespeople or waiting for one to finish before the next can start.',
      },
    ],
    clientsTitle: 'Who we work for',
    clients: [
      { title: 'Homeowners', text: 'Renovations, installations and repairs in your home.' },
      { title: 'Shops & premises', text: 'Fit-outs, renovations and installations.' },
      { title: 'Hotels', text: 'Room and common-area renovations, and maintenance.' },
      { title: 'Building contractors', text: 'Electrical, plumbing and other trades for your projects.' },
    ],
  },

  process: {
    kicker: 'How we work',
    title: 'From the first call to the finished job',
    intro: 'A clear process with no surprises: we don’t start until you have the quote and give us the go-ahead.',
    steps: [
      { title: 'Get in touch', text: 'Call us, message us on WhatsApp or fill in the form.' },
      { title: 'Tell us what you need', text: 'Describe the job, the type of property and any deadline.' },
      { title: 'We assess the job', text: 'We work out what needs doing, the materials and the timeline.' },
      { title: 'Free quote', text: 'We send you a detailed quote. You decide, with no obligation.' },
      { title: 'Work and handover', text: 'Once you approve, we start and hand over the finished job.' },
    ],
  },

  area: {
    kicker: 'Service area',
    title: 'In Reus and nearby',
    text: 'We work in Reus and in Camp de Tarragona towns up to about 30 km away.',
    townsLabel: 'For example',
    mapLabel: 'Diagram of the service area: about 30 km around Reus',
    urgentTitle: 'Breakdowns and emergencies',
    urgentText: 'We attend urgent breakdowns subject to availability. The sooner you let us know, the sooner we can plan around it.',
    holidayTitle: 'Jobs with a deadline',
    holidayText: 'If the job needs it and we agree it with you, we also work on public holidays to meet the deadline.',
  },

  faq: {
    kicker: 'FAQ',
    title: 'Questions we are often asked',
    items: [
      { q: 'How much does a quote cost?', a: 'Nothing. Quotes are free and with no obligation: we send it and you decide.' },
      {
        q: 'Why are there no prices on the website?',
        a: 'Every job is different. We prefer to assess your case and give you a detailed quote rather than a generic rate.',
      },
      {
        q: 'Which area do you cover?',
        a: 'Reus and the towns around it, up to about 30 km: Tarragona, Salou, Cambrils, Vila-seca and others in Camp de Tarragona.',
      },
      { q: 'Do you handle emergencies?', a: 'Yes, subject to availability. Call or WhatsApp us and we will tell you when we can come.' },
      {
        q: 'Do you work for businesses?',
        a: 'Yes. Besides homeowners, we work for shops, hotels and building contractors that need trades such as electrical or plumbing.',
      },
      {
        q: 'Can you work on public holidays?',
        a: 'If the job has a deadline and we agree on it, yes. It is not the norm, but we adapt when needed.',
      },
    ],
  },

  contact: {
    kicker: 'Contact',
    title: 'Get your free quote',
    intro: 'Tell us what you need and we will get back to you as soon as possible. No obligation.',
    form: {
      legend: 'Quote request',
      name: 'Name',
      contact: 'Phone or email',
      contactHint: 'We will only use it to reply to you.',
      service: 'Service',
      servicePlaceholder: 'Choose a service',
      town: 'Town',
      optional: 'optional',
      message: 'Describe the job',
      messageHint: 'What needs doing, the type of property and any deadline.',
      privacyBefore: 'I have read and accept the',
      privacyLink: 'privacy policy',
      submit: 'Send request',
      sending: 'Sending…',
      required: 'required',
      successTitle: 'Request sent',
      successText: 'Thank you. We have received your request and will contact you as soon as possible.',
      another: 'Send another request',
      errorTitle: 'Your request could not be sent',
      errorText: 'Please try again in a few minutes, or contact us by phone or WhatsApp.',
      offline: 'You seem to be offline. Check your connection and try again.',
      disabled: 'Online sending is not active yet. In the meantime, please call or WhatsApp us.',
      errors: {
        name: 'Enter your name.',
        contact: 'Enter a valid phone number or email address.',
        service: 'Choose a service.',
        message: 'Tell us a little more (at least 15 characters).',
        privacy: 'You must accept the privacy policy.',
        summary: 'Please check the highlighted fields.',
      },
      emailSubject: 'New quote request — MITRU CONSTRUCTOR website',
    },
    details: {
      title: 'Prefer to talk directly?',
      person: 'Contact person',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      whatsappAction: 'Open chat',
      email: 'Email',
      hours: 'Opening hours',
      hoursValue: '9:00 to 13:00',
    },
  },

  footer: {
    tagline: 'Electrical installations, plumbing and renovations in Reus and nearby.',
    navTitle: 'Navigation',
    contactTitle: 'Contact',
    legalTitle: 'Legal',
    owner: 'Owner',
    rights: 'All rights reserved.',
  },

  legal: {
    notice: 'Legal notice',
    privacy: 'Privacy policy',
    cookies: 'Cookie policy',
    pending: 'to be completed',
    draftNote:
      'Provisional text for the pilot. It must be reviewed and completed with the owner’s details before final publication. The Spanish version prevails.',
    updated: 'Last updated',
    back: 'Back to home',
  },

  notFound: {
    title: 'Page not found',
    text: 'The page you are looking for does not exist or has moved.',
    back: 'Back to home',
  },
};

export default en;
