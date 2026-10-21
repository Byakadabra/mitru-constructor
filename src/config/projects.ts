/**
 * FOTOS Y PROYECTOS — en espera de fotos reales.
 *
 * Mientras esta lista esté vacía, la sección muestra marcos de "Próximamente" (sin fotos falsas).
 * Para añadir trabajos: copia las fotos a public/proyectos/ (mejor en .webp o .jpg, ~1600 px de ancho)
 * y añade una entrada por foto. PENDIENTE: confirmar si se puede indicar la localidad en cada foto.
 */
import type { ServiceId } from './site';

export type Project = {
  /** Ruta dentro de public/, p. ej. '/proyectos/bano-reus.webp' */
  src: string;
  width: number;
  height: number;
  /** Descripción de la foto para lectores de pantalla y Google */
  alt: string;
  /** Título visible, p. ej. 'Reforma de baño' */
  title: string;
  service?: ServiceId;
  /** Solo si la empresa lo autoriza */
  town?: string;
};

export const projects: Project[] = [];
