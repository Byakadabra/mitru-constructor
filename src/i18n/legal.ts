/**
 * Textos legales PROVISIONALES (prueba piloto).
 * Se generan con los datos de src/config/site.ts. Los datos que faltan se muestran
 * como "pendiente de completar". Deben revisarse antes de la publicación definitiva.
 */
import { site } from '../config/site';
import type { Lang } from './index';

export type LegalKind = 'legal' | 'privacy' | 'cookies';
export type LegalSection = { title: string; paras: string[] };

/** Marca para datos pendientes; LegalPage la sustituye por una etiqueta visible. */
export const PENDING = '⟦PENDIENTE⟧';
const v = (value: string) => value || PENDING;

const c = site.contact;
const l = site.legal;
const formProvider =
  site.form.provider === 'netlify' ? 'Netlify, Inc.' : site.form.provider === 'formsubmit' ? 'FormSubmit (formsubmit.co)' : '—';

const es: Record<LegalKind, LegalSection[]> = {
  legal: [
    {
      title: '1. Datos identificativos',
      paras: [
        'En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de esta web:',
        `Titular: ${l.owner} (${l.form.toLowerCase()}), que opera con el nombre comercial ${site.name}.`,
        `NIF/NIE: ${v(l.nif)}.`,
        `Domicilio: ${v(l.address)}.`,
        `Correo electrónico: ${c.email}. Teléfono: ${c.phoneDisplay}.`,
        'Actividad: instalaciones eléctricas, fontanería, construcción, reformas, reparaciones y mantenimiento.',
      ],
    },
    {
      title: '2. Objeto',
      paras: [
        'Esta web informa sobre los servicios de la empresa y permite a los usuarios contactar y solicitar presupuestos. La información publicada no constituye una oferta vinculante: cada trabajo se presupuesta de forma individual.',
      ],
    },
    {
      title: '3. Condiciones de uso',
      paras: [
        'El acceso a la web es gratuito. El usuario se compromete a hacer un uso adecuado de sus contenidos y a no emplearlos para actividades ilícitas o contrarias a la buena fe, ni para enviar información falsa a través del formulario.',
      ],
    },
    {
      title: '4. Propiedad intelectual e industrial',
      paras: [
        `Los textos, el diseño, el logotipo y el nombre comercial ${site.name} pertenecen a su titular o se utilizan con autorización. Queda prohibida su reproducción o uso sin permiso expreso.`,
      ],
    },
    {
      title: '5. Responsabilidad y enlaces',
      paras: [
        'El titular procura que la información sea correcta y esté actualizada, pero no se responsabiliza de errores puntuales ni de interrupciones del servicio. Los enlaces a servicios de terceros (por ejemplo, WhatsApp) se ofrecen por comodidad; el titular no controla su contenido.',
      ],
    },
    {
      title: '6. Legislación aplicable',
      paras: ['Estas condiciones se rigen por la legislación española.'],
    },
  ],
  privacy: [
    {
      title: '1. Responsable del tratamiento',
      paras: [
        `Responsable: ${l.owner} (${site.name}). NIF/NIE: ${v(l.nif)}. Domicilio: ${v(l.address)}. Correo de contacto: ${c.email}.`,
      ],
    },
    {
      title: '2. Datos que tratamos',
      paras: [
        'Los que nos facilitas en el formulario de presupuesto (nombre, teléfono o correo electrónico, servicio, localidad y descripción del trabajo) y los que nos envíes por teléfono, WhatsApp o correo electrónico. No pedimos datos especialmente protegidos.',
      ],
    },
    {
      title: '3. Finalidad',
      paras: [
        'Atender tu solicitud, ponernos en contacto contigo, valorar el trabajo y enviarte el presupuesto. Si aceptas el presupuesto, gestionar la relación comercial. No usamos tus datos para enviarte publicidad.',
      ],
    },
    {
      title: '4. Base jurídica',
      paras: [
        'Tu consentimiento al enviar la solicitud (art. 6.1.a del RGPD) y la aplicación, a petición tuya, de medidas precontractuales como la elaboración de un presupuesto (art. 6.1.b del RGPD).',
      ],
    },
    {
      title: '5. Conservación',
      paras: [
        'Conservamos los datos mientras sean necesarios para atender tu solicitud y, si llegamos a trabajar juntos, durante los plazos que exija la ley. Después se eliminan.',
      ],
    },
    {
      title: '6. Destinatarios y proveedores',
      paras: [
        'No cedemos tus datos a terceros salvo obligación legal. Para que la web funcione utilizamos proveedores que tratan datos por cuenta del responsable:',
        `Alojamiento web: Vercel Inc. Envío del formulario: ${formProvider}. Correo electrónico: Google (Gmail).`,
        'Algunos de estos proveedores pueden estar fuera del Espacio Económico Europeo. En ese caso, las transferencias se realizan con las garantías previstas en el RGPD (por ejemplo, el Marco de Privacidad de Datos UE-EE. UU. o cláusulas contractuales tipo).',
      ],
    },
    {
      title: '7. Tus derechos',
      paras: [
        `Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, y retirar tu consentimiento en cualquier momento, escribiendo a ${c.email}.`,
        'Si consideras que no hemos tratado tus datos correctamente, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).',
      ],
    },
  ],
  cookies: [
    {
      title: '1. ¿Usa cookies esta web?',
      paras: [
        'No. Esta web no instala cookies propias ni de terceros con fines de análisis, publicidad o personalización, por lo que no es necesario pedir tu consentimiento.',
        'Las tipografías se sirven desde el propio servidor de la web, sin conectarse a servicios externos.',
      ],
    },
    {
      title: '2. Servicios de terceros',
      paras: [
        'Si pulsas el botón de WhatsApp, saldrás a un servicio de terceros que aplica su propia política de privacidad y de cookies.',
      ],
    },
    {
      title: '3. Cambios',
      paras: [
        'Si en el futuro se añaden herramientas que usen cookies (por ejemplo, de estadísticas), esta política se actualizará y se pedirá tu consentimiento cuando la ley lo exija.',
      ],
    },
  ],
};

const ca: Record<LegalKind, LegalSection[]> = {
  legal: [
    {
      title: '1. Dades identificatives',
      paras: [
        'En compliment de l’article 10 de la Llei 34/2002, de serveis de la societat de la informació i de comerç electrònic (LSSI-CE), s’informa de les dades del titular d’aquest web:',
        `Titular: ${l.owner} (autònom), que opera amb el nom comercial ${site.name}.`,
        `NIF/NIE: ${v(l.nif)}.`,
        `Domicili: ${v(l.address)}.`,
        `Correu electrònic: ${c.email}. Telèfon: ${c.phoneDisplay}.`,
        'Activitat: instal·lacions elèctriques, lampisteria, construcció, reformes, reparacions i manteniment.',
      ],
    },
    {
      title: '2. Objecte',
      paras: [
        'Aquest web informa sobre els serveis de l’empresa i permet als usuaris contactar i demanar pressupostos. La informació publicada no constitueix una oferta vinculant: cada feina es pressuposta de manera individual.',
      ],
    },
    {
      title: '3. Condicions d’ús',
      paras: [
        'L’accés al web és gratuït. L’usuari es compromet a fer-ne un ús adequat i a no fer-lo servir per a activitats il·lícites o contràries a la bona fe, ni per enviar informació falsa a través del formulari.',
      ],
    },
    {
      title: '4. Propietat intel·lectual i industrial',
      paras: [
        `Els textos, el disseny, el logotip i el nom comercial ${site.name} pertanyen al seu titular o s’utilitzen amb autorització. En queda prohibida la reproducció o l’ús sense permís exprés.`,
      ],
    },
    {
      title: '5. Responsabilitat i enllaços',
      paras: [
        'El titular procura que la informació sigui correcta i estigui actualitzada, però no es responsabilitza d’errors puntuals ni d’interrupcions del servei. Els enllaços a serveis de tercers (per exemple, WhatsApp) s’ofereixen per comoditat; el titular no en controla el contingut.',
      ],
    },
    { title: '6. Legislació aplicable', paras: ['Aquestes condicions es regeixen per la legislació espanyola.'] },
  ],
  privacy: [
    {
      title: '1. Responsable del tractament',
      paras: [
        `Responsable: ${l.owner} (${site.name}). NIF/NIE: ${v(l.nif)}. Domicili: ${v(l.address)}. Correu de contacte: ${c.email}.`,
      ],
    },
    {
      title: '2. Dades que tractem',
      paras: [
        'Les que ens facilites al formulari de pressupost (nom, telèfon o correu electrònic, servei, localitat i descripció de la feina) i les que ens enviïs per telèfon, WhatsApp o correu electrònic. No demanem dades especialment protegides.',
      ],
    },
    {
      title: '3. Finalitat',
      paras: [
        'Atendre la teva sol·licitud, posar-nos en contacte amb tu, valorar la feina i enviar-te el pressupost. Si l’acceptes, gestionar la relació comercial. No fem servir les teves dades per enviar-te publicitat.',
      ],
    },
    {
      title: '4. Base jurídica',
      paras: [
        'El teu consentiment en enviar la sol·licitud (art. 6.1.a del RGPD) i l’aplicació, a petició teva, de mesures precontractuals com l’elaboració d’un pressupost (art. 6.1.b del RGPD).',
      ],
    },
    {
      title: '5. Conservació',
      paras: [
        'Conservem les dades mentre siguin necessàries per atendre la teva sol·licitud i, si arribem a treballar junts, durant els terminis que exigeixi la llei. Després s’eliminen.',
      ],
    },
    {
      title: '6. Destinataris i proveïdors',
      paras: [
        'No cedim les teves dades a tercers llevat d’obligació legal. Perquè el web funcioni fem servir proveïdors que tracten dades per compte del responsable:',
        `Allotjament web: Vercel Inc. Enviament del formulari: ${formProvider}. Correu electrònic: Google (Gmail).`,
        'Alguns d’aquests proveïdors poden ser fora de l’Espai Econòmic Europeu. En aquest cas, les transferències es fan amb les garanties previstes al RGPD (per exemple, el Marc de Privacitat de Dades UE-EUA o clàusules contractuals tipus).',
      ],
    },
    {
      title: '7. Els teus drets',
      paras: [
        `Pots exercir els drets d’accés, rectificació, supressió, oposició, limitació del tractament i portabilitat, i retirar el consentiment en qualsevol moment, escrivint a ${c.email}.`,
        'Si consideres que no hem tractat bé les teves dades, pots presentar una reclamació davant l’Agència Espanyola de Protecció de Dades (www.aepd.es).',
      ],
    },
  ],
  cookies: [
    {
      title: '1. Aquest web fa servir galetes?',
      paras: [
        'No. Aquest web no instal·la galetes pròpies ni de tercers amb finalitats d’anàlisi, publicitat o personalització, de manera que no cal demanar-te el consentiment.',
        'Les tipografies se serveixen des del mateix servidor del web, sense connectar-se a serveis externs.',
      ],
    },
    {
      title: '2. Serveis de tercers',
      paras: ['Si prems el botó de WhatsApp, sortiràs a un servei de tercers que aplica la seva pròpia política de privacitat i de galetes.'],
    },
    {
      title: '3. Canvis',
      paras: [
        'Si en el futur s’afegeixen eines que facin servir galetes (per exemple, d’estadístiques), aquesta política s’actualitzarà i se’t demanarà el consentiment quan la llei ho exigeixi.',
      ],
    },
  ],
};

const en: Record<LegalKind, LegalSection[]> = {
  legal: [
    {
      title: '1. Owner details',
      paras: [
        'In accordance with article 10 of Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), the owner of this website is:',
        `Owner: ${l.owner} (self-employed), trading as ${site.name}.`,
        `Tax ID (NIF/NIE): ${v(l.nif)}.`,
        `Address: ${v(l.address)}.`,
        `Email: ${c.email}. Phone: ${c.phoneDisplay}.`,
        'Activity: electrical installations, plumbing, building, renovations, repairs and maintenance.',
      ],
    },
    {
      title: '2. Purpose',
      paras: [
        'This website provides information about our services and lets visitors contact us and request quotes. Nothing published here is a binding offer: every job is quoted individually.',
      ],
    },
    {
      title: '3. Terms of use',
      paras: [
        'Access to the website is free. Users agree to use it appropriately and not for unlawful purposes, and not to submit false information through the form.',
      ],
    },
    {
      title: '4. Intellectual property',
      paras: [
        `The texts, design, logo and the trade name ${site.name} belong to their owner or are used with permission. They may not be reproduced or used without express consent.`,
      ],
    },
    {
      title: '5. Liability and links',
      paras: [
        'We try to keep the information accurate and up to date, but accept no liability for occasional errors or service interruptions. Links to third-party services (such as WhatsApp) are provided for convenience; we do not control their content.',
      ],
    },
    { title: '6. Governing law', paras: ['These terms are governed by Spanish law.'] },
  ],
  privacy: [
    {
      title: '1. Data controller',
      paras: [`Controller: ${l.owner} (${site.name}). Tax ID: ${v(l.nif)}. Address: ${v(l.address)}. Contact email: ${c.email}.`],
    },
    {
      title: '2. Data we process',
      paras: [
        'The details you give us in the quote form (name, phone or email, service, town and job description) and anything you send us by phone, WhatsApp or email. We do not ask for special categories of data.',
      ],
    },
    {
      title: '3. Purpose',
      paras: [
        'To handle your request, contact you, assess the job and send you a quote; and, if you accept it, to manage our business relationship. We do not use your data for advertising.',
      ],
    },
    {
      title: '4. Legal basis',
      paras: [
        'Your consent when you submit the request (art. 6.1.a GDPR) and steps taken at your request before entering into a contract, such as preparing a quote (art. 6.1.b GDPR).',
      ],
    },
    {
      title: '5. Retention',
      paras: [
        'We keep your data for as long as needed to handle your request and, if we end up working together, for the periods required by law. It is then deleted.',
      ],
    },
    {
      title: '6. Recipients and providers',
      paras: [
        'We do not share your data with third parties unless legally required. To run the website we use providers that process data on our behalf:',
        `Web hosting: Vercel Inc. Form delivery: ${formProvider}. Email: Google (Gmail).`,
        'Some of these providers may be located outside the European Economic Area. Any such transfers rely on the safeguards provided by the GDPR (for example, the EU-US Data Privacy Framework or standard contractual clauses).',
      ],
    },
    {
      title: '7. Your rights',
      paras: [
        `You can exercise your rights of access, rectification, erasure, objection, restriction and portability, and withdraw your consent at any time, by writing to ${c.email}.`,
        'If you believe we have not handled your data properly, you can complain to the Spanish Data Protection Agency (www.aepd.es).',
      ],
    },
  ],
  cookies: [
    {
      title: '1. Does this website use cookies?',
      paras: [
        'No. This website does not set first- or third-party cookies for analytics, advertising or personalisation, so no consent is required.',
        'Fonts are served from the website’s own server, without connecting to external services.',
      ],
    },
    {
      title: '2. Third-party services',
      paras: ['If you tap the WhatsApp button, you will go to a third-party service with its own privacy and cookie policy.'],
    },
    {
      title: '3. Changes',
      paras: [
        'If tools that use cookies (for example, statistics) are added in the future, this policy will be updated and your consent requested where the law requires it.',
      ],
    },
  ],
};

export const legalContent: Record<Lang, Record<LegalKind, LegalSection[]>> = { es, ca, en };
