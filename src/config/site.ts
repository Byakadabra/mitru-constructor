/**
 * DATOS DE LA EMPRESA — fuente única de verdad.
 *
 * Todo lo que aparece en la web (cabecera, contacto, pie, datos estructurados,
 * textos legales) se lee de aquí. Para cambiar el teléfono, el correo o
 * cualquier dato, edita SOLO este archivo y vuelve a publicar.
 *
 * Los campos marcados con `PENDIENTE` están sin confirmar o vacíos a propósito:
 * la web muestra "pendiente de completar" en su lugar y no inventa nada.
 */

export const site = {
  /** Nombre comercial tal como se escribe. */
  name: 'MITRU CONSTRUCTOR',
  /** Forma corta para el logotipo. */
  logoWord: 'MITRU',
  logoSub: 'CONSTRUCTOR',

  /**
   * URL pública definitiva. Se puede sobrescribir con la variable de entorno
   * PUBLIC_SITE_URL al compilar (p. ej. https://mitruconstructor.com).
   */
  url: (import.meta.env.PUBLIC_SITE_URL as string | undefined) ?? 'https://mitru-constructor.vercel.app',

  /**
   * ¿Debe Google indexar la web? Durante la prueba piloto (datos provisionales
   * y sin dominio definitivo) se publica con `noindex`. Cambia a `true`
   * (o PUBLIC_INDEXABLE=true) cuando la web y el dominio sean definitivos.
   */
  indexable: (import.meta.env.PUBLIC_INDEXABLE as string | undefined) === 'true',

  contact: {
    person: 'Gabriel Orza',
    /** PROVISIONAL (prueba): número facilitado para la prueba piloto. */
    phoneDisplay: '642 54 09 62',
    phoneE164: '+34642540962',
    /** WhatsApp: mismo número que el teléfono comercial. */
    whatsapp: '34642540962',
    email: 'orzamitru20@gmail.com',
    /** Horario de atención. PENDIENTE: confirmar días (¿lunes a viernes?). */
    hours: { opens: '09:00', closes: '13:00', days: null as null | string[] },
  },

  area: {
    city: 'Reus',
    province: 'Tarragona',
    region: 'Camp de Tarragona',
    country: 'ES',
    radiusKm: 30,
    /**
     * Municipios de ejemplo dentro del radio indicado (~30 km de Reus).
     * PENDIENTE: confirmar la lista con la empresa.
     */
    towns: ['Reus', 'Tarragona', 'Salou', 'Cambrils', 'Vila-seca', 'Constantí', 'Riudoms', 'La Selva del Camp'],
    /** No se muestra dirección física (decisión de la empresa). */
    showAddress: false,
  },

  /** Años en el sector, confirmado por la empresa: "más de 30 años". */
  yearsInSector: 30,

  legal: {
    /** Titular de la web (autónomo). */
    owner: 'Mitru Orza',
    form: 'Autónomo',
    /** PENDIENTE: NIF/NIE del titular. Se deja vacío a propósito (ver README). */
    nif: '',
    /** PENDIENTE: domicilio del titular. Obligatorio en el aviso legal (LSSI art. 10). */
    address: '',
  },

  /**
   * Envío del formulario de presupuesto.
   *  - 'formsubmit': servicio gratuito sin cuenta (FormSubmit.co). El primer envío
   *    manda un correo de ACTIVACIÓN a `contact.email`; hay que confirmarlo una vez.
   *  - 'netlify': Netlify Forms (cuando la web se publique en Netlify).
   *  - 'none': sin envío; el formulario muestra teléfono/WhatsApp como alternativa.
   */
  form: {
    provider: ((import.meta.env.PUBLIC_FORM_PROVIDER as string | undefined) ?? 'formsubmit') as
      | 'formsubmit'
      | 'netlify'
      | 'none',
    /** Tras activar FormSubmit puedes sustituir el correo por el alias aleatorio que te envían. */
    formsubmitTarget: (import.meta.env.PUBLIC_FORMSUBMIT_TARGET as string | undefined) ?? 'orzamitru20@gmail.com',
  },

  /** Redes sociales: ninguna por ahora (decisión de la empresa). */
  social: [] as { label: string; url: string }[],
} as const;

export type ServiceId =
  | 'electricidad'
  | 'fontaneria'
  | 'reformas'
  | 'banos-cocinas'
  | 'albanileria'
  | 'pladur'
  | 'climatizacion'
  | 'pintura'
  | 'reparaciones';

/** Orden de los servicios en la web. El primero se destaca (servicio principal). */
export const serviceOrder: ServiceId[] = [
  'electricidad',
  'reformas',
  'fontaneria',
  'banos-cocinas',
  'climatizacion',
  'albanileria',
  'pladur',
  'pintura',
  'reparaciones',
];

export const telHref = `tel:${site.contact.phoneE164}`;
export const mailHref = `mailto:${site.contact.email}`;
export const waHref = (text: string) => `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
