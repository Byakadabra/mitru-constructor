import es, { type Dict } from './es';
import ca from './ca';
import en from './en';

export type Lang = 'es' | 'ca' | 'en';
export type PageKey = 'home' | 'legal' | 'privacy' | 'cookies';

export const langs: Lang[] = ['es', 'ca', 'en'];
export const defaultLang: Lang = 'es';

const dicts: Record<Lang, Dict> = { es, ca, en };
export const t = (lang: Lang): Dict => dicts[lang];

/** URLs legibles por idioma. El castellano va en la raíz. */
export const routes: Record<Lang, Record<PageKey, string>> = {
  es: { home: '/', legal: '/aviso-legal/', privacy: '/politica-privacidad/', cookies: '/politica-cookies/' },
  ca: { home: '/ca/', legal: '/ca/avis-legal/', privacy: '/ca/politica-privacitat/', cookies: '/ca/politica-galetes/' },
  en: { home: '/en/', legal: '/en/legal-notice/', privacy: '/en/privacy-policy/', cookies: '/en/cookie-policy/' },
};

/** hreflang de cada idioma. */
export const hreflang: Record<Lang, string> = { es: 'es-ES', ca: 'ca-ES', en: 'en' };
