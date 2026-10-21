import type { ServiceId } from '../config/site';

/** Textos en castellano (idioma principal). ca.ts y en.ts siguen esta misma forma. */
const es = {
  lang: 'es',
  locale: 'es_ES',
  langName: 'Castellano',

  meta: {
    title: 'Electricista y reformas en Reus | MITRU CONSTRUCTOR',
    description:
      'Instalaciones eléctricas, fontanería, reformas, baños, cocinas, pladur y climatización en Reus y alrededores. Más de 30 años en el sector. Presupuesto gratuito.',
    ogAlt: 'MITRU CONSTRUCTOR — instalaciones y reformas en Reus',
  },

  nav: {
    skip: 'Saltar al contenido',
    services: 'Servicios',
    about: 'Quiénes somos',
    process: 'Cómo trabajamos',
    area: 'Zona',
    faq: 'Preguntas',
    contact: 'Contacto',
    cta: 'Pedir presupuesto',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    language: 'Idioma',
    call: 'Llamar',
    whatsapp: 'WhatsApp',
    quote: 'Presupuesto',
    home: 'Inicio',
    mainNav: 'Navegación principal',
    quickContact: 'Contacto rápido',
  },

  whatsappText: 'Hola, quiero pedir un presupuesto a MITRU CONSTRUCTOR.',
  whatsappLabel: 'Escríbenos por WhatsApp',

  hero: {
    eyebrow: 'Electricidad · Fontanería · Reformas — Reus y alrededores',
    lines: ['Instalaciones y reformas', 'en Reus, bien hechas', 'a la primera.'],
    sub:
      'Instalaciones eléctricas, fontanería, reformas integrales, baños, cocinas, pladur, pintura y climatización. Un solo equipo para toda la obra, con presupuesto gratuito.',
    ctaPrimary: 'Pedir presupuesto gratis',
    ctaSecondary: 'Ver servicios',
    facts: [
      { strong: '+30 años', text: 'en el sector de la obra' },
      { strong: 'Gratis', text: 'presupuesto sin compromiso' },
      { strong: '≈30 km', text: 'alrededor de Reus' },
    ],
    illoLabel: 'Ilustración: casa en construcción con instalación eléctrica y de fontanería',
    tags: { electric: 'Electricidad', water: 'Fontanería', wall: 'Pladur', paint: 'Pintura' },
  },

  services: {
    kicker: 'Servicios',
    title: 'Todo lo que necesita tu vivienda o tu local',
    intro:
      'Nuestro punto fuerte son las instalaciones eléctricas, pero resolvemos la obra completa: así no tienes que buscar ni coordinar varios gremios.',
    featured: 'Servicio principal',
    benefit: 'Para ti',
    cta: 'Pedir presupuesto',
    ctaFor: 'Pedir presupuesto de',
    items: {
      electricidad: {
        name: 'Instalaciones eléctricas',
        desc: 'Instalaciones nuevas y renovaciones completas, cuadros eléctricos, puntos de luz y enchufes, iluminación y localización de averías en viviendas y locales.',
        benefit: 'Una instalación segura y ordenada, pensada para todo lo que vas a conectar.',
      },
      reformas: {
        name: 'Construcción y reformas',
        desc: 'Reformas integrales o parciales de viviendas, locales y comercios: redistribución, derribos, suelos, revestimientos y acabados.',
        benefit: 'Un solo equipo coordina todos los oficios, de principio a fin.',
      },
      fontaneria: {
        name: 'Fontanería',
        desc: 'Instalación y renovación de tuberías, desagües, grifería y sanitarios, termos eléctricos y reparación de fugas.',
        benefit: 'Agua donde la necesitas, sin sorpresas escondidas detrás de la pared.',
      },
      'banos-cocinas': {
        name: 'Baños y cocinas',
        desc: 'Reforma completa de baños y cocinas: fontanería, electricidad, albañilería, alicatado y acabados en una sola obra.',
        benefit: 'Todos los oficios en una misma obra y en un mismo presupuesto.',
      },
      climatizacion: {
        name: 'Climatización y aerotermia',
        desc: 'Instalación de aire acondicionado y bomba de calor, y sistemas de aerotermia para calefacción y agua caliente.',
        benefit: 'Confort todo el año con sistemas eficientes.',
      },
      albanileria: {
        name: 'Albañilería',
        desc: 'Tabiques, regatas, recrecidos, enfoscados, alicatados y todo tipo de pequeñas obras.',
        benefit: 'Una base bien hecha, que es lo que sostiene todo lo demás.',
      },
      pladur: {
        name: 'Pladur',
        desc: 'Tabiques, falsos techos, trasdosados y foseados de placa de yeso laminado para redistribuir o renovar espacios.',
        benefit: 'Espacios nuevos en poco tiempo y con poca obra.',
      },
      pintura: {
        name: 'Pintura',
        desc: 'Pintura interior y exterior, con preparación de paredes, alisado y reparación de grietas antes de pintar.',
        benefit: 'Acabados limpios, con una preparación que se nota con los años.',
      },
      reparaciones: {
        name: 'Reparaciones y mantenimiento',
        desc: 'Averías eléctricas y de fontanería, pequeñas reparaciones y mantenimiento de viviendas, comercios y hoteles.',
        benefit: 'Alguien de confianza para lo que surja en tu casa o tu negocio.',
      },
    } satisfies Record<ServiceId, { name: string; desc: string; benefit: string }>,
    other: 'Otro / varios servicios',
  },

  about: {
    kicker: 'Quiénes somos',
    title: 'Más de 30 años en obra, con la misma forma de trabajar',
    lead:
      'En MITRU CONSTRUCTOR llevamos más de 30 años en el sector de la construcción. Trabajamos en Reus y alrededores con un objetivo sencillo: que el trabajo quede bien hecho, en el menor tiempo posible y a un precio justo para las dos partes.',
    yearsLabel: 'años en el sector',
    values: [
      {
        title: 'Bien hecho a la primera',
        text: 'Preferimos invertir algo más de tiempo o de material antes que dejar un trabajo a medias. Lo que hacemos tiene que durar.',
      },
      {
        title: 'Rápidos, sin descuidar nada',
        text: 'Organizamos la obra para terminar cuanto antes. Si tu obra tiene fecha límite, podemos acordar trabajar también en días festivos.',
      },
      {
        title: 'Precio ajustado',
        text: 'Buscamos la solución más económica que funcione bien, para ti y para nosotros. Sin partidas infladas.',
      },
      {
        title: 'Un solo equipo para toda la obra',
        text: 'Electricidad, fontanería, albañilería, pladur y pintura: no tienes que coordinar gremios ni esperar a uno para que empiece el siguiente.',
      },
    ],
    clientsTitle: 'Para quién trabajamos',
    clients: [
      { title: 'Particulares', text: 'Reformas, instalaciones y reparaciones en tu vivienda.' },
      { title: 'Comercios y locales', text: 'Adecuación de locales, reformas e instalaciones.' },
      { title: 'Hoteles', text: 'Reformas de habitaciones y zonas comunes, y mantenimiento.' },
      { title: 'Empresas constructoras', text: 'Electricidad, fontanería y otros oficios para vuestras obras.' },
    ],
  },

  process: {
    kicker: 'Cómo trabajamos',
    title: 'De la primera llamada a la obra terminada',
    intro: 'Un proceso claro, sin sorpresas: no empezamos hasta que tienes el presupuesto y nos das el visto bueno.',
    steps: [
      { title: 'Contacto', text: 'Llámanos, escríbenos por WhatsApp o rellena el formulario.' },
      { title: 'Nos cuentas qué necesitas', text: 'Nos explicas el trabajo, el tipo de inmueble y si tienes una fecha límite.' },
      { title: 'Valoramos el trabajo', text: 'Estudiamos qué hay que hacer, los materiales y el plazo.' },
      { title: 'Presupuesto gratuito', text: 'Te enviamos un presupuesto detallado. Tú decides, sin compromiso.' },
      { title: 'Ejecución y entrega', text: 'Con tu visto bueno empezamos y te entregamos la obra terminada.' },
    ],
  },

  area: {
    kicker: 'Zona de trabajo',
    title: 'En Reus y alrededores',
    text: 'Trabajamos en Reus y en los municipios del Camp de Tarragona situados a unos 30 km como máximo.',
    townsLabel: 'Por ejemplo',
    mapLabel: 'Esquema de la zona de trabajo: unos 30 km alrededor de Reus',
    urgentTitle: 'Averías y urgencias',
    urgentText: 'Atendemos averías urgentes según disponibilidad. Cuanto antes nos avises, antes podremos organizarnos.',
    holidayTitle: 'Obras con fecha límite',
    holidayText: 'Si la obra lo necesita y lo acordamos contigo, también trabajamos en días festivos para cumplir el plazo.',
  },

  faq: {
    kicker: 'Preguntas frecuentes',
    title: 'Lo que nos suelen preguntar',
    items: [
      { q: '¿Cuánto cuesta el presupuesto?', a: 'Nada. El presupuesto es gratuito y sin compromiso: te lo enviamos y tú decides.' },
      {
        q: '¿Por qué no hay precios en la web?',
        a: 'Cada obra es distinta. Preferimos valorar tu caso y darte un presupuesto detallado en lugar de una tarifa genérica.',
      },
      {
        q: '¿En qué zona trabajáis?',
        a: 'En Reus y en los municipios de alrededor, hasta unos 30 km: Tarragona, Salou, Cambrils, Vila-seca y otros del Camp de Tarragona.',
      },
      {
        q: '¿Atendéis urgencias?',
        a: 'Sí, según disponibilidad. Llámanos o escríbenos por WhatsApp y te diremos cuándo podemos ir.',
      },
      {
        q: '¿Trabajáis para empresas?',
        a: 'Sí. Además de particulares, trabajamos para comercios, hoteles y empresas constructoras que necesitan oficios como electricidad o fontanería.',
      },
      {
        q: '¿Podéis trabajar en festivos?',
        a: 'Si la obra tiene una fecha límite y lo acordamos, sí. No es lo habitual, pero nos adaptamos cuando hace falta.',
      },
    ],
  },

  contact: {
    kicker: 'Contacto',
    title: 'Pide tu presupuesto gratis',
    intro: 'Cuéntanos qué necesitas y te responderemos lo antes posible. Sin compromiso.',
    form: {
      legend: 'Solicitud de presupuesto',
      name: 'Nombre',
      contact: 'Teléfono o correo electrónico',
      contactHint: 'Lo usaremos solo para responderte.',
      service: 'Servicio',
      servicePlaceholder: 'Elige un servicio',
      town: 'Localidad',
      optional: 'opcional',
      message: 'Describe el trabajo',
      messageHint: 'Qué hay que hacer, en qué tipo de inmueble y, si la hay, la fecha límite.',
      privacyBefore: 'He leído y acepto la',
      privacyLink: 'política de privacidad',
      submit: 'Enviar solicitud',
      sending: 'Enviando…',
      required: 'obligatorio',
      successTitle: 'Solicitud enviada',
      successText: 'Gracias. Hemos recibido tu solicitud y te contactaremos lo antes posible.',
      another: 'Enviar otra solicitud',
      errorTitle: 'No se ha podido enviar',
      errorText: 'Vuelve a intentarlo en unos minutos o contáctanos por teléfono o WhatsApp.',
      offline: 'Parece que no tienes conexión a internet. Revísala e inténtalo de nuevo.',
      disabled:
        'El envío online todavía no está activado. Mientras tanto, llámanos o escríbenos por WhatsApp.',
      errors: {
        name: 'Escribe tu nombre.',
        contact: 'Escribe un teléfono o un correo electrónico válido.',
        service: 'Elige un servicio.',
        message: 'Cuéntanos un poco más (mínimo 15 caracteres).',
        privacy: 'Debes aceptar la política de privacidad.',
        summary: 'Revisa los campos marcados.',
      },
      emailSubject: 'Nueva solicitud de presupuesto — web MITRU CONSTRUCTOR',
    },
    details: {
      title: '¿Prefieres hablar directamente?',
      person: 'Persona de contacto',
      phone: 'Teléfono',
      whatsapp: 'WhatsApp',
      whatsappAction: 'Abrir chat',
      email: 'Correo',
      hours: 'Horario de atención',
      hoursValue: 'De 9:00 a 13:00',
    },
  },

  footer: {
    tagline: 'Instalaciones eléctricas, fontanería y reformas en Reus y alrededores.',
    navTitle: 'Navegación',
    contactTitle: 'Contacto',
    legalTitle: 'Legal',
    owner: 'Titular',
    rights: 'Todos los derechos reservados.',
  },

  legal: {
    notice: 'Aviso legal',
    privacy: 'Política de privacidad',
    cookies: 'Política de cookies',
    pending: 'pendiente de completar',
    draftNote:
      'Texto provisional de la prueba piloto. Debe revisarse y completarse con los datos del titular antes de la publicación definitiva.',
    updated: 'Última actualización',
    back: 'Volver al inicio',
  },

  notFound: {
    title: 'Página no encontrada',
    text: 'La página que buscas no existe o se ha movido.',
    back: 'Volver al inicio',
  },
};

export default es;
export type Dict = typeof es;
