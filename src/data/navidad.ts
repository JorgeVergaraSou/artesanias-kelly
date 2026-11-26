// src/data/navidad.ts
// Una entrada por año. Para agregar 2027: ver instrucciones al final del archivo.

export interface FotoNavidad {
  src: string;
  alt: string;
}

export interface LugarNavidad {
  nombre: string;
  direccion: string;
}

export interface EdicionNavidad {
  anio: number;
  titulo: string;
  /** Párrafos del texto introductorio */
  introduccion: string[];
  portada: FotoNavidad;
  /** Opcional: si no hay invitación ni lugar, ese bloque no se muestra. */
  invitacion?: FotoNavidad;
  lugar?: LugarNavidad;
  fotos: FotoNavidad[];
}

const BASE = "/img/navidad";

/** Arma la ruta codificando espacios y caracteres especiales del nombre de archivo. */
const ruta = (carpeta: string, archivo: string) =>
  `${BASE}/${carpeta}/${encodeURIComponent(archivo)}`;

const introComun = [
  "La Navidad es tiempo de unión: de sentarse a la misma mesa, de abrazarse fuerte y de recordar lo que realmente importa. Es la ocasión de agradecer por quienes están a nuestro lado y de compartir lo que tenemos, sea mucho o poco.",
  "Por eso un regalo hecho a mano tiene un valor distinto. Detrás de cada pieza hay tiempo, cariño y dedicación, y eso se nota cuando llega a manos de alguien querido.",
  "Te invitamos a conocer nuestras creaciones de esta temporada y a elegir ese detalle especial que haga única tu Navidad.",
];

// Las fotos de 2026 viven en /public/img/navidad/2026/.
const archivos2026 = [
  "WhatsApp Image 2026-11-26 at 10.25.20.jpeg",
  "WhatsApp Image 2026-11-26 at 10.25.21.jpeg",
  "WhatsApp Image 2026-11-26 at 10.25.23.jpeg",
  "WhatsApp Image 2026-11-26 at 10.25.24 (1).jpeg",
  "WhatsApp Image 2026-11-26 at 10.25.24.jpeg",
  "WhatsApp Image 2026-11-26 at 10.25.33 (1).jpeg",
  "WhatsApp Image 2026-11-26 at 10.25.33 (2).jpeg",
  "WhatsApp Image 2026-11-26 at 10.25.33.jpeg",
  "WhatsApp Image 2026-11-26 at 10.25.34 (1).jpeg",
  "WhatsApp Image 2026-11-26 at 10.25.34 (2).jpeg",
  "WhatsApp Image 2026-11-26 at 10.25.34 (3).jpeg",
  "WhatsApp Image 2026-11-26 at 10.25.34 (4).jpeg",
  "WhatsApp Image 2026-11-26 at 10.25.34.jpeg",
  "WhatsApp Image 2026-11-26 at 10.25.35 (1).jpeg",
  "WhatsApp Image 2026-11-26 at 10.25.35 (2).jpeg",
  "WhatsApp Image 2026-11-26 at 10.25.35 (3).jpeg",
  "WhatsApp Image 2026-11-26 at 10.25.35.jpeg",
  "WhatsApp Image 2026-11-26 at 10.25.36 (1).jpeg",
  "WhatsApp Image 2026-11-26 at 10.25.36 (2).jpeg",
  "WhatsApp Image 2026-11-26 at 10.25.36 (3).jpeg",
  "WhatsApp Image 2026-11-26 at 10.25.36.jpeg",
];

export const edicionesNavidad: EdicionNavidad[] = [
  {
    anio: 2026,
    titulo: "Navidad 2026",
    introduccion: introComun,
    portada: {
      src: ruta("2026", "Portada.jpeg"),
      alt: "Collage de adornos navideños artesanales: casitas con luces, arbolitos, faroles, cajas de regalo y canastos decorados",
    },
    invitacion: {
      src: ruta("2026", "invitacion.jpeg"),
      alt: "Invitación a la Feria Navideña organizada por la Junta Vecinal 23 de Abril N° 17 y la Agrupación de Emprendedores Los Recoletos, en la Explanada Metro Dorsal",
    },
    lugar: {
      nombre: "Explanada Metro Dorsal",
      direccion: "Explanada Metro Dorsal, Recoleta, Chile",
    },
    fotos: archivos2026.map((archivo, i) => ({
      src: ruta("2026", archivo),
      alt: `Adorno navideño hecho a mano, foto ${i + 1}`,
    })),
  },

  // CÓMO AGREGAR 2027:
  // 1. Crea la carpeta public/img/navidad/2027/ y deja ahí la portada y las fotos.
  // 2. Copia el bloque de 2026 arriba, cambia anio/titulo, y usa
  //    ruta("2027", "nombre.jpeg") para cada foto.
  // El menú de la barra y la ruta /navidad/2027 se crean solos.
];

// Ordenadas de la más reciente a la más antigua
export const edicionesOrdenadas = [...edicionesNavidad].sort(
  (a, b) => b.anio - a.anio
);

export const edicionMasReciente = edicionesOrdenadas[0];

export const buscarEdicion = (anio: string | undefined) =>
  edicionesNavidad.find((e) => String(e.anio) === anio);
